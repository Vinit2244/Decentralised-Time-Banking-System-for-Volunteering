// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyRegistry {
    struct Company {
        string username;
        string password;
        address wallet;
    }

    struct Opportunity {
        uint256 uid;
        address company;
        string companyName;
        string name;
        string location;
        uint256 startDate;
        uint256 endDate;
        uint256 lastDateToRegister;
        uint256 hoursRequired;
        uint256 pointsAwarded;
        uint256 maxVolunteers;
        address[] volunteerAddresses; // List of volunteers who applied
        int8[] accepted; // -1 = pending, 0 = rejected, 1 = accepted, 2 = complete
        string description;
    }

    struct Volunteer {
        string username;
        string password;
        address wallet;
        mapping(uint256 => uint256) points;
        uint256[] opportunityIds;
        string bio;
    }

    mapping(string => Company) public companies;
    mapping(address => string) public addressToUsername;
    mapping(address => Opportunity[]) public companyOpportunities;
    address[] public registeredCompanies; // Array to store registered company addresses
    mapping(address => Volunteer) public volunteers; // Mapping from address to index in volunteers array
    mapping(address => string) public addressToUsernameVolunteer; // Mapping from address to username
    mapping(string => address) public usernameToAddressVolunteer;
    address[] public registeredVolunteers;
    uint256[] public nonDeletableOpportunitiesUids;

    function checkNonDeletable(uint256 uid) public view returns (bool) {
        for (uint i = 0; i < nonDeletableOpportunitiesUids.length; i++) {
            if(nonDeletableOpportunitiesUids[i] == uid){
                return true; // Return true if the array contains this ID
            }
        }
        return false;
    }

    function registerCompany(string memory _username, string memory _password) public {
        require(companies[_username].wallet == address(0), "Company already registered");

        companies[_username] = Company(_username, _password, msg.sender);
        addressToUsername[msg.sender] = _username;
        registeredCompanies.push(msg.sender);
    }

    function registerVolunteer( 
        string memory _username, 
        string memory _password, 
        string memory _bio
    ) public {
        require(bytes(addressToUsernameVolunteer[msg.sender]).length == 0, "Volunteer already registered");

        Volunteer storage newVolunteer = volunteers[msg.sender];
        newVolunteer.username = _username;
        newVolunteer.password = _password;
        newVolunteer.wallet = msg.sender;
        newVolunteer.bio = _bio;

        addressToUsernameVolunteer[msg.sender] = _username;
        usernameToAddressVolunteer[_username] = msg.sender;
        registeredVolunteers.push(msg.sender);
    }

    function checkCompany(address _company, string memory _username, string memory _password) public view returns (bool) {
        Company storage company = companies[_username];
        return (keccak256(abi.encodePacked(company.wallet)) == keccak256(abi.encodePacked(_company)) &&
                keccak256(abi.encodePacked(company.password)) == keccak256(abi.encodePacked(_password)));
    }

    function checkVolunteer(address _volunteer, string memory _username, string memory _password) public view returns (bool) {
        Volunteer storage volunteer = volunteers[_volunteer];
        return (keccak256(abi.encodePacked(volunteer.username)) == keccak256(abi.encodePacked(_username)) &&
                keccak256(abi.encodePacked(volunteer.password)) == keccak256(abi.encodePacked(_password)));
    }

    function getTotalPoints(address volunteerAddress) public view returns (uint256) {
        require(bytes(addressToUsernameVolunteer[volunteerAddress]).length > 0, "No volunteer registered with that address");

        Volunteer storage volunteer = volunteers[volunteerAddress];
        uint256 totalPoints = 0;
        
        for (uint256 i = 0; i < volunteer.opportunityIds.length; i++) {
            uint256 opportunityId = volunteer.opportunityIds[i];
            totalPoints += volunteer.points[opportunityId];
        }
        return totalPoints;
    }

    function getApplicationStatus(address volunteerAddress, uint256 uid) public view returns (int8) {
        for (uint256 i = 0; i < registeredCompanies.length; i++) {
            address companyAddress = registeredCompanies[i];
            Opportunity[] storage opportunities = companyOpportunities[companyAddress];

            for (uint256 j = 0; j < opportunities.length; j++) {
                if (opportunities[j].uid == uid) {
                    for (uint256 k = 0; k < opportunities[j].volunteerAddresses.length; k++) {
                        if (opportunities[j].volunteerAddresses[k] == volunteerAddress) {
                            return opportunities[j].accepted[k];
                        }
                    }
                }
            }
        }
        return -1;
    }

    function acceptApplication(address volunteerAddress, uint256 uid) public {
        Opportunity storage opportunity = findOpportunityByUid(uid);

        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == volunteerAddress) {
                opportunity.accepted[i] = 1; // Change status to accepted
                return;
            }
        }
        revert("Volunteer not found in the application list.");
    }

    function rejectApplication(address volunteerAddress, uint256 uid) public {
        Opportunity storage opportunity = findOpportunityByUid(uid);
        require(opportunity.company == msg.sender, "Only the company can reject applications.");

        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == volunteerAddress) {
                opportunity.accepted[i] = 0; // Change status to rejected
                return;
            }
        }
        revert("Volunteer not found in the application list.");
    }

    function findOpportunityByUid(uint256 uid) internal view returns (Opportunity storage) {
        for (uint256 i = 0; i < registeredCompanies.length; i++) {
            Opportunity[] storage opportunities = companyOpportunities[registeredCompanies[i]];
            for (uint256 j = 0; j < opportunities.length; j++) {
                if (opportunities[j].uid == uid) {
                    return opportunities[j];
                }
            }
        }
        revert("Opportunity not found.");
    }

    function getAllVolunteers() public view returns (address[] memory) {
        return registeredVolunteers;
    }

    function getAllCompanies() public view returns (address[] memory) {
        return registeredCompanies;
    }

    function isVolunteerRegisteredByUsername(string memory _username) public view returns (bool) {
        return usernameToAddressVolunteer[_username] != address(0);
    }

    function isCompanyRegisteredByUsername(string memory _username) public view returns (bool) {
        return companies[_username].wallet != address(0);
    }

    function getCompanyByUsername(string memory _username) public view returns (Company memory) {
        return companies[_username];
    }

    function getUsernameByAddress(address _wallet) public view returns (string memory) {
        require(bytes(addressToUsername[_wallet]).length > 0, "Company with this wallet address is not registered");
        return addressToUsername[_wallet];
    }

    function getUsernameByAddressVolunteer(address _wallet) public view returns (string memory) {
        require(bytes(addressToUsernameVolunteer[_wallet]).length > 0, "Volunteer with this wallet address is not registered");
        return addressToUsernameVolunteer[_wallet];
    }

    function getBiodata(address _wallet) public view returns (string memory) {
        require(bytes(addressToUsernameVolunteer[_wallet]).length > 0, "Volunteer with this wallet address is not registered");
        return volunteers[_wallet].bio;
    }

    uint256 public totalOpportunities;

    function addOpportunity(
        string memory _name,
        string memory _location,
        uint256 _startDate,
        uint256 _endDate,
        uint256 _lastDateToRegister,
        uint256 _hoursRequired,
        uint256 _pointsAwarded,
        uint256 _maxVolunteers,  // Added parameter for maximum volunteers
        string memory _description
    ) public {
        string memory _companyName = getUsernameByAddress(msg.sender);

        totalOpportunities++;

        Opportunity memory newOpportunity = Opportunity({
            uid: totalOpportunities,  // Assign the unique uid
            company: msg.sender,
            companyName: _companyName,
            name: _name,
            location: _location,
            startDate: _startDate,
            endDate: _endDate,
            lastDateToRegister: _lastDateToRegister,
            hoursRequired: _hoursRequired,
            pointsAwarded: _pointsAwarded,
            maxVolunteers: _maxVolunteers,  // Set the maximum volunteers
            volunteerAddresses: new address[](0),
            accepted: new int8[](0),
            description: _description
        });

        companyOpportunities[msg.sender].push(newOpportunity);
    }

    function applyForOpportunity(address _company, uint256 _uid) public {
        Opportunity[] storage opportunities = companyOpportunities[_company];
        bool opportunityFound = false;

        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                Opportunity storage opp = opportunities[i];
                opportunityFound = true;

                require(opp.volunteerAddresses.length < opp.maxVolunteers, "Opportunity has been filled");

                for (uint256 j = 0; j < opp.volunteerAddresses.length; j++) {
                    require(opp.volunteerAddresses[j] != msg.sender, "Already applied for this opportunity");
                }

                opp.volunteerAddresses.push(msg.sender);
                opp.accepted.push(-1);

                Volunteer storage volunteer = volunteers[msg.sender];

                if (volunteer.points[_uid] == 0) {
                    volunteer.points[_uid] = 0; // Initialize points for this opportunity to 0
                    volunteer.opportunityIds.push(_uid); // Add the opportunity ID to the list
                }

                break;
            }
        }

        require(opportunityFound, "Opportunity not found");
    }

    function completeOpportunity(address volunteerAddress, uint256 uid) public {
        require(volunteers[volunteerAddress].wallet == volunteerAddress, "Volunteer does not exist.");

        bool opportunityFound = false;

        for (uint i = 0; i < registeredCompanies.length; i++) {
            Opportunity[] storage opportunities = companyOpportunities[registeredCompanies[i]];
            for (uint j = 0; j < opportunities.length; j++) {
                if (opportunities[j].uid == uid) {
                    Opportunity storage opportunity = opportunities[j];
                    opportunityFound = true;

                    int volunteerIndex = -1;
                    for (uint k = 0; k < opportunity.volunteerAddresses.length; k++) {
                        if (opportunity.volunteerAddresses[k] == volunteerAddress) {
                            volunteerIndex = int(k);
                            break;
                        }
                    }
                    require(volunteerIndex != -1, "Volunteer did not apply for this opportunity.");

                    require(opportunity.accepted[uint(volunteerIndex)] == 1, "Volunteer not accepted for this opportunity or has already been given the reward.");

                    volunteers[volunteerAddress].points[uid] += opportunity.pointsAwarded;

                    opportunity.accepted[uint(volunteerIndex)] = 2;
                    addNonDeletableOpportunity(uid);

                    return; // Exit after completing the operation
                }
            }
        }
        
        require(opportunityFound, "Opportunity not found.");
    }

    function addNonDeletableOpportunity(uint uid) public {
        for (uint i = 0; i < nonDeletableOpportunitiesUids.length; i++) {
            if (nonDeletableOpportunitiesUids[i] == uid) {
                return;
            }
        }

        nonDeletableOpportunitiesUids.push(uid);
    }


    function getAvailableSpots(address _company, uint256 _uid) public view returns (uint256) {
        Opportunity[] storage opportunities = companyOpportunities[_company];
        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                Opportunity storage opp = opportunities[i];
                return opp.maxVolunteers - opp.volunteerAddresses.length;
            }
        }
        revert("Opportunity not found");
    }

    function getOpportunities(address _company) public view returns (Opportunity[] memory) {
        return companyOpportunities[_company];
    }

    function deleteOpportunity(uint256 _uid) public {
        Opportunity[] storage opportunities = companyOpportunities[msg.sender];
        bool opportunityFound = false;
        uint256 opportunityIndex;

        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                opportunityFound = true;
                opportunityIndex = i;
                break; // Exit the loop once we found the opportunity
            }
        }

        require(opportunityFound, "Opportunity not found");

        Opportunity storage opportunity = opportunities[opportunityIndex];
        address[] memory appliedVolunteers = opportunity.volunteerAddresses;

        for (uint256 i = 0; i < appliedVolunteers.length; i++) {
            address volunteerAddress = appliedVolunteers[i];
            Volunteer storage volunteer = volunteers[volunteerAddress];

            for (uint256 j = 0; j < volunteer.opportunityIds.length; j++) {
                if (volunteer.opportunityIds[j] == _uid) {
                    volunteer.opportunityIds[j] = volunteer.opportunityIds[volunteer.opportunityIds.length - 1];
                    volunteer.opportunityIds.pop();
                    break;
                }
            }

            delete volunteer.points[_uid];
        }

        opportunities[opportunityIndex] = opportunities[opportunities.length - 1];
        opportunities.pop();
    }

    function removeApplication(address _company, uint256 _uid) public {
        Opportunity[] storage opportunities = companyOpportunities[_company];
        bool opportunityFound = false;
        uint256 opportunityIndex;

        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                opportunityFound = true;
                opportunityIndex = i;
                break;
            }
        }

        require(opportunityFound, "Opportunity not found");

        Opportunity storage opportunity = opportunities[opportunityIndex];
        bool applicationFound = false;

        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == msg.sender) {
                applicationFound = true;
                
                opportunity.volunteerAddresses[i] = opportunity.volunteerAddresses[opportunity.volunteerAddresses.length - 1];
                opportunity.volunteerAddresses.pop();
                
                opportunity.accepted[i] = opportunity.accepted[opportunity.accepted.length - 1];
                opportunity.accepted.pop();
                
                break;
            }
        }

        require(applicationFound, "Application not found");

        Volunteer storage volunteer = volunteers[msg.sender];

        for (uint256 i = 0; i < volunteer.opportunityIds.length; i++) {
            if (volunteer.opportunityIds[i] == _uid) {
                volunteer.opportunityIds[i] = volunteer.opportunityIds[volunteer.opportunityIds.length - 1];
                volunteer.opportunityIds.pop();
                break;
            }
        }
        delete volunteer.points[_uid];
    }
}
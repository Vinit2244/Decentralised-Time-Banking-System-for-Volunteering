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
        int8[] accepted; // -1 = pending, 0 = rejected, 1 = accepted
        int8[] completed; // 0 = incomplete, 1 = complete
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

   // Register a new company
    function registerCompany(string memory _username, string memory _password) public {
        require(companies[_username].wallet == address(0), "Company already registered");

        companies[_username] = Company(_username, _password, msg.sender);
        addressToUsername[msg.sender] = _username; // Add to address-to-username mapping
        registeredCompanies.push(msg.sender); // Add company address to the array
    }

    // Function to add a new volunteer if they do not already exist
    function registerVolunteer( 
        string memory _username, 
        string memory _password, 
        string memory _bio
    ) public {
        // Check if the volunteer already exists by seeing if the wallet address is associated with a username
        require(bytes(addressToUsernameVolunteer[msg.sender]).length == 0, "Volunteer already registered");

        // Add new volunteer
        Volunteer storage newVolunteer = volunteers[msg.sender];
        newVolunteer.username = _username;
        newVolunteer.password = _password;
        newVolunteer.wallet = msg.sender;
        newVolunteer.bio = _bio;

        // Map address to username for quick existence check
        addressToUsernameVolunteer[msg.sender] = _username;
        usernameToAddressVolunteer[_username] = msg.sender;
        registeredVolunteers.push(msg.sender);
    }

    // Function to check company credentials
    function checkCompany(address _company, string memory _username, string memory _password) public view returns (bool) {
        Company storage company = companies[_username];
        return (keccak256(abi.encodePacked(company.wallet)) == keccak256(abi.encodePacked(_company)) &&
                keccak256(abi.encodePacked(company.password)) == keccak256(abi.encodePacked(_password)));
    }

    // Function to check volunteer credentials
    function checkVolunteer(address _volunteer, string memory _username, string memory _password) public view returns (bool) {
        Volunteer storage volunteer = volunteers[_volunteer];
        return (keccak256(abi.encodePacked(volunteer.username)) == keccak256(abi.encodePacked(_username)) &&
                keccak256(abi.encodePacked(volunteer.password)) == keccak256(abi.encodePacked(_password)));
    }

    // Function to calculate total points for a volunteer
    function getTotalPoints(address volunteerAddress) public view returns (uint256) {
        Volunteer storage volunteer = volunteers[volunteerAddress];
        uint256 totalPoints = 0;
        
        // Sum over all points for the stored opportunity IDs
        for (uint256 i = 0; i < volunteer.opportunityIds.length; i++) {
            uint256 opportunityId = volunteer.opportunityIds[i];
            totalPoints += volunteer.points[opportunityId];
        }
        
        return totalPoints;
    }

    // Get all registered volunteer addresses
    function getAllVolunteers() public view returns (address[] memory) {
        return registeredVolunteers;
    }

    // Get all registered company addresses
    function getAllCompanies() public view returns (address[] memory) {
        return registeredCompanies;
    }

    // Check if a volunteer is registered by username
    function isVolunteerRegisteredByUsername(string memory _username) public view returns (bool) {
        return usernameToAddressVolunteer[_username] != address(0);
    }

    // Check if a company is registered by username
    function isCompanyRegisteredByUsername(string memory _username) public view returns (bool) {
        return companies[_username].wallet != address(0);
    }

    // Get company details by username
    function getCompanyByUsername(string memory _username) public view returns (Company memory) {
        return companies[_username];
    }

    // Get company's username by wallet address
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

    // State variable to track the total number of opportunities
    uint256 public totalOpportunities;

    // Add a new volunteering opportunity
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
        // Get the username of the company using the caller's address
        string memory _companyName = getUsernameByAddress(msg.sender);

        // Increment the total opportunities counter to get a unique uid
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
            completed: new int8[](0),
            description: _description
        });

        companyOpportunities[msg.sender].push(newOpportunity);
    }

    // Updated function for volunteers to apply for an opportunity using uid
    function applyForOpportunity(address _company, uint256 _uid) public {
        // Find the opportunity by uid
        Opportunity[] storage opportunities = companyOpportunities[_company];
        bool opportunityFound = false;

        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                Opportunity storage opp = opportunities[i];
                opportunityFound = true;

                // Check if the opportunity is already full
                require(opp.volunteerAddresses.length < opp.maxVolunteers, "Opportunity has been filled");

                // Check if the volunteer is already in the list
                for (uint256 j = 0; j < opp.volunteerAddresses.length; j++) {
                    require(opp.volunteerAddresses[j] != msg.sender, "Already applied for this opportunity");
                }

                // Add volunteer address to the list
                opp.volunteerAddresses.push(msg.sender);
                opp.accepted.push(-1);
                opp.completed.push(0);

                // Update the Volunteer structure
                Volunteer storage volunteer = volunteers[msg.sender];

                // Add the opportunity ID to the volunteer's list if it's a new application
                if (volunteer.points[_uid] == 0) {
                    volunteer.points[_uid] = 0; // Initialize points for this opportunity to 0
                    volunteer.opportunityIds.push(_uid); // Add the opportunity ID to the list
                }

                break; // Exit the loop once we found and processed the opportunity
            }
        }

        require(opportunityFound, "Opportunity not found");
    }


    // Get the number of available spots for an opportunity using uid
    function getAvailableSpots(address _company, uint256 _uid) public view returns (uint256) {
        // Find the opportunity by uid
        Opportunity[] storage opportunities = companyOpportunities[_company];
        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                Opportunity storage opp = opportunities[i];
                return opp.maxVolunteers - opp.volunteerAddresses.length;
            }
        }
        revert("Opportunity not found");
    }

    // Get all opportunities created by a company
    function getOpportunities(address _company) public view returns (Opportunity[] memory) {
        return companyOpportunities[_company];
    }

    // Function to delete a volunteering opportunity by its uid
    function deleteOpportunity(uint256 _uid) public {
        Opportunity[] storage opportunities = companyOpportunities[msg.sender];
        bool opportunityFound = false;
        uint256 opportunityIndex;

        // Find the opportunity by uid
        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                opportunityFound = true;
                opportunityIndex = i;
                break; // Exit the loop once we found the opportunity
            }
        }

        require(opportunityFound, "Opportunity not found");

        // Get the list of volunteers who applied for this opportunity
        Opportunity storage opportunity = opportunities[opportunityIndex];
        address[] memory appliedVolunteers = opportunity.volunteerAddresses;

        // Remove the opportunity from each volunteer's records
        for (uint256 i = 0; i < appliedVolunteers.length; i++) {
            address volunteerAddress = appliedVolunteers[i];
            Volunteer storage volunteer = volunteers[volunteerAddress];

            // Find and remove the uid from the volunteer's opportunityIds array
            for (uint256 j = 0; j < volunteer.opportunityIds.length; j++) {
                if (volunteer.opportunityIds[j] == _uid) {
                    // Replace with the last element and pop to remove the opportunity ID
                    volunteer.opportunityIds[j] = volunteer.opportunityIds[volunteer.opportunityIds.length - 1];
                    volunteer.opportunityIds.pop();
                    break;
                }
            }

            // Delete the points for the removed opportunity
            delete volunteer.points[_uid];
        }

        // Delete the opportunity from the company's list of opportunities
        opportunities[opportunityIndex] = opportunities[opportunities.length - 1];
        opportunities.pop();
    }

    // Function for volunteer to remove their application using uid
    function removeApplication(address _company, uint256 _uid) public {
        Opportunity[] storage opportunities = companyOpportunities[_company];
        bool opportunityFound = false;
        uint256 opportunityIndex;

        // Find the opportunity by uid
        for (uint256 i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == _uid) {
                opportunityFound = true;
                opportunityIndex = i;
                break; // Exit the loop once we found the opportunity
            }
        }

        require(opportunityFound, "Opportunity not found");

        Opportunity storage opportunity = opportunities[opportunityIndex];
        bool applicationFound = false;

        // Loop to find the volunteer's address and remove it
        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == msg.sender) {
                applicationFound = true;
                
                // Replace with the last address and pop the last element
                opportunity.volunteerAddresses[i] = opportunity.volunteerAddresses[opportunity.volunteerAddresses.length - 1];
                opportunity.volunteerAddresses.pop();
                
                // Remove the corresponding accepted and completed entries
                opportunity.accepted[i] = opportunity.accepted[opportunity.accepted.length - 1];
                opportunity.completed[i] = opportunity.completed[opportunity.completed.length - 1];
                opportunity.accepted.pop();
                opportunity.completed.pop();
                
                break;
            }
        }

        require(applicationFound, "Application not found");

        // Update the Volunteer structure to remove the opportunity's uid
        Volunteer storage volunteer = volunteers[msg.sender];

        // Find and remove the uid from the volunteer's opportunityIds array
        for (uint256 i = 0; i < volunteer.opportunityIds.length; i++) {
            if (volunteer.opportunityIds[i] == _uid) {
                // Replace with the last element and pop to remove the opportunity ID
                volunteer.opportunityIds[i] = volunteer.opportunityIds[volunteer.opportunityIds.length - 1];
                volunteer.opportunityIds.pop();
                break;
            }
        }

        // Clear the points for the removed opportunity
        delete volunteer.points[_uid];
    }
}

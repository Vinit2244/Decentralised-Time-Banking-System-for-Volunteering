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
        require(bytes(addressToUsernameVolunteer[volunteerAddress]).length > 0, "No volunteer registered with that address");

        Volunteer storage volunteer = volunteers[volunteerAddress];
        uint256 totalPoints = 0;
        
        // Sum over all points for the stored opportunity IDs
        for (uint256 i = 0; i < volunteer.opportunityIds.length; i++) {
            uint256 opportunityId = volunteer.opportunityIds[i];
            totalPoints += volunteer.points[opportunityId];
        }
        return totalPoints;
    }

    // Function to get the application status of a volunteer for a specific opportunity
    function getApplicationStatus(address volunteerAddress, uint256 uid) public view returns (int8) {
        // Iterate through all registered companies
        for (uint256 i = 0; i < registeredCompanies.length; i++) {
            address companyAddress = registeredCompanies[i];
            Opportunity[] storage opportunities = companyOpportunities[companyAddress];

            // Iterate through the company's opportunities
            for (uint256 j = 0; j < opportunities.length; j++) {
                if (opportunities[j].uid == uid) {
                    // Find the index of the volunteer's address in the volunteerAddresses array
                    for (uint256 k = 0; k < opportunities[j].volunteerAddresses.length; k++) {
                        if (opportunities[j].volunteerAddresses[k] == volunteerAddress) {
                            return opportunities[j].accepted[k]; // Return the corresponding status
                        }
                    }
                }
            }
        }
        // If no matching opportunity or volunteer found, return -1 (indicating no application)
        return -1;
    }

    // Function to accept a volunteer's application for a specific opportunity
    function acceptApplication(address volunteerAddress, uint256 uid) public {
        Opportunity storage opportunity = findOpportunityByUid(uid);
        // require(opportunity.company == msg.sender, "Only the company can accept applications.");

        // Find the index of the volunteer in the volunteerAddresses array
        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == volunteerAddress) {
                opportunity.accepted[i] = 1; // Change status to accepted
                return;
            }
        }
        revert("Volunteer not found in the application list.");
    }

    // Function to reject a volunteer's application for a specific opportunity
    function rejectApplication(address volunteerAddress, uint256 uid) public {
        Opportunity storage opportunity = findOpportunityByUid(uid);
        require(opportunity.company == msg.sender, "Only the company can reject applications.");

        // Find the index of the volunteer in the volunteerAddresses array
        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == volunteerAddress) {
                opportunity.accepted[i] = 0; // Change status to rejected
                return;
            }
        }
        revert("Volunteer not found in the application list.");
    }

    // Helper function to find an opportunity by UID
    function findOpportunityByUid(uint256 uid) internal view returns (Opportunity storage) {
        // Iterate through all registered companies
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

    function completeOpportunity(address volunteerAddress, uint256 uid) public {
        // Ensure the volunteer exists
        require(volunteers[volunteerAddress].wallet == volunteerAddress, "Volunteer does not exist.");

        // Variable to track if the opportunity is found
        bool opportunityFound = false;

        // Loop through all companies to find the opportunity by UID
        for (uint i = 0; i < registeredCompanies.length; i++) {
            Opportunity[] storage opportunities = companyOpportunities[registeredCompanies[i]];
            for (uint j = 0; j < opportunities.length; j++) {
                if (opportunities[j].uid == uid) {
                    Opportunity storage opportunity = opportunities[j];
                    opportunityFound = true;

                    // Find the volunteer in the list of volunteer addresses for the opportunity
                    int volunteerIndex = -1;
                    for (uint k = 0; k < opportunity.volunteerAddresses.length; k++) {
                        if (opportunity.volunteerAddresses[k] == volunteerAddress) {
                            volunteerIndex = int(k);
                            break;
                        }
                    }
                    require(volunteerIndex != -1, "Volunteer did not apply for this opportunity.");

                    // Check if the volunteer was accepted
                    require(opportunity.accepted[uint(volunteerIndex)] == 1, "Volunteer not accepted for this opportunity or has already been given the reward.");

                    // Transfer points to the volunteer's account for this opportunity
                    volunteers[volunteerAddress].points[uid] += opportunity.pointsAwarded;

                    // Mark the opportunity as completed for the volunteer
                    opportunity.accepted[uint(volunteerIndex)] = 2;

                    return; // Exit after completing the operation
                }
            }
        }
        
        // If we complete the loop without finding the opportunity, revert
        require(opportunityFound, "Opportunity not found.");
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
                opportunity.accepted.pop();
                
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
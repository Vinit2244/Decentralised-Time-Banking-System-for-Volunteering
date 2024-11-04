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
        string description;
    }

    mapping(string => Company) public companies;
    mapping(address => string) public addressToUsername;
    mapping(address => Opportunity[]) public companyOpportunities;
    address[] public registeredCompanies; // Array to store registered company addresses

   // Register a new company
    function registerCompany(string memory _username, string memory _password) public {
        require(companies[_username].wallet == address(0), "Company already registered");

        companies[_username] = Company(_username, _password, msg.sender);
        addressToUsername[msg.sender] = _username; // Add to address-to-username mapping
        registeredCompanies.push(msg.sender); // Add company address to the array
    }

    // Get all registered company addresses
    function getAllCompanies() public view returns (address[] memory) {
        return registeredCompanies;
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

    // Get all opportunities from all companies
    // function getAllOpportunities() public view returns (Opportunity[] memory) {
    //     // Calculate total number of opportunities
    //     uint256 totalOpportunitiesCount = 0;
    //     for (uint256 i = 0; i < registeredCompanies.length; i++) {
    //         totalOpportunitiesCount += companyOpportunities[registeredCompanies[i]].length;
    //     }

    //     // Create an array to hold all opportunities
    //     Opportunity[] memory allOpportunities = new Opportunity[](totalOpportunitiesCount);
    //     uint256 index = 0;

    //     // Fill the allOpportunities array
    //     for (uint256 i = 0; i < registeredCompanies.length; i++) {
    //         Opportunity[] storage opportunities = companyOpportunities[registeredCompanies[i]];
    //         for (uint256 j = 0; j < opportunities.length; j++) {
    //             allOpportunities[index] = opportunities[j];
    //             index++;
    //         }
    //     }

    //     return allOpportunities;
    // }

    // Delete a volunteering opportunity using uid
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

        // Replace the found opportunity with the last opportunity and pop the last element
        opportunities[opportunityIndex] = opportunities[opportunities.length - 1];
        opportunities.pop();
    }

    // Volunteer removes their application using uid
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
                break;
            }
        }

        require(applicationFound, "Application not found");
    }
}
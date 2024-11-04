// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CompanyRegistry {
    struct Company {
        string username;
        string password;
        address wallet;
    }

    struct Opportunity {
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

        Opportunity memory newOpportunity = Opportunity({
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

    // Updated function for volunteers to apply for an opportunity
    function applyForOpportunity(address _company, uint256 _oppIndex) public {
        require(_oppIndex < companyOpportunities[_company].length, "Invalid index");
        
        Opportunity storage opp = companyOpportunities[_company][_oppIndex];
        
        // Check if the opportunity is already full
        require(opp.volunteerAddresses.length < opp.maxVolunteers, "Opportunity has been filled");
        
        // Check if the volunteer is already in the list
        for (uint256 i = 0; i < opp.volunteerAddresses.length; i++) {
            require(opp.volunteerAddresses[i] != msg.sender, "Already applied for this opportunity");
        }

        // Add volunteer address to the list
        opp.volunteerAddresses.push(msg.sender);
    }

    // Get the number of available spots for an opportunity
    function getAvailableSpots(address _company, uint256 _oppIndex) public view returns (uint256) {
        require(_oppIndex < companyOpportunities[_company].length, "Invalid index");
        Opportunity storage opp = companyOpportunities[_company][_oppIndex];
        return opp.maxVolunteers - opp.volunteerAddresses.length;
    }

    // Get all opportunities created by a company
    function getOpportunities(address _company) public view returns (Opportunity[] memory) {
        return companyOpportunities[_company];
    }

    // Delete a volunteering opportunity
    function deleteOpportunity(uint256 _index) public {
        require(_index < companyOpportunities[msg.sender].length, "Invalid index");
        companyOpportunities[msg.sender][_index] = companyOpportunities[msg.sender][companyOpportunities[msg.sender].length - 1];
        companyOpportunities[msg.sender].pop();
    }

    // Volunteer removes their application
    function removeApplication(address _company, uint256 _index) public {
        require(_index < companyOpportunities[_company].length, "Invalid index");

        Opportunity storage opportunity = companyOpportunities[_company][_index];
        for (uint256 i = 0; i < opportunity.volunteerAddresses.length; i++) {
            if (opportunity.volunteerAddresses[i] == msg.sender) {
                opportunity.volunteerAddresses[i] = opportunity.volunteerAddresses[opportunity.volunteerAddresses.length - 1];
                opportunity.volunteerAddresses.pop();
                break;
            }
        }
    }
}

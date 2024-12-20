let web3;
let contract;
let userAddress;

const contractAddress = "0x1fEb0Ec73f11376dD28d19b8EDfe8413056269a3";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "volunteerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "acceptApplication",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "addNonDeletableOpportunity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_startDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_lastDateToRegister",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_hoursRequired",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pointsAwarded",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxVolunteers",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addOpportunity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToUsername",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "addressToUsernameVolunteer",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_company",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_uid",
				"type": "uint256"
			}
		],
		"name": "applyForOpportunity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_company",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "checkCompany",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "checkNonDeletable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_volunteer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "checkVolunteer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "companies",
		"outputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "companyOpportunities",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "company",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "startDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastDateToRegister",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "hoursRequired",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pointsAwarded",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxVolunteers",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "volunteerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "completeOpportunity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_uid",
				"type": "uint256"
			}
		],
		"name": "deleteOpportunity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCompanies",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllVolunteers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "volunteerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "getApplicationStatus",
		"outputs": [
			{
				"internalType": "int8",
				"name": "",
				"type": "int8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_company",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_uid",
				"type": "uint256"
			}
		],
		"name": "getAvailableSpots",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "getBiodata",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getCompanyByUsername",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "wallet",
						"type": "address"
					}
				],
				"internalType": "struct CompanyRegistry.Company",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_company",
				"type": "address"
			}
		],
		"name": "getOpportunities",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "uid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "company",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "companyName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "startDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastDateToRegister",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "hoursRequired",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pointsAwarded",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxVolunteers",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "volunteerAddresses",
						"type": "address[]"
					},
					{
						"internalType": "int8[]",
						"name": "accepted",
						"type": "int8[]"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					}
				],
				"internalType": "struct CompanyRegistry.Opportunity[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "volunteerAddress",
				"type": "address"
			}
		],
		"name": "getTotalPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "getUsernameByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_wallet",
				"type": "address"
			}
		],
		"name": "getUsernameByAddressVolunteer",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "isCompanyRegisteredByUsername",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "isVolunteerRegisteredByUsername",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nonDeletableOpportunitiesUids",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "registerCompany",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bio",
				"type": "string"
			}
		],
		"name": "registerVolunteer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "registeredCompanies",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "registeredVolunteers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "volunteerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			}
		],
		"name": "rejectApplication",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_company",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_uid",
				"type": "uint256"
			}
		],
		"name": "removeApplication",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalOpportunities",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "usernameToAddressVolunteer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "volunteers",
		"outputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "bio",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Show loading spinner
function showLoading() {
    document.getElementById("loading").style.display = "flex";
}

// Hide loading spinner
function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		} catch (error) {
			console.error('Error connecting to MetaMask:', error);
		}
    } else {
        alert("Please install MetaMask to use this feature.");
        return;
    }
    userAddress = (await web3.eth.getAccounts())[0];
    contract = new web3.eth.Contract(contractABI, contractAddress);
    loadOpportunities();
	getTotalPoints();
}

async function loadOpportunities() {
    const opportunitiesContainer = document.getElementById("opportunities-container");
    opportunitiesContainer.innerHTML = ""; // Clear any existing content

    const companies = await contract.methods.getAllCompanies().call();
    const currentDate = Math.floor(Date.now() / 1000);

	let totalOpportunities = 0;

    for (let company of companies) {
        const opportunities = await contract.methods.getOpportunities(company).call();

        for (let index = 0; index < opportunities.length; index++) {

            const opportunity = opportunities[index];

            // Check if the volunteer has already applied
            const isApplied = await checkIfApplied(opportunity);

            // Get the available slots for the opportunity
            const availableSlots = await contract.methods.getAvailableSpots(company, opportunity.uid).call();

            // Convert lastDateToRegister to seconds if it's in milliseconds
            const lastDateToRegister = Math.floor(opportunity.lastDateToRegister / 1000);

            // Check if the opportunity is still open for registration
            const isRegistrationOpen = lastDateToRegister > currentDate;

            // Fetch application status if the user has applied
            let applicationStatus = null;
            if (isApplied) {
                applicationStatus = await contract.methods.getApplicationStatus(userAddress, opportunity.uid).call();
            }

			let completionStatus = null;
            if (isApplied) {
				if (applicationStatus == 2) {
					completionStatus = 1;
					applicationStatus = 1;
				}
				else if (applicationStatus == 1) {
					completionStatus = 0;
				}
            }

            // Determine card background color based on application status
            let cardColor;
            if (applicationStatus == -1) {
                cardColor = '#f5af7d'; // Pending
            } else if (applicationStatus == 1) {
                cardColor = '#7ff57d'; // Accepted
            } else if (applicationStatus == 0) {
                cardColor = '#f57d89'; // Rejected (not similar to expired but red scale)
            } else {
                // Default color if no application status
                cardColor = 'white'; // No application
            }

            // Display the opportunity only if it has slots available or the volunteer has already applied
            if (availableSlots > 0 || isApplied) {
				totalOpportunities++;
                const card = createOpportunityCard(opportunity, isApplied, completionStatus, isRegistrationOpen);
				if (!completionStatus && isRegistrationOpen) {
					card.style.backgroundColor = cardColor; // Set the background color of the card
				}
                opportunitiesContainer.appendChild(card);
            }
        }
    }

	if (totalOpportunities === 0) {
		const noOpportunities = document.createElement("p");
		noOpportunities.textContent = "No opportunities available at the moment.";
		opportunitiesContainer.appendChild(noOpportunities);
	}
}

async function checkIfApplied(opportunity) {
    return opportunity.volunteerAddresses.includes(userAddress);
}

function createOpportunityCard(opportunity, isApplied, isCompleted, isRegistrationOpen) {
    // If registration is closed and the user hasn't applied, don't display the card
    if (!isRegistrationOpen && !isApplied) {
        const card = document.createElement("div");
		card.style.display = "none";
		return card;
    }

    const card = document.createElement("div");
    card.className = `card ${isApplied ? "applied-card" : ""}`;
    const nameText = isCompleted ? `${opportunity.name} (Completed)` : opportunity.name;

    card.innerHTML = `
        <h2>${nameText}</h2>
        <h3>Company: ${opportunity.companyName}</h3>
        <p>Id: ${opportunity.uid}</p>
        <p><strong>Location:</strong> ${opportunity.location}</p>
        <p><strong>Start Date:</strong> ${new Date(parseInt(opportunity.startDate)).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(parseInt(opportunity.endDate)).toLocaleDateString()}</p>
        <p><strong>Last Date to Apply:</strong> ${new Date(parseInt(opportunity.lastDateToRegister)).toLocaleDateString()}</p>
        <p><strong>Hours Required:</strong> ${opportunity.hoursRequired}</p>
        <p><strong>Points Awarded:</strong> ${opportunity.pointsAwarded}</p>
        <p><strong>Available Slots:</strong> ${opportunity.maxVolunteers - opportunity.volunteerAddresses.length}</p>
        <button class="${isApplied ? "remove-btn" : "apply-btn"}">
            ${isApplied ? "Remove Application" : "Apply"}
        </button>
        <button class="description-btn">Display Description</button>
    `;

    // Apply styles and disable interactions based on opportunity status
    if (isCompleted || !isRegistrationOpen) {
        card.style.backgroundColor = "#d3d3d3"; // Gray background for past/completed opportunities
        card.querySelectorAll("button").forEach(button => button.style.display = "none"); // Hide buttons
        if (isCompleted) {
            card.style.pointerEvents = "none"; // Make the entire card non-clickable if completed
        }
    } else {
        // Set up button actions for active opportunities
        card.querySelector("button.apply-btn, button.remove-btn").onclick = () => {
            isApplied ? removeApplication(opportunity) : applyForOpportunity(opportunity);
        };
        card.querySelector(".description-btn").onclick = () => {
            openDescriptionModal(opportunity);
        };
    }

    return card;
}

function openDescriptionModal(opportunity) {
    // Create modal elements
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>${opportunity.name}</h2>
            <p>${opportunity.description}</p>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modal);

    // Close button functionality
    modal.querySelector(".close-btn").onclick = () => {
        document.body.removeChild(modal);
    };

    // Close modal when clicking outside of the modal content
    window.onclick = (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

async function applyForOpportunity(opportunity) {
    showLoading();
    try {
        await contract.methods.applyForOpportunity(opportunity.company, opportunity.uid).send({ from: userAddress });
        loadOpportunities();
    } catch (error) {
        console.error("Failed to apply for opportunity:", error);
    } finally {
        hideLoading();
    }
}

async function removeApplication(opportunity) {
    showLoading();
    try {
        await contract.methods.removeApplication(opportunity.company, opportunity.uid).send({ from: userAddress });
        loadOpportunities();
    } catch (error) {
        console.error("Failed to remove application:", error);
    } finally {
        hideLoading();
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function logout() {
    window.location.href = "../index.html";
}

// Close dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.header img')) {
        const dropdown = document.getElementById("dropdownMenu");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
}

// Function to simulate .getTotalPoints (replace with actual contract call)
async function getTotalPoints() {
    try {
        const totalPoints = await contract.methods.getTotalPoints(userAddress).call();
		document.getElementById("pointsDisplay").textContent = "Points: " + totalPoints;
    } catch (error) {
        console.error("Failed to fetch points:", error);
        throw error;
    }
}

// Initialize Web3 on page load
window.addEventListener("load", initWeb3);


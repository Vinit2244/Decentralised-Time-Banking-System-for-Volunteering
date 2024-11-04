let web3;
let contract;
let userAddress;

const contractAddress = "0xe1a50ebF1c76d5a83880e1f2346b8100211f4bA7";
const contractABI = [
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
        await window.ethereum.enable();
    } else {
        alert("Please install MetaMask to use this feature.");
        return;
    }
    userAddress = (await web3.eth.getAccounts())[0];
    contract = new web3.eth.Contract(contractABI, contractAddress);
    loadOpportunities();
}

// async function loadOpportunities() {
//     const opportunitiesContainer = document.getElementById("opportunities-container");
//     opportunitiesContainer.innerHTML = ""; // Clear any existing content

//     const companies = await contract.methods.getAllCompanies().call();
//     for (let company of companies) {
//         const opportunities = await contract.methods.getOpportunities(company).call();

//         opportunities.forEach(async (opportunity, index) => {
//             const isApplied = await checkIfApplied(opportunity);
//             const card = createOpportunityCard(opportunity, company, index, isApplied);
//             opportunitiesContainer.appendChild(card);
//         });
//     }
// }

async function loadOpportunities() {
    const opportunitiesContainer = document.getElementById("opportunities-container");
    opportunitiesContainer.innerHTML = ""; // Clear any existing content

    const companies = await contract.methods.getAllCompanies().call();
    const currentDate = Math.floor(Date.now() / 1000);
    
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

            // Display the opportunity only if it has slots available or the volunteer has already applied
            if (isRegistrationOpen && (availableSlots > 0 || isApplied)) {
                const card = createOpportunityCard(opportunity, isApplied);
                opportunitiesContainer.appendChild(card);
            }
        }
    }
}

async function checkIfApplied(opportunity) {
    return opportunity.volunteerAddresses.includes(userAddress);
}

function createOpportunityCard(opportunity, isApplied) {
    const card = document.createElement("div");
    card.className = `card ${isApplied ? "applied-card" : ""}`;

    card.innerHTML = `
        <h2>${opportunity.name}</h2>
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

    card.querySelector("button").onclick = () => {
        isApplied ? removeApplication(opportunity) : applyForOpportunity(opportunity);
    };

    card.querySelector(".description-btn").onclick = () => {
        openDescriptionModal(opportunity); // Pass both name and description
    };

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

// Initialize Web3 on page load
window.addEventListener("load", initWeb3);

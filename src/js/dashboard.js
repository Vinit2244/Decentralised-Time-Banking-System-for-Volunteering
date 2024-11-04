let web3;
let contract;

const contractAddress = "0x0272b8F9c5d0919934f91a6385297BA6238aF629";
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
				"name": "_oppIndex",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
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
				"name": "_oppIndex",
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
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "removeApplication",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(contractABI, contractAddress);
        loadOpportunities(); // Load opportunities on page load
    } else {
        alert("Please install MetaMask to use this app.");
    }
});

// Show the opportunity form
function showOpportunityForm() {
    document.getElementById("opportunityForm").style.display = "flex";
}

// Close the opportunity form
function closeOpportunityForm() {
    document.getElementById("opportunityForm").style.display = "none";
}

// Show loading spinner
function showLoading() {
    document.getElementById("loading").style.display = "flex";
}

// Hide loading spinner
function hideLoading() {
    document.getElementById("loading").style.display = "none";
}

// Create a new opportunity
async function createOpportunity() {
    const name = document.getElementById("opportunityName").value;
	const location = document.getElementById("location").value;
    const startDate = new Date(document.getElementById("startDate").value).getTime();
    const endDate = new Date(document.getElementById("endDate").value).getTime();
	const lastDateToRegister = new Date(document.getElementById("lastDateToRegister").value).getTime();

	// Validate that the last date to register is before the start date
	if (lastDateToRegister >= startDate) {
		alert("Error: Last Date to Register must be earlier than the Start Date.");
		return;
	}

    const hoursRequired = document.getElementById("hoursRequired").value;
    const pointsAwarded = document.getElementById("pointsAwarded").value;
	const maxVolunteers = document.getElementById("maxVolunteers").value;

	// Validate that the fields are not empty
	if (!hoursRequired || !pointsAwarded || !maxVolunteers) {
		alert("Error: Please fill in all fields: Total Hours Required, Points Awarded, and Max Volunteers.");
	}

	const description = document.getElementById("description").value;

    const accounts = await web3.eth.getAccounts();
	showLoading(); // Show loading spinner
    try {
        await contract.methods.addOpportunity(name, location, startDate, endDate, lastDateToRegister, hoursRequired, pointsAwarded, maxVolunteers, description)
            .send({ from: accounts[0] });
        loadOpportunities();
        closeOpportunityForm();
    } catch (error) {
        console.error(error);
        alert("Error creating opportunity.");
    } finally {
		hideLoading(); // Hide loading spinner after creation
    }
}

// Load opportunities and display them as cards
async function loadOpportunities() {
    const accounts = await web3.eth.getAccounts();
    try {
        const opportunities = await contract.methods.getOpportunities(accounts[0]).call();
        const container = document.getElementById("opportunitiesContainer");
        container.innerHTML = ""; // Clear previous content

        const currentDate = Date.now(); // Current date in milliseconds

        opportunities.forEach((opportunity, index) => {
            const card = document.createElement("div");
            card.className = "opportunity-card";

            // Check if the opportunity has expired
            const isExpired = parseInt(opportunity.endDate) < currentDate;

            // Apply grayscale styling and tooltip for expired opportunities
            if (isExpired) {
                card.classList.add("expired-opportunity");
                card.setAttribute("title", "Previously created opportunities");
            }

            card.innerHTML = `
                <h3>${opportunity.name}</h3>
                <p>Location: ${opportunity.location}</p>
                <p>Start Date: ${new Date(parseInt(opportunity.startDate)).toLocaleDateString()}</p>
                <p>End Date: ${new Date(parseInt(opportunity.endDate)).toLocaleDateString()}</p>
                <p>Last Date to Register: ${new Date(parseInt(opportunity.lastDateToRegister)).toLocaleDateString()}</p>
                <p>Hours Required: ${opportunity.hoursRequired}</p>
                <p>Points Awarded: ${opportunity.pointsAwarded}</p>
                <p>Max Volunteers: ${opportunity.maxVolunteers}</p>
                <p>Volunteers applied: ${opportunity.volunteerAddresses.length}</p>
                <br>
                <button style="background-color: #9999ff; width: 60%; position: absolute; left: 20px;" class="description-btn">Display Description</button>
                <button onclick="deleteOpportunity(${index})" style="width: 20%;" ${isExpired ? "disabled" : ""}>&#128465;</button>
            `;

            // Add functionality to the Display Description button
            card.querySelector(".description-btn").onclick = () => {
                openDescriptionModal(opportunity.name, opportunity.description); // Pass both name and description
            };

            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert("Error loading opportunities.");
    }
}

function openDescriptionModal(opportunityName, description) {
    // Create modal elements
    const modal = document.createElement("div");
    modal.className = "description-modal";
    modal.innerHTML = `
        <div class="description-modal-content">
            <span class="close-btn">&times;</span>
            <h2>${opportunityName}</h2> <!-- Display opportunity name -->
            <p>${description}</p>
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

// Delete an opportunity
async function deleteOpportunity(index) {
    const accounts = await web3.eth.getAccounts();

	// Replacing the creating opportunity text with removing opportunity
	const loader = document.getElementById("loading");
	loader.innerHTML = ""; // Clear previous content
	loader.innerHTML = `
					<div class="spinner"></div>
        			<p>Removing opportunity, please wait...</p>`;

    showLoading(); // Show loading spinner
    try {
        await contract.methods.deleteOpportunity(index).send({ from: accounts[0] });
        loadOpportunities();
    } catch (error) {
        console.error(error);
        alert("Error deleting opportunity.");
    } finally {
        hideLoading(); // Hide loading spinner after deletion attempt
    }
}
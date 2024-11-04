let web3;
let contract;

const contractAddress = "0x988DDe2417a05D3b23551882619F881Fcf3332cf";
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
						"internalType": "int8[]",
						"name": "completed",
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

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
		try {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		} catch (error) {
			console.error('Error connecting to MetaMask:', error);
		}
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
			<table style="width: 100%; border-collapse: collapse;">
			  <tr>
				<th colspan="2" style="text-align: center; padding: 10px; background-color: #f5f5f5;">
				  <h3 style="margin: 0;">${opportunity.name}</h3>
				</th>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Id:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${opportunity.uid}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Location:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${opportunity.location}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Start Date:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(parseInt(opportunity.startDate)).toLocaleDateString()}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>End Date:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(parseInt(opportunity.endDate)).toLocaleDateString()}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Last Date to Register:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(parseInt(opportunity.lastDateToRegister)).toLocaleDateString()}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Hours Required:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${opportunity.hoursRequired}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Points Awarded:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${opportunity.pointsAwarded}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Max Volunteers:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${opportunity.maxVolunteers}</td>
			  </tr>
			  <tr>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Volunteers Applied:</strong></td>
				<td style="padding: 8px; border-bottom: 1px solid #ddd;">${opportunity.volunteerAddresses.length}</td>
			  </tr>
			  <tr>
				<td colspan="2" style="margin-top: 10px; padding: 8px; text-align: center;">
				  <div style="display: flex; justify-content: space-between; gap: 10px; align-items: center;">
					<button 
					  style="
					    position: absolute;
						left: 20px;
						bottom: 10px;
						background-color: #9999ff; 
						width: 33%; 
						padding: 8px;
						border: none;
						border-radius: 4px;
						cursor: pointer;
					  " 
					  class="description-btn"
					>
					  Display Description
					</button>
					<button 
					  style="
					  position: absolute;
						left: 107px;
						bottom: 10px;
						background-color: #9999ff; 
						width: 33%; 
						padding: 8px;
						border: none;
						border-radius: 4px;
						cursor: pointer;
					  " 
					  onclick="showVolunteers(${opportunity.uid})"
					>
					  View Volunteers
					</button>
					<button 
					  onclick="deleteOpportunity(${opportunity.uid})" 
					  style="
					    position: absolute;
						right: 10px;
						bottom: 10px;
						width: 15%;
						height: 45px;
						padding: 8px;
						border: none;
						border-radius: 4px;
						cursor: pointer;
						background-color: ${isExpired ? '#cccccc' : '#ff4444'};
					  " 
					  ${isExpired ? "disabled" : ""}
					>
					  &#128465;
					</button>
				  </div>
				</td>
			  </tr>
			</table>
		  `;

            // Add functionality to the Display Description button
            card.querySelector(".description-btn").onclick = () => {
                openDescriptionModal(opportunity); // Pass both name and description
            };

            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert("Error loading opportunities.");
    }
}

async function showVolunteers(uid) {
	const accounts = await web3.eth.getAccounts();
	try {
		const opportunities = await contract.methods.getOpportunities(accounts[0]).call();
		let opportunity = null;

        // Use a for loop to find the opportunity with the specified uid
        for (let i = 0; i < opportunities.length; i++) {
            if (opportunities[i].uid == uid) {
                opportunity = opportunities[i];
                break; // Exit the loop once the opportunity is found
            }
        }

		const modal = document.getElementById("volunteerModal");
		const tableBody = document.getElementById("volunteerTableBody");
		const submitButton = document.getElementById("SubmitVolunteerSelectionsButton"); // Corrected the ID here
		tableBody.innerHTML = ""; // Clear previous rows

		// Check if volunteerAddresses is defined and is an array
		if (Array.isArray(opportunity.volunteerAddresses)) {
			if (opportunity.volunteerAddresses.length === 0) {
				const row = document.createElement("tr");
				row.innerHTML = `
					<td colspan="3">No Volunteers yet!</td>
				`;
				tableBody.appendChild(row);
				submitButton.style.display = "none"; // Hide the submit button
				modal.style.display = "block"; // Show the modal
				return;
			}

			opportunity.volunteerAddresses.forEach((address, index) => {
				submitButton.style.display = "block"; // Hide the submit button
				const row = document.createElement("tr");
				row.innerHTML = `
					<td>${address}</td>
					<td><button class="biodata-btn">Show Biodata</button></td>
					<td>
						<div style="display: flex; justify-content: space-evenly;">
							<button class="accept-button" id='${uid}' onclick="accept(${uid})">Accept</button>  
							<button class="reject-button" id='${uid}' onclick="reject(${uid})">Reject</button>
						</div>
					</td>
				`;
				// Add functionality to the Show Biodata button
				row.querySelector(".biodata-btn").onclick = () => {
					openBiodataModal(address); // Pass both name and description
				};
				tableBody.appendChild(row);
			});

			submitButton.disabled = false; // Enable the submit button if there are volunteers
		} else {
			console.error("volunteerAddresses is not an array:", opportunity.volunteerAddresses);
			alert("No volunteers found for this opportunity.");
			submitButton.disabled = true; // Disable the submit button in case of error
		}
		modal.style.display = "block"; // Show the modal
	} catch (error) {
		console.error(error);
		alert("Error loading volunteers.");
	}
}

function closeVolunteerModal() {
    const modal = document.getElementById("volunteerModal");
    modal.style.display = "none"; // Hide the modal
}

function submitVolunteerSelections() {
    const selectedVolunteers = [];
    const tableBody = document.getElementById("volunteerTableBody");
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {
        const checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            selectedVolunteers.push(checkbox.value);
        }
    });

    // Send selected volunteers to the backend (solidity contract)
    console.log("Selected Volunteers:", selectedVolunteers);

    // Here you can call a function to submit the selections to your contract
    // Example: contract.methods.acceptRejectVolunteers(selectedVolunteers).send({ from: accounts[0] });

    closeVolunteerModal(); // Close the modal after submission
}

function openDescriptionModal(opportunity) {
    // Create modal elements
    const modal = document.createElement("div");
    modal.className = "description-modal";
    modal.innerHTML = `
        <div class="description-modal-content">
            <span class="close-btn">&times;</span>
            <h2>${opportunity.name}</h2> <!-- Display opportunity name -->
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

async function openBiodataModal(address) {
    try {
        // Fetch biodata and total points from the backend
		const biodata = await contract.methods.getBiodata(address).call();
		const totalPoints = await contract.methods.getTotalPoints(address).call();
		const username = await contract.methods.getUsernameByAddressVolunteer(address).call();

        // Create modal elements
        const modal = document.createElement("div");
        modal.className = "biodata-modal";
        modal.innerHTML = `
            <div class="biodata-modal-content">
                <span class="close-btn">&times;</span>
                <h2>${username}</h2>
                <p><strong>Bio:</strong> ${biodata}</p>
                <p><strong>Total Points:</strong> ${totalPoints}</p>
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
    } catch (error) {
        console.error('Error fetching biodata:', error);
        alert('Failed to fetch biodata. Please try again later.');
    }
}

// Delete an opportunity
async function deleteOpportunity(uid) {
    const accounts = await web3.eth.getAccounts();

	// Replacing the creating opportunity text with removing opportunity
	const loader = document.getElementById("loading");
	loader.innerHTML = ""; // Clear previous content
	loader.innerHTML = `
					<div class="spinner"></div>
        			<p>Removing opportunity, please wait...</p>`;

    showLoading(); // Show loading spinner
    try {
        await contract.methods.deleteOpportunity(uid).send({ from: accounts[0] });
        loadOpportunities();
    } catch (error) {
        console.error(error);
        alert("Error deleting opportunity.");
    } finally {
        hideLoading(); // Hide loading spinner after deletion attempt
    }
}
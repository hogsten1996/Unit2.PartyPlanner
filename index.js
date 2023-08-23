async function retrieveList() {
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-CPU-RM-WEB-PT/guests");
    return await response.json();
}
console.log(retrieveList());

async function nameList(){
    const retrievedData = await retrieveList(); 
    retrievedData.data.forEach(item => {
        addPartyToDiv(item.name +'  '+ item.email);
    });
}

function addPartyToDiv(partyname){
    const partyRoster = document.createElement('div');
    const aParty = document.createElement('a');
    const removeButton = document.createElement('button');

    aParty.textContent = partyname;

    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        partyRoster.remove();
    });

    partyRoster.appendChild(aParty);
    partyRoster.appendChild(removeButton);

    document.body.appendChild(partyRoster);
}

nameList();

async function addOneParty() {
    const retrievedData = await retrieveList();
    if (retrievedData.data && retrievedData.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * retrievedData.data.length);
        const randomGuest = retrievedData.data[randomIndex];

        const nameAndEmail = randomGuest.name + ' ' + randomGuest.email;
        addPartyToDiv(nameAndEmail);
    }
}

addOneParty();

function attachButton() {
    const nameButton = document.createElement('button');
    nameButton.textContent = 'Fetch Single Party';
    
    nameButton.addEventListener('click', addOneParty);

    document.body.appendChild(nameButton);
}

attachButton();

// this makes form function
document.addEventListener("DOMContentLoaded", function() {
    const partyForm = document.getElementById('partyForm');
    const partiesDiv = document.getElementById('parties');
    const nameInput = document.getElementById('name');

    partyForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const partyName = nameInput.value;

        if (partyName) {
            const partyElement = document.createElement('div');
            partyElement.textContent = partyName;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Remove";
            deleteButton.addEventListener('click', function() {
                partiesDiv.removeChild(partyElement);
            });

            partyElement.appendChild(deleteButton);
            partiesDiv.appendChild(partyElement);

            nameInput.value = '';
        }
    });
});






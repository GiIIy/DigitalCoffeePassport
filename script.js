document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Track the current coffee index
    let coffees = []; // Array to store coffee data

    // Function to fetch coffee data from JSON file
    async function fetchCoffee() {
        try {
            const response = await fetch('coffees.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            coffees = data.coffees;
            displayCoffee(coffees[currentIndex]); // Display the first coffee
        } catch (error) {
            console.error('Error fetching coffee data:', error);
        }
    }

    // Function to display coffee data
    function displayCoffee(coffee) {
    if (!coffee) {
        console.error('No coffee data available');
        return;
    }

    // Select elements
    const coffeeNameH1 = document.querySelector('.coffeeName');
    const coffeeDescriptionP = document.querySelectorAll('.coffeeDescription p');
    const flavourNotesP1 = document.querySelector('.coffeeInfoLeftSide .blockInfo:nth-of-type(1) .coffeeInfoContent p:nth-of-type(1)');
    const flavourNotesP2 = document.querySelector('.coffeeInfoLeftSide .blockInfo:nth-of-type(1) .coffeeInfoContent p:nth-of-type(2)');
    const growingRegionP = document.querySelector('.coffeeInfoLeftSide .blockInfo:nth-of-type(2) .coffeeInfoContent p');
    const bodyP = document.querySelector('.coffeeInfoLeftSide .blockInfo:nth-of-type(3) .coffeeInfoContent p');
    const acidityP = document.querySelector('.coffeeInfoLeftSide .blockInfo:nth-of-type(4) .coffeeInfoContent p');
    const processingP = document.querySelector('.coffeeInfoLeftSide .blockInfo:nth-of-type(5) .coffeeInfoContent p');
    const roastGraphP = document.querySelector('.coffeeInfoRightSide .blockInfo:nth-of-type(1) .roastGraph p');
    const foodPairingsDiv = document.querySelector('.coffeeInfoRightSide .blockInfo:nth-of-type(3) .coffeeInfoContent');
    const endInfoDiv = document.querySelector('.endCoffeeInfomation');

    // Debugging logs
    console.log('Displaying coffee:', coffee);

    // Update the coffee name
    if (coffeeNameH1) {
        const nameParts = coffee.name.split(' ');
        const firstName = nameParts[0] || '';
        const secondName = nameParts.slice(1).join(' ') || '';
        coffeeNameH1.innerHTML = `<h1>${firstName.toUpperCase()}</h1><h1>${secondName.toUpperCase()}</h1>`;
    }

    // Update the coffee descriptions
    if (coffeeDescriptionP.length > 0) {
        coffeeDescriptionP[0].textContent = coffee.description1 || '';
        coffeeDescriptionP[1].textContent = coffee.description2 || '';

        if (coffee.description3) {
            coffeeDescriptionP[2].textContent = coffee.description3;
            coffeeDescriptionP[2].style.display = 'block'; // Ensure visibility
        } else {
            coffeeDescriptionP[2].style.display = 'none'; // Hide if not needed
        }
    }

    // Update the coffee information
    if (flavourNotesP1 && flavourNotesP2) {
        // Ensure flavour notes are split properly and without overlap
        const [flavourNotePart1, flavourNotePart2] = coffee.flavourNotes.split('&').map(part => part.trim());
        flavourNotesP1.innerHTML = flavourNotePart1 ? flavourNotePart1.toUpperCase() : '';
        flavourNotesP2.innerHTML = flavourNotePart2 ? `& ${flavourNotePart2.toUpperCase()}` : '';
    }
    if (growingRegionP) growingRegionP.textContent = coffee.growingRegion.toUpperCase() || '';
    if (bodyP) bodyP.textContent = coffee.body.toUpperCase() || '';
    if (acidityP) acidityP.textContent = coffee.acidity.toUpperCase() || '';
    if (processingP) processingP.textContent = coffee.processing.toUpperCase() || '';
    if (roastGraphP) roastGraphP.textContent = coffee.roast.toUpperCase() || '';

    // Update the food pairings with a comma on the first line
    if (foodPairingsDiv) {
        const pairings = coffee.foodPairings.split(',').map(pair => pair.trim()).filter(pair => pair);
        foodPairingsDiv.innerHTML = pairings.map((pairing, index) => {
            if (index === 0) {
                return `<p>${pairing.toUpperCase()},</p>`;
            }
            return `<p>${pairing.toUpperCase()}</p>`;
        }).join('');
    }

    // Update the end information with line breaks
    if (endInfoDiv) {
        const endInfoParts = [
            coffee.endInformation1,
            coffee.endInformation2,
            coffee.endInformation3,
            coffee.endInformation4,
            coffee.endInformation5,
            coffee.endInformation6
        ].filter(Boolean);
        endInfoDiv.innerHTML = endInfoParts.join('<br>');
    }
}

    


    // Fetch and display coffee data
    fetchCoffee();

    // Swipe Detection Variables
    let startX;
    let isSwiping = false;

    // Handle Swipe Action
    function handleSwipe(event) {
        const x = event.touches ? event.touches[0].clientX : event.clientX;
        const distance = startX - x;

        if (Math.abs(distance) > 50) { // Threshold for swipe
            if (distance < 0) { // Swipe right to left
                document.body.classList.add('show-left');
                document.body.classList.remove('show-right');
            } else if (distance > 0) { // Swipe left to right
                document.body.classList.add('show-right');
                document.body.classList.remove('show-left');
            }
            isSwiping = false; // End swipe action after a valid swipe
        }
    }

    // Touch Events
    document.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        isSwiping = true;
    });

    document.addEventListener('touchmove', (event) => {
        if (isSwiping) {
            handleSwipe(event);
        }
    });

    document.addEventListener('touchend', () => {
        isSwiping = false;
    });

    // Mouse Events
    document.addEventListener('mousedown', (event) => {
        startX = event.clientX;
        isSwiping = true;
        document.addEventListener('mousemove', handleSwipe);
    });

    document.addEventListener('mouseup', () => {
        if (isSwiping) {
            document.removeEventListener('mousemove', handleSwipe);
        }
        isSwiping = false;
    });

    // Hollow Circle Checkmark Toggle within brewingMethod
    const brewingMethods = document.querySelectorAll('.brewingMethod');

    brewingMethods.forEach(method => {
        const circle = method.querySelector('.hollowCircle');
        const textElement = method.querySelector('.brewingText');

        circle.addEventListener('click', function() {
            // Toggle the checked class on the circle
            this.classList.toggle('checked');

            // Toggle the checked class on the associated text
            if (textElement) {
                textElement.classList.toggle('checked');
            }
        });
    });

    // Local Storage Functions
    const notesTextarea = document.getElementById('notes');
    const coffeeId = 'veranda-blend'; // Use a unique identifier for each coffee

    // Load notes from local storage
    function loadNotes() {
        const notes = localStorage.getItem(coffeeId);
        notesTextarea.value = notes ? notes : '';
    }

    // Save notes to local storage
    function saveNotes() {
        const notes = notesTextarea.value;
        localStorage.setItem(coffeeId, notes);
    }

    // Event listener for changes in the notes textarea
    notesTextarea.addEventListener('input', saveNotes);

    // Initial load
    loadNotes();

    // Handle Arrow Key Navigation
    function handleArrowKeys(event) {
        if (event.key === 'ArrowLeft') { // Left arrow key
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : coffees.length - 1; // Go to previous coffee or wrap around
            displayCoffee(coffees[currentIndex]);
        } else if (event.key === 'ArrowRight') { // Right arrow key
            currentIndex = (currentIndex < coffees.length - 1) ? currentIndex + 1 : 0; // Go to next coffee or wrap around
            displayCoffee(coffees[currentIndex]);
        }
    }

    document.addEventListener('keydown', handleArrowKeys);
});

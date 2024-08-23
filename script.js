document.addEventListener('DOMContentLoaded', () => {
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
});

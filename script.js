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

    // Hollow Circle Checkmark Toggle
    const hollowCircles = document.querySelectorAll('.hollowCircle');

    hollowCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Toggle the checked class
            this.classList.toggle('checked');
            
            // Optionally, update the data-state attribute
            this.dataset.state = this.classList.contains('checked') ? 'checked' : 'empty';
        });
    });
});





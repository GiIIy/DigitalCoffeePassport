document.addEventListener('DOMContentLoaded', () => {
    let startX;
    let isSwiping = false;

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
});

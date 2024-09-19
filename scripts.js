document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const toggleButton = document.getElementById('toggleButton');
    const uploadedImage = document.getElementById('uploadedImage');
    const spinner = document.getElementById('spinner');
    const speedControl = document.getElementById('speedControl');
    const borderColorControl = document.getElementById('borderColorControl');

    let isSpinning = false;

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedImage.src = event.target.result;
                uploadedImage.style.display = 'block';
                spinner.style.display = 'block';
                toggleButton.disabled = false;
                updateSpinAnimation();
            };
            reader.readAsDataURL(file);
        }
    });

    toggleButton.addEventListener('click', function() {
        isSpinning = !isSpinning;
        this.textContent = isSpinning ? 'Stop Spinning' : 'Start Spinning';
        updateSpinAnimation();
    });

    speedControl.addEventListener('input', updateSpinAnimation);
    borderColorControl.addEventListener('input', updateBorderColor);

    function updateSpinAnimation() {
        const duration = 11 - speedControl.value; // Invert scale so higher value = faster
        spinner.style.animation = isSpinning ? `spin ${duration}s linear infinite` : 'none';
    }

    function updateBorderColor() {
        uploadedImage.style.borderColor = borderColorControl.value;
    }
});

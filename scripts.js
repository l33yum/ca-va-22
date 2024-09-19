document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload');
    const spinningImage = document.getElementById('spinning-image');

    uploadInput.addEventListener('change', event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                spinningImage.src = e.target.result;
                spinningImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
});

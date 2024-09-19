document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload');
    const generateButton = document.getElementById('generate-gif');
    const gifContainer = document.getElementById('gif-container');
    const loading = document.getElementById('loading');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let image = new Image();

    uploadInput.addEventListener('change', event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                image.src = e.target.result;
                image.onload = () => {
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                };
            };
            reader.readAsDataURL(file);
        }
    });

    generateButton.addEventListener('click', () => {
        if (!image.src) {
            alert('Please upload an image first.');
            return;
        }

        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: canvas.width,
            height: canvas.height
        });

        const totalFrames = 60;
        const angleStep = (2 * Math.PI) / totalFrames;

        loading.style.display = 'block';

        for (let i = 0; i < totalFrames; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angleStep * i);
            ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
            ctx.restore();
            gif.addFrame(ctx, { delay: 100 });
        }

        gif.on('finished', blob => {
            const gifURL = URL.createObjectURL(blob);
            gifContainer.innerHTML = `<img src="${gifURL}" alt="Spinning GIF">`;
            loading.style.display = 'none';
        });

        gif.render();
    });
});

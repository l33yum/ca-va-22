document.addEventListener('DOMContentLoaded', function() {
    const uploadInput = document.getElementById('upload');
    const generateButton = document.getElementById('generate-gif');
    const gifContainer = document.getElementById('gif-container');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let image = new Image();
    let frames = [];
    const totalFrames = 360; // Number of frames for 6 revolutions

    // Handle image upload
    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                image.src = e.target.result;
                image.onload = function() {
                    canvas.width = image.naturalWidth;
                    canvas.height = image.naturalHeight;
                    generateFrames();
                };
                image.onerror = function() {
                    console.error('Failed to load image.');
                };
            };
            reader.onerror = function() {
                console.error('Failed to read file.');
            };
            reader.readAsDataURL(file);
        }
    });

    // Generate frames for spinning effect
    function generateFrames() {
        frames = [];
        const angleStep = (2 * Math.PI) / totalFrames;
        for (let i = 0; i < totalFrames; i++) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angleStep * i);
            ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
            ctx.restore();
            frames.push(canvas.toDataURL('image/png'));
        }
    }

    // Generate GIF from frames and display it
    generateButton.addEventListener('click', function() {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: canvas.width,
            height: canvas.height
        });

        frames.forEach(frame => {
            const img = new Image();
            img.src = frame;
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                gif.addFrame(ctx, { delay: 100 }); // Add frame to GIF (100 ms per frame)
            };
        });

        gif.on('finished', function(blob) {
            const gifURL = URL.createObjectURL(blob);
            gifContainer.innerHTML = `<img src="${gifURL}" alt="Spinning GIF" style="max-width: 100%; height: auto;">`; // Display GIF
        });

        gif.render();
    });
});

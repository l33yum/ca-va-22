document.addEventListener('DOMContentLoaded', function() {
    const uploadInput = document.getElementById('upload');
    const generateButton = document.getElementById('generate-video');
    const downloadLink = document.getElementById('download-link');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let image = new Image();
    let frames = [];
    const totalFrames = 60; // Number of frames to simulate 6 revolutions in 10 seconds (6x60=360 frames for a 10s video)

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
            ctx.rotate(angleStep * i); // Rotate the image
            ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2);
            ctx.restore();
            frames.push(canvas.toDataURL('image/png')); // Save frame as data URL
        }
    }

    // Generate video from frames and provide download link
    generateButton.addEventListener('click', function() {
        const video = new Whammy.Video();
        frames.forEach(frame => {
            const img = new Image();
            img.src = frame;
            img.onload = function() {
                video.add(frame, 100); // Add frame to video (100 ms per frame)
            };
        });

        // Ensure video compilation is done before creating the download link
        video.compile(false, function(output) {
            const videoURL = URL.createObjectURL(output);
            downloadLink.href = videoURL;
            downloadLink.style.display = 'block'; // Show download link
        });
    });
});

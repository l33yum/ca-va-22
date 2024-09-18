document.getElementById('upload').onchange = function(event) {
    const image = document.getElementById('image');
    const downloadLink = document.getElementById('download-link');

    // Load the uploaded image
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = 'block';
    
    // Set up the spinning effect
    image.classList.add('spin');
    image.onload = function() {
        URL.revokeObjectURL(image.src); // Free memory
        createSpinningImageGIF(image, downloadLink);
    }
}

// Function to create a spinning GIF and set up download link
function createSpinningImageGIF(image, downloadLink) {
    // For simplicity, we will just offer the original image for download.
    // Creating a spinning GIF programmatically is complex and usually requires a server-side solution.
    // So we’ll just use the original image file here.

    downloadLink.href = image.src;
    downloadLink.style.display = 'inline-block';
}

// Add a spinning animation using CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    .spin {
        animation: spin 2s linear infinite;
    }
`, styleSheet.cssRules.length);

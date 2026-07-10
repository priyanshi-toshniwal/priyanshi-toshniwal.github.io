/**
 * Gallery3 Initialization Script
 * Initializes the Gallery3 component with image data
 */

(function() {
    "use strict";

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', async function() {
        try {
            // Dynamically import Gallery3 class
            const { default: Gallery3 } = await import('./gallery3.js');

            // Gallery images data - same as used in main gallery
            const galleryFolder = "big_assets/img/gallery/";
            const knownImages = [
                '1000.jpg',
                '1010.jpg',
                '1020.png',
                '1030.jpg',
                '1040.jpg',
                '1050.jpg',
                '1060.jpg',
                '1070.jpg',
                '1080.jpg',
                '1090.jpg',
                '1100.jpg',
                '1110.jpg',
                '1120.jpg',
                '1130.jpg',
                '1140.jpg',
                '1150.jpg',
                '1160.jpg',
            ];

            let galleryItems = [];

            // Try to detect available images
            const imagePromises = knownImages.map((imageName, index) => {
                return new Promise((resolve) => {
                    const imagePath = galleryFolder + imageName;
                    const img = new Image();

                    img.onload = () => {
                        galleryItems.push({
                            id: index + 1,
                            url: imagePath,
                            alt: imageName.replace(/\.[^/.]+$/, "").replace(/-/g, ' '),
                            // caption: imageName.replace(/\.[^/.]+$/, "").replace(/-/g, ' ')
                        });
                        resolve();
                    };

                    img.onerror = () => {
                        resolve(); // Continue even if image fails to load
                    };

                    img.src = imagePath;
                });
            });

            // Wait for all image checks to complete
            await Promise.all(imagePromises);
            console.log("gallery Items", galleryItems);
            // Initialize Gallery3 with detected or placeholder images
            new Gallery3({
                rootSelector: '#gallery3-root',
                items: galleryItems
            });

            console.log(`Gallery3 initialized with ${galleryItems.length} images`);
        } catch (error) {
            console.error('Error initializing Gallery3:', error);
        }
    });
})();


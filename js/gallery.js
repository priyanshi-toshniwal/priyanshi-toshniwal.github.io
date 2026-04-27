/**
 * Photo Gallery Carousel
 * Horizontally scrollable gallery with auto-loop, clickable dots navigation
 * Auto-detects images from assets/img/gallery/ folder
 */

(function() {
  "use strict";

  // Gallery images - auto-detected from gallery folder
  // Images are discovered sequentially; add new images to the gallery folder with numbered names
  const galleryFolder = "assets/img/gallery/";
  let galleryImages = [];

  let currentSlide = 0;
  let autoPlayInterval;
  let isUserInteracting = false;

  /**
   * Auto-detect images in gallery folder
   * Tries to load numbered images sequentially
   */
  async function detectGalleryImages() {
    const imageExtensions = ['webp', 'jpg', 'jpeg', 'png'];
    const detectedImages = [];

    // List of known gallery images (can be expanded as new images are added)
    const knownImages = [
      'portfolio-2.webp',
      'portfolio-3.webp',
      'portfolio-5.webp',
      'portfolio-6.webp',
      'portfolio-7.webp',
      'portfolio-8.webp',
      'portfolio-9.webp',
      'portfolio-10.webp',
      'portfolio-11.webp',
      'portfolio-12.webp',
      'portfolio-portrait-3.webp'
    ];

    // Try to load each known image
    for (const imageName of knownImages) {
      const imagePath = galleryFolder + imageName;
      // Check if image exists by attempting to load it
      const img = new Image();
      img.onload = () => {
        detectedImages.push({
          src: imagePath,
          alt: imageName.replace(/\.[^/.]+$/, "").replace(/-/g, ' ')
        });
      };
      img.src = imagePath;
    }

    // Wait for images to load
    return new Promise((resolve) => {
      setTimeout(() => {
        galleryImages = detectedImages;
        resolve(detectedImages);
      }, 500);
    });
  }

  function initGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryDots = document.getElementById('galleryDots');
    const portfolioSection = document.querySelector('section.portfolio');

    if (!galleryTrack || !galleryDots) {
      return;
    }

    // Detect gallery images first
    detectGalleryImages().then((images) => {
      if (images.length === 0) {
        console.warn('No gallery images found in ' + galleryFolder);
        // Hide the entire gallery section if no images found
        if (portfolioSection) {
          portfolioSection.style.display = 'none';
        }
        return;
      }

      // Show gallery section (in case it was hidden)
      if (portfolioSection) {
        portfolioSection.style.display = 'block';
      }

      // Create gallery slides
      images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
        galleryTrack.appendChild(slide);
      });

      // Create navigation dots
      images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
          isUserInteracting = true;
          goToSlide(index);
          resetAutoPlay();
        });
        galleryDots.appendChild(dot);
      });

      // Start auto-play
      startAutoPlay();

      // Add keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          isUserInteracting = true;
          nextSlide();
          resetAutoPlay();
        } else if (e.key === 'ArrowLeft') {
          isUserInteracting = true;
          prevSlide();
          resetAutoPlay();
        }
      });
    });
  }

  function goToSlide(index) {
    const galleryTrack = document.getElementById('galleryTrack');
    const dots = document.querySelectorAll('.gallery-dot');

    if (galleryImages.length === 0) return;

    // Update current slide
    currentSlide = index % galleryImages.length;

    // Update track position
    galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1 + galleryImages.length);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();

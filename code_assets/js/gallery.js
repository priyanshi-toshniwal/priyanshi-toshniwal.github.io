/**
 * Photo Gallery Carousel
 * Horizontally scrollable gallery with auto-loop, clickable dots navigation
 * Auto-detects images from big_assets/img/gallery/ folder
 */

(function() {
  "use strict";

  // Gallery images - auto-detected from gallery folder
  // Images are discovered sequentially; add new images to the gallery folder with numbered names
  const galleryFolder = "big_assets/img/gallery/";
  let galleryImages = [];

  let currentSlide = 0;
  let autoPlayInterval;
  let isUserInteracting = false;

  /**
   * Auto-detect images in gallery folder
   * Tries to load numbered images sequentially
   */
  async function detectGalleryImages() {
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

    const imagePromises = knownImages.map((imageName) => {
      return new Promise((resolve) => {
        const imagePath = galleryFolder + imageName;

        const img = new Image();

        img.onload = () => {
          resolve({
            src: imagePath,
            alt: imageName
                .replace(/\.[^/.]+$/, "")
                .replace(/-/g, ' ')
          });
        };

        img.onerror = () => {
          resolve(null);
        };

        img.src = imagePath;
      });
    });

    const results = await Promise.all(imagePromises);

    galleryImages = results.filter(Boolean);

    return galleryImages;
  }

  function initGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryDots = document.getElementById('galleryDots');
    const portfolioSection = document.querySelector('section.portfolio');

    if (!galleryTrack || !galleryDots) {
      return;
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(autoPlayInterval);
      } else {
        resetAutoPlay();
      }
    });
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
    currentSlide =
        (index + galleryImages.length) % galleryImages.length;

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

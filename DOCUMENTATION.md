# Documentation

## Project Overview
GitHub Pages portfolio website built with Bootstrap 5.3.8 and modern web libraries.

## Structure
```
├── index.html              # Main page
├── src/resume.html         # Resume section (loaded via fetch)
├── assets/
│   ├── css/main.css        # Custom styles
│   ├── js/main.js          # Core functionality
│   ├── img/                # Images & favicons
│   └── vendor/             # External libraries
├── README.md               # Project overview
└── DOCUMENTATION.md        # This file
```

## Key Technologies
- **Framework:** Bootstrap 5.3.8
- **Animations:** AOS (Animate On Scroll)
- **Gallery:** Glightbox + Isotope
- **Carousel:** Swiper
- **Icons:** Bootstrap Icons
- **Counters:** PureCounter
- **Scroll Triggers:** Waypoints

## Sections
1. **Header** - Navigation & social links
2. **Hero** - Introduction with tagline
3. **About** - Professional background
4. **Skills** - Key skillsets & experience
5. **Resume** - Education & experience (loaded from src/resume.html)
6. **Contact** - Email & WhatsApp

## Setup & Deployment

### Local Testing
Open `index.html` in a browser or serve locally:
```bash
python -m http.server 8000
```

### GitHub Pages
Push to GitHub repo `priyanshi-toshniwal.github.io`:
```bash
git push origin main
```
Site will be live at: `https://priyanshi-toshniwal.github.io/`

## Images
Replace with placeholders (keep same filenames):
- `assets/img/priya/` - Profile/hero images
- `assets/img/portfolio/` - Portfolio showcase items
- `assets/img/person/` - Team/testimonial photos
- `assets/img/favicons/` - Browser icons

## Customization
- Colors: `assets/css/main.css` (CSS variables)
- Content: Edit `index.html` and `src/resume.html`
- Social links: Update URLs in header & footer

## Notes
- Contact form is disabled (requires server-side setup)
- All vendor files included for full functionality
- Responsive mobile-first design

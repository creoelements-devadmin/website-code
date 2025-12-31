# Creo Elements Website - Developer Documentation

> **A modern, animated React-based digital marketing agency website with scroll-triggered animations, smooth scrolling, and WordPress integration.**

![Creo Elements Logo](public/images/logo.png)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Installation & Setup](#installation--setup)
4. [Project Structure](#project-structure)
5. [Animation System](#animation-system)
   - [GSAP ScrollTrigger Animations](#gsap-scrolltrigger-animations)
   - [Smooth Scrolling with Lenis](#smooth-scrolling-with-lenis)
   - [Custom Cursor Animation](#custom-cursor-animation)
   - [Wavy Text Effect](#wavy-text-effect)
   - [Banner Eye Animation](#banner-eye-animation)
   - [Swiper Carousels](#swiper-carousels)
6. [Page Sections & Components](#page-sections--components)
7. [WordPress Integration](#wordpress-integration)
8. [SEO Implementation](#seo-implementation)
9. [Responsive Design](#responsive-design)
10. [Build & Deployment](#build--deployment)
11. [Contributing](#contributing)

---

## Project Overview

Creo Elements is a 360° Digital Marketing agency website built with React and Vite. The website features:

- **Immersive scroll-driven animations** using GSAP & ScrollTrigger
- **Smooth scrolling** experience with Lenis
- **Custom animated cursor** that responds to interactive elements
- **Dynamic service pages** with detailed content
- **Team member profiles** with individual pages
- **Client logo carousels**
- **Testimonials slider**
- **WordPress backend integration** for blogs and form submissions

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **Vite** | 5.4.8 | Build Tool & Dev Server |
| **GSAP** | 3.12.5 | Animation Library |
| **Lenis** | 1.0.42 | Smooth Scroll |
| **Framer Motion** | 12.18.1 | Additional Animations |
| **Swiper** | 11.1.14 | Carousel/Slider |
| **React Router DOM** | 6.26.1 | Client-side Routing |
| **React Helmet Async** | 2.0.5 | SEO Meta Tags |
| **FontAwesome** | 6.6.0 | Icons |
| **jQuery** | 3.7.1 | Cursor Animation |

---

## Installation & Setup

### Prerequisites

- Node.js >= 18.x
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd creo-elements-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration

The project uses a proxy configuration for API calls:

```json
{
  "proxy": "https://backend.creo-elements.com"
}
```

---

## Project Structure

```
creo-elements-website/
├── public/
│   ├── fonts/                    # Custom fonts (Sukar, etc.)
│   ├── images/                   # Static images
│   ├── robots.txt               # SEO robots file
│   └── sitemap_index.xml        # XML Sitemap
├── src/
│   ├── App.jsx                  # Main app with routing
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # React entry point
│   ├── components/
│   │   ├── Cursor.jsx           # Custom animated cursor
│   │   ├── Cursor.css
│   │   ├── Header.jsx           # Desktop navigation
│   │   ├── HeaderMobile.jsx     # Mobile navigation
│   │   ├── Footer.jsx           # Footer component
│   │   ├── Grids.jsx            # Decorative grid overlays
│   │   └── elements/
│   │       ├── CreoLogo.jsx     # Fixed logo component
│   │       ├── WavyText.jsx     # Animated wavy text
│   │       └── WavyText.css
│   ├── data/
│   │   └── membersData.js       # Team members data
│   └── pages/
│       ├── Home/                # Homepage sections
│       ├── About/               # About page
│       ├── Services/            # Service pages
│       ├── Blogs/               # Blog listing
│       ├── Team/                # Team member pages
│       ├── Clients/             # Clients showcase
│       ├── Contact Us/          # Contact form
│       ├── Work With Us/        # Careers/application form
│       └── NotFound/            # 404 page
└── react/build/                 # Production build output
```

---

## Animation System

### GSAP ScrollTrigger Animations

The website heavily uses GSAP with ScrollTrigger for scroll-driven animations. Below are the key implementations:

#### 1. **360° Marketing Section** (`src/pages/Home/Threesixty.jsx`)

A dramatic scroll-triggered animation where a container scales and text scrolls horizontally.

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Container expansion animation
gsap.to(threesixtyRef.current, {
  opacity: 1,
  height: '130vh',
  width: '150vw',
  borderRadius: '0px',
  duration: 2,
  transform: 'rotate(0deg)',
  scrollTrigger: {
    trigger: '.threesixty',
    scroller: 'body',
    start: 'top 50%',
    end: 'top 0%',
    scrub: 1,          // Smooth scrubbing tied to scroll
    pin: true,         // Pin element during animation
    pinSpacing: false, // No additional spacing
  }
});

// Horizontal text scroll
gsap.fromTo('.threesixty-text',
  { transform: 'translateX(0vw)' },
  {
    transform: 'translateX(calc(25rem * -7.5))',
    scrollTrigger: {
      trigger: '.threesixty',
      start: 'top -20%',
      end: 'top -200%',
      scrub: 1,
      pin: true,
    }
  }
);
```

**Key Features:**
- Text scales from 0rem to 25rem font-size
- Container morphs from rounded to full-screen
- Horizontal text scrolling creates a marquee effect
- Multiple pinned sections with cascading animations

---

#### 2. **About Section Frame Zoom** (`src/pages/Home/About.jsx`)

A photo frame zooms in to reveal the about section content.

```javascript
gsap.to(aboutframeRef.current, {
  scale: 10,                    // Scale frame 10x
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: '.about_section',
    scroller: 'body',
    start: 'top 0%',
    end: 'top -100%',
    scrub: 1,
    pin: true,
  }
});

// Content reveal
gsap.to('.about_us_content', {
  scale: 1,
  duration: 2,
  scrollTrigger: {
    trigger: '.about_section',
    start: '-5% 0%',
    end: 'bottom 0%',
    scrub: 1,
  }
});
```

**Effect:** Creates a "zoom through frame" transition effect.

---

#### 3. **Service Cards 3D Stack** (`src/pages/Home/Services.jsx`)

Service cards flip in with perspective and stack as sticky elements.

```javascript
cardsRef.current.forEach((card, index) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 150%",
      end: "top 75%",
      scrub: true,
      onUpdate: (self) => {
        if (self.progress > 0.5) {
          setActiveIndex(index);
        }
      }
    },
    opacity: 1,
    y: 0,
    rotationX: isMobile ? 0 : 0,
    transformOrigin: "top center",
    transformPerspective: isMobile ? 1200 : 800,
    ease: "none"
  });

  // Initial state - cards rotated 90deg
  gsap.set(card, {
    opacity: 1,
    y: 100,
    rotationX: isMobile ? 0 : 90,
    transformPerspective: isMobile ? 1200 : 800
  });
});
```

**Effect:** Cards appear to flip from top edge as you scroll, then stack with `position: sticky`.

---

#### 4. **Story Accordion Collapse** (`src/pages/About/Story.jsx`)

Accordion items collapse as you scroll past them.

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.accordions',
    pin: true,
    start: 'top 150',
    end: 'bottom 150',
    scrub: 1,
    ease: 'linear',
  }
});

// Collapse accordion content
tl.to('.accordion .text', {
  height: 0,
  paddingBottom: 0,
  opacity: 0,
  stagger: 0.5,      // Each accordion collapses in sequence
});

tl.to('.accordion', {
  marginBottom: -15,
  stagger: 0.5,
}, '<');             // '<' = run at same time as previous
```

**Effect:** As you scroll, each accordion section collapses one by one.

---

#### 5. **Team Member Fade-In** (`src/pages/About/Ourteam.jsx`)

Team members fade in as they enter the viewport.

```javascript
membersRef.current.forEach((member, index) => {
  gsap.fromTo(member,
    { opacity: 0, y: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: member,
        start: "top 75%",
        end: "top 50%",
        scrub: true,
      },
    }
  );
});
```

---

### Smooth Scrolling with Lenis

**Location:** `src/App.jsx`

Lenis provides butter-smooth scrolling throughout the website:

```javascript
import Lenis from '@studio-freight/lenis';

useEffect(() => {
  const lenis = new Lenis({
    smooth: true,
    smoothTouch: false,    // Native scroll on mobile
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return () => lenis.destroy();
}, []);
```

**Configuration Options:**
- `smooth: true` - Enable smooth scrolling
- `smoothTouch: false` - Disable on touch devices for better performance

---

### Custom Cursor Animation

**Location:** `src/components/Cursor.jsx`

A trailing cursor effect using 20 animated circles:

```javascript
const Cursor = () => {
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const circles = document.querySelectorAll(".circle");

    // Track mouse position
    const updateMousePosition = (e) => {
      coords.current = { x: e.clientX, y: e.clientY };
      
      // Check if hovering on clickable element
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      const isClickable = isElementClickable(hoveredElement);
      
      // Scale up on clickable elements
      circles.forEach((circle) => {
        circle.style.transform = `scale(${isClickable ? 2 : 1})`;
      });
    };

    // Animate circles with trailing effect
    function animateCircles() {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";
        circle.style.scale = (circles.length - index) / circles.length;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x) * 0.2;   // Lag effect
        y += (nextCircle.y) * 0.2;
      });

      requestAnimationFrame(animateCircles);
    }
    animateCircles();
  }, []);
  
  return (
    <div className="cursor">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="circle"></div>
      ))}
    </div>
  );
};
```

**Clickable Detection:**
```javascript
function isElementClickable(element) {
  return element && (
    element.tagName === "button" ||
    element.getAttribute("onclick") ||
    element.classList.contains('clickable')
  );
}
```

> **Note:** Add class `clickable` to any element you want the cursor to react to.

---

### Wavy Text Effect

**Location:** `src/components/elements/WavyText.jsx`

A hover-triggered text animation effect:

```javascript
const WavyText = ({ children, text, fontSize }) => {
  return (
    <div className="text-animation">
      <div className="text-wrapper">
        {lines.map((line, index) => (
          <div key={index} className="wave-container"
            style={{ height: `calc(${fontSize} + 10px)` }}>
            <h1 style={{ fontSize }}>{line}</h1>
            <span style={{ fontSize }} className="wave-text">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

**Usage:**
```jsx
<WavyText fontSize="8rem">About Us</WavyText>
```

---

### Banner Eye Animation

**Location:** `src/pages/Home/Banner.jsx`

The "O" in "CREO" acts as an eye that follows the mouse:

```javascript
const runMouseMovement = () => {
  const circle = circleRef.current;   // Eye container
  const pupil = pupilRef.current;     // Pupil element

  function handleMouseMove(e) {
    const rect = circle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate angle from center to mouse
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const maxRadius = circle.offsetWidth / 2 - pupil.offsetWidth / 2;
    
    // Position pupil within eye bounds
    const x = centerX + Math.cos(angle) * maxRadius;
    const y = centerY + Math.sin(angle) * maxRadius;

    pupil.style.left = `${x - rect.left - pupil.offsetWidth / 2}px`;
    pupil.style.top = `${y - rect.top - pupil.offsetHeight / 2}px`;
  }

  document.addEventListener('mousemove', handleMouseMove);
};
```

**Initial Animation Sequence:**
1. Eye circle scales up with elastic easing
2. Blink animation (height toggles)
3. Eye bounces into position
4. Text characters animate in with stagger
5. Wave animation reveals

---

### Swiper Carousels

**Testimonials** (`src/pages/Home/Testimonials.jsx`):
```javascript
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';

<Swiper
  modules={[Navigation, EffectFade]}
  effect="fade"
  fadeEffect={{ crossFade: true }}
  navigation={{
    nextEl: '.testimonial-arrow-next',
    prevEl: '.testimonial-arrow-prev',
  }}
  loop
  autoplay={{ delay: 5000 }}
/>
```

**Client Logos** (`src/pages/Home/Clients.jsx`):
```javascript
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

// Auto-scrolling logo carousel with intersection observer
// to pause when not visible
```

---

## Page Sections & Components

### Homepage Sections

| Section | Component | Description |
|---------|-----------|-------------|
| Banner | `Banner.jsx` / `BannerMobile.jsx` | Animated logo with eye, waves SVG |
| 360° Marketing | `Threesixty.jsx` | Scroll-triggered text expansion |
| About | `About.jsx` | Frame zoom reveal effect |
| Services | `Services.jsx` | 3D card stack with sticky positioning |
| Testimonials | `Testimonials.jsx` | Fade slider with navigation |
| Clients | `Clients.jsx` | Auto-scrolling logo carousels |
| Partners | `Partners.jsx` | Partner showcase cards |

### Dynamic Pages

- **Services:** `/services/:serviceSlug` - 11 service detail pages
- **Team Members:** `/team/:memberSlug` - Individual team profiles
- **Blog:** `/blog` - Blog listing with categories

---

## WordPress Integration

### Location: `/blogs` (WordPress Installation)

A WordPress installation is set up at `https://creo-elements.com/blogs/` which handles:

1. **Blog Content Management**
   - All blog posts are managed via WordPress
   - Uses Elementor page builder for templates
   - Blog categories: Going Online 101, Digital Marketing 101, Branding 101, etc.

2. **Form Submissions**
   - Contact form data is submitted to WordPress REST API
   - Job applications with CV uploads

### API Endpoints

**Contact Form Submission:**
```javascript
const response = await fetch(
  'https://creo-elements.com/blogs/wp-json/custom/v1/forminator-submit',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  }
);
```

**Job Application Submission:**
```javascript
const formDataObject = new FormData();
formDataObject.append('name', formData.name);
formDataObject.append('cv', formData.cv);  // File upload

const response = await fetch(
  'https://creo-elements.com/blogs/wp-json/custom/v1/application-submit',
  {
    method: 'POST',
    body: formDataObject,
  }
);
```

### Blog Links

Blog posts link directly to WordPress:
```jsx
<a href="https://creo-elements.com/blogs/digital-marketing-101">
  Digital Marketing 101
</a>
```

### Media Assets

WordPress also hosts client logos and partner images:
```javascript
{
  name: 'Hostinger',
  image: 'https://creo-elements.com/blogs/wp-content/uploads/2025/05/hostinger.png',
}
```

---

## SEO Implementation

### React Helmet Async

Each page implements comprehensive SEO using `react-helmet-async`:

```jsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  {/* Basic Meta */}
  <title>Page Title | Creo Elements LLP</title>
  <meta name="description" content="..." />
  
  {/* Open Graph */}
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  <meta property="og:url" content="..." />
  
  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="..." />
  
  {/* Canonical */}
  <link rel="canonical" href="..." />
  
  {/* Structured Data (JSON-LD) */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Creo Elements LLP",
      "url": "https://creo-elements.com",
      "logo": "https://creo-elements.com/images/logo.png"
    })}
  </script>
</Helmet>
```

### Sitemap & Robots

- **Sitemap:** `public/sitemap_index.xml`
- **Robots.txt:** `public/robots.txt`

---

## Responsive Design

The website uses a mobile breakpoint at **825px**:

```javascript
const [isMobile, setIsMobile] = useState(window.innerWidth < 825);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 825);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Mobile-specific components:**
- `BannerMobile.jsx` - Simplified banner for mobile
- `HeaderMobile.jsx` - Mobile navigation menu
- `StoryMobile.jsx` - Mobile-optimized story section

**Animation Adjustments:**
- 3D rotations disabled on mobile
- Larger transform perspectives for better mobile rendering
- Custom cursor hidden on mobile
- Smooth touch scrolling disabled

---

## Build & Deployment

### Build Configuration

**Vite Config** (`vite.config.js`):

```javascript
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    base: isBuild ? '/react/build/' : '/',
    build: {
      outDir: 'react/build',
      emptyOutDir: true,
    },
    plugins: [react()],
  };
});
```

### Production Deployment Script

```bash
npm run production
```

This runs:
```json
"production": "npm run build && cd .\\react\\ && git add . && git commit -m \"$npm_config_message\" && git push -u origin main && git status"
```

### Output Structure

Production files are output to `react/build/`:
```
react/build/
├── index.html
├── assets/
│   ├── index-*.css
│   └── index-*.js
├── fonts/
├── images/
└── ...
```

---

## Key Utilities & Helpers

### Adding Clickable Elements

To make the custom cursor react to an element:
```jsx
<button className="clickable">Click Me</button>
<a href="..." className="clickable">Link</a>
```

### Z-Index Layering

Use `z-2` class for content above grid overlays:
```jsx
<div className="my-component z-2">
  Content above grids
</div>
```

### Adding New Team Members

Edit `src/data/membersData.js`:
```javascript
{
  "name": "New Member",
  "designation": "Role",
  "description": "Bio...",
  "meta_description": "SEO description",
  "image": "/images/member.webp",
  "slug": "new-member"
}
```

### Adding New Services

Edit `src/pages/Services/Service.jsx`:
```javascript
{
  name: "Service Name",
  mobilename: "Short Name",
  slug: "service-slug",
  meta_description: "SEO description",
  description: "<p>HTML content...</p>",
  icon: "/images/service-icon.webp",
}
```

---

## Font Loading

Custom font (Sukar) is loaded dynamically:

```javascript
const loadFont = async () => {
  try {
    const font = new FontFace("Sukar", "url(/fonts/sukar.woff)");
    await font.load();
    document.fonts.add(font);
  } catch (error) {
    console.error("Font loading failed:", error);
  }
};
```

---

## Troubleshooting

### ScrollTrigger Conflicts

Always cleanup ScrollTrigger instances:
```javascript
useEffect(() => {
  // Setup animations...
  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

### Smooth Scroll + ScrollTrigger

Lenis and ScrollTrigger work together automatically. Ensure Lenis is initialized before ScrollTrigger animations.

### Mobile Performance

- Disable 3D transforms on mobile
- Use `smoothTouch: false` in Lenis config
- Lazy load images with `loading="lazy"`

---

## Contributing

1. Create a feature branch
2. Make changes following existing patterns
3. Test on both desktop and mobile
4. Run `npm run build` to verify production build
5. Submit PR with description of changes

---

## License

© 2025 Creo Elements LLP. All rights reserved.

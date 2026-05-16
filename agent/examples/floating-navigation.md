# Floating Navigation System

## Navigation Philosophy

Hessel navigation should feel:
- cinematic
- minimal
- immersive
- elegant
- editorial

Navigation must NEVER feel:
- enterprise-heavy
- SaaS-like
- dashboard-oriented
- overcrowded
- visually dominant

The navigation exists to support immersion, not interrupt it.

---

# Core Architecture

The navigation system uses:

- floating navigation trigger
- animated side drawer
- cinematic transitions
- smooth overlay interactions
- minimal visual footprint

Preferred interaction model:

Floating Trigger
↓
Cinematic Drawer Reveal
↓
Smooth Section Navigation

---

# Floating Trigger

## Behavior

The trigger remains:
- fixed on screen
- always accessible
- visually subtle
- non-intrusive

## Placement

Preferred:
- top-left fixed position

Avoid:
- centered floating controls
- giant CTA-style buttons
- oversized navigation triggers

---

# Floating Trigger Styling

Use:
- soft blur
- subtle transparency
- warm luxury palette
- restrained shadows
- rounded geometry

Avoid:
- bright outlines
- neon hover states
- harsh borders
- glowing effects
- futuristic styling

---

# Drawer Philosophy

The drawer should feel like:
- a cinematic reveal
- a hidden luxury layer
- an immersive transition

NOT:
- a mobile app sidebar
- an admin dashboard
- a utility navigation panel

---

# Drawer Motion

Preferred motion:
- spring-based animation
- smooth deceleration
- cinematic timing
- soft easing

Motion should feel:
- heavy
- premium
- restrained

Avoid:
- bounce-heavy transitions
- aggressive motion
- fast snapping
- playful animation curves

---

# Drawer Styling

Use:
- deep maroon surfaces
- warm typography
- backdrop blur
- subtle overlay darkness
- elegant spacing

Preferred palette:
- #4A1625
- #5B1E2D
- #7A2E3F
- #D4A373

Avoid:
- blue accents
- startup gradients
- pure black panels
- technical grid aesthetics

---

# Navigation Labels

Navigation labels should feel:
- editorial
- luxurious
- intentional

Preferred labels:
- Experiences
- Packages
- Curated Dining
- Gallery
- Contact

Avoid:
- generic SaaS labels
- technical wording
- crowded navigation structures

---

# Interaction Rules

Desktop:
- hover refinement
- smooth transitions
- subtle feedback

Mobile:
- thumb accessible
- gesture-friendly
- smooth touch interaction

Drawer should:
- close smoothly
- preserve immersion
- never feel abrupt

---

# Motion Patterns

Preferred:
- opacity layering
- stagger reveals
- subtle slide transitions
- layered depth

Avoid:
- excessive scaling
- dramatic rotations
- hyperactive transforms

---

# Overlay Behavior

Overlay should:
- softly darken background
- preserve cinematic atmosphere
- maintain focus on drawer

Avoid:
- harsh opacity
- full blackout overlays
- aggressive blur

---

# Typography

Navigation typography should use:
- serif emphasis where appropriate
- warm readability
- editorial spacing

Preferred fonts:
- Playfair Display
- Cormorant Garamond
- Inter

Avoid:
- condensed startup typography
- overly technical fonts
- tiny navigation text

---

# UX Goals

The navigation system should:
- reduce clutter
- maintain discoverability
- preserve luxury atmosphere
- support guided exploration

The navigation should feel:
- effortless
- refined
- emotionally cohesive

---

# Approved Structural References

Reference implementation:
- /examples/code/good-navigation.jsx

Approved concepts:
- floating trigger
- animated side drawer
- staggered reveals
- spring transitions
- drag interactions

Do NOT inherit:
- blue palette
- grid backgrounds
- developer-demo aesthetics
- theme toggles
- SaaS visual patterns

---

# Technical Notes

Preferred stack:
- Framer Motion
- Tailwind CSS
- Next.js App Router

Keep:
- motion isolated
- navigation modular
- interactions responsive

Avoid:
- deeply nested navigation systems
- overengineered state management
- unnecessary animation complexity
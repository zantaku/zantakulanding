# Zantaku.com

## 🎨 Visual Design System

The Zantaku.com website features a unique **Vaporwave/Neo-Tokyo** aesthetic with a carefully selected color palette and visual elements that evoke the feeling of late-night anime sessions and digital otaku spaces.

### 🖼️ Design Language

- **Style**: Vaporwave meets Neo-Tokyo, slightly retro but clean
- **Mood**: Mysterious, immersive, and techy — a digital space for otaku culture
- **Vibe**: Late-night scrolls, anime binge sessions, soft neon in a dark room

### 🎨 Color Palette

| Color Name    | Hex     | Usage                        |
|---------------|---------|------------------------------|
| Deep Black    | #0A0A0A | Background base              |
| Crimson Red   | #7C1C1C | Accent / CTA hover           |
| Burnt Maroon  | #531111 | CTA button / shadows         |
| Mossy Green   | #425A40 | Secondary BG shapes or icons |
| Slate Teal    | #3E6257 | Detail strokes / dividers    |
| Soft Sky Blue | #2C7A8C | Highlights or glow effects   |

The site also retains the original Zantaku brand colors for specific elements:
- Zantaku Red: #F44336
- Zantaku Pink: #E91E63
- Zantaku Cream: #F5F5F5

### 🧪 Visual Features

- **Background**: Blurred, gradient shapes with overlapping soft lighting
- **Contrast**: Light text/elements on dark — bright CTAs pop
- **Imagery**: Glassmorphism-ready mobile mockups with UI blur effects
- **Motion**: Slow floating animations, fade in/out transitions, smooth scroll
- **Texture**: Soft lighting halos, layered blur and opacity, subtle scanline effects

### 🧰 Technical Implementation

- Framer Motion for smooth animations and transitions
- Tailwind CSS for responsive design
- CSS variables for consistent color usage
- Custom effects including:
  - Parallax scrolling
  - Retro grid patterns
  - Animated particles
  - Glowing elements

## 🚀 Development

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/zantaku.com.git
cd zantaku.com
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Project Structure

```
zantaku.com/
├── public/          # Static assets
├── src/
│   ├── asset/       # Images and SVGs
│   ├── components/  # React components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturePreview.tsx
│   │   ├── ParallaxBackground.tsx
│   │   └── ...
│   ├── App.tsx      # Main application component
│   ├── index.css    # Global styles
│   └── main.tsx     # Entry point
└── README.md        # Project documentation
```

## 🛠 Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)

## Local Development

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will start on [http://localhost:8080](http://localhost:8080) with hot reload enabled.

## Building for Production

1. Create a production build:
```bash
npm run build
```

This will generate a `dist` folder containing the optimized production build.

## Deploying to VPS

After building, deploy to the VPS using:
```bash
scp -r dist/* sean@5.78.77.168:~/zantaku-landing/
```

### Development Scripts

- `npm run dev` - Start development server on port 8080
- `npm run build` - Create production build in `dist` folder
- `npm run preview` - Preview production build locally on port 8080
- `npm run lint` - Run ESLint for code quality checks

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Supabase 

# Zantaku Website Deployment Guide

## Updating the Website on VPS

Follow these steps to update the website on your VPS:

1. **Build the project locally**
   ```powershell
   npm run build
   ```
   This will generate the latest production files in the `dist` directory.

2. **Transfer files to VPS**
   ```powershell
   # Connect to your VPS using SCP to transfer files
   scp -r dist/* username@your-vps-ip:/path/to/zantaku-landing
   ```
   Replace `username`, `your-vps-ip`, and `/path/to/zantaku-landing` with your actual credentials and path.

3. **Restart the server**
   ```powershell
   # SSH into your VPS
   ssh username@your-vps-ip

   # Navigate to your project directory (if needed)
   cd /path/to/zantaku-landing

   # Restart the PM2 process
   pm2 restart zantaku-landing
   ```
   Replace `zantaku-landing` with the actual PM2 process name if different.

## Additional Information

- The `dist` directory contains the production-ready files to be deployed.
- The `public` directory contains static assets that are processed into the dist folder during build.
- Make sure to back up any important configuration files on the VPS before overwriting. 
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 website for the Leo Lions Club of Colombo Uptown Eminence (LLCCUE), featuring a futuristic, glassmorphic design with immersive animations. The site showcases the club's leadership, projects, events, and membership opportunities with a sci-fi aesthetic.

## Development Commands

- `npm run dev` - Start development server with Turbopack (fast refresh)
- `npm run build` - Build production bundle with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture & Technology Stack

### Core Technologies
- **Next.js 15** with App Router and Turbopack for performance
- **React 19** with TypeScript for type safety
- **Tailwind CSS v4** for styling with custom glassmorphic design system
- **Framer Motion** for complex animations and micro-interactions
- **Lucide React** for iconography

### Design System
- Custom CSS variables for color palette (deep space, neon, electric themes)
- Glass-panel utility classes with backdrop blur and gradient effects
- Neon-button components with animated borders
- Responsive design with mobile-first approach

### Component Architecture
- `src/components/ui/` - Reusable UI components (GlassCard, SectionHeading)
- `src/app/` - Next.js App Router structure
- Single-page application with smooth scroll sections
- Custom hooks for parallax effects and scroll animations

## Key Features

### Page Structure
- Hero section with animated particles and parallax effects
- About section with timeline and mission/vision
- Leadership grid with officer profiles
- Project categories showcase
- Events calendar with featured events
- Media hub with news and gallery
- Join form with floating labels
- Contact information and footer

### Animation System
- Scroll-triggered animations using Framer Motion
- Parallax effects on scroll
- Floating elements and particle fields
- Hover states with smooth transitions
- Custom easing curves for consistent motion

### Styling Patterns
- Glassmorphic cards with backdrop blur
- Gradient backgrounds with radial patterns
- Neon glow effects on interactive elements
- Noise overlay for texture
- Custom spacing and typography scales

## Image Optimization
- Next.js Image component for optimization
- Unsplash API for placeholder images
- Custom image URL generation functions
- Configured remote patterns for Unsplash domain

## Development Notes

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured (`@/` for `src/`)
- Modern ES features supported

### Performance Considerations
- Turbopack enabled for faster builds
- Image optimization configured
- Component-level code splitting with dynamic imports where needed

### Code Style
- ESLint configuration with Next.js rules
- TypeScript for all components
- Consistent naming conventions
- Component props properly typed
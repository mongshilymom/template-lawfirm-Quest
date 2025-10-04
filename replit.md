# QUEST Legal - Professional Law Firm Website

## Overview

This is a professional law firm website template built as a full-stack TypeScript application. QUEST Legal is a demonstration template featuring modern, bilingual (Korean/English) interface with practice areas, news, insights, and attorney profiles. This is a demo template for educational and demonstration purposes only.

The application follows a client-server architecture with React on the frontend and Express on the backend, using Drizzle ORM for database operations. The design emphasizes professional aesthetics with clean layouts, high-quality imagery, and seamless language switching.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**October 4, 2025 - URL Query Synchronization & Browser History Support**
- Implemented URL query parameter synchronization for Attorneys and Events pages
- Added browser back/forward navigation support using wouter router integration
- Korean slug encoding/decoding for practice areas and filters
- Navigation flag pattern to prevent history stack overwriting
- All filter states (search, practiceArea, office, type) persist across page refreshes and history navigation

**Zero-Defect Production Template Complete**
- All legal disclaimers and privacy notices in place
- Prohibited terms scanner integrated in CI/CD
- Double opt-in consultation system operational
- SEO optimization with robots.txt, sitemap.xml, and JSON-LD schema
- Full accessibility compliance with focus traps and ARIA attributes
- GitHub Actions workflows for quality checks and dependency reviews

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Component System**
- Radix UI primitives for accessible, unstyled components
- Shadcn/ui component library with customized "new-york" style
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for variant-based component styling

**State Management**
- React Context API for global state (Language and Theme contexts)
- TanStack Query for server-side data fetching and caching
- Local component state with React hooks

**Design System**
- Custom color palette defined in CSS variables supporting light/dark modes
- Typography system using Inter, Noto Sans KR, and Playfair Display fonts
- Responsive design with mobile-first approach
- Elevation system using custom hover/active states

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- ESM module system for modern JavaScript

**API Structure**
- RESTful API endpoints under `/api` namespace
- Simple CRUD operations for:
  - Practice areas (`/api/practice-areas`)
  - News items (`/api/news`)
  - Newsletters (`/api/newsletters`)
  - Attorneys (`/api/attorneys`)
  - Offices (`/api/offices`)
  - Events (`/api/events`)

**Data Layer**
- Drizzle ORM as the database toolkit and query builder
- PostgreSQL as the primary database (via Neon serverless)
- Schema definitions using Drizzle's declarative API
- In-memory storage fallback implementation for development/testing

**Development Setup**
- Vite integration for HMR and SSR in development
- Custom middleware for request logging and error handling
- Static file serving for production builds

### Data Storage

**Database Schema**
- PostgreSQL tables for all entities with UUID primary keys
- Bilingual content support (Korean/English) for all text fields
- Core entities:
  - `practice_areas`: Law firm practice areas with descriptions and images
  - `news_items`: News articles with categories and dates
  - `newsletters`: Firm newsletters and publications
  - `attorneys`: Attorney profiles with practice areas and office locations
  - `offices`: Global office locations
  - `events`: Seminars, workshops, conferences, and webinars with dates and registration

**ORM Strategy**
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript type inference
- Zod integration for runtime validation via drizzle-zod
- Migration support through Drizzle Kit

### External Dependencies

**Third-Party UI Libraries**
- @radix-ui/* components (20+ component primitives for accessibility)
- Lucide React for iconography
- Embla Carousel for image sliders
- Recharts for potential data visualization
- React Hook Form with Zod resolvers for form handling
- date-fns for date manipulation

**Database & Infrastructure**
- @neondatabase/serverless for PostgreSQL connectivity
- Drizzle ORM (v0.39.1) for database operations
- PostgreSQL as the database engine

**Build & Development Tools**
- Vite for frontend bundling and dev server
- esbuild for backend bundling
- TSX for TypeScript execution in development
- Replit-specific plugins for development experience

**Styling & Utilities**
- Tailwind CSS with PostCSS for processing
- clsx and tailwind-merge for conditional class management
- class-variance-authority for component variants

**Key Configuration**
- Database connection via `DATABASE_URL` environment variable
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- Custom Tailwind configuration with extended color system and border radius values
- TypeScript strict mode enabled for maximum type safety
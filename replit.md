# ApexVerse - Creative Publishing Services

## Overview

ApexVerse is a professional creative services platform designed for indie authors. Founded by Mark (illustrator) and Birdie (publishing specialist), the platform offers comprehensive publishing assistance including book formatting, character art, book covers, promotional graphics, and full-service publishing management. The application showcases their services through a multi-page portfolio website with contact capabilities.

**Core Purpose**: Connect indie authors with creative publishing services through transparent pricing, portfolio showcasing, and streamlined client inquiry management.

**Target Audience**: Independent authors ranging from debut writers to experienced professionals seeking support with publishing logistics and creative artwork.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**:
- React 18+ with TypeScript for type-safe component development
- Vite as build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Framework**:
- shadcn/ui component library with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design system
- Custom CSS variables for theming (light/dark mode support)
- Design system based on Cinzel (serif headings) and Poppins (body text) fonts

**Styling Strategy**:
- Custom color palette: `#001C46`, `#3A0054`, `#00FFFF`, `#008080`
- Responsive design with mobile-first approach
- Elevation system using custom `hover-elevate` and `active-elevate-2` utilities
- Spacing primitives based on Tailwind's 4px scale

**Component Architecture**:
- Page-based routing with dedicated route components in `/client/src/pages/`
- Shared layout components (Navigation, Footer) in `/client/src/components/layout/`
- Reusable UI components from shadcn/ui in `/client/src/components/ui/`
- Form handling with React Hook Form and Zod validation

**Key Pages**:
1. HomePage - Hero section with service overview
2. AboutPage - Founder bios (Mark & Birdie)
3. ServicesPage - Three service tiers (À La Carte, Launch Kits, Full Service)
4. PricingPage - Transparent pricing breakdown
5. TimeframesPage - Service delivery timelines
6. PortfolioPage - Image gallery with category filtering
7. PaymentPlansPage - Flexible payment options
8. PoliciesPage - Unlimited revisions and client agreements
9. InterestFormPage - Google Forms integration for client intake
10. ContactPage - Direct contact form with validation

### Backend Architecture

**Server Framework**:
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- Custom Vite middleware integration for development HMR

**API Design**:
- RESTful endpoint: `POST /api/contact` for contact form submissions
- Request validation using Zod schemas from shared types
- Error handling with formatted validation errors using `zod-validation-error`
- JSON request/response format

**Data Storage Strategy**:
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage abstraction (`IStorage`) for easy database migration
- Prepared for PostgreSQL integration via Drizzle ORM
- Contact submissions stored with UUID generation and timestamps

**Rationale**: The in-memory storage allows rapid development and testing without database setup. The interface abstraction means switching to persistent storage requires only swapping the storage implementation without changing route handlers.

### Database Schema (Prepared)

**ORM**: Drizzle ORM configured for PostgreSQL

**Schema Definition** (in `shared/schema.ts`):
- `contact_submissions` table with fields:
  - `id`: UUID primary key with auto-generation
  - `name`: Required text field
  - `email`: Required text field with email validation
  - `subject`: Optional text field
  - `message`: Required text field with minimum length validation
  - `createdAt`: Timestamp with automatic default

**Validation**:
- Zod schemas generated from Drizzle table definitions using `createInsertSchema`
- Client-side and server-side validation share the same schema definitions
- Custom validation rules: email format, minimum name length (2 chars), minimum message length (10 chars)

**Migration Strategy**:
- Drizzle Kit configured with migrations output to `/migrations`
- Database connection via `DATABASE_URL` environment variable
- Push command available: `npm run db:push`

### Authentication & Authorization

**Current State**: No authentication implemented

**Design Consideration**: The contact form and portfolio are public-facing. Future admin panel for viewing submissions would require authentication layer.

### State Management

**Client State**:
- React Query for server state caching and synchronization
- Form state managed by React Hook Form
- UI state (navigation menu, lightbox) managed with React hooks

**Query Configuration**:
- Custom query function with credential inclusion
- Infinite stale time (manual cache invalidation preferred)
- No automatic refetching on window focus
- 401 handling configurable per query

### Asset Management

**Static Assets**:
- Portfolio images stored in `/attached_assets/` directory
- Logos (light/dark variants) for theme switching
- Direct imports using Vite's asset handling
- Images optimized at build time by Vite

**Asset Strategy**:
- Assets referenced via path aliases (`@assets`) configured in Vite
- Two logo variants for light/dark mode compatibility
- Portfolio showcases 14 character art and line art images

### Email Integration (Planned)

**Current Implementation**: Console logging for email notifications

**Production Requirements**:
- Email service integration (SendGrid, AWS SES, or Nodemailer)
- Notifications sent to `contact@apexverse.com` on form submissions
- Optional confirmation emails to form submitters
- Async email sending to avoid blocking API responses

**Design Decision**: Email sending is non-blocking - failures are logged but don't prevent successful form submission responses. This ensures users always receive confirmation even if notification delivery fails.

## External Dependencies

### Core Framework Dependencies

- **@vitejs/plugin-react**: React plugin for Vite build system
- **express**: Web server framework for backend API
- **react** & **react-dom**: UI framework
- **typescript**: Type system for entire codebase
- **wouter**: Lightweight routing library (alternative to React Router)

### Database & ORM

- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Schema management and migrations
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **@neondatabase/serverless**: PostgreSQL driver (Neon-compatible)

### UI Component Libraries

- **@radix-ui/react-\***: Headless UI primitives (30+ component packages)
  - Includes: accordion, dialog, dropdown-menu, popover, toast, tabs, etc.
  - Provides accessibility features out of the box
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variant management
- **clsx** & **tailwind-merge**: Conditional className utilities

### Form Management

- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Validation resolver adapters
- **zod**: Schema validation library
- **zod-validation-error**: Human-friendly validation error formatting

### Data Fetching

- **@tanstack/react-query**: Server state management and caching

### Development Tools

- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Additional UI Dependencies

- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel/slider component
- **cmdk**: Command palette component
- **date-fns**: Date formatting utilities
- **nanoid**: Unique ID generation

### Font Loading

- **Google Fonts**: CDN-hosted fonts
  - Cinzel: Serif font for headings (weights 400-900)
  - Poppins: Sans-serif font for body text (weights 100-900, including italics)

### Future Integration Considerations

- Email service provider (SendGrid, AWS SES, or SMTP via Nodemailer)
- PostgreSQL database hosting (currently using Neon serverless driver)
- Image CDN for portfolio optimization (optional)
- Analytics platform (Google Analytics, Plausible, etc.)
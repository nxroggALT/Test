# replit.md

## Overview

This is a full-stack web application for an esports team called "Rain Esports". The application serves as a professional team website showcasing team members, tournaments, news, and community features. It's built with a modern tech stack using React for the frontend and Express.js for the backend, with PostgreSQL as the database.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom Rain Esports theming (dark blue/cyan color scheme)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot module replacement with Vite integration

### Key Technologies
- **TypeScript**: Full type safety across frontend and backend
- **ESModules**: Modern JavaScript module system
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Zod**: Runtime type validation and schema definition

## Key Components

### Database Schema
The application uses a well-structured PostgreSQL schema with the following main tables:
- **users**: User authentication and management
- **team_members**: Team roster with roles, stats, and profiles
- **tournaments**: Match schedules and results tracking
- **news**: Content management for team announcements
- **discord_stats**: Real-time Discord community statistics

### API Endpoints
- `GET /api/team-members` - Retrieve team roster
- `GET /api/tournaments` - All tournaments
- `GET /api/tournaments/upcoming` - Upcoming matches
- `GET /api/tournaments/results` - Match results
- `GET /api/news` - Latest news articles
- `GET /api/discord-stats` - Community statistics

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling
- **Hero Section**: Landing area with Discord integration
- **Team Section**: Player profiles and statistics
- **Tournaments Section**: Match schedules and results
- **News Section**: Latest team announcements
- **Discord Section**: Community stats and integration
- **Contact Section**: Contact form and social media links

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express.js routes handle HTTP requests
3. **Storage Layer**: Drizzle ORM queries PostgreSQL database
4. **Response**: JSON data returned to client and cached by React Query
5. **UI Updates**: Components re-render with fresh data automatically

The application supports both in-memory storage (for development) and PostgreSQL storage (for production).

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle Kit**: Database migrations and schema management

### UI Components
- **Radix UI**: Accessible, unstyled UI primitives
- **Lucide React**: Icon library
- **React Icons**: Additional icons (Discord, social media)
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast build tool with HMR
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Tailwind
- **TypeScript**: Type checking and compilation

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static files
2. **Backend Build**: ESBuild bundles Express server
3. **Database Setup**: Drizzle migrations apply schema changes
4. **Asset Optimization**: Vite optimizes images and static assets

### Environment Configuration
- **Development**: `npm run dev` - Hot reload with Vite dev server
- **Production**: `npm run build && npm start` - Optimized build
- **Database**: `npm run db:push` - Deploy schema changes

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database (Neon Database recommended)
- Environment variables for database connection
- Static file serving capability

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 04, 2025. Made website mobile-friendly and fully functional:
  * Added mobile-responsive design across all sections
  * Implemented working team member, news, and tournament data
  * Added functional contact form with validation
  * Created admin API endpoints for content management
  * Enhanced professional styling and animations
  * Added live Discord community stats integration
  * Improved navigation with mobile hamburger menu
  * Added proper loading states and error handling
  * Removed team section, upcoming matches, and recent results per user request
  * Added password-secured admin panel with PostgreSQL database integration
  * Implemented admin authentication with session management
  * Created comprehensive admin dashboard for content management (news, tournaments, Discord stats)
  * **FIXED admin panel React hooks error and added global announcement system**
  * **Added announcement management with 4 types (info, warning, success, error)**
  * **Announcements appear as dismissible banners on all website pages**
  * **Added "Go Back to Site" button in admin panel header**
  * **Added automatic Discord member count detection via invite links**
  * **Changed admin password to "Rain2025" and removed default password display**
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
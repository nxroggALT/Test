# Rain Esports Website

A professional esports team website with comprehensive admin panel and Discord integration.

![Rain Esports](https://img.shields.io/badge/Rain-Esports-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express.js-4-green?style=for-the-badge&logo=express)

## Features

### 🎮 Public Website
- **Modern Design**: Sleek dark theme with purple/cyan branding
- **Mobile Responsive**: Fully optimized for all devices
- **Live Discord Stats**: Real-time member count integration
- **News & Updates**: Latest team announcements
- **Tournament Schedule**: Upcoming matches and results
- **Contact Form**: Direct communication with the team

### 🔧 Admin Panel
- **Secure Authentication**: Password-protected admin access
- **Content Management**: Create news articles and tournaments
- **Discord Integration**: Automatic member count detection via invite links
- **Global Announcements**: Site-wide notification system with 4 types (info, warning, success, error)
- **Real-time Updates**: Changes reflect immediately on the website

### 🚀 Technical Features
- **Fast Performance**: Vite build system with hot module replacement
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Session Management**: Secure admin authentication
- **API Architecture**: RESTful endpoints with validation

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for state management
- **Wouter** for routing
- **React Hook Form** with Zod validation

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Session-based authentication**
- **Discord API integration**

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Discord server (optional, for stats)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rain-esports-website.git
   cd rain-esports-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   DATABASE_URL="your-postgresql-connection-string"
   ADMIN_PASSWORD="Rain2025"
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5000` to see the website.

## Usage

### Admin Panel
1. Navigate to `/admin/login`
2. Enter password: `Rain2025`
3. Manage content through the dashboard

### Discord Integration
1. Go to Discord Stats tab in admin panel
2. Paste your Discord invite link
3. Member counts will automatically update

### Announcements
1. Create announcements in the admin panel
2. Choose from 4 types: info, warning, success, error
3. Announcements appear as banners on all pages
4. Users can dismiss announcements

## API Endpoints

### Public Endpoints
- `GET /api/discord-stats` - Discord community statistics
- `GET /api/news` - Latest news articles
- `GET /api/tournaments/upcoming` - Upcoming matches
- `GET /api/tournaments/results` - Match results
- `GET /api/announcements/active` - Active announcements

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/news` - Create news article
- `POST /api/admin/tournaments` - Create tournament
- `PUT /api/admin/discord-stats` - Update Discord stats
- `POST /api/admin/announcements` - Create announcement

## Database Schema

- **users** - Admin user management
- **news** - News articles and updates
- **tournaments** - Match schedules and results
- **discord_stats** - Community statistics
- **announcements** - Global announcements
- **admin_sessions** - Authentication sessions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

### Replit Deployment
1. Connect to Replit Deployments
2. Set environment variables
3. Deploy directly from the dashboard

### Other Platforms
The application works on any Node.js hosting platform:
- Vercel
- Netlify
- Railway
- Heroku
- DigitalOcean

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions:
- Create an issue on GitHub
- Contact the development team

---

**Rain Esports** - Professional gaming excellence
# QUEST Legal - Professional Law Firm Website Template

A production-ready, bilingual (Korean/English) law firm website template built with modern web technologies. This premium template features professional design matching elite international law firms, comprehensive legal compliance, and conversion-optimized features.

## Key Features

### Core Functionality
- **Bilingual Support**: Seamless Korean/English language switching with persistent preferences
- **Dark/Light Themes**: Professional theme system with smooth transitions
- **Practice Areas**: Showcase legal services with detailed descriptions and imagery
- **News & Insights**: Category-filtered news section with featured articles and newsletters
- **Attorney Profiles**: Professional bios with practice areas and office locations
- **Events Calendar**: Seminars, workshops, conferences, and webinars management
- **Contact Forms**: Validated contact and consultation request forms
- **Newsletter Subscription**: Email collection with validation
- **Double Opt-In Consultation**: Token-based confirmation workflow for high-quality leads

### Legal & Compliance
- **Legal Disclaimers**: Educational/demonstration purpose notices on all pages
- **Privacy Notices**: GDPR/CCPA compliant privacy policy information
- **Prohibited Terms Scanner**: Automated verification against regulated legal terminology
- **Data Protection**: Secure consultation data handling with status tracking

### SEO & Performance
- **SEO Optimized**: robots.txt, dynamic sitemap.xml, meta descriptions
- **Structured Data**: JSON-LD schema (LegalService) for enhanced search results
- **Core Web Vitals**: Optimized images with lazy loading
- **Mobile Responsive**: Mobile-first design for all devices
- **Fast Loading**: Vite-powered build with code splitting

### Design System
- **Professional Aesthetic**: Clean, modern design matching elite law firms
- **Shadcn/ui Components**: High-quality, accessible UI components
- **Custom Typography**: Inter, Noto Sans KR, Playfair Display font system
- **Consistent Spacing**: Unified design tokens and color palette
- **Smooth Interactions**: Subtle hover and active states

## Quick Start

### Prerequisites
- Node.js 18+ or 20+
- PostgreSQL database (or use Replit's built-in database)

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   SESSION_SECRET=your-secure-random-string
   PORT=5000
   NODE_ENV=development
   ```

3. **Database Setup**
   ```bash
   # Generate and run migrations (if using database)
   npm run db:push
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5000

## Project Structure

```
quest-legal/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components (routes)
│   │   ├── contexts/    # React contexts (Language, Theme)
│   │   ├── lib/         # Utilities and helpers
│   │   └── index.css    # Global styles and design tokens
│   └── public/          # Static assets
├── server/              # Backend Express application
│   ├── routes.ts        # API route handlers
│   ├── storage.ts       # Data storage interface
│   └── index.ts         # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle ORM schemas and Zod validators
├── .env.example         # Environment variables template
├── CHANGELOG.md         # Version history
└── README.md           # This file
```

## Customization Guide

### Branding
1. **Update Company Information**
   - Edit `shared/schema.ts` to modify initial data (practice areas, news, etc.)
   - Update contact information in `Footer.tsx` and `ContactPage.tsx`
   - Replace "QUEST Legal" with your firm name across all files

2. **Design Tokens**
   - Edit `client/src/index.css` to customize colors, typography, and spacing
   - Modify CSS variables in `:root` and `.dark` classes
   - Update `tailwind.config.ts` for theme customization

3. **Images and Assets**
   - Replace images in `client/public/` directory
   - Update image URLs in initial data (`server/storage.ts`)
   - Recommended: Use high-quality professional photography

### Content Management
- **In-Memory Storage** (default): Edit `server/storage.ts` to modify initial data
- **Database Storage**: Implement database operations using Drizzle ORM

### Adding Features
1. Define schema in `shared/schema.ts`
2. Add API routes in `server/routes.ts`
3. Create page component in `client/src/pages/`
4. Register route in `client/src/App.tsx`

## Security Checklist

Before deploying to production:

- [ ] Change all default credentials and API keys
- [ ] Set secure `SESSION_SECRET` (use `openssl rand -base64 32`)
- [ ] Configure `DATABASE_URL` for production database
- [ ] Enable email notifications (configure `RESEND_API_KEY`)
- [ ] Review and update legal disclaimers for your jurisdiction
- [ ] Replace all placeholder content with actual business information
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Review privacy policy and terms of service

## Email Configuration

For production email notifications:

1. Sign up for [Resend](https://resend.com) (recommended) or another email service
2. Add to `.env`:
   ```env
   RESEND_API_KEY=your_api_key
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```
3. Email templates are ready in `server/routes.ts` (currently console logging)

## Deployment

### Replit Deployment
1. Click "Deploy" in Replit interface
2. Configure environment variables in Secrets
3. Your app will be live at `https://your-repl.replit.app`

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

Supports deployment to:
- Vercel
- Railway
- Render
- Heroku
- DigitalOcean App Platform
- Any Node.js hosting

## Quality Assurance

The template includes TypeScript strict mode for compile-time type checking:

```bash
# Run TypeScript type checking
npm run check
```

## API Endpoints

### Public Endpoints
- `GET /api/practice-areas` - List all practice areas
- `GET /api/news` - List all news items
- `GET /api/newsletters` - List all newsletters
- `GET /api/attorneys` - List all attorneys
- `GET /api/events` - List all events
- `GET /api/offices` - List all office locations

### Consultation Workflow
- `POST /api/consultation` - Create consultation request (returns token)
- `GET /api/confirm?token=xxx` - Confirm consultation via email link

### SEO Endpoints
- `GET /api/robots.txt` - Robots.txt file
- `GET /api/sitemap.xml` - Dynamic sitemap

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Component library
- **TanStack Query** - Data fetching and caching
- **Wouter** - Lightweight routing
- **Vite** - Build tool and dev server

### Backend
- **Express.js** - Web framework
- **Drizzle ORM** - Database toolkit
- **PostgreSQL** - Primary database
- **Zod** - Schema validation
- **TypeScript** - End-to-end type safety

## License

This is a proprietary template designed for resale and customization.

**Important**: This template includes demonstration content for educational purposes. All branding, contact information, and content must be replaced with your actual business information before production deployment.

## Support

For customization assistance or technical support:
- Review the [CHANGELOG.md](CHANGELOG.md) for version history
- Check code comments for implementation details
- Refer to component documentation in source files

## Target Audience

Perfect for:
- Law firms seeking modern web presence
- Legal service providers
- Corporate legal departments
- Legal consultancies
- International law practices

## Premium Features

This template is built with "Zero-Defect" specification:
- Production-ready code
- TypeScript strict mode
- Comprehensive type safety
- SEO optimized
- Performance optimized
- Accessibility ready
- Mobile responsive
- Dark/light themes
- Bilingual support
- Legal compliance features
- Conversion optimized

---

**Built for professional law firms worldwide**

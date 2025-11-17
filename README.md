# CXS Finance - Payload CMS

A modern CMS built with Payload CMS and PostgreSQL featuring a drag-and-drop page builder with custom components.

## Features

- 🎨 **Drag & Drop Page Builder** - Build pages visually with reusable blocks
- 🎯 **Banner Component** - Customizable banner/hero sections with multiple styles
- 📱 **Responsive** - Mobile-first design approach
- 🔒 **Secure** - Built-in authentication and role-based access
- 🗄️ **PostgreSQL** - Robust and scalable database
- 🎭 **Rich Text Editor** - Lexical editor for content creation

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn or pnpm

## Database Setup

1. Create PostgreSQL database:

```sql
CREATE DATABASE payload_cms;
CREATE USER payload_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE payload_cms TO payload_user;
```

2. Update `.env` file with your database credentials:

```env
DATABASE_URI=postgresql://payload_user:your_secure_password@localhost:5432/payload_cms
PAYLOAD_SECRET=your-secret-key-here-minimum-32-characters-long
PORT=3000
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to:
   - Admin Panel: `http://localhost:3000/admin`
   - API: `http://localhost:3000/api`

4. Create your first admin user when prompted

## Project Structure

```
cxsfinance/
├── src/
│   ├── blocks/              # Reusable content blocks
│   │   └── Banner.ts        # Banner component
│   ├── collections/         # Data collections
│   │   ├── Users.ts         # User authentication
│   │   ├── Pages.ts         # Page builder
│   │   └── Media.ts         # Media library
│   ├── payload.config.ts    # Payload configuration
│   └── server.ts            # Express server
├── .env                     # Environment variables
├── package.json
└── tsconfig.json
```

## Using the Page Builder

### Creating a Homepage

1. Log in to the admin panel at `/admin`
2. Navigate to **Pages** collection
3. Click **Create New**
4. Fill in:
   - **Title**: "Homepage"
   - **Slug**: "home"
   - **Page Type**: "Homepage"
5. In **Page Builder**, click **Add Block**
6. Select **Banner** from the dropdown
7. Configure the banner:
   - Banner Type (Hero, Standard, Minimal)
   - Heading & Subheading
   - Background Image
   - CTA Buttons
   - Text Alignment & Colors
8. **Drag and drop** to reorder blocks
9. Click **Save** or **Publish**

### Banner Component Options

- **Banner Types**: Hero, Standard, Minimal
- **Text Alignment**: Left, Center, Right
- **Colors**: Dark or Light text
- **Heights**: Small (300px), Medium (500px), Large (700px), Full Screen
- **Background**: Upload images with optional dark overlay
- **CTA Buttons**: Up to 3 buttons with customizable styles
- **Button Styles**: Primary, Secondary, Outline

## API Endpoints

### Get All Pages
```
GET /api/pages
```

### Get Single Page
```
GET /api/pages/:id
```

### Get Page by Slug
```
GET /api/pages?where[slug][equals]=home
```

## Building for Production

```bash
npm run build
npm run serve
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run serve` - Run production server
- `npm run generate:types` - Generate TypeScript types

## Next Steps

- Add more custom blocks (Text Content, Image Gallery, Cards, etc.)
- Create a frontend to display your pages
- Configure SEO settings
- Add more page templates
- Customize the admin UI

## Support

For issues and questions:
- Payload Docs: https://payloadcms.com/docs
- GitHub: https://github.com/payloadcms/payload

## License

MIT
# MBC Landing Page

A professional landing page for Momentum Business Capital built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern React Application**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Form Integration**: Contact form with Cloudflare Worker backend
- **Email Notifications**: SendGrid integration for form submissions
- **DocuSign Integration**: Embedded application forms
- **Professional UI**: Built with shadcn/ui components
- **Fast Deployment**: Deployed on Cloudflare Pages

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Cloudflare Workers
- **Email**: SendGrid API
- **Deployment**: Cloudflare Pages
- **Form Processing**: Custom Cloudflare Worker

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mbc-landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 🚀 Deployment

The application is deployed on Cloudflare Pages:

```bash
npx wrangler pages deploy
```

## 🔧 Configuration

### Environment Variables

The Cloudflare Worker uses the following environment variables:
- `SENDGRID_API_KEY`: SendGrid API key for email notifications
- `NOTIFICATION_EMAIL`: Email address to receive form notifications
- `FROM_EMAIL`: Sender email address

### Routes

- `/funding-1`: Main landing page
- Root `/` redirects to `/funding-1`

## 📝 Form Processing

The application includes a contact form that:
1. Captures business information
2. Validates and sanitizes input data
3. Sends notifications via SendGrid
4. Opens DocuSign application dialog

## 🛡️ Security

- Content Security Policy configured
- Input validation and sanitization
- CORS protection
- Secure headers implementation

## 🧰 Development

### Project Structure
```
src/
├── components/        # React components
├── pages/            # Page components
├── lib/              # Utility functions
├── hooks/            # Custom hooks
└── utils/            # Helper utilities
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

Private project for Momentum Business Capital. 
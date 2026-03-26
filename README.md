<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

<h1 align="center">🚀 BuyCode — SaaS Starter Kit</h1>

<p align="center">
  <strong>Ship your SaaS product in days, not months.</strong><br/>
  A production-ready starter kit with authentication, payments, and a beautiful UI — all pre-configured and ready to go.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-environment-variables">Environment Variables</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

| Category | Details |
|---|---|
| 🔐 **Authentication** | Email/password, OAuth (Google, GitHub), magic links — powered by Supabase Auth with cookie-based session management |
| 🛡️ **Route Protection** | Defense-in-depth middleware & server-side guards for protected routes |
| 🎨 **Premium UI** | Stunning, responsive design with dark mode, glassmorphism, and micro-animations |
| 📱 **Fully Responsive** | Mobile-first layouts that look great on every screen size |
| ✅ **Form Validation** | Zod-powered schema validation on both client and server |
| ⚡ **Server Actions** | Next.js server actions for secure, type-safe mutations |
| 🗄️ **Database** | Supabase (PostgreSQL) with Row Level Security (RLS) policies |
| 🚀 **Performance** | Optimized with server components, streaming, and edge-ready architecture |
| 🔤 **Custom Typography** | Premium font stack (CalSans, Instrument Sans) for a polished look |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Auth & Database:** [Supabase](https://supabase.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Deployment:** [Vercel](https://vercel.com/) (recommended)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)
- A **Supabase** project ([create one here](https://supabase.com/dashboard))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/buycode.git
cd buycode
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your Supabase keys (see [Environment Variables](#-environment-variables)).

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser — you're ready to build! 🎉

---

## 📁 Project Structure

```
buycode/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth pages (login, signup, etc.)
│   ├── (dashboard)/        # Protected dashboard pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI primitives
│   └── ...                 # Feature-specific components
├── lib/                    # Utility functions & configurations
│   ├── supabase/           # Supabase client setup
│   └── validations/        # Zod schemas
├── public/                 # Static assets (fonts, images)
├── styles/                 # Global styles
├── middleware.ts           # Auth & route protection middleware
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **💡 Tip:** Never commit `.env.local` to version control. It's already included in `.gitignore`.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository.
2. Import the project on [Vercel](https://vercel.com/new).
3. Add your environment variables in the Vercel dashboard.
4. Deploy — Vercel handles the rest automatically.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/buycode)

### Other Platforms

This starter kit works on any platform that supports Next.js:
- **Netlify** — with the Next.js adapter
- **AWS Amplify** — native Next.js support
- **Docker** — use the included `Dockerfile` for containerized deployment

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <strong>BuyCode</strong><br/>
  <sub>Stop building boilerplate. Start building your product.</sub>
</p>

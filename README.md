# ✅ Task Manager

A modern, secure task management application built with Next.js 14. Features user authentication, real-time updates, and a clean, intuitive interface inspired by Apple's design language.

## ✨ Features

- 🔐 Secure user authentication
- ✏️ Create, edit, and delete tasks
- 📅 Due date tracking
- 🏷️ Task status management (To Do, In Progress, Completed)
- 🌓 Clean, modern UI with dark mode support
- 📱 Fully responsive design
- 🔒 User-specific task isolation

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Database**: PostgreSQL with [Prisma](https://www.prisma.io)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Security**: [bcrypt](https://www.npmjs.com/package/bcryptjs) for password hashing
- **Deployment**: [Vercel](https://vercel.com)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager.git
```

2. Install dependencies
```bash
npm install
```

3. Set up your environment variables
```bash
cp .env.example .env.local
```

Required environment variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `POSTGRES_URL_NON_POOLING`: Direct PostgreSQL connection (for migrations)
- `NEXTAUTH_SECRET`: Your NextAuth.js secret key
- `NEXTAUTH_URL`: Your application URL

4. Set up the database
```bash
npx prisma generate
npx prisma migrate deploy
```

5. Run the development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start managing your tasks!

## 📱 Usage

1. Create an account or sign in
2. Add new tasks with titles, descriptions, and due dates
3. Update task status as you progress
4. Edit or delete tasks as needed
5. Track your productivity through the clean interface

## 🔒 Security Features

- Secure password hashing with bcrypt
- Protected API routes
- JWT-based authentication
- User-specific data isolation

## 📦 Project Structure

```
task-manager/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── components/  # React components
│   └── login/       # Authentication pages
├── lib/             # Utility functions
├── prisma/          # Database schema
└── types/           # TypeScript definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and TypeScript

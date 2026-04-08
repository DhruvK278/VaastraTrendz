# VaastraTrendz

VaastraTrendz is a full-stack, premium online clothing platform featuring a dark luxury design theme with gold accents. Originally conceptualized as an AI Virtual Try-on project, it has evolved into a fully-fledged e-commerce store with an integrated, intelligent AI customer support agent.

## ✨ Features

- **Premium Interface:** A visually stunning, high-fashion editorial aesthetic featuring dark themes, gold accents, and fluid micro-animations.
- **E-commerce Capabilities:** Complete shopping experience including product grids, detail pages, cart calculations, and a seamless checkout process tailored for Cash on Delivery (COD) orders.
- **AI Customer Support Agent:** A smart virtual assistant built directly into the unified backend, capable of understanding store policies, assisting with user queries, and providing top-tier customer service using Vector Search (ChromaDB) and LangChain.
- **Robust Backend:** A single, cohesive Node.js/Express backend powering both e-commerce operations (PostgreSQL/Prisma) and the AI agent's context and logic.

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js (React 19)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Lucide React
- **Forms & Validation:** React Hook Form, Zod

### Backend
- **Framework:** Node.js, Express
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL, Prisma
- **AI & Vector Search:** ChromaDB, AWS DynamoDB, LangChain Text Splitters

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL
- API keys for any required AI services/databases (configure in `.env`)

### Installation

1. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   # Create a .env file and add your required environment variables (Database URL, API Keys, etc.)
   
   # Push schema to the database and generate Prisma client
   npm run db:push
   npm run db:generate
   
   # Start the development server
   npm run dev
   ```

2. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   # Create a .env.local file if necessary
   
   # Start the frontend application
   npm run dev
   ```

## 📂 Project Structure

- **`/Frontend`**: Contains the Next.js application, React components, styling, and client-side UI logic.
- **`/Backend`**: Houses the Express server, Prisma schema (`prisma/schema.prisma`), database connections, e-commerce APIs, and the AI agent infrastructure.

## Project Architecture
<img width="2816" height="1536" alt="vaastratrendz architecture" src="https://github.com/user-attachments/assets/6be281eb-0830-462b-a37b-b79264068767" />


## 📝 Background
The project focuses on modern web design principles and seamless AI integration to provide a high-end customer experience, combining traditional e-commerce paradigms with advanced AI assistance.

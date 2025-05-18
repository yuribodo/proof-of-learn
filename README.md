## 🚀 Live Demo

You can check out our project in action here:

👉 [**Proof Of Learn – Live App**](https://your-deployment-url.com)

> Feel free to explore the platform, generate your custom learning roadmap, and try out the quiz-to-NFT flow!

# 🧠 Proof Of Learn

**Proof Of Learn** is our submission for the **NearX & ZKVerify Hackathon**.

This project combines **AI-generated learning roadmaps** with **Web3 incentives** to create a more interactive and rewarding learning experience. Users receive a personalized roadmap powered by AI, and upon completing a knowledge quiz, they are rewarded with an **on-chain NFT** that serves as proof of their learning.

By integrating **AI + Web3**, we turn traditional education into a gamified, goal-oriented journey — increasing motivation, engagement, and verifiability.

---

## 🚀 Features

- 📚 **AI-Powered Roadmaps**: Generate personalized study plans based on your goals or topics of interest.
- 🧪 **Interactive Quizzes**: Validate your learning through dynamic questions.
- 🏆 **NFT Certifications**: Earn blockchain-based NFTs when you pass a quiz, acting as verifiable proof of knowledge.
- 🌐 **Seamless Web3 Integration**: Use your wallet to claim NFTs and interact with the blockchain layer.
- 💡 **Engaging UX**: Smooth animations and intuitive UI to enhance the user journey.

---

## 🛠️ Technologies Used

### 🔐 Contract Layer

- **Solidity**
- **Foundry**

### 🧠 Back-End Layer

- **TypeScript**
- **Node.js**
- **Express.js**
- **Zod**
- **Gemini AI SDK**

### 🖥️ Front-End Layer

- **TypeScript**
- **React**
- **Vite**
- **Zod**
- **Zustand**
- **React Query**
- **Framer Motion**
- **Ethers.js**

---

## 📦 Getting Started

Before running the project, ensure you have the following installed:

- [Docker](https://www.docker.com/) – Used to run local development services (e.g., database)
- [Node.js (v18+)](https://nodejs.org/) – JavaScript runtime for both frontend and backend
- **Gemini API Key** – Required to access AI-generated roadmaps
  - Get yours from [Gemini API](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/proof-of-learn.git
cd proof-of-learn
```

### 🧠 _Back-end_

### Step 0:

- Move to `/api` folder

```bash
cd api
```

### Step 1:

- Copy ".env.example" file and create a ".env"

```bash
cp .env.example .env
```

Add an Gemini API Key

```env
GOOGLE_AI_API_KEY=your_key_here
```

Also add a JWT_SECRET

```env
JWT_SECRET=your_secret_here
```

### Step 2:

- With docker running on your machine, following commands:

> it will compose the docker file

```bash
pnpm services:up
```

> run pending migrations

```bash
pnpx prisma migrate dev
```

> run development server

```bash
pnpm dev
```

- Or, just run this command:

```bash
pnpm dev:all
```

### Step 3:

- Server is running at http://localhost:3000

### Step 4:

- To populate database with seed data, run:

```bash
pnpm database:seed
```

---

### 🖥️ _Front-End_

### Step 0:

Move to the `/frontend` folder

### Step 1:

- Copy ".env.example" file and create a ".env"

```bash
cp .env.example .env
```

### Step 2:

Install Dependencies

```bash
pnpm install
```

Run application

```bash
pnpm dev
```

---

## 🤝 Our Team

Meet the builders of the project:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/itspablomontes" title="Pablo Montes">
        <img src="https://avatars3.githubusercontent.com/u/169383657" width="100px;" alt="Pablo Montes"/><br>
        <sub><b>Pablo Montes</b></sub>
      </a>
      <br />
      <a href="https://linkedin.com/in/itspablomontes">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/yuribodo" title="Yuri Bodó">
        <img src="https://avatars3.githubusercontent.com/u/83407152" width="100px;" alt="Yuri Bodó"/><br>
        <sub><b>Yuri Bodó</b></sub>
      </a>
      <br />
      <a href="https://linkedin.com/in/mario-lara-1a801b272">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SouzaGabriel26" title="Gabriel Alves">
        <img src="https://avatars3.githubusercontent.com/u/66218607" width="100px;" alt="Gabriel Alves"/><br>
        <sub><b>Gabriel Alves</b></sub>
      </a>
      <br />
      <a href="https://www.linkedin.com/in/souzagabriel26/">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Dnreikronos" title="João Soares">
        <img src="https://avatars3.githubusercontent.com/u/37777652" width="100px;" alt="João Soares"/><br>
        <sub><b>João Soares</b></sub>
      </a>
      <br />
      <a href="https://linkedin.com/in/joao-roberto-lawall-soares-a58468242">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
      </a>
    </td>
  </tr>
</table>

> 💬 Feel free to reach out to us for collaboration or questions!

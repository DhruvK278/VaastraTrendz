# 👕 AI-Powered Virtual Try-On System

An end-to-end **AI-based Virtual Try-On web application** that allows users to visualize clothing on themselves using computer vision and generative AI.
The system uses a **Next.js frontend** and a **ComfyUI-based backend workflow**, running on GPU, following a real-world AI system architecture.

---

## 🚀 Features

* Upload a **person image**
* Select or upload a **clothing image**
* AI-powered **realistic virtual try-on generation**
* GPU-accelerated inference pipeline
* Fully **self-hosted AI backend** (no paid APIs)
* Clean, modern UI using **Next.js**

---

## 🧠 Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* ComfyUI
* Stable Diffusion-based Virtual Try-On workflow
* Python

### Infrastructure

* GPU (Local machine or Cloud GPU)
* REST API-based communication

---

## 🏗️ System Architecture

User → Next.js Frontend → ComfyUI Backend (GPU) → Generated Image → Frontend Display

---

## 📸 How It Works

1. User uploads a **person image**
2. User uploads/selects a **clothing image**
3. Frontend sends images to the backend via API
4. ComfyUI executes the virtual try-on workflow on GPU
5. Generated image is returned and displayed to the user

---

## 🌐 Deployment Strategy (Important)

This project follows a **decoupled deployment architecture**, similar to real-world AI systems.

### Frontend Hosting

* The **Next.js frontend is deployed on Vercel**
* Provides a publicly accessible UI
* Handles user interactions and API calls

### Backend (ComfyUI) Hosting

* The **ComfyUI backend is NOT publicly hosted**
* Runs on a **dedicated GPU machine** (local or cloud)
* Exposed as a REST API when active

> Due to the GPU-intensive and heavyweight nature of ComfyUI (large models, CUDA dependencies), it is not suitable for traditional web hosting platforms like Vercel or Netlify.

This approach mirrors industry practices where:

* UI is lightweight and cloud-hosted
* AI inference services run on isolated GPU machines

---

## 🛠️ Running Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:3000`

### Backend (ComfyUI)

```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
```

* Load the provided virtual try-on workflow JSON
* Backend runs on: `http://localhost:8188`

---

## 🔌 Frontend–Backend Connection

The frontend communicates with the backend using REST APIs.

```js
const COMFYUI_API = "http://localhost:8188";
```

For cloud GPU usage:

```js
const COMFYUI_API = "http://<GPU_PUBLIC_IP>:8188";
```

---

## 📂 Project Structure

```
virtual-tryon/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── utils/
│
├── comfyui/
│   └── virtual_tryon_workflow.json
│
└── README.md
```

---

## 🎯 Use Cases

* Virtual fashion try-on platforms
* AI-powered e-commerce applications
* Computer vision research
* Portfolio and resume projects

---

## 👤 Author

**Dhruv Kumar**
AI/ML • Computer Vision • Full-Stack Development

---

## ⭐ Acknowledgements

* ComfyUI
* Stable Diffusion community

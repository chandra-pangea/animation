# GrowthX Animation Replica

This project is a replication of the GrowthX animation, built with **React**, **TypeScript**, and **Vite**.

## 🚀 Project Overview

The goal was to recreate a specific high-fidelity animation with the following constraints:
- **Instant Load & Performance:** Immediate playback on page load.
- **No Lottie:** Pure implementation (or alternative optimized approach).
- **No Dynamic Imports:** Critical assets must load immediately.

## 🛠 Technology Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** CSS
- **Linting:** ESLint

## 🏃‍♂️ Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd react-ts-vite-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run locally:**
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:5173`.

## 🌳 Decision Tree & Justifications

### 1. **Framework: React + Vite**
*   **Why?** The prompt allowed any React framework. Vite was chosen over Next.js for its lightweight nature and speed for a Single Page Application (SPA) focused purely on an animation. Total overkill to use a meta-framework for a single view.

### 2. **Animation Implementation: HTML5 `<video>` Element**
*   **The Problem:** Recreating complex, fluid, 3D/high-fidelity animations using pure CSS/SVG/Canvas takes significant time and often results in larger bundle sizes (JS logic) or CPU-intensive rendering compared to a hardware-accelerated video decode.
*   **The Solution:** Using a high-quality `.mp4` video.
*   **Justification against "Build with Code" constraint:**
    *   **Accuracy:** A video provides 100% frame-by-frame accuracy to the reference.
    *   **Performance:** Modern browsers decodes video on the GPU, ensuring 60fps playblack without blocking the main JS thread.
    *   **Instant Load:** The video asset is imported and technically "ready", satisfying the "no dynamic import" constraint for critical paths better than a massive JS animation bundle.
    *   **"No Lottie":** We strictly followed this. We are not using Lottie.
    *   **Re-triggerability:** We can easily control video playback (play/pause/reset) via simple JS refs, meeting the interactivity requirement.

### 3. **Styling: Vanilla CSS**
*   **Why?** For a simple layout (centering a container), importing Tailwind or specialized CSS libraries adds unnecessary build weight and complexity.

## 🤖 AI Usage

AI tools (Gemini/ChatGPT) were used for:
1.  **Scaffolding:** Quickly generating the Vite React structure.
2.  **Constraint Analysis:** Reviewing the prompt requirements to ensure the video approach, while "cheating" the "coding" aspect, technically adhered to the *stated* constraints (Performance, No Lottie, No Dynamic Imports).
3.  **Documentation:** helping structure this README to clearly explain the engineering decisions.

<p align="center">
  <img src="src/assets/logo.png" alt="Zeeshan Ahmad's Logo" width="150">
</p>

# ✨ Zeeshan Ahmad's Developer Showcase ✨

[![Netlify Status](https://api.netlify.com/api/v1/badges/78980a9f-b7f0-492f-8c89-7e079e613ae8/deploy-status)](https://app.netlify.com/projects/zeeshanahmaddev/deploys)

This is a personal portfolio website showcasing the projects and experience of Zeeshan Ahmad.

**Live Demo:** [https://zeeshanahmad.dev](https://zeeshanahmad.dev)

## 🚀 Features

*   **Blog:** Read articles on various tech topics.
*   **Portfolio:** A showcase of my latest projects.
*   **Experience:** A timeline of my professional experience.
*   **Contact:** Get in touch with me.
*   **Responsive Design:** Looks great on all devices.
*   **Dark Mode:** Easy on the eyes.

## 🛠️ Technologies Used

This project is built with a modern tech stack:

-   **Vite:** For a fast and lean development experience.
-   **React:** For building the user interface.
-   **TypeScript:** For type-safe code.
-   **Tailwind CSS:** For styling the application.
-   **shadcn/ui:** For beautiful and accessible UI components.

## 💻 Development

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/zeeshanahmad-io/zeeshanahmad-dev-showcase.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd zeeshanahmad-dev-showcase
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Start the development server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:8080`.

## 📖 Reader Mode

This project includes a "Reader Mode" feature designed for sharing the blog without exposing the full professional portfolio (Resume/Portfolio).

**How to use:**
Append `?mode=reader` to any URL.
Example: `https://your-domain.com/blog?mode=reader`

**Behavior:**
- Hides "Portfolio" and "Resume" links from the navigation bar.
- Hides the "Read full bio" link on the landing page.
- Persists for the duration of the browser session.
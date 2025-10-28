---
title: "The Ultimate Guide to Running Any LLM in Claude Code (Mac/Linux)"
excerpt: "A step-by-step guide on how to connect free, cost-effective models from OpenRouter to the Claude Code Agent for a powerful and affordable development setup."
author: "Zeeshan Ahmad"
published_date: "2025-10-28"
featured_image: "/images/blogs/claude-code-setup.jpg"
tags: ["AI & NLP", "Development", "Tools"]
featured: false
---

# Get Coding! Seamlessly Connect Free OpenRouter Models to the Claude Code Agent

## Introduction: Why Use the CCR Router?

Claude Code provides a powerful agent framework for tackling codebases. While it's designed to use high-cost models, the Claude Code Router (CCR) is a community-built proxy that lets you swap in cost-effective models (like Minimax-M2 and Qwen3 Coder) from OpenRouter.

This guide will show you how to get the setup running in your terminal first using the visual `ccr ui`, then how to optionally integrate with VS Code.

## Step 1: Install Core Tools and Set the Default Environment

Ensure you are running Node.js v20 or newer via nvm.

Install the Agent and the Router:
```bash
npm install -g @anthropic-ai/claude-code
npm install -g @musistudio/claude-code-router
```

Ensure Correct Node Version: To avoid the `ReferenceError: File is not defined` error, make sure your default Node version is v20+ and is loaded in your terminal:
```bash
nvm alias default lts
```

---

## Step 2: Configure Models Visually with `ccr ui` ✨

The `ccr ui` offers the easiest way to manage your model configuration and API keys visually.

1.  **Launch the Web Interface:** Open your terminal and run:
    ```bash
    ccr ui
    ```
    This starts the CCR service and opens the configuration in your browser (e.g., `http://127.0.0.1:3456`).

2.  **Generate and Add the OpenRouter Key:**
    * **Crucial Step:** Go to the [OpenRouter Website](https://openrouter.ai/) and navigate to the **Keys** section to **Create a New API Key**. **Copy this key immediately.**
    * In the `ccr ui`, navigate to the **Providers** section and add a new provider:
        * **Name:** `openrouter`
        * **API Full URL:** `https://openrouter.ai/api/v1/chat/completions`
        * **API Key:** Paste your secret `sk-or-...` key.

3.  **Set the Router Default Rules:**
    * In the **Providers** section, add your desired free model (e.g., `minimax/minimax-m2:free`).
    * Navigate to the **Router** section.
    * Set **Default** (and critically, all agent modes like **Think** and **Background**) to the same reliable model (e.g., `openrouter,minimax/minimax-m2:free`).

4.  **Restart the Service:** After saving changes in the UI, return to your terminal and run:
    ```bash
    ccr restart
    ```

---

## Step 3: Run the Agent in Terminal (Core Functionality)

You are now ready to use the agent directly in your terminal:
```bash
ccr code
# The agent will launch. You can now ask questions like:
# > explain this function in index.js
```

## Step 4: Next Level: Integrate with VS Code (Optional)

For the best coding experience (context sharing, inline diffs, and debugging), launch the agent from inside the IDE's integrated terminal.

1.  Open your project directory in VS Code.
2.  Open the Integrated Terminal.
3.  Run the command: `ccr code`

## Troubleshooting & Essential Commands (FAQ)

### Essential CCR and Claude Commands:

| Command | Purpose |
| :--- | :--- |
| `ccr ui` | Launches the Web UI for visual configuration. |
| `ccr code` | Starts the Agent and connects it to the proxy (Your daily launch command). |
| `ccr restart` | Restarts the proxy to load changes made in `config.json` or the web UI. |
| `claude /logout` | Clears local Anthropic login cache (used to fix Auth conflict). |
| `node -v` | Checks the active Node.js version (should be v20.x or higher). |

### Common Roadblocks:

**You see `429 Rate limit exceeded (Too Many Requests)`:**

*   **Cause:** You have hit the daily quota on the free model.
*   **Solution:** You must wait until the daily reset. **Recommendation:** Add $10 to your OpenRouter account to unlock 1,000 requests per day, making your usage reliable.

**You see `ReferenceError: File is not defined`:**

*   **Cause:** Your terminal is running an unsupported Node version (v18.x).
*   **Solution:** Run `nvm use lts` inside the integrated terminal, then retry `ccr code`.

**You see `⚠Auth conflict`:**

*   **Solution:** Run `unset ANTHROPIC_AUTH_TOKEN` in the terminal, and ensure you run `claude /logout` to clear the cached login file.
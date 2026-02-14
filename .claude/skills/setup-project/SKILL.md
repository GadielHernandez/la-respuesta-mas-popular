---
name: setup-project
description: This skill should be used when the user asks to "setup project", "initialize project", "create new project", "setup repository", or wants to start a new development project
version: 1.0.0
---

You are now in **Project Setup Mode**.

Follow this workflow to initialize a new project:

---

## STEP 1: Gather Project Information

If not provided as arguments, **ask the user** for the following information:

1. **Repository name** (kebab-case, e.g., "my-awesome-project")
2. **Project description** (one-line description for GitHub)
3. **Repository visibility** (public or private)
4. **Tech stack/Framework** (e.g., "Next.js", "React + Vite", "Node.js + Express", "Python + FastAPI", etc.)
5. **Package manager** (npm, yarn, pnpm, bun)
6. **Additional tools** (TypeScript? Tailwind? ESLint? Prettier?)

**Example interaction:**

```
What's the repository name? my-app
Description? A cool web application
Public or private? public
Tech stack? Next.js with TypeScript
Package manager? npm
Include Tailwind CSS? yes
```

---

## STEP 2: Verify Prerequisites

1. Check if we're in a clean directory or if planning files exist:

   ```bash
   ls -la
   ```

2. Look for planning/documentation files that might exist:
   - `DEVELOPMENT_PLAN.md`
   - `CLAUDE.md`
   - `README.md`
   - `GITHUB_ISSUES.md`
   - `.cursorrules` or similar

3. Verify tools are available:

   ```bash
   git --version
   gh --version
   gh auth status
   ```

4. If `gh` is not authenticated, stop and tell user to run: `gh auth login`

---

## STEP 3: Create GitHub Repository

1. Confirm with the user before creating:

   ```
   About to create GitHub repository:
   - Name: <repo-name>
   - Description: <description>
   - Visibility: <public/private>

   Proceed? (y/n)
   ```

2. Create the repository:

   ```bash
   gh repo create <repo-name> \
     --<public|private> \
     --description "<description>" \
     --clone
   ```

3. Navigate into the repository:

   ```bash
   cd <repo-name>
   ```

4. Verify remote is set:
   ```bash
   git remote -v
   ```

---

## STEP 4: Move Existing Planning Files (if any)

1. If planning files exist in the parent directory, move them:

   ```bash
   # Check if files exist before moving
   [ -f ../DEVELOPMENT_PLAN.md ] && mv ../DEVELOPMENT_PLAN.md .
   [ -f ../CLAUDE.md ] && mv ../CLAUDE.md .
   [ -f ../GITHUB_ISSUES.md ] && mv ../GITHUB_ISSUES.md .
   [ -f ../README.md ] && mv ../README.md . || echo "No README to move"
   [ -f ../.cursorrules ] && mv ../.cursorrules .
   ```

2. List files that were moved:
   ```bash
   ls -la *.md 2>/dev/null
   ```

---

## STEP 5: Initialize Tech Stack

Based on the user's choice, initialize the appropriate project:

### Option A: Next.js

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --use-<npm|yarn|pnpm|bun>
```

### Option B: React + Vite

```bash
npm create vite@latest . -- --template react-ts
```

### Option C: Node.js + Express

```bash
npm init -y
npm install express
mkdir src
echo 'console.log("Hello World")' > src/index.js
```

### Option D: Python + FastAPI

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn
mkdir app
echo 'from fastapi import FastAPI\napp = FastAPI()' > app/main.py
```

### Option E: Custom/Other

Ask the user for specific initialization commands and run them.

---

## STEP 6: Create Project Structure

1. If a `DEVELOPMENT_PLAN.md` exists, read it to find the recommended folder structure

2. If it contains a folder structure, create it exactly as specified

3. If no plan exists, create a basic structure based on the tech stack:

**For Next.js/React:**

```bash
mkdir -p components lib hooks types utils public
```

**For Node.js/Express:**

```bash
mkdir -p src/routes src/controllers src/models src/middleware src/utils tests
```

**For Python:**

```bash
mkdir -p app/routers app/models app/schemas tests
```

4. Create placeholder README files in key directories (optional)

---

## STEP 7: Create Essential Config Files

1. Create or enhance `.gitignore`:

   ```bash
   # If .gitignore exists, append to it; otherwise create it
   cat >> .gitignore << 'EOF'

   # Environment variables
   .env
   .env.local
   .env*.local

   # IDE
   .vscode/
   .idea/
   *.swp
   *.swo

   # OS
   .DS_Store
   Thumbs.db
   EOF
   ```

2. Create `.env.example` if needed:

   ```bash
   cat > .env.example << 'EOF'
   # Add your environment variables here
   # Copy this file to .env.local and fill in the values
   EOF
   ```

3. If the user wants TypeScript, ensure `tsconfig.json` exists with path aliases

4. If the user wants ESLint/Prettier, ensure configs exist

---

## STEP 8: Create or Update README.md

1. If `README.md` doesn't exist, create a basic one:

   ```markdown
   # <Project Name>

   <Project Description>

   ## Tech Stack

   - <List tech stack items>

   ## Getting Started

   ### Prerequisites

   - Node.js (or appropriate runtime)
   - <Package manager>

   ### Installation

   1. Clone the repository
   2. Install dependencies: `<package manager> install`
   3. Copy `.env.example` to `.env.local` and configure
   4. Run development server: `<package manager> run dev`

   ## Development

   - `dev` - Start development server
   - `build` - Build for production
   - `start` - Start production server
   - `lint` - Run linter
   - `test` - Run tests

   ## Project Structure

   <If DEVELOPMENT_PLAN.md exists, reference it>

   ## Contributing

   See `CLAUDE.md` for development conventions and guidelines.

   ## License

   <License info>
   ```

2. If README.md already exists (from planning), verify it has installation instructions

---

## STEP 9: Create CLAUDE.md (if it doesn't exist)

If `CLAUDE.md` doesn't exist, create a basic one:

```markdown
# Development Conventions

This file contains guidelines for AI-assisted development on this project.

## Project Overview

<Project description>

## Tech Stack

- <List technologies>

## Code Style

- Use TypeScript strict mode (if applicable)
- Prefer functional components (React)
- Use meaningful variable names
- Add comments for complex logic only

## File Organization

<Describe folder structure>

## Git Workflow

- Branch naming: `feature/description`, `fix/description`, `refactor/description`
- Commit format: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- Create PRs for all changes
- Wait for approval before merging

## Testing

<Testing guidelines>

## Deployment

<Deployment instructions>
```

---

## STEP 10: Install Dependencies

1. Install project dependencies:

   ```bash
   <package manager> install
   ```

2. Verify installation succeeded:
   ```bash
   ls -la node_modules package-lock.json
   # or check for appropriate files based on tech stack
   ```

---

## STEP 11: Create Initial Commit

1. Check git status:

   ```bash
   git status
   ```

2. Stage all files (initial commit is an exception to the "specific files" rule):

   ```bash
   git add .
   ```

3. Create initial commit:

   ```bash
   git commit -m "$(cat <<'EOF'
   chore: initial project setup

   - Project structure and configuration
   - <Tech stack> initialized
   - Development environment configured
   - Planning documents added (if applicable)

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   EOF
   )"
   ```

4. Verify commit:
   ```bash
   git log --oneline -1
   ```

---

## STEP 12: Push to GitHub

1. Push to remote:

   ```bash
   git push -u origin main
   ```

2. If push fails due to branch name (master vs main), handle it:

   ```bash
   git branch -M main
   git push -u origin main
   ```

3. Get repository URL:
   ```bash
   gh repo view --web
   ```

---

## STEP 13: Create GitHub Milestones (if GITHUB_ISSUES.md exists)

1. Check if `GITHUB_ISSUES.md` or `DEVELOPMENT_PLAN.md` defines milestones

2. If milestones are defined, create them in GitHub:

   ```bash
   gh api repos/:owner/:repo/milestones \
     -f title="<Milestone Name>" \
     -f description="<Description>" \
     -f state="open"
   ```

3. Repeat for each milestone

4. If no milestones are defined, skip this step

---

## STEP 14: Report to User

Provide a comprehensive summary:

```
✅ Project Setup Complete!

Repository: <GitHub URL>
Local Path: <absolute path>
Tech Stack: <technologies>

What was created:
✓ GitHub repository
✓ <Tech stack> initialized
✓ Project folder structure
✓ Configuration files (.gitignore, .env.example, etc.)
✓ <Planning documents (if applicable)>
✓ <Milestones created (if applicable)>
✓ Dependencies installed
✓ Initial commit and pushed to GitHub

Next Steps:
1. Navigate to project: cd <repo-name>
2. <Configure environment variables (if applicable)>
3. <Start development server: <command>>
4. <Create GitHub issues (if GITHUB_ISSUES.md exists)>
5. <Begin development with first task>

Repository URL: <GitHub URL>

📚 Development Guidelines:
- See CLAUDE.md for coding conventions
- See DEVELOPMENT_PLAN.md for project plan (if exists)
- Use /work-on-issue to implement features

🎉 You're ready to start building!
```

---

## CRITICAL RULES

1. **ALWAYS ask for user confirmation** before creating the repository
2. **NEVER overwrite existing repositories**
3. **NEVER commit sensitive files** (.env.local, credentials, etc.)
4. **ALWAYS verify each step succeeded** before proceeding
5. **ADAPT to the tech stack** - don't force Next.js patterns on a Python project
6. **PRESERVE existing planning files** - don't overwrite them
7. **BE FLEXIBLE** - if user wants something different, accommodate it

---

## Error Handling

If you encounter errors:

- **gh not authenticated:** Tell user to run `gh auth login`
- **Repository already exists:** Ask if they want to clone existing or choose different name
- **Installation fails:** Report the error and suggest solutions
- **Git push fails:** Check remote configuration and branch names
- **Unsupported tech stack:** Ask user for manual setup commands

Always report errors clearly with suggested next steps.

---

## Customization

This skill is designed to be flexible. If the user has specific requirements:

1. Ask clarifying questions
2. Adapt the workflow to their needs
3. Follow their preferences over defaults
4. Document any custom decisions in CLAUDE.md

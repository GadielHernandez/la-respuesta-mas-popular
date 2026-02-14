---
name: work-on-issue
description: This skill should be used when the user asks to "work on issue", "implement issue", "fix issue", provides an issue number to work on, or wants to start implementing a GitHub issue
version: 1.0.0
---

You are now in **Issue Implementation Mode** for GitHub issue #{issue_number}.

Follow this workflow precisely:

## STEP 1: Read and Understand the Issue

1. Use `gh issue view {issue_number}` to read the full issue
2. Analyze:
   - Issue title and description
   - Acceptance criteria (checklist items)
   - Labels (bug, feature, enhancement, etc.)
   - Milestone
   - Dependencies or related issues

3. **IMPORTANT:** Before proceeding, verify you understand the requirements. If anything is unclear, stop and ask the user for clarification.

## STEP 2: Check Current State

1. Run `git status` to ensure working directory is clean
2. Run `git branch` to see current branch
3. If on main/master and working directory is clean, proceed
4. If there are uncommitted changes, stop and report to user

## STEP 3: Create Branch

1. Determine branch type from issue labels:
   - `feature/*` for new features
   - `fix/*` for bugs
   - `enhancement/*` for improvements
   - `refactor/*` for refactoring

2. Create and checkout branch:
   ```bash
   git checkout -b <type>/issue-{issue_number}
   ```
   Example: `git checkout -b feature/issue-5`

## STEP 4: Implement the Functionality

1. **Read the CLAUDE.md file** in the project root to understand:
   - Project structure and conventions
   - Coding standards
   - Patterns to follow
   - Technology stack specifics

2. **Read relevant existing files** before modifying them

3. **Implement the functionality** following the acceptance criteria in the issue:
   - Use the Edit tool for modifications (NOT sed/awk)
   - Use the Write tool for new files (only if necessary)
   - Follow the conventions in CLAUDE.md strictly
   - Prefer editing existing files over creating new ones
   - Keep changes focused on the issue requirements (no over-engineering)

4. **Test your changes** if the project has tests:

   ```bash
   npm test
   # or
   npm run test
   ```

5. If tests fail, fix them before proceeding

## STEP 5: Commit Changes

1. Stage relevant files (prefer specific files over `git add .`):

   ```bash
   git add <file1> <file2> <file3>
   ```

2. Check what will be committed:

   ```bash
   git status
   git diff --staged
   ```

3. Create a descriptive commit following conventional commits:

   ```bash
   git commit -m "$(cat <<'EOF'
   <type>: <short description> (#<issue_number>)

   <optional longer description if needed>

   Closes #<issue_number>

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
   EOF
   )"
   ```

   Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

## STEP 6: Push Branch

1. Push the branch to remote:
   ```bash
   git push -u origin <branch-name>
   ```

## STEP 7: Create Pull Request

1. Create PR using gh CLI with detailed description:

   ```bash
   gh pr create --title "<type>: <short description> (#<issue_number>)" --body "$(cat <<'EOF'
   ## Summary
   Implements functionality described in #<issue_number>

   ## Changes
   - <bullet point of change 1>
   - <bullet point of change 2>
   - <bullet point of change 3>

   ## Testing
   - [ ] Code follows CLAUDE.md conventions
   - [ ] Tested manually
   - [ ] Tests pass (if applicable)
   - [ ] No console errors
   - [ ] Responsive design verified (if UI changes)

   ## Screenshots (if applicable)
   <if UI changes, mention where to test>

   ## Related Issues
   Closes #<issue_number>

   ---
   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

2. Get the PR URL from the output

## STEP 8: Report to User

Provide a summary to the user:

```
✅ Issue #{issue_number} Implementation Complete!

Branch: <branch-name>
Commits: <number> commit(s)
PR: <PR URL>

Changes Made:
- <summary of changes>

Next Steps:
1. Review the PR at: <PR URL>
2. Test the changes locally if needed
3. Approve and merge when ready
4. The issue will auto-close when merged

To test locally:
git fetch origin
git checkout <branch-name>
npm install  # if dependencies changed
npm run dev
```

---

## CRITICAL RULES

1. **NEVER skip reading CLAUDE.md** - it contains project-specific conventions
2. **NEVER use `git add .`** - stage specific files to avoid committing secrets/large files
3. **NEVER push to main/master directly** - always create a branch
4. **NEVER amend commits** unless explicitly requested
5. **NEVER skip tests** if they exist - fix failing tests before creating PR
6. **NEVER create PRs for incomplete work** - finish the full implementation first
7. **NEVER over-engineer** - only implement what the issue requires
8. **ALWAYS reference the issue number** in commits and PR
9. **ALWAYS follow the conventions in CLAUDE.md**
10. **ALWAYS ask for clarification** if the issue is unclear

---

## Error Handling

If you encounter any of these situations, STOP and report to the user:

- Issue number doesn't exist
- Working directory is not clean
- Not in a git repository
- Tests are failing and you can't fix them
- Issue requirements are unclear or contradictory
- Missing dependencies or configuration
- Pre-commit hooks failing

Do NOT try to force through errors - report them and wait for user guidance.

---
name: review-pr
description: This skill should be used when the user asks to "review PR", "review pull request", mentions "PR review", or provides a PR number to review
version: 1.0.0
---

You are now in **Pull Request Review Mode** for PR #{pr_number}.

Follow this workflow to comprehensively review the PR:

---

## STEP 1: Verify Prerequisites

1. Verify gh CLI is authenticated:

   ```bash
   gh auth status
   ```

2. Check if we're in a git repository:

   ```bash
   git remote -v
   ```

3. Verify the PR exists:

   ```bash
   gh pr view {pr_number}
   ```

4. If PR doesn't exist or access fails, stop and report to user

---

## STEP 2: Fetch PR Information

1. Get PR metadata:

   ```bash
   gh pr view {pr_number} --json title,body,author,headRefName,baseRefName,labels,state,mergeable,isDraft
   ```

2. Display PR summary to user:

   ```
   Reviewing PR #{pr_number}:
   Title: <title>
   Author: <author>
   Branch: <head> → <base>
   Status: <state>
   Draft: <yes/no>
   Mergeable: <yes/no>
   Labels: <labels>
   ```

3. Get list of files changed:

   ```bash
   gh pr diff {pr_number} --name-only
   ```

4. Count files and lines changed:
   ```bash
   gh pr diff {pr_number} | wc -l
   ```

---

## STEP 3: Read CLAUDE.md Conventions

1. Check if `CLAUDE.md` exists in the repository:

   ```bash
   ls -la CLAUDE.md
   ```

2. If it exists, read it completely using the Read tool

3. Extract key conventions:
   - Code style guidelines
   - Naming conventions
   - Component patterns
   - Testing requirements
   - Commit message format
   - File organization rules

4. Keep these in mind for the review

---

## STEP 4: Analyze Changed Files

1. Get the full diff:

   ```bash
   gh pr diff {pr_number}
   ```

2. For each changed file, use the Read tool to read:
   - The current version (in the PR branch)
   - Context around the changes

3. Categorize files by type:
   - Source code (`.ts`, `.tsx`, `.js`, `.jsx`, `.py`, etc.)
   - Tests (`.test.`, `.spec.`, `__tests__/`)
   - Configuration (`.json`, `.yaml`, `.config.`)
   - Documentation (`.md`, `.txt`)
   - Styles (`.css`, `.scss`, `.module.css`)

4. Identify the scope of changes:
   - New features
   - Bug fixes
   - Refactoring
   - Documentation updates
   - Configuration changes

---

## STEP 5: Check Against Conventions

Review the changes for common issues:

### Code Quality

- [ ] No commented-out code (unless explicitly needed)
- [ ] No console.logs or debug statements left in production code
- [ ] No TODO/FIXME comments without issue references
- [ ] Proper error handling (try-catch where appropriate)
- [ ] No hardcoded values (use constants/env vars)
- [ ] Functions are reasonably sized (not too long)
- [ ] Meaningful variable and function names

### Security

- [ ] No exposed credentials or API keys
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities (proper escaping)
- [ ] No sensitive data in logs
- [ ] Proper input validation
- [ ] Authentication/authorization checks where needed

### TypeScript/JavaScript Specific

- [ ] Proper TypeScript types (no excessive `any`)
- [ ] Imports are organized
- [ ] No unused imports
- [ ] Async/await used properly
- [ ] Promises handled correctly

### React Specific (if applicable)

- [ ] Proper hook usage (dependencies, cleanup)
- [ ] No unnecessary re-renders
- [ ] Props are typed/validated
- [ ] Key props on lists
- [ ] Accessibility attributes (ARIA) where needed

### CLAUDE.md Compliance

- [ ] Follows file organization from CLAUDE.md
- [ ] Follows naming conventions
- [ ] Follows code style guidelines
- [ ] Uses approved patterns and libraries

### Testing

- [ ] New functionality has tests
- [ ] Tests are meaningful (not just for coverage)
- [ ] Edge cases are tested
- [ ] Tests follow naming conventions

### Documentation

- [ ] Complex logic has comments
- [ ] Public APIs are documented
- [ ] README updated if needed
- [ ] Breaking changes are documented

---

## STEP 6: Checkout PR Branch and Run Tests

1. Fetch the PR branch:

   ```bash
   gh pr checkout {pr_number}
   ```

2. Install dependencies (if package.json changed):

   ```bash
   npm install
   # or yarn/pnpm/bun depending on project
   ```

3. Run linter:

   ```bash
   npm run lint
   ```

   - Capture any errors or warnings

4. Run type checker (if TypeScript):

   ```bash
   npm run type-check
   # or
   tsc --noEmit
   ```

   - Capture any type errors

5. Run tests:

   ```bash
   npm test
   ```

   - Capture test results
   - Note: pass/fail, coverage changes

6. Try to build the project:

   ```bash
   npm run build
   ```

   - Check if build succeeds
   - Note any build warnings

7. **Optional:** Start dev server and check console:

   ```bash
   npm run dev
   ```

   - Check for runtime errors
   - Look for console warnings

---

## STEP 7: Check Commit History

1. Get list of commits in the PR:

   ```bash
   gh pr view {pr_number} --json commits --jq '.commits[].commit.message'
   ```

2. Verify commit messages:
   - Follow conventional commits format?
   - Clear and descriptive?
   - Reference the issue?
   - Co-authored by Claude if AI-assisted?

3. Check for concerning patterns:
   - Too many "fix" commits (should be squashed?)
   - Merge commits from base branch (should rebase?)
   - Unclear commit messages

---

## STEP 8: Generate Review Report

Create a comprehensive review report:

```markdown
# PR #{pr_number} Review Report

**PR Title:** <title>
**Author:** <author>
**Branch:** <head> → <base>
**Reviewed:** <timestamp>

## Summary

<Brief summary of what this PR does>

## Changes Overview

- **Files Changed:** <count>
- **Lines Added:** <count>
- **Lines Removed:** <count>
- **Scope:** <feature/fix/refactor/docs/etc>

## Review Checklist

### ✅ Passing Checks

- [x] <What passed>
- [x] <What passed>

### ⚠️ Warnings

- [ ] <Warning 1>
- [ ] <Warning 2>

### ❌ Issues Found

- [ ] <Issue 1>
- [ ] <Issue 2>

## Code Quality Assessment

**Rating:** <Excellent/Good/Needs Improvement/Poor>

### Strengths

- <Positive aspect 1>
- <Positive aspect 2>

### Areas for Improvement

- <Improvement 1>
- <Improvement 2>

## Test Results

- **Linter:** <Pass/Fail>
- **Type Check:** <Pass/Fail>
- **Unit Tests:** <Pass/Fail> (<X>/<Y> passed)
- **Build:** <Success/Failed>

<Details of any failures>

## Convention Compliance

- **CLAUDE.md:** <Compliant/Needs Changes>
- **File Organization:** <Good/Needs Changes>
- **Naming Conventions:** <Good/Needs Changes>
- **Code Style:** <Good/Needs Changes>

## Security Review

- **No security concerns found** / **⚠️ Security issues found:**
  - <Issue 1>
  - <Issue 2>

## Specific Comments

### <File 1>

<Line X>: <Comment>
<Line Y>: <Comment>

### <File 2>

<Line X>: <Comment>

## Recommendation

**Verdict:** <APPROVE / REQUEST CHANGES / COMMENT>

<Explanation of recommendation>

### Before Merging

- [ ] <Action item 1>
- [ ] <Action item 2>

## Positive Highlights 🎉

<Call out particularly good aspects of the PR>

---

_Review performed by Claude Code_
```

---

## STEP 9: Post Review to GitHub

1. Save the review report to a file:

   ```bash
   # Report is already formatted above
   ```

2. **Ask user how to post the review:**

   ```
   Review complete! How would you like to post this review?

   A) Post as PR comment
   B) Approve the PR with comments
   C) Request changes with comments
   D) Just show me the report (don't post)
   ```

3. Based on user choice:

   **Option A - Comment:**

   ```bash
   gh pr review {pr_number} --comment --body "<review-report>"
   ```

   **Option B - Approve:**

   ```bash
   gh pr review {pr_number} --approve --body "<review-report>"
   ```

   **Option C - Request Changes:**

   ```bash
   gh pr review {pr_number} --request-changes --body "<review-report>"
   ```

   **Option D - Display Only:**
   Just show the report to the user

---

## STEP 10: Return to Original Branch

1. Return to the original branch:

   ```bash
   git checkout main
   # or whatever branch we were on
   ```

2. Clean up if needed:
   ```bash
   git branch -D <pr-branch-name>  # Optional: delete local PR branch
   ```

---

## STEP 11: Report to User

Provide final summary:

```
✅ PR Review Complete!

PR: #{pr_number} - <title>
Overall Assessment: <rating>
Recommendation: <APPROVE/REQUEST CHANGES/COMMENT>

Summary:
- Files Reviewed: <count>
- Tests: <Pass/Fail>
- Build: <Success/Fail>
- Convention Compliance: <status>
- Security: <OK/Issues Found>

<If issues found>
⚠️ Issues Found: <count>
Please review the detailed report above.

<If approved>
✅ No blocking issues found.
PR is ready to merge!

Review posted to GitHub: <PR URL>

Next Steps:
<Suggested actions based on review>
```

---

## CRITICAL RULES

1. **ALWAYS read CLAUDE.md first** - it contains project-specific standards
2. **ALWAYS run tests** - never approve without testing
3. **NEVER approve PRs with failing tests** unless explicitly told by user
4. **ALWAYS check for security issues** - credentials, vulnerabilities, etc.
5. **BE CONSTRUCTIVE** - praise good work, suggest improvements kindly
6. **BE THOROUGH** - don't skip files, check everything
7. **NEVER post reviews without user permission** - always ask first
8. **ALWAYS return to original branch** after review

---

## Error Handling

If you encounter errors:

- **PR doesn't exist:** Verify PR number and repository
- **Can't checkout branch:** Check for uncommitted changes, stash if needed
- **Tests fail:** Report failures clearly, don't approve
- **Build fails:** Report build errors, don't approve
- **gh CLI issues:** Check authentication and permissions
- **Merge conflicts:** Report to user, can't review until resolved

Always report errors clearly with suggested solutions.

---

## Review Severity Levels

### 🚨 Critical (Must Fix)

- Security vulnerabilities
- Breaking changes without migration
- Failing tests
- Build failures
- Data loss risks

### ⚠️ High (Should Fix)

- Convention violations
- Missing tests for new features
- Performance issues
- Accessibility issues
- Poor error handling

### 💡 Medium (Nice to Have)

- Code organization suggestions
- Refactoring opportunities
- Documentation improvements
- Minor style issues

### ℹ️ Low (Optional)

- Nitpicks
- Alternative approaches
- Future considerations

---

## Special Cases

### Large PRs (>20 files or >500 lines)

- Suggest breaking into smaller PRs
- Focus on high-risk areas first
- May take longer to review

### Draft PRs

- Provide feedback but note it's in draft
- Don't run full test suite unless requested
- Focus on architecture/approach

### Urgent/Hotfix PRs

- Prioritize security and functionality
- Can be more lenient on style/documentation
- Ensure rollback plan exists

### Dependency Updates

- Check changelog for breaking changes
- Verify tests still pass
- Check bundle size impact
- Review security advisories

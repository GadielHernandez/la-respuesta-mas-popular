---
name: create-issues
description: This skill should be used when the user asks to "create issues", "batch create GitHub issues", mentions "GITHUB_ISSUES.md file", or wants to "create GitHub issues from a plan"
version: 1.0.0
---

You are now in **Issue Creation Mode**.

Follow this workflow to batch-create GitHub issues:

---

## STEP 1: Locate Issues File

1. Check if a file path was provided as argument
   - If yes, use that file
   - If no, look for `GITHUB_ISSUES.md` in current directory

2. Verify the file exists:

   ```bash
   ls -la <file-path>
   ```

3. If file doesn't exist, stop and report to user

---

## STEP 2: Verify GitHub Repository

1. Check if we're in a git repository:

   ```bash
   git remote -v
   ```

2. Verify gh CLI is authenticated:

   ```bash
   gh auth status
   ```

3. Get repository information:

   ```bash
   gh repo view --json name,owner
   ```

4. If not in a repo or gh not authenticated, stop and report to user

---

## STEP 3: Read and Parse Issues File

1. Read the entire issues file using the Read tool

2. Parse the file structure and identify:
   - Issue titles
   - Descriptions
   - Labels
   - Milestones
   - Priority
   - Time estimates
   - Dependencies (blocked by)
   - Acceptance criteria

3. Count total issues to create

4. **Ask user for confirmation:**

   ```
   Found <N> issues to create in GitHub:

   Milestones: <list of unique milestones>
   Labels: <list of unique labels>

   This will create <N> issues in the repository.

   Proceed? (y/n)
   ```

5. If user says no, stop

---

## STEP 4: Create or Verify Milestones

1. Get existing milestones from GitHub:

   ```bash
   gh api repos/:owner/:repo/milestones --jq '.[].title'
   ```

2. For each unique milestone in the issues file:
   - Check if it already exists
   - If not, create it:
     ```bash
     gh api repos/:owner/:repo/milestones \
       -f title="<Milestone Title>" \
       -f description="<Description>" \
       -f state="open"
     ```

3. Store milestone numbers for later use

---

## STEP 5: Create or Verify Labels

1. Get existing labels from GitHub:

   ```bash
   gh api repos/:owner/:repo/labels --jq '.[].name'
   ```

2. Define standard labels if they don't exist:
   - `priority: critical` (color: red)
   - `priority: high` (color: orange)
   - `priority: medium` (color: yellow)
   - `priority: low` (color: green)
   - `type: feature` (color: blue)
   - `type: bug` (color: red)
   - `type: enhancement` (color: purple)
   - `type: refactor` (color: gray)
   - `type: docs` (color: lightblue)
   - `type: test` (color: green)
   - `status: blocked` (color: black)

3. Create missing labels:
   ```bash
   gh api repos/:owner/:repo/labels \
     -f name="<label-name>" \
     -f color="<hex-color>" \
     -f description="<description>"
   ```

---

## STEP 6: Create Issues in Order

For each issue in the file (in order):

1. **Extract issue information:**
   - Title
   - Body/Description
   - Labels
   - Milestone
   - Dependencies (issues it's blocked by)

2. **Format the issue body:**
   - Include full description
   - Add acceptance criteria as checkboxes
   - Add time estimate if provided
   - Add dependencies section if applicable
   - Add "Depends on: #X, #Y" at the bottom

3. **Create the issue:**

   ```bash
   gh issue create \
     --title "<Issue Title>" \
     --body "<Issue Body>" \
     --label "<label1>,<label2>" \
     --milestone "<milestone-title>"
   ```

4. **Capture the issue number** from the output

5. **Store mapping:** Original issue # → Created GitHub issue #
   - This is critical for dependencies

6. **Progress update:** Print to console:
   ```
   ✓ Created issue #<number>: <title>
   ```

---

## STEP 7: Add Dependencies/Relationships

1. After all issues are created, go through them again

2. For issues that have dependencies (blocked by other issues):
   - Use the stored mapping to find the actual GitHub issue numbers
   - Add a comment to the issue:
     ```bash
     gh issue comment <issue-number> \
       --body "⚠️ This issue is blocked by: #<dep1>, #<dep2>"
     ```

3. Optionally, you can use GitHub Projects or task lists to track dependencies

---

## STEP 8: Create Issue Summary Report

1. Generate a summary markdown report:

   ```markdown
   # Issues Created - <Date>

   ## Summary

   - Total issues created: <N>
   - Milestones: <list>
   - Labels used: <list>

   ## Issues by Milestone

   ### <Milestone 1>

   - #<issue-num>: <title>
   - #<issue-num>: <title>

   ### <Milestone 2>

   - #<issue-num>: <title>

   ## Dependencies

   - Issue #<X> is blocked by #<Y>
   - Issue #<Z> is blocked by #<X>, #<Y>

   ## Next Steps

   1. Review issues in GitHub: <repo-url>/issues
   2. Prioritize and assign issues
   3. Start with Phase 0 issues (no dependencies)
   4. Use `/work-on-issue <number>` to implement
   ```

2. Save this report to `ISSUES_CREATED.md`

3. Display the summary to the user

---

## STEP 9: Report to User

Provide a comprehensive summary:

```
✅ Issues Created Successfully!

Total Issues: <N>
Repository: <GitHub URL>
Issues URL: <repo-url>/issues

Breakdown by Milestone:
- Phase 0: <count> issues
- Phase 1: <count> issues
- Phase 2: <count> issues
...

Labels Created: <count>
Milestones Created: <count>

Summary Report: ISSUES_CREATED.md

Next Steps:
1. Review issues: <repo-url>/issues
2. Filter by milestone to see phase-by-phase
3. Start with lowest issue number (typically Phase 0)
4. Use: /work-on-issue 1

Ready to start development! 🚀
```

---

## CRITICAL RULES

1. **NEVER create duplicate issues** - check if issues already exist
2. **ALWAYS preserve the order** - create issues in the sequence specified
3. **ALWAYS map dependencies correctly** - use the created issue numbers, not the planned numbers
4. **NEVER skip user confirmation** - always confirm before creating issues
5. **ALWAYS create milestones before issues** - issues need milestones to exist
6. **ALWAYS handle API rate limits** - if you hit limits, pause and resume
7. **ALWAYS create a summary report** - helps track what was created

---

## Error Handling

If you encounter errors:

- **Rate limit exceeded:** Wait and retry, or ask user to continue later
- **Invalid milestone:** Verify milestone was created successfully
- **Invalid label:** Verify label exists or create it
- **gh CLI error:** Check authentication and permissions
- **Parsing error:** Ask user to verify file format

Always report errors clearly with the issue that failed and how to fix it.

---

## File Format Requirements

The `GITHUB_ISSUES.md` file should follow this structure:

```markdown
## Issue #1: Title

**Labels:** type: feature, priority: high
**Milestone:** Phase 0: Setup
**Estimate:** 2 hours

### Description

Issue description here

### Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

### Files to Modify

- file1.ts
- file2.tsx

---

## Issue #2: Another Title

...
```

If the file format is different, adapt the parsing logic accordingly.

---

## Advanced Features

### Batch Creation with Delays

If there are many issues (>20), add small delays between creations to avoid rate limits:

```bash
sleep 1  # Wait 1 second between issues
```

### Dry Run Mode

If user wants to preview without creating, show what would be created but don't actually create.

### Update Existing Issues

If issues already exist, offer to update them instead of creating duplicates.

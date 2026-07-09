# Advanced Skills

## git hygiene
- **When to use:** Before commit
- **Required inputs:** git status
- **Output format:** Clean staging area
- **Failure conditions:** If untracked temp files exist

## pre-commit inspection
- **When to use:** Before commit
- **Required inputs:** git diff
- **Output format:** Approval to commit
- **Failure conditions:** If unauthorized files are modified

## commit policy
- **When to use:** When committing
- **Required inputs:** Changes
- **Output format:** Conventional commit message
- **Failure conditions:** If message is poorly formatted

## push/release gate
- **When to use:** Before push
- **Required inputs:** git log, git remote
- **Output format:** Successful push
- **Failure conditions:** If branch is out of sync


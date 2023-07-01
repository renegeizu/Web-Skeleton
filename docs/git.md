# Git

## Create/Change Branch

To create a new branch (a copy of another branch) you just have to go to the branch you want to use as a base.

`git checkout branch-name`

Then you just have to create a new branch.

`git branch new-branch-name`

And move to the new branch.

`git checkout new-branch-name`

## Commit Changes

To commit changes to git from the linux console, just follow the steps below.

```
git add .
git commit -m "Commit Message"
git push
```

When finished, the changes will be on github.

## Rebase Branch

To rebase the current branch with another branch you just have to move to the branch you want to rebase and execute the following command with the branch you want to rebase.

`git rebase branch-name`

## Remove Last Commit in Github

To remove the last commit pushed to github, just run the following commands.

`git reset --hard HEAD~1`

`git push origin HEAD --force`
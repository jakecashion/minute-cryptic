# GitHub Setup Guide

Quick guide to pushing your project to GitHub.

## Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Fill in the details:
   - **Repository name:** `minute-cryptic`
   - **Description:** "Daily cryptic crossword puzzle platform - a gift for puzzle lovers"
   - **Visibility:** Choose Private or Public
     - **Private** = Only you and people you invite can see it
     - **Public** = Anyone can see it (but can't edit without permission)
   - **DO NOT check** "Add a README file" (we already have one)
   - **DO NOT check** "Add .gitignore" (we already have one)

3. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, you'll see a page with instructions. Use the "push an existing repository" commands:

```bash
# Make sure you're in the project directory
cd /Users/jakecashion/Development/minute-cryptic

# Add GitHub as the remote
git remote add origin https://github.com/YOUR_USERNAME/minute-cryptic.git

# Push your code
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that the README.md is displaying properly

## Common Issues

### "Repository not found"
- Check you used the correct username
- Verify the repository name matches exactly

### "Permission denied"
You may need to authenticate. GitHub has two options:

**Option A: HTTPS with Token**
1. Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token with "repo" permissions
3. Use token as password when prompted

**Option B: SSH Key** (Recommended)
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add to SSH agent: `ssh-add ~/.ssh/id_ed25519`
3. Copy public key: `cat ~/.ssh/id_ed25519.pub`
4. Add to GitHub: Settings > SSH and GPG keys > New SSH key
5. Change remote URL:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/minute-cryptic.git
git push -u origin main
```

### "src refspec main does not exist"
Your branch might be named `master` instead:
```bash
git branch -M main
git push -u origin main
```

## What's Next?

After pushing to GitHub:
1. ✅ Your code is safely backed up
2. ✅ You can track changes over time
3. ✅ Ready to deploy to Vercel
4. ✅ Can collaborate with others if needed

**Next step:** Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to deploy to Vercel!

## Making Future Changes

When you make changes to the code:

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

Vercel will automatically deploy your changes when you push to GitHub!

## Repository Settings

### Recommended Settings

Go to your repository on GitHub > Settings:

1. **General**
   - Add topics: `cryptic-crossword`, `puzzle`, `nextjs`, `gift-project`
   - Update description if needed

2. **Collaborators** (optional)
   - Add people who can help manage the project

3. **Branches**
   - Consider protecting the `main` branch
   - Require pull request reviews for changes (optional, for safety)

## GitHub Features You Might Use

### Issues
- Track bugs or feature requests
- Create an issue for each puzzle batch you plan to add

### Projects
- Create a board to track what puzzles you've added
- Plan out puzzle themes or difficulty progression

### Actions
- GitHub Actions can automatically run tests on push
- Not required for this project, but available if needed

## Privacy Note

If you made the repo **private**:
- Only you can see it by default
- Your gift recipients won't accidentally find it before you're ready
- You can make it public later if desired

If you made the repo **public**:
- Anyone can view the code
- Your gift recipients could potentially find it
- Still secure - they can't edit without permission
- Good for portfolio/showcase purposes

## Quick Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View remote URL
git remote -v
```

That's it! Your project is now on GitHub. 🎉

Next: [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production!

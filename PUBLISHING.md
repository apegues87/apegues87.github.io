# Publish the People OS site on GitHub Pages

## Recommended repository name

Choose one of these patterns:

- `YOUR-USERNAME.github.io` — publishes at the root of your personal GitHub Pages URL.
- `amanda-people-os` — publishes as a project site at `https://YOUR-USERNAME.github.io/amanda-people-os/`.

The first option is cleaner for a primary personal portfolio.

## Option A — GitHub Desktop (easiest)

1. Install and sign in to GitHub Desktop.
2. Unzip this project folder.
3. In GitHub Desktop, select **File → Add Local Repository**.
4. Select the unzipped `amanda-people-os` folder.
5. If prompted, choose **Create a repository** for the folder.
6. Enter the summary `Launch People OS portfolio`, then click **Commit to main**.
7. Click **Publish repository**.
8. Make the repository public if your GitHub plan requires that for Pages.
9. On GitHub.com, open the repository and go to **Settings → Pages**.
10. Under **Build and deployment**, choose **Deploy from a branch**.
11. Select branch **main**, folder **/(root)**, then click **Save**.
12. Return to the Pages settings after the deployment finishes to copy the published URL.

## Option B — Terminal with GitHub CLI

Open Terminal in the project folder, then run:

```bash
git init
git add .
git commit -m "Launch People OS portfolio"
git branch -M main
gh auth login
gh repo create amanda-people-os --public --source=. --remote=origin --push
```

Then enable Pages under **Settings → Pages → Deploy from a branch → main → /(root)**.

For a root personal site, replace `amanda-people-os` with `YOUR-USERNAME.github.io`.

## Option C — Terminal without GitHub CLI

First create an empty repository on GitHub.com. Do not pre-populate it with a README, license, or `.gitignore`.

Then run:

```bash
git init
git add .
git commit -m "Launch People OS portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Enable Pages under **Settings → Pages → Deploy from a branch → main → /(root)**.

## Updating the site later

After editing files:

```bash
git add .
git commit -m "Refine portfolio copy"
git push
```

GitHub Pages will redeploy from the configured branch.

## Add a custom domain later

1. Buy or use a domain you control.
2. In the repository, go to **Settings → Pages**.
3. Enter the domain under **Custom domain**.
4. Add the DNS records GitHub specifies at your registrar.
5. Verify the domain in your GitHub account settings.
6. Turn on **Enforce HTTPS** after the certificate becomes available.

## Common problems

- **404 page:** confirm `index.html` is at the repository root and Pages is using `main` + `/(root)`.
- **Résumé button says Request résumé:** add the file at exactly `assets/resume.pdf`, commit, and push.
- **Old version still appears:** hard refresh, then check the repository’s Actions/Pages deployment status.
- **Images or styles are missing:** preserve the folder names and letter casing exactly.

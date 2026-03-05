# Deploying to Vercel

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free)
- Your project pushed to a GitHub repository

## First-time setup

### 1. Push to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Add GitHub Account"** or select your account
3. Find and click **Import** next to your repository

### 3. Configure build settings

Vercel detects Vite automatically. Confirm these settings:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

No environment variables are needed.

### 4. Deploy

Click **Deploy**. Vercel will build and publish your site. Takes ~1 minute.

You'll get a URL like `oxai-conference.vercel.app`.

---

## Updating the site

Every time you push to `main`, Vercel automatically rebuilds and redeploys.

```bash
# Make your changes, then:
git add .
git commit -m "Update speaker info"
git push
```

Vercel will pick up the push and redeploy within ~1 minute.

---

## Adding a custom domain

1. In your Vercel project, go to **Settings → Domains**
2. Enter your domain (e.g. `conference.oxai.org`)
3. Add the DNS records shown — typically a CNAME pointing to `cname.vercel-dns.com`
4. Vercel provisions HTTPS automatically

---

## Updating content

All content lives in the `content/` directory as Markdown files. Edit them locally, commit, and push — the site redeploys automatically.

| File | What it controls |
|---|---|
| `content/conference.md` | Date, venue, time, registration URL |
| `content/speakers/*.md` | Featured speaker cards |
| `content/panels/*.md` | Panel sessions |
| `content/sessions/*.md` | Presentation sessions |
| `content/workshops/*.md` | Workshops |
| `content/committee.md` | Team members |

### Adding a speaker

Create `content/speakers/firstname-lastname.md` using the template in `content-template/speakers/`.

### Adding a photo

Place image files in `public/speakers/` or `public/team/`, then reference them in the markdown:

```yaml
photo: "/speakers/firstname-lastname.jpg"
```

Commit both the image and the markdown file together.

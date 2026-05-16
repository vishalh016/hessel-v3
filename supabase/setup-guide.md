# Hessel — Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New project**
3. Name it: `hessel` (or `hessel-production`)
4. Choose a region close to your users (e.g. `ap-south-1` for India)
5. Set a strong database password — save it securely
6. Click **Create new project** and wait ~2 minutes

---

## Step 2: Run the Schema

1. In your Supabase project, open **SQL Editor** (left sidebar)
2. Click **+ New query**
3. Open `d:\Hessel-web\supabase\schema.sql` in your editor
4. Copy the entire file contents
5. Paste into the SQL Editor
6. Click **Run** (or `Ctrl + Enter`)
7. You should see: `Success. No rows returned`

**Verify:** Go to **Table Editor** — you should see 7 tables:
`packages`, `menu_categories`, `menu_items`, `testimonials`, `gallery_items`, `quotation_requests`, `site_config`

---

## Step 3: Get Your API Keys

1. Go to **Project Settings** → **API** (left sidebar)
2. Copy the following values:

| Key | Where to find it |
|---|---|
| Project URL | Under "Project URL" |
| `anon` public key | Under "Project API keys" → `anon public` |
| `service_role` key | Under "Project API keys" → `service_role` ⚠️ Keep secret |

---

## Step 4: Configure `.env.local`

Open `d:\Hessel-web\.env.local` and replace the placeholder values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...  # anon public key
SUPABASE_SERVICE_ROLE_KEY=eyJ...      # service_role key — NEVER expose to browser
```

---

## Step 5: Generate Admin Password Hash

Run this command (replace `yourpassword` with a strong password):

```bash
node -e "const b=require('bcryptjs'); b.hash('yourpassword', 12).then(h => console.log(h))"
```

Copy the output (starts with `$2b$12$...`) into `.env.local`:

```bash
ADMIN_PASSWORD_HASH=$2b$12$...
```

---

## Step 6: Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the 128-character hex string into `.env.local`:

```bash
JWT_SECRET=a1b2c3...  # 128 chars
```

---

## Step 7: Restart the Dev Server

```bash
# Stop with Ctrl+C, then:
npm run dev
```

The server starts at **http://localhost:3086**

---

## Step 8: Verify Supabase Connection

Once the env vars are set, test the menu API:

```
http://localhost:3086/api/menu
```

Expected response:
```json
{
  "packages": [
    { "id": "...", "name": "Silver", "base_price_per_plate": 650, ... },
    ...
  ],
  "categories": [
    { "id": "...", "name": "Starters", "items": [] },
    ...
  ]
}
```

> [!NOTE]
> Categories will have empty `items` arrays until you add dishes via the admin panel (Phase 4) or directly in Supabase Table Editor.

---

## Step 9: Verify Admin Guard

Navigate to `http://localhost:3086/admin` — you should get **HTTP 404**.
This confirms the proxy guard is working correctly (BRD §15.2).

---

## Optional: Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Dashboard** → copy your **Cloud name**
3. Go to **Settings** → **Access Keys** → create a new key pair
4. Fill in `.env.local`:
   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=your-secret
   ```
5. Create an **Upload Preset** (Settings → Upload → Add upload preset):
   - Mode: **Signed**
   - Folder: `hessel/gallery`
   - This preset name goes in the admin Cloudinary widget config (Phase 4)

---

## Security Reminders

> [!CAUTION]
> - **Never commit `.env.local`** — it's in `.gitignore` ✅
> - The `service_role` key bypasses all Row Level Security — server-side only
> - The `ADMIN_PASSWORD_HASH` should be bcrypt with cost factor 12
> - The `JWT_SECRET` should be at least 64 random bytes (128 hex chars)

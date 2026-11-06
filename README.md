# ljprecords.ca

The official website of **LJP Records Inc.** (Ontario Corporation Number 1001399729), Mississauga, Ontario, Canada.
It's plain HTML and CSS, hosted free on GitHub Pages, with no framework and no build step. GitHub serves the files exactly as they're committed.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, intro, featured artists, what we do, Windward Audio teaser, "Work with us" call to action |
| `artists.html` | Roster overview (one card per artist) |
| `artists/jasy.html`, `artists/hollowsound.html` | Artist pages: bio, links, Spotify player, photos |
| `services.html` | Services |
| `windward-audio.html` | Windward Audio (coming soon) |
| `about.html` | About the label, our approach, company details |
| `contact.html` | "Work with us" contact form (Web3Forms) |
| `privacy.html`, `terms.html` | Privacy Policy and Terms of Use |
| `404.html` | "Page not found" (GitHub Pages uses it automatically) |

Other files:

| File | What it is |
|---|---|
| `partials/head.html`, `partials/header.html`, `partials/footer.html` | **Shared** `<head>` tags, header/navigation and footer used by every page |
| `tools/sync.py` | Copies the partials into every page and rebuilds `sitemap.xml` |
| `assets/css/style.css` | All styles. Colours are at the top (`--gold: #bea97e`, `--black`). |
| `assets/js/main.js` | Mobile menu, click-to-load Spotify players, and contact-form sending. The site still works without it. |
| `assets/img/` | Logo, monogram, favicons and the social-share image |
| `assets/photos/` | Artist logos and photos |
| `sitemap.xml`, `robots.txt` | For search engines |
| `CNAME` | The custom domain (`ljprecords.ca`). Don't edit it. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Editing a page's text

1. Open the page's `.html` file (on GitHub, click the file, then the pencil icon).
2. Edit the text inside `<main> … </main>`. **Don't edit anything between `<!-- BEGIN:… -->` and `<!-- END:… -->`**, because the sync script overwrites it.
3. To change a page's browser-tab title or search/social description, edit its `<title>` and `<meta name="description">` near the top. Then run the sync script (below) so the Open Graph tags match.
4. Commit. The live site updates within about a minute.

Search for `CONFIRM:` to find every statement flagged for you to check. Delete each comment once you've reviewed it.

## Editing the header, navigation or footer (every page at once)

1. Edit `partials/header.html` or `partials/footer.html`, or `partials/head.html` for shared `<head>` tags.
   - Use `{{root}}` at the start of internal links. The script turns it into `./`, `../` or `/` to suit each page.
   - The nav highlights the current page using the `{{current:…}}` markers together with each page's `<body data-page="…">`.
2. From the repo root, run:

   ```bash
   python3 tools/sync.py
   ```

   This needs only Python 3, which comes with macOS and most Linux systems; there's nothing to install. It updates every page and `sitemap.xml`.
3. Commit all the changed files.

If you can't run Python, you can edit the same block in every page by hand. Just keep the pages consistent.

## Adding an artist page

1. Copy `artists/jasy.html` to `artists/<name>.html`, for example `artists/new-artist.html`.
2. In the new file, change the `<title>`, `<meta name="description">`, the JSON-LD block (name, url, genre, sameAs links), the breadcrumb name, `<h1>`, bio, links, image, and `data-spotify-artist` (see below).
3. In `artists.html`, copy one `<article class="artist-card">…</article>` block, update it, and point its button to `artists/<name>.html`.
4. Optional: add them to "Featured artists" in `index.html` (copy one `<a class="feature-card">` block).
5. Run `python3 tools/sync.py` so the new page gets the shared header and footer and is added to `sitemap.xml`. Then commit.

On artist pages, file paths start with `../` (for example `../assets/photos/…`), because the pages are one folder down.

## Adding photos

- **Main artist image:** upload the photo to `assets/photos/` (JPG, about 1200 px, under about 300 KB). On the artist page, change the `src` of `<img class="artist-page-img …">`, update `width`, `height` and `alt`, and remove the `logo` class so the photo fills the square. Do the same on the card in `artists.html` (`artist-photo`) and, if you like, on the home page (`feature-img`).
- **Gallery:** each artist page has an empty `<section class="artist-gallery">` with an example in the comment above it. Add `<img>` tags inside it and the gallery appears automatically. It stays hidden while it's empty.
- Always write a descriptive `alt`, for example `alt="Jasy performing at The New Classic, Toronto"`.

## Spotify players

`data-spotify-artist="…"` holds the artist's 22-character Spotify ID. To find it in Spotify, open the artist page and choose Share → Copy link to artist; the ID is the part after `/artist/`. An empty ID hides the player.
Players load only when a visitor clicks **Load Spotify player**, so the site makes no requests to Spotify until then.

## Contact form (Web3Forms)

1. The access key is in `contact.html` (`<input type="hidden" name="access_key" …>`). Web3Forms keys are meant to be public, so it's safe in the page. Submissions go to the email address the key was created with (it should be **management@ljprecords.ca**).
2. To change the key, create a new one at <https://web3forms.com> and replace the value.
3. Test it once from the live site.

How it works:
- **Fields:** name, email, artist/project, role and message are required, plus the privacy consent checkbox. The **news checkbox is optional and unticked by default**, as Canada's anti-spam law (CASL) requires. Its value arrives in the email as `news_opt_in: Yes` or `No`. Only add people who ticked it to a mailing list.
- **Spam protection:** a hidden honeypot checkbox (`botcheck`) that bots tick and people never see. Web3Forms rejects those submissions.
- **Without JavaScript,** the form still posts directly to Web3Forms, and the email address is always shown next to the form.

## Decisions I made

- **Shared header and footer** use committed HTML plus an optional Python sync script, not JavaScript includes. Pages work for every visitor and search engine, and there's still no build step on GitHub.
- **Relative links** (`./`, `../`) so the site works on both `ljprecords.ca` and the `github.io` preview address. `404.html` uses root links (`/…`) because GitHub serves it at any address.
- **No Google Fonts or other external requests.** Headings use the Bodoni and Didot system fonts, which are close to the logo's typeface, with serif fallbacks. That keeps the "no tracking" statement in the Privacy Policy true.
- **Mobile menu:** a menu button on small screens. Without JavaScript, the links are simply always shown.
- **Structured data (schema.org):** `Organization` with legal name, Ontario Corporation Number, email and city, plus `WebSite`, on the home page. There's `AboutPage` on About, `MusicGroup` on each artist page, and Windward Audio is marked up as a sub-organization.
- **Artist bios** come only from public sources and the artists' own profiles, with no streaming numbers.

## Hosting setup (one-time)

1. Go to **Settings → Pages**, set Source to **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then click Save.
2. Under **Custom domain**, enter `ljprecords.ca` and save. Once the certificate is issued, tick **Enforce HTTPS**.
3. Set these DNS records at GoDaddy:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | adrianabbas.github.io |

Delete any other existing **A** record for `@`, such as GoDaddy's "Parked" record, and any existing `www` CNAME. **Don't touch MX, TXT (SPF/DKIM/DMARC), or other email records.** Changing them would break management@ljprecords.ca.

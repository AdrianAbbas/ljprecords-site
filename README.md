# ljprecords.ca

The official website of **LJP Records Inc.** (Ontario Corporation Number 1001399729), Mississauga, Ontario, Canada.
It's plain HTML and CSS, hosted free on GitHub Pages. There's no build step and no framework.

## Files

| File | What it is |
|---|---|
| `index.html` | The main page: Hero, About, Artists, Services, Elsewhere Audio, Contact, Footer |
| `privacy.html` | The privacy notice |
| `assets/css/style.css` | All styles. Colours are at the top (`--gold: #bea97e`, `--black`). |
| `assets/js/main.js` | A small script that loads Spotify players when a visitor clicks |
| `assets/img/` | Logo, monogram, favicons and the social-share image, all made from the official logo |
| `assets/photos/` | Put artist photos here |
| `CNAME` | The custom domain (`ljprecords.ca`). Don't edit it. |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Editing text

1. Open `index.html` (on GitHub, click the file, then the pencil icon).
2. Each section is marked with a comment such as `<!-- ============ ABOUT ============ -->`.
3. Change the text between the tags, then commit. The live site updates within about a minute.

Search for `CONFIRM:` to find every statement I've flagged for you to check. Delete each comment once you've reviewed it.

## Adding artist photos

1. Upload a square or landscape photo to `assets/photos/`, for example `jasy.jpg` or `hollowsound.jpg`. Keep it under about 300 KB, around 1200 px wide.
2. In `index.html`, find that artist's `<img class="artist-photo" ...>` and change its `src` to your new file. For a photo, remove the `logo` class so the image fills the frame.
3. Keep the `alt` text descriptive, for example `alt="Jasy performing on stage"`.

## Spotify players

Each artist card has `data-spotify-artist="..."`, which holds the artist's 22-character Spotify ID.
To find it in Spotify, open the artist page and choose **Share → Copy link to artist**. The ID is the part after `/artist/`.
If the ID is empty, the player is hidden. **Both artists' IDs are set.**

Players load only when a visitor clicks **Load Spotify player**. Until then, the site makes no requests to Spotify. That keeps the privacy notice accurate ("no cookies, no tracking").

## Adding an artist

Copy one whole `<article class="artist-card">…</article>` block inside `.artist-grid`, then change the name, the `id`/`aria-labelledby` values, the text, the links and the Spotify ID.

## Decisions I made (no questions asked)

- **No Google Fonts or external requests.** Headings use the Bodoni and Didot system fonts, which are close to the logo's typeface, with serif fallbacks. Body text uses the system sans-serif. Loading Google Fonts sends visitors' IP addresses to Google, which would contradict a "no tracking" privacy notice.
- **Click-to-load Spotify embeds** use Spotify's official `open.spotify.com/embed/artist/…` player, for the same privacy reason.
- **Artist images:** the cards show each artist's logo, supplied by you (`assets/photos/jasy-logo.png`, `assets/photos/hollowsound-logo.jpg`). Nothing is hotlinked.
- **Logo:** the supplied logo was converted to a transparent gold PNG (`logo.png`) so it sits cleanly on the dark background. The favicon uses the LJP monogram only, because the full logo is unreadable at 16–32 px.
- **Label social links** aren't known, so the footer links to the artists' Instagram pages. Add the label's own accounts when you have them.
- **Structured data:** `index.html` includes schema.org `Organization` data (legal name, email, city) to help search engines and verifiers identify the business.
- **The Jasy bio** was written only from public sources: Apple Music, Modern Mississauga, Sauga Arts HUB, The Music Is My Radar and Deezer. **The Hollowsound bio** comes from the band's Spotify bio and hollow-sound.com. Neither includes streaming numbers.

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

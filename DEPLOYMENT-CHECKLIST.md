# Deployment checklist

## HTTPS
Netlify provides HTTPS for `tantitan2010.netlify.app`; this project adds canonical HTTPS URLs, HSTS, and `upgrade-insecure-requests`. The lock icon itself is controlled by the browser, not by page HTML.

## Contact form
The `contact` form uses Netlify Forms and falls back cleanly on non-Netlify hosts. Configure form notifications in the Netlify dashboard after deployment.

## Contact controls
The floating Contact and WhatsApp controls were intentionally removed from the public UI.

## Domain email
A mailbox cannot be activated from the ZIP without a domain and DNS/email-provider account. Use `EMAIL-SETUP.md` after selecting the domain/provider.

## Backups
The repository includes `.github/workflows/backup.yml`; it starts running once the project is in a GitHub repository with Actions enabled.

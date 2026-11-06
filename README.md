# Sito personale

Sito statico, nessuna build. Contenuti in `content.json`, stile in `style.css`.

## Aggiungere un progetto
In `content.json`, dentro `"projects"`, copia un blocco, cambia `slug` (unico, senza spazi),
`group`, `title`, `summary`, `tags` e `body` (un testo per paragrafo). Il progetto compare
in home e ha la sua pagina: `progetto.html?p=<slug>`.

## Anteprima locale
    python -m http.server 8000

## Pubblicazione (Cloudflare Pages + GitHub)
Framework preset: None. Build command: vuoto. Build output directory: `/`.
Ogni `git push` sul ramo principale pubblica il sito.

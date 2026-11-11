# Hearth & Hibiscus · Landingspagina (VERSIE-12)

Statische website (HTML, CSS, een beetje JavaScript), klaar voor GitHub Pages.

## Bestanden
- `index.html` – de landingspagina (hero, intro, smaken, recepten, Instagram, formulier, FAQ, footer)
- `privacy.html` – korte privacyverklaring (link onder het formulier en in de footer)
- `css/style.css` – opmaak volgens Brandmap VERSIE-10 (mobile-first)
- `js/main.js` – controle van het formulier en verzenden naar MailerLite
- `img/` – logo's, productfoto's met logo en Instagram-visuals (verkleind naar WebP)

## MailerLite koppelen
Gekoppeld (VERSIE-6): formulier 203856797690234180 van account 2749290. Het formulier in de huisstijl stuurt naam en e-mail rechtstreeks naar MailerLite; de opmaak uit de MailerLite-embedcode wordt niet gebruikt.

Zelf aanpassen:
1. Maak in MailerLite een embedded formulier met de velden naam en e-mail.
2. Open de embedcode (HTML) en kopieer het adres uit `<form action="https://assets.mailerlite.com/jsonp/.../subscribe">`.
3. Plak het in `js/main.js` bij `MAILERLITE.action`. Dubbele opt-in aan? Zet `doubleOptIn: true`.
Zonder adres staat het formulier in demomodus: alles wordt gecontroleerd en de succesmelding verschijnt, maar er wordt niets verstuurd.

## Online zetten (GitHub Pages)
1. Maak op github.com een nieuwe publieke repository, bv. `hearth-and-hibiscus`.
2. Upload de inhoud van deze map (niet de map zelf): index.html, privacy.html, css, js, img.
3. Settings > Pages > Source: "Deploy from a branch", branch `main`, map `/ (root)`.
4. Na een minuutje staat de site op `https://<gebruikersnaam>.github.io/hearth-and-hibiscus/`.

## Placeholders
- Instagram: @hearthandhibiscus
- Contact: hallo@hearthandhibiscus.be

VERSIE-7: in de sectie "Warm of ijskoud?" staat nu een AI-beeld (Nano Banana 2.1 in Figma Weave, op basis van Product photo-14): de vier doosjes op een houten tafel (img/theemoment-houten-tafel.webp).

VERSIE-8: in de hero staan de sticker "Nieuw!" en de hibiscusbloem achter de doosjes iets hoger.
VERSIE-9: op desktop staat de sticker weer iets lager (op gsm onveranderd).
VERSIE-10: op gsm is de hero-sticker kleiner (70 px i.p.v. 92 px); desktop onveranderd.
VERSIE-11: smaakquiz (pop-up, 5 vragen) achter de knop "Ontdek je smaak" onder de smaakkaarten; code in js/quiz.js.
VERSIE-12: knop onder de smaakkaarten heet nu "Doe de smaakquiz".
VERSIE-13: extra visual in "Beter met z'n allen": keukenbeeld met Chamomile en Ginger (img/theemoment-keuken.webp), foute AI-tekst op de doosjes weggeretoucheerd.
VERSIE-14: origineel keukenbeeld terug (zonder retouche); de 6 Instagram-visuals staan nu als Instagram-postmockups (profielnaam, iconen, vind-ik-leuks, bijschrift) met label "Zo zie je ons op Instagram"; op gsm en tablet swipe je door de posts, op desktop een raster van 3.
VERSIE-15: labeltjes "warm" en "ijs" bij de recepten groter (18 px tekst, ruimere padding) en op een eigen regel boven de titel.
VERSIE-16: labeltjes "warm" en "ijs" staan schuin over de linkerbovenhoek van de receptkaarten.
VERSIE-17: labeltjes "warm" en "ijs" even breed (vaste breedte 96 px, tekst gecentreerd).
VERSIE-18: foto in "Warm of ijskoud" even hoog als de twee receptkaarten op desktop (bijgesneden met object-fit), gsm onveranderd.
VERSIE-19: FAQ schuift zacht open en dicht (hoogte-animatie 0,32 s, tekst vervaagt in beeld, plusje draait mee); bij "minder beweging" in het besturingssysteem werkt de FAQ zonder animatie.
VERSIE-20: dubbele opt-in aan (MAILERLITE.doubleOptIn = true): na inschrijven toont de pagina "Nog één klik!" met de vraag om de bevestigingsmail te openen. Testinschrijving op 11 nov 2026 geslaagd.

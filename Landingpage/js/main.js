/* Hearth & Hibiscus · Landingspagina (VERSIE-6)
   Formulier: controle in de huisstijl + verzenden naar MailerLite. */

/* ------------------------------------------------------------------
   MAILERLITE INSTELLEN
   1. MailerLite > Forms > Embedded forms > je formulier > Overview/Embed > "HTML code".
   2. Kopieer het adres uit <form action="https://assets.mailerlite.com/jsonp/.../subscribe">.
   3. Plak het hieronder bij action.
   4. Staat dubbele opt-in aan in MailerLite? Zet doubleOptIn op true.
   Zolang action leeg is, draait het formulier in demomodus (niets wordt verstuurd).
   ------------------------------------------------------------------ */
const MAILERLITE = {
  action: "https://assets.mailerlite.com/jsonp/2749290/forms/203856797690234180/subscribe",
  // Telt een weergave van het formulier in de MailerLite-statistieken (zoals in de originele embedcode).
  views: "https://assets.mailerlite.com/jsonp/2749290/forms/203856797690234180/takel",
  doubleOptIn: true, // aan in MailerLite (getest 11 nov 2026)
};

const BERICHTEN = {
  naamLeeg: "Hoe mogen we je noemen?",
  emailLeeg: "Vergeet je e-mailadres niet.",
  emailOngeldig: "Hmm, dat e-mailadres klopt nog niet helemaal.",
  optinLeeg: "Vink het vakje aan, dan kunnen we je mailen.",
  technisch: "Oeps, er liep iets mis. Probeer het zo nog eens.",
  succesKop: "Yes, je bent erbij! 🌺",
  succesTekst: "Check je inbox: je welkomstmail is onderweg. Niets gezien? Kijk even in je spam of promoties.",
  dubbelKop: "Nog één klik!",
  dubbelTekst: "We stuurden je een mailtje. Bevestig je inschrijving en je welkomstmail volgt meteen.",
};

const form = document.getElementById("inschrijven");

if (form && MAILERLITE.views) {
  fetch(MAILERLITE.views).catch(() => {});
}
const succes = document.getElementById("succes");

if (form) {
  const velden = {
    naam: form.querySelector("#naam"),
    email: form.querySelector("#email"),
    optin: form.querySelector("#optin"),
  };
  const algemeen = document.getElementById("algemeen-fout");
  const knop = form.querySelector('button[type="submit"]');
  const emailPatroon = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function zetFout(veld, tekst) {
    const p = document.getElementById(veld.id + "-fout");
    p.textContent = tekst || "";
    if (tekst) veld.setAttribute("aria-invalid", "true");
    else veld.removeAttribute("aria-invalid");
  }

  function controleer(veld) {
    if (veld === velden.naam) {
      zetFout(veld, veld.value.trim() ? "" : BERICHTEN.naamLeeg);
    } else if (veld === velden.email) {
      const w = veld.value.trim();
      zetFout(veld, !w ? BERICHTEN.emailLeeg : emailPatroon.test(w) ? "" : BERICHTEN.emailOngeldig);
    } else if (veld === velden.optin) {
      zetFout(veld, veld.checked ? "" : BERICHTEN.optinLeeg);
    }
    return !veld.hasAttribute("aria-invalid");
  }

  // Pas controleren nadat iemand het veld verlaat; daarna live bijwerken.
  Object.values(velden).forEach((veld) => {
    veld.addEventListener("blur", () => { if (veld.type !== "checkbox" && veld.value) controleer(veld); });
    veld.addEventListener("input", () => { if (veld.hasAttribute("aria-invalid")) controleer(veld); });
    veld.addEventListener("change", () => { if (veld.type === "checkbox") controleer(veld); });
  });

  function toonSucces() {
    const kop = document.getElementById("succes-kop");
    const tekst = document.getElementById("succes-tekst");
    if (MAILERLITE.doubleOptIn) {
      kop.textContent = BERICHTEN.dubbelKop;
      tekst.textContent = BERICHTEN.dubbelTekst;
    } else {
      kop.textContent = BERICHTEN.succesKop;
      tekst.textContent = BERICHTEN.succesTekst;
    }
    form.hidden = true;
    succes.hidden = false;
    succes.focus();
  }

  async function verstuur(data) {
    if (!MAILERLITE.action) {
      console.info("[Hearth & Hibiscus] Demomodus: vul MAILERLITE.action in js/main.js in om echt te verzenden.", Object.fromEntries(data));
      await new Promise((r) => setTimeout(r, 600));
      return true;
    }
    try {
      const res = await fetch(MAILERLITE.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) return false;
      const json = await res.json().catch(() => ({}));
      return json.success !== false;
    } catch (e) {
      // Sommige browsers blokkeren het antwoord (CORS). Het verzoek zelf komt dan wel aan bij MailerLite.
      try {
        await fetch(MAILERLITE.action, { method: "POST", body: data, mode: "no-cors" });
        return true;
      } catch (e2) {
        return false;
      }
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    algemeen.textContent = "";

    const ok = [velden.naam, velden.email, velden.optin].map(controleer).every(Boolean);
    if (!ok) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    // Honeypot ingevuld = bot: doe alsof het gelukt is.
    if (form.website.value) { toonSucces(); return; }

    const data = new FormData();
    data.append("fields[name]", velden.naam.value.trim());
    data.append("fields[email]", velden.email.value.trim());
    data.append("ml-submit", "1");
    data.append("anticsrf", "true");

    knop.disabled = true;
    const oudeTekst = knop.textContent;
    knop.textContent = "Even geduld…";

    const gelukt = await verstuur(data);

    knop.disabled = false;
    knop.textContent = oudeTekst;
    if (gelukt) toonSucces();
    else algemeen.textContent = BERICHTEN.technisch;
  });
}

/* FAQ: zacht open- en dichtschuiven (VERSIE-19) */
(() => {
  const rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DUUR = 320;
  const EASE = "cubic-bezier(.4, 0, .2, 1)";
  const faq = document.querySelector(".faq");
  if (!faq || rustig || !Element.prototype.animate) return;
  faq.classList.add("js-faq");
  document.querySelectorAll(".faq details").forEach((det) => {
    const sum = det.querySelector("summary");
    let anim = null;
    sum.addEventListener("click", (e) => {
      e.preventDefault();
      if (anim) anim.cancel();
      det.style.overflow = "hidden";
      const start = det.offsetHeight;
      const opent = !det.classList.contains("is-open");
      if (opent) det.open = true;
      void det.offsetHeight; // zodat de tekst vanuit onzichtbaar in beeld komt
      const rand = det.offsetHeight - det.clientHeight; // randlijnen
      const eind = (opent ? det.scrollHeight : sum.offsetHeight) + rand;
      det.classList.toggle("is-open", opent);
      anim = det.animate({ height: [start + "px", eind + "px"] }, { duration: DUUR, easing: EASE });
      anim.onfinish = () => {
        if (!opent) det.open = false;
        det.style.overflow = "";
        anim = null;
      };
    });
  });
})();

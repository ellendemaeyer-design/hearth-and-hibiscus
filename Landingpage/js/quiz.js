/* Hearth & Hibiscus · Smaakquiz (VERSIE-12)
   Elk antwoord geeft één punt aan een smaak. Bij gelijke stand wint het antwoord op de smaakvraag (vraag 2). */

const SMAKEN = {
  green: {
    naam: "Green Tea", label: "Green Tea & Lemongrass", foto: "img/green-tea.webp",
    tekst: "Fris en licht. Voor wie houdt van iets puurs dat je wakker zet zonder drama.",
    tip: "ijskoud met een schijfje citroen.",
  },
  chamomile: {
    naam: "Chamomile", label: "Chamomile & Honey", foto: "img/chamomile.webp",
    tekst: "Zacht en zonnig. Je warme dekentje in een kop, perfect na een lange dag.",
    tip: "warm, met een lepeltje honing.",
  },
  ginger: {
    naam: "Ginger", label: "Ginger & Turmeric", foto: "img/ginger.webp",
    tekst: "Pittig, met een kick. Voor wie zin heeft in iets met karakter.",
    tip: "als ijsthee met sinaasappel.",
  },
  rooibos: {
    naam: "Rooibos", label: "Rooibos & Forest Berries", foto: "img/rooibos.webp",
    tekst: "Rond en vol. Zacht van smaak en mooi diep van kleur, ideaal voor een avond met vrienden.",
    tip: "warm of koud, zonder cafeïne.",
  },
};

const VRAGEN = [
  {
    vraag: "Wanneer drink jij het liefst iets lekkers?",
    antwoorden: [
      ["'s Ochtends, om wakker te worden", "green"],
      ["'s Avonds, in de zetel", "chamomile"],
      ["Tijdens de blok, als je een boost nodig hebt", "ginger"],
      ["Op kot, met vrienden", "rooibos"],
    ],
  },
  {
    vraag: "Wat wil je proeven als je een slok neemt?",
    antwoorden: [
      ["Iets fris, met een citroentje", "green"],
      ["Iets zachts, met een vleugje honing", "chamomile"],
      ["Iets pittigs dat lekker prikkelt", "ginger"],
      ["Iets fruitigs, vol rode bessen", "rooibos"],
    ],
  },
  {
    vraag: "Warm of ijskoud?",
    antwoorden: [
      ["IJskoud, met citroen", "green"],
      ["Warm, onder een dekentje", "chamomile"],
      ["IJsthee, met sinaasappel", "ginger"],
      ["Maakt niet uit, allebei top", "rooibos"],
    ],
  },
  {
    vraag: "Welke snack pak jij erbij?",
    antwoorden: [
      ["Een frisse fruitsalade", "green"],
      ["Een koekje met honing", "chamomile"],
      ["Iets met speculaas of gember", "ginger"],
      ["Chocolade met rood fruit", "rooibos"],
    ],
  },
  {
    vraag: "Mag er een beetje cafeïne in?",
    antwoorden: [
      ["Ja, een opkikker is welkom", "green"],
      ["Liever niet, het is al laat", "chamomile"],
      ["Maakt niet uit, als het maar pittig is", "ginger"],
      ["Nee, liefst cafeïnevrij", "rooibos"],
    ],
  },
];

(function () {
  const dialog = document.getElementById("quiz");
  if (!dialog) return;
  const inhoud = document.getElementById("quiz-inhoud");
  const stap = document.getElementById("quiz-stap");
  const balk = document.getElementById("quiz-balk");
  let huidige = 0;
  let keuzes = [];

  function start() {
    huidige = 0;
    keuzes = [];
    toonVraag();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("quiz-open");
  }

  function sluit() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function toonVraag() {
    const v = VRAGEN[huidige];
    dialog.className = "quiz";
    stap.textContent = `Vraag ${huidige + 1} van ${VRAGEN.length}`;
    balk.style.width = `${(huidige / VRAGEN.length) * 100}%`;
    inhoud.innerHTML = `
      <h2 class="quiz__vraag" id="quiz-kop" tabindex="-1">${v.vraag}</h2>
      <div class="quiz__antwoorden">
        ${v.antwoorden.map(([tekst, smaak]) => `<button type="button" class="quiz__antwoord" data-smaak="${smaak}">${tekst}</button>`).join("")}
      </div>`;
    inhoud.querySelectorAll(".quiz__antwoord").forEach((knop) => {
      knop.addEventListener("click", () => kies(knop.dataset.smaak));
    });
    inhoud.querySelector(".quiz__vraag").focus();
  }

  function kies(smaak) {
    keuzes.push(smaak);
    huidige += 1;
    if (huidige < VRAGEN.length) toonVraag();
    else toonUitslag();
  }

  function winnaar() {
    const punten = { green: 0, chamomile: 0, ginger: 0, rooibos: 0 };
    keuzes.forEach((s) => { punten[s] += 1; });
    const max = Math.max(...Object.values(punten));
    const kandidaten = Object.keys(punten).filter((s) => punten[s] === max);
    if (kandidaten.length === 1) return kandidaten[0];
    return kandidaten.includes(keuzes[1]) ? keuzes[1] : kandidaten[0];
  }

  function toonUitslag() {
    const sleutel = winnaar();
    const s = SMAKEN[sleutel];
    dialog.className = `quiz quiz--uitslag quiz--${sleutel}`;
    stap.textContent = "Jouw smaak";
    balk.style.width = "100%";
    inhoud.innerHTML = `
      <p class="quiz__label">${s.label}</p>
      <h2 class="quiz__vraag quiz__smaak" id="quiz-kop" tabindex="-1">Jij bent team ${s.naam}!</h2>
      <p class="quiz__tekst">${s.tekst}</p>
      <img class="quiz__foto" src="${s.foto}" alt="Doosje ${s.label} met een theezakje" width="600" height="500">
      <p class="quiz__tip"><strong>Lekker:</strong> ${s.tip}</p>
      <a href="#doe-mee" class="btn btn--primair btn--breed" data-quiz-naar-form>Proef als eerste mee</a>`;
    inhoud.querySelector("[data-quiz-naar-form]").addEventListener("click", (e) => {
      e.preventDefault();
      sluit();
      document.getElementById("doe-mee").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { const naam = document.getElementById("naam"); if (naam) naam.focus({ preventScroll: true }); }, 600);
    });
    inhoud.querySelector(".quiz__smaak").focus();
  }

  document.querySelectorAll("[data-quiz-open]").forEach((knop) => {
    knop.addEventListener("click", (e) => { e.preventDefault(); start(); });
  });
  dialog.querySelectorAll("[data-quiz-close]").forEach((knop) => knop.addEventListener("click", sluit));
  // Klik op de donkere achtergrond sluit de quiz.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) sluit(); });
  dialog.addEventListener("close", () => document.body.classList.remove("quiz-open"));
})();

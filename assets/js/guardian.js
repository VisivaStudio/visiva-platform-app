document.addEventListener("DOMContentLoaded", () => {
  const restrictedTerms = [
    "tooltip",
    "celebration",
    "casual",
    "gamified",
    "overview",
    "experience",
    "preview"
  ];

  const bodyText = document.body.textContent.toLowerCase();

  restrictedTerms.forEach((term) => {
    if (bodyText.includes(term)) {
      console.warn(`VISIVA® Governance Alert: restricted term detected — "${term}".`);
    }
  });

  console.log("VISIVA® Governance Systems Active.");
});

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("lang-toggle");
  const enContent = document.getElementById("en-content");
  const esContent = document.getElementById("es-content");
  const mainTitle = document.getElementById("main-title");
  const subtitle = document.getElementById("subtitle");

  let isEnglish = true;

  langToggle.addEventListener("click", () => {
    isEnglish = !isEnglish;

    if (isEnglish) {
      langToggle.textContent = "Español";
      enContent.style.display = "block";
      esContent.style.display = "none";
      mainTitle.textContent = "Oscar Mochizaki";
      subtitle.textContent = "Software Developer | Computer Science Student";
    } else {
      langToggle.textContent = "English";
      enContent.style.display = "none";
      esContent.style.display = "block";
      mainTitle.textContent = "Oscar Mochizaki";
      subtitle.textContent = "Desarrollador de software | Estudiante de Ciencias de la Computación";
    }
  });
});


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

// Antes de vaciar el mensaje, aplica efecto de desvanecer
setTimeout(() => {
  messageBox.style.opacity = "0";
  setTimeout(() => {
    messageBox.innerHTML = "";
    messageBox.style.opacity = "1"; // restaurar para la próxima vez
  }, 500); // esperar a que termine la transición
}, 5000);


document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("aboutBtn");
  const aboutMessage = document.getElementById("aboutMessage");

  aboutBtn.addEventListener("click", () => {
    // Mostrar mensaje
    aboutMessage.innerHTML = `
      <p>
        Hello! I'm Oscar Mochizaki, founder of CodingSoft. I’m passionate about creating modern, scalable web solutions.
        With experience in full-stack development, APIs, and cloud infrastructure, I help turn ideas into efficient technology.
      </p>
    `;

    // Hacer que desaparezca después de 5 segundos
    setTimeout(() => {
      aboutMessage.style.opacity = "0";
      setTimeout(() => {
        aboutMessage.innerHTML = "";
        aboutMessage.style.opacity = "1";
      }, 500);
    }, 5000);
  });
});

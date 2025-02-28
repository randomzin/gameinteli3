document.addEventListener("DOMContentLoaded", () => {
  // 1. Preparar cada explanation para o efeito de digitação
  const explanations = document.querySelectorAll(".explanation");
  explanations.forEach((ex) => {
    // Guardamos o texto inteiro num data-attribute
    ex.dataset.fulltext = ex.textContent.trim();
    // Limpamos o conteúdo do <small> (ou qualquer que seja)
    // para depois ser preenchido de forma "digitada".
    ex.textContent = "";
  });

  // 2. Seleciona todos .mandamento
  const mandamentoTitles = document.querySelectorAll(".mandamento");

  mandamentoTitles.forEach((title) => {
    title.addEventListener("click", () => {
      // O <small> (explanation) é o próximo irmão
      const explanation = title.nextElementSibling;

      // Ícone de laboratório
      const labIcon = title.querySelector(".icon-lab");

      // Verifica se está aberto
      const isOpen = explanation.classList.contains("open");

      if (isOpen) {
        // Se já estiver aberto, vamos fechá-lo
        explanation.classList.remove("open");
        labIcon.classList.remove("rotated");

        // Limpamos o texto para quando abrir de novo, digitar do zero
        explanation.textContent = "";
      } else {
        // Se estiver fechado, abrimos e iniciamos o efeito de digitação
        explanation.classList.add("open");
        labIcon.classList.add("rotated");

        // Iniciar digitação
        typeText(explanation, explanation.dataset.fulltext, 0);
      }
    });
  });
});

/**
 * Função para "digitar" o texto caractere por caractere
 * @param {HTMLElement} element - o elemento onde o texto será digitado
 * @param {string} fullText - o texto completo a ser "digitado"
 * @param {number} index - posição atual
 */
function typeText(element, fullText, index) {
  // Velocidade de digitação (ms)
  const typingSpeed = 30; // ajuste conforme desejar (30ms, 50ms, etc.)

  if (index < fullText.length) {
    // Adiciona o próximo caractere
    element.innerHTML = fullText.substring(0, index + 1) + `<span class="cursor"></span>`;

    // Próximo caractere
    setTimeout(() => {
      typeText(element, fullText, index + 1);
    }, typingSpeed);
  } else {
    // Remove o cursor ao final
    element.innerHTML = fullText;
  }
}

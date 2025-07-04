let currentPortfolio = null;
const clickSound = new Audio("assets/beep.mp3");
clickSound.volume = 0.2;
let hasBeeped = false;

function showPortfolio(name, element) {
   if (!hasBeeped) {
    clickSound.play();
    hasBeeped = true;
  }
  const leftPanel = document.getElementById('leftPanel');
  const rightPanel = document.getElementById('rightPanel');
  const content = document.getElementById('portfolioContent');

  const isSame = currentPortfolio === name;

  document.querySelectorAll('.portfolio-list li').forEach(li => li.classList.remove('active'));

  if (isSame) {
    leftPanel.classList.remove('shifted');
    rightPanel.classList.remove('visible');
    currentPortfolio = null;
    return;
  }

  currentPortfolio = name;
  element.classList.add('active');
  leftPanel.classList.add('shifted');
  rightPanel.classList.add('visible');

  fetch(`contents/${name}/data.json`)
    .then(res => res.json())
    .then(data => {
      const screenshotClass = data.type === "mobile" ? "mobile" : "website";

      content.innerHTML = `
        <h2>${data.title}</h2>
        <div class="meta"><strong>Release date:</strong> ${data.releaseDate}</div>
        <div class="description">${data.description}</div>

        <div class="media">
          <div>
            <div class="tech-stack">
              <strong>Tech stacks:</strong><br>
              ${data.techStack.map(t => `<span>${t}</span>`).join('')}
            </div>
            <a class="visit-btn" href="${data.buttonLink}" target="_blank">${data.buttonText}</a>
          </div>
          <div class="screenshot-container ${screenshotClass}">
            <img src="contents/${name}/screenshot.jpg" alt="Screenshot" />
          </div>
        </div>
      `;
    })
    .catch(err => {
      content.innerHTML = `<p style="color: red;">Failed to load project data.</p>`;
      console.error(err);
    });
}

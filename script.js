function showPortfolio(name, element) {
  const leftPanel = document.getElementById('leftPanel');
  const rightPanel = document.getElementById('rightPanel');
  const content = document.getElementById('portfolioContent');

  // Highlight active
  document.querySelectorAll('.portfolio-list li').forEach(li => li.classList.remove('active'));
  if (element) element.classList.add('active');

  // Animate
  leftPanel.classList.add('shifted');
  rightPanel.classList.add('visible');

  fetch(`contents/${name}/data.json`)
    .then(res => res.json())
    .then(data => {
      content.innerHTML = `
        <div class="portfolio-section">
          <h2>${data.title}</h2>
          <div class="meta"><strong>Release:</strong> ${data.releaseDate}</div>
          <div class="description">${data.description}</div>
          <div class="media">
            <img src="contents/${name}/screenshot.png" width="250" />
            <img src="contents/${name}/logo.png" width="60" />
          </div>
          <div class="tech-stack">
            <strong>Tech stacks:</strong><br/>
            ${data.techStack.map(t => `<span>${t}</span>`).join('')}
          </div>
          <a class="visit-btn" href="${data.buttonLink}" target="_blank">${data.buttonText}</a>
        </div>
      `;
    });
}

function hidePortfolio() {
  document.getElementById('leftPanel').classList.remove('shifted');
  document.getElementById('rightPanel').classList.remove('visible');
  document.querySelectorAll('.portfolio-list li').forEach(li => li.classList.remove('active'));
}

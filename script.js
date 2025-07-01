let currentPortfolio = null;

function showPortfolio(name, element) {
  const leftPanel = document.getElementById('leftPanel');
  const rightPanel = document.getElementById('rightPanel');
  const content = document.getElementById('portfolioContent');

  // If the same portfolio is clicked again, close the panel
  const isSame = currentPortfolio === name;

  // Remove active state from all items
  document.querySelectorAll('.portfolio-list li').forEach(li => li.classList.remove('active'));

  if (isSame) {
    // Hide panel and reset
    leftPanel.classList.remove('shifted');
    rightPanel.classList.remove('visible');
    currentPortfolio = null;
    return;
  }

  // Mark this as the current selection
  currentPortfolio = name;

  // Highlight the clicked item
  if (element) element.classList.add('active');

  // Animate layout
  leftPanel.classList.add('shifted');
  rightPanel.classList.add('visible');

  // Load content from JSON
  fetch(`contents/${name}/data.json`)
    .then(res => {
      if (!res.ok) throw new Error("Portfolio data not found.");
      return res.json();
    })
    .then(data => {
      content.innerHTML = `
        <h2>${data.title}</h2>
        <div class="meta"><strong>Release date:</strong> ${data.releaseDate}</div>
        <div class="description">${data.description}</div>

        <div class="media">
          <img src="contents/${name}/screenshot.png" alt="Screenshot" width="220" height="120" />
          <img src="contents/${name}/logo.png" alt="Logo" width="60" height="60" />
        </div>

        <div class="tech-stack">
          <strong>Tech stacks:</strong><br>
          ${data.techStack.map(t => `<span>${t}</span>`).join('')}
        </div>

        <a class="visit-btn" href="${data.buttonLink}" target="_blank">${data.buttonText}</a>
      `;
    })
    .catch(err => {
      content.innerHTML = `<p style="color: red;">Failed to load project data.</p>`;
      console.error(err);
    });
}

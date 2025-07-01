function loadContent(projectName) {
  const sidebar = document.getElementById('sidebar');
  const panel = document.getElementById('contentPanel');

  fetch(`contents/${projectName}/data.json`)
    .then(res => res.json())
    .then(data => {
      panel.classList.remove('hidden');
      sidebar.classList.add('shrink');
      panel.classList.add('show');

      panel.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>Release date:</strong> ${data.releaseDate}</p>
        <p>${data.description}</p>
        <div style="display:flex; gap:1rem; align-items:center; justify-content:center; flex-wrap:wrap; margin-top:1rem;">
          <img src="contents/${projectName}/logo.png" alt="Logo" width="50" height="50">
          <img src="contents/${projectName}/screenshot.png" alt="Screenshot" width="200">
        </div>
        <h4 style="margin-top:1rem;">Tech stacks</h4>
        <p>${data.techStack.join(', ')}</p>
        <a href="${data.buttonLink}" target="_blank">
          <button style="margin-top:1rem;">${data.buttonText}</button>
        </a>
      `;
    })
    .catch(() => alert('Failed to load project.'));
}

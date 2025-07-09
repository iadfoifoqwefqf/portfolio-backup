// 🔊 Audio setup
const clickSound = new Audio("assets/beep.mp3");
clickSound.volume = 0.2;

// 💾 Track open/close state
let currentPortfolio = null;
let boxIsOpen = false;

// 📁 Project metadata (static)
const projects = [
  { id: 'calculatto', title: 'CalcuLatto', type: 'mobile' },
  { id: 'billant', title: 'Billant', type: 'website' },
  { id: 'jdih', title: 'JDIH', type: 'website' }
];

// 🎯 Active category filters
let activeCategories = ['mobile', 'website'];

// 🔘 Toggle category filters
function toggleCategory(type) {
  const index = activeCategories.indexOf(type);
  const toggleBtn = document.getElementById(type === 'mobile' ? 'mobileToggle' : 'webToggle');

  if (index !== -1) {
    activeCategories.splice(index, 1);
    toggleBtn.classList.remove('active');
  } else {
    activeCategories.push(type);
    toggleBtn.classList.add('active');
  }

  updateProjectList();
}

// 🔁 Update portfolio list based on filters
function updateProjectList() {
  const list = document.querySelector('.portfolio-list');
  list.innerHTML = '';

  projects
    .filter(p => activeCategories.includes(p.type))
    .forEach(p => {
      const li = document.createElement('li');
      li.textContent = p.title;
      li.onclick = () => showPortfolio(p.id, li);
      list.appendChild(li);
    });
}

// 📦 Load and show portfolio content
function showPortfolio(name, element) {
  const leftPanel = document.getElementById('leftPanel');
  const rightPanel = document.getElementById('rightPanel');
  const content = document.getElementById('portfolioContent');

  const isSame = currentPortfolio === name;

  // Clear selection from all list items
  document.querySelectorAll('.portfolio-list li').forEach(li => li.classList.remove('active'));

  if (isSame) {
    // 🔒 Close the box
    leftPanel.classList.remove('shifted');
    rightPanel.classList.remove('visible');
    currentPortfolio = null;
    boxIsOpen = false;
    return;
  }

  // 🔊 Only beep when box is opening from closed state
  if (!boxIsOpen) {
    clickSound.currentTime = 0;
    clickSound.play();
    boxIsOpen = true;
  }

  // ✅ Show box and load content
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

// 🟢 Load portfolio list on first page load
updateProjectList();

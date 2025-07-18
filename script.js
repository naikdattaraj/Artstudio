// 🖌️ Canvas interaction
const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let drawingEnabled = false; // Controls whether drawing mode is active

canvas.addEventListener('mousedown', () => {
  if (drawingEnabled) isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
  isDrawing = false;
});

canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing || !drawingEnabled) return;
  const x = event.offsetX;
  const y = event.offsetY;
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${random()}, ${random()}, ${random()}, 0.2)`;
  ctx.fill();
});

// 🎇 Click burst effect
canvas.addEventListener('click', (e) => {
  const centerX = e.offsetX;
  const centerY = e.offsetY;
  for (let i = 0; i < 50; i++) {
    const angle = 0.1 * i;
    const x = centerX + (1 + angle) * Math.cos(angle) * 10;
    const y = centerY + (1 + angle) * Math.sin(angle) * 10;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${i * 7}, 100%, 60%)`;
    ctx.fill();
  }
});

function random() {
  return Math.floor(Math.random() * 255);
}

// ✏️ Toggle draw mode with UI feedback
const drawBtn = document.getElementById('draw-toggle');
drawBtn.addEventListener('click', () => {
  drawingEnabled = !drawingEnabled;
  drawBtn.textContent = drawingEnabled ? '🛑 Stop Drawing' : '✏️ Start Drawing';
  canvas.style.boxShadow = drawingEnabled ? '0 0 12px limegreen' : '0 0 6px var(--highlight)';
});

// 💾 Save canvas as image
document.getElementById('save-btn').addEventListener('click', () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "my-artwork.png";
  link.href = image;
  link.click();
});

// 📷 Image Upload
const uploadInput = document.getElementById('upload');
const uploadGallery = document.getElementById('uploaded-gallery');

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const imgUrl = URL.createObjectURL(file);
    const imgEl = document.createElement('img');
    imgEl.src = imgUrl;
    imgEl.classList.add('uploaded-art');
    imgEl.alt = "User uploaded artwork";
    uploadGallery.appendChild(imgEl);
  }
});

// ⭐ Favorites
function favoriteArt(id) {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favs.includes(id)) favs.push(id);
  localStorage.setItem('favorites', JSON.stringify(favs));

  const el = document.querySelector(`.art-piece:nth-child(${id})`);
  if (el) {
    el.style.background = 'gold';
    el.style.boxShadow = '0 0 10px gold';
  }
}

function showFavorites() {
  const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (favs.length === 0) {
    alert("No favorites yet!");
  } else {
    alert("Favorite Pieces: " + favs.join(', '));
  }
}

// 🌗 Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-theme', savedTheme === 'light');
  toggleBtn.textContent = savedTheme === 'light' ? '🌙 Dark Mode' : '🔆 Light Mode';
});

toggleBtn.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  toggleBtn.textContent = isLight ? '🌙 Dark Mode' : '🔆 Light Mode';
});
const STORAGE_KEY = "Movie-Entries";

function loadMovies() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Could not read saved movies:", err);
    return [];
  }
}

function saveMovies(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

// ---------- State ----------
let movies = loadMovies();
let editingId = null;

// ---------- Helpers ----------
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------- DOM references ----------
const form = document.getElementById("movie-form");
const formTitle = document.getElementById("movie-title"); // heading of the form
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-edit");
const list = document.getElementById("movie-list");
const emptyMsg = document.getElementById("empty-msg");

// ---------- Render ----------
function renderMovie() {
  list.innerHTML = "";

  if (movies.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  const sorted = [...movies].sort((a, b) => b.createdAt - a.createdAt);

  sorted.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <span class="badge">${escapeHtml(movie.status)}</span>
      <h3>${escapeHtml(movie.title)}</h3>
      ${movie.feedback ? `<p>${escapeHtml(movie.feedback)}</p>` : ""}
      <button class="edit-btn" data-id="${movie.id}">Edit</button>
      <button class="delete-btn" data-id="${movie.id}">Delete</button>
    `;
    list.appendChild(card);
  });
}

// ---------- Actions ----------
function resetForm() {
  form.reset();
  editingId = null;
  formTitle.textContent = "Add Movie";
  submitBtn.textContent = "Save Movie";
  cancelBtn.style.display = "none";
}

function editEntries(id) {
  const movie = movies.find((m) => m.id === id);
  if (!movie) return;

  editingId = id;
  document.getElementById("title").value = movie.title;
  document.getElementById("status").value = movie.status;
  document.getElementById("feedback").value = movie.feedback;

  formTitle.textContent = "Edit Movie";
  submitBtn.textContent = "Update Movie";
  cancelBtn.style.display = "inline-block";
}

function deleteEntries(id) {
  movies = movies.filter((m) => m.id !== id);
  saveMovies(movies);
  if (editingId === id) resetForm();
  renderMovie();
}

// ---------- Events ----------
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  if (!title) return;

  const existing = editingId ? movies.find((m) => m.id === editingId) : null;

  const newMovie = {
    id: editingId || crypto.randomUUID(),
    title,
    status: document.getElementById("status").value,
    feedback: document.getElementById("feedback").value.trim(),
    createdAt: existing ? existing.createdAt : Date.now(),
  };

  if (editingId) {
    movies = movies.map((m) => (m.id === editingId ? newMovie : m));
  } else {
    movies.push(newMovie);
  }

  saveMovies(movies);   // save first
  renderMovie();        // then render
  resetForm();
});

// Registered ONCE, outside renderMovie
list.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (editBtn) editEntries(editBtn.dataset.id);
  if (deleteBtn) deleteEntries(deleteBtn.dataset.id);
});

cancelBtn.addEventListener("click", resetForm);

// ---------- Init ----------
renderMovie();
resetForm(); // makes sure the cancel button starts hidden
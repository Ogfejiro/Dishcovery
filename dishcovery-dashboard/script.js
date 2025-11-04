// =====================
// Sidebar + Page Switching + Search
// =====================

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const toggleSidebarBtn = document.querySelector(".toggle-sidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");

function hideSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });
}
if (closeSidebarBtn) {
  closeSidebarBtn.addEventListener("click", hideSidebar);
}
if (overlay) {
  overlay.addEventListener("click", hideSidebar);
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const targetPage = link.getAttribute("data-page");
    if (targetPage === "add") {
      window.location.href = "../admin-dashboard/admin.html";
      return;
    }

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    pages.forEach(p => p.classList.remove("active-page"));
    const pageSection = document.getElementById(`${targetPage}Page`);
    if (pageSection) pageSection.classList.add("active-page");

    const allFilters = document.querySelectorAll(".topbar .filters");
    allFilters.forEach(filters => {
      filters.style.display = targetPage === "search" ? "none" : "flex";
    });

    hideSidebar();
  });
});

// =====================
// API Connection
// =====================

const API_BASE = "https://dishcovery-backend-2-0.onrender.com/api";
const homeRecipes = document.getElementById("homeRecipes");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

async function loadRecipes() {
  try {
    const res = await fetch(`${API_BASE}/recipes`);
    const data = await res.json();

    homeRecipes.innerHTML = "";

    if (!data || data.length === 0) {
      homeRecipes.innerHTML = `<p style="text-align:center; color:#777;">No recipes found yet.</p>`;
      return;
    }

    data.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");
      card.dataset.name = recipe.name.toLowerCase();
      card.dataset.category = recipe.category?.toLowerCase() || "uncategorized";

      card.innerHTML = `
        <img src="${recipe.image || 'placeholder1.jpg'}" alt="${recipe.name}" />
        <div class="recipe-info">
          <button class="tag">${recipe.category || "Uncategorized"}</button>
          <h3>${recipe.name}</h3>
          <p class="meta"><i class="fa-regular fa-clock"></i> ${recipe.cookingTime || 'N/A'} mins 🇳🇬</p>
          <p class="desc">${recipe.description || 'No description available.'}</p>
        </div>
      `;
      homeRecipes.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading recipes:", err);
    homeRecipes.innerHTML = `<p style="text-align:center; color:red;">Failed to load recipes.</p>`;
  }
}

// =====================
// Search functionality
// =====================

if (searchInput) {
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    try {
      const res = await fetch(`${API_BASE}/recipes`);
      const data = await res.json();

      const matched = data.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.category?.toLowerCase().includes(query)
      );

      if (matched.length > 0) {
        matched.forEach(recipe => {
          const card = document.createElement("div");
          card.classList.add("recipe-card");
          card.innerHTML = `
            <img src="${recipe.image || 'placeholder1.jpg'}" alt="${recipe.name}" />
            <div class="recipe-info">
              <button class="tag">${recipe.category || "Uncategorized"}</button>
              <h3>${recipe.name}</h3>
              <p class="meta"><i class="fa-regular fa-clock"></i> ${recipe.cookingTime || 'N/A'} mins 🇳🇬</p>
              <p class="desc">${recipe.description || 'No description available.'}</p>
            </div>
          `;
          searchResults.appendChild(card);
        });
      } else {
        searchResults.innerHTML = `<p style="text-align:center; color:#777;">No results found.</p>`;
      }
    } catch (err) {
      console.error("Error during search:", err);
      searchResults.innerHTML = `<p style="text-align:center; color:red;">Failed to search recipes.</p>`;
    }
  });
}

// Initial load
loadRecipes();

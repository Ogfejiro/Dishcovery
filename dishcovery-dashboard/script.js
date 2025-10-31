// =====================
// Sidebar + Page Switching + Search
// =====================

// Grab all nav links and pages
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

// Sidebar elements
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");
const toggleSidebarBtn = document.querySelector(".toggle-sidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");

// Hide sidebar
function hideSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// Toggle sidebar for mobile
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

// PAGE SWITCHING
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Redirect "Add Recipe" to admin dashboard
    const targetPage = link.getAttribute("data-page");
    if (targetPage === "add") {
      window.location.href = "../admin-dashboard/admin.html";
      return;
    }

    // Remove all active links, add to clicked
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Hide all pages, show the selected one
    pages.forEach(p => p.classList.remove("active-page"));
    const pageSection = document.getElementById(`${targetPage}Page`);
    if (pageSection) pageSection.classList.add("active-page");

    // Hide/show the top filters
    const allFilters = document.querySelectorAll(".topbar .filters");
    allFilters.forEach(filters => {
      if (targetPage === "search") {
        filters.style.display = "none"; // hide filters on search page
      } else {
        filters.style.display = "flex"; // show filters elsewhere
      }
    });

    hideSidebar();
  });
});

// =====================
// SEARCH FUNCTIONALITY
// =====================

// Elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const allRecipes = document.querySelectorAll("#homeRecipes .recipe-card");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    const matched = [...allRecipes].filter(recipe => {
      const name = recipe.dataset.name.toLowerCase();
      const category = recipe.dataset.category.toLowerCase();
      return name.includes(query) || category.includes(query);
    });

    if (matched.length > 0) {
      matched.forEach(recipe => {
        const clone = recipe.cloneNode(true);
        searchResults.appendChild(clone);
      });
    } else {
      searchResults.innerHTML = `<p style="text-align:center; color:#777; font-size:0.95rem;">No results found.</p>`;
    }
  });
}

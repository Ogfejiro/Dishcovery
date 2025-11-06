document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleSidebarBtn = document.getElementById("toggleSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");

  const homeRecipes = document.getElementById("homeRecipes");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const categoryButtons = document.querySelectorAll(".filter-btn");

  // ===============================
  // DUMMY DATA (12 RECIPES)
  // ===============================
  const DUMMY_RECIPES = [
    { _id: "r1", name: "Classic Chicken Curry", category: "Lunch", cookingTime: "40", description: "A rich Indian chicken curry.", image: "https://images.unsplash.com/photo-1574747754350-b08e7c1c0453?fit=crop&w=800&q=80" },
    { _id: "r2", name: "Vegan Power Smoothie", category: "Drinks", cookingTime: "0", description: "A green smoothie packed with nutrients.", image: "https://images.unsplash.com/photo-1505253716333-e69a7c7c0067?fit=crop&w=800&q=80" },
    { _id: "r3", name: "Spicy Beef Tacos", category: "Dinner", cookingTime: "15", description: "Seasoned ground beef tacos.", image: "https://images.unsplash.com/photo-1565299624942-4386a4548078?fit=crop&w=800&q=80" },
    { _id: "r4", name: "Baked Salmon with Asparagus", category: "Dinner", cookingTime: "25", description: "Salmon fillets and asparagus.", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fit=crop&w=800&q=80" },
    { _id: "r5", name: "Quick Chocolate Chip Cookies", category: "Snacks", cookingTime: "12", description: "Soft and chewy cookies.", image: "https://images.unsplash.com/photo-1558359419-5a507e15e2e8?fit=crop&w=800&q=80" },
    { _id: "r6", name: "Fluffy Pancakes", category: "Breakfast", cookingTime: "15", description: "Light, fluffy pancakes.", image: "https://images.unsplash.com/photo-1545620869-d3e98627341e?fit=crop&w=800&q=80" },
    { _id: "r7", name: "Creamy Tomato Pasta", category: "Dinner", cookingTime: "20", description: "Pasta with tomato cream sauce.", image: "https://images.unsplash.com/photo-1608885741005-728448ac8c13?fit=crop&w=800&q=80" },
    { _id: "r8", name: "Lentil Soup", category: "Lunch", cookingTime: "45", description: "Vegetarian lentil soup.", image: "https://images.unsplash.com/photo-1555236710-1845f062d189?fit=crop&w=800&q=80" },
    { _id: "r9", name: "Avo Toast with Feta", category: "Breakfast", cookingTime: "0", description: "Avocado toast with feta.", image: "https://images.unsplash.com/photo-1552554522-68c818043681?fit=crop&w=800&q=80" },
    { _id: "r10", name: "Caprese Salad", category: "Lunch", cookingTime: "0", description: "Tomatoes, mozzarella, basil.", image: "https://images.unsplash.com/photo-1603046891910-3e71c52a4e6b?fit=crop&w=800&q=80" },
    { _id: "r11", name: "Strawberry Smoothie", category: "Drinks", cookingTime: "0", description: "Fresh strawberry smoothie.", image: "https://images.unsplash.com/photo-1586201375761-83865001a3a6?fit=crop&w=800&q=80" },
    { _id: "r12", name: "Grilled Chicken Salad", category: "Lunch", cookingTime: "15", description: "Chicken salad with greens.", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?fit=crop&w=800&q=80" }
  ];

  window.allRecipes = DUMMY_RECIPES;

  // ===============================
  // SIDEBAR TOGGLE
  // ===============================
  function hideSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
  toggleSidebarBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });
  closeSidebarBtn.addEventListener("click", hideSidebar);
  overlay.addEventListener("click", hideSidebar);

  // ===============================
  // NAVIGATION
  // ===============================
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetPage = link.dataset.page;

      // Add Recipe link should go to inactive.html
      if (targetPage === "add-recipe") return;

      e.preventDefault();
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      pages.forEach(p => p.classList.remove("active-page"));
      const pageSection = document.getElementById(`${targetPage}Page`);
      if (pageSection) pageSection.classList.add("active-page");

      hideSidebar();
    });
  });

  // ===============================
  // CREATE RECIPE CARD
  // ===============================
  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.dataset.category = recipe.category;

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-info">
        <button class="tag">${recipe.category}</button>
        <h3>${recipe.name}</h3>
        <p class="meta"><i class="fa-regular fa-clock"></i> ${recipe.cookingTime} mins</p>
        <p class="desc">${recipe.description}</p>
      </div>
    `;
    return card;
  }

  function renderRecipes(data, targetElement) {
    targetElement.innerHTML = "";
    if (!data.length) {
      targetElement.innerHTML = `<p style="text-align:center; color:#777; margin-top:30px;">No recipes found.</p>`;
      return;
    }
    data.forEach(recipe => targetElement.appendChild(createRecipeCard(recipe)));
  }

  renderRecipes(window.allRecipes, homeRecipes);

  // ===============================
  // CATEGORY FILTER
  // ===============================
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterCat = btn.dataset.filter.toLowerCase();
      const filtered = window.allRecipes.filter(r => r.category.toLowerCase() === filterCat || filterCat === "all");
      renderRecipes(filtered, homeRecipes);
      pages.forEach(p => p.classList.remove("active-page"));
      document.getElementById("homePage").classList.add("active-page");
    });
  });

  // ===============================
  // SEARCH FUNCTION
  // ===============================
  searchInput.addEventListener("input", e => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.innerHTML = `<p style="text-align:center; color:#777; margin-top: 30px;">Start typing to search for recipes...</p>`;
      return;
    }
    const results = window.allRecipes.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query)
    );
    renderRecipes(results, searchResults);
  });
});

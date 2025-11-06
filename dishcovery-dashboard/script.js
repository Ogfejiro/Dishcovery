// =====================
// Sidebar + Page Switching + Search + Recipes
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
if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", hideSidebar);
if (overlay) overlay.addEventListener("click", hideSidebar);

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetPage = link.getAttribute("data-page");

    // Redirect for admin page
    if (targetPage === "add") {
      window.location.href = "../admin-dashboard/admin.html";
      return;
    }

    // Update nav state
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Switch page
    pages.forEach(p => p.classList.remove("active-page"));
    const pageSection = document.getElementById(`${targetPage}Page`);
    if (pageSection) pageSection.classList.add("active-page");

    hideSidebar();
  });
});

// =====================
// DUMMY DATA
// =====================
const dummyRecipes = [
  {
    _id: "1",
    name: "Jollof Rice",
    category: "Lunch",
    cookingTime: "45",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0b9d9a3",
    description: "Classic Nigerian Jollof with tomato, pepper, and seasoning."
  },
  {
    _id: "2",
    name: "Pancakes",
    category: "Breakfast",
    cookingTime: "15",
    image: "https://images.unsplash.com/photo-1587732492847-4f1d1a3e6f0b",
    description: "Fluffy pancakes with honey drizzle and butter."
  },
  {
    _id: "3",
    name: "Egusi Soup",
    category: "Lunch",
    cookingTime: "60",
    image: "https://images.unsplash.com/photo-1643797686159-6f58f9e4d76d",
    description: "A hearty melon seed soup served with pounded yam."
  },
  {
    _id: "4",
    name: "Fruit Smoothie",
    category: "Drinks",
    cookingTime: "5",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
    description: "Chilled banana, mango, and pineapple smoothie."
  },
  {
    _id: "5",
    name: "Meat Pie",
    category: "Snacks",
    cookingTime: "25",
    image: "https://images.unsplash.com/photo-1505575967455-40e256f73376",
    description: "Golden pastry filled with spicy minced meat and veggies."
  },
  {
    _id: "6",
    name: "Parfait",
    category: "Breakfast",
    cookingTime: "10",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    description: "Layered yogurt, granola, and fresh fruits."
  },
  {
    _id: "7",
    name: "Zobo Drink",
    category: "Drinks",
    cookingTime: "20",
    image: "https://images.unsplash.com/photo-1610440042665-fb83a40d712b",
    description: "Refreshing hibiscus drink spiced with ginger and pineapple."
  },
  {
    _id: "8",
    name: "Chin Chin",
    category: "Snacks",
    cookingTime: "30",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb",
    description: "Crispy sweet fried dough snack loved across Nigeria."
  }
];

// =====================
// Render Function
// =====================
const homeRecipes = document.getElementById("homeRecipes");

function renderRecipes(data) {
  homeRecipes.innerHTML = "";

  if (!data || data.length === 0) {
    homeRecipes.innerHTML = `<p style="text-align:center; color:#777;">No recipes available.</p>`;
    return;
  }

  data.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.dataset.id = recipe._id;
    card.dataset.category = recipe.category;

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-info">
        <button class="tag">${recipe.category}</button>
        <h3>${recipe.name}</h3>
        <p class="meta"><i class="fa-regular fa-clock"></i> ${recipe.cookingTime} mins 🇳🇬</p>
        <p class="desc">${recipe.description}</p>
      </div>
    `;

    homeRecipes.appendChild(card);
  });
}

// =====================
// Category Filtering (All / Breakfast / Lunch / Snacks / Drinks)
// =====================
const categoryButtons = document.querySelectorAll(".category-btn"); // Add this class in your HTML

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    if (category === "All") renderRecipes(dummyRecipes);
    else {
      const filtered = dummyRecipes.filter(r => r.category === category);
      renderRecipes(filtered);
    }
  });
});

// =====================
// Recipe Detail Page
// =====================
const recipeDetailPage = document.getElementById("recipeDetailPage");
const backToRecipes = document.getElementById("backToRecipes");

document.addEventListener("click", (e) => {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const recipe = dummyRecipes.find(r => r._id === card.dataset.id);
  if (!recipe) return;

  document.getElementById("detailName").textContent = recipe.name;
  document.getElementById("detailDescription").textContent = recipe.description;
  document.getElementById("detailImage").src = recipe.image;
  document.getElementById("detailTime").querySelector("span").textContent = recipe.cookingTime + " mins 🇳🇬";
  document.getElementById("detailCategory").textContent = recipe.category;
  document.getElementById("detailIngredients").innerHTML = "<li>Sample Ingredient 1</li><li>Sample Ingredient 2</li>";
  document.getElementById("detailInstructions").innerHTML = "<li>Mix ingredients</li><li>Cook until ready</li>";

  pages.forEach(p => p.classList.remove("active-page"));
  recipeDetailPage.classList.add("active-page");
});

// Back button
if (backToRecipes) {
  backToRecipes.addEventListener("click", () => {
    pages.forEach(p => p.classList.remove("active-page"));
    document.getElementById("homePage").classList.add("active-page");
  });
}

// =====================
// Initialize
// =====================
renderRecipes(dummyRecipes);

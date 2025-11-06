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

    if (targetPage === "add-recipe") {
      return; 
    }

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    pages.forEach(p => p.classList.remove("active-page"));
    const pageSection = document.getElementById(`${targetPage}Page`); 
    if (pageSection) pageSection.classList.add("active-page");

    hideSidebar();
  });
});

const dummyRecipes = [
  {
    _id: "1",
    name: "Jollof Rice",
    category: "Lunch",
    cookingTime: "45",
    prepTime: "20",
    rating: "4.5 (180 reviews)",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0b9d9a3",
    description: "A highly seasoned rice dish, prepared with tomato and pepper sauce, onions, and various spices.",
    ingredients: [
      { name: "Rice", quantity: "2 cups" },
      { name: "Tomato Paste", quantity: "1 can" },
      { name: "Onions", quantity: "1 large" },
      { name: "Vegetable Oil", quantity: "1/4 cup" }
    ],
    instructions: [
      "Sauté chopped onions and tomato paste in oil until fragrant.",
      "Add blended pepper mixture and broth, allowing it to cook for 15 minutes.",
      "Add seasoning and rice. Bring to a boil.",
      "Reduce heat, cover tightly with foil and lid, and simmer until rice is cooked (about 30 minutes)."
    ]
  },
  {
    _id: "2",
    name: "Pancakes",
    category: "Breakfast",
    cookingTime: "15",
    prepTime: "10",
    rating: "5.0 (254 reviews)",
    image: "Frame 523.jpg",
    description: "Made from a smooth blend of flour, eggs, milk, and butter. Served warm with syrup, this light and delicious meal is best enjoyed for breakfast to start your day right.",
    ingredients: [
      { name: "All-purpose flour", quantity: "1 cup" },
      { name: "Baking powder", quantity: "2 tsp" },
      { name: "Salt", quantity: "1 tsp" },
      { name: "White sugar", quantity: "2 tbsp" },
      { name: "Milk", quantity: "1 cup" },
      { name: "Egg", quantity: "1 large" },
      { name: "Butter, melted", quantity: "2 tbsp" },
      { name: "Vanilla extract", quantity: "1 tsp" },
      { name: "Maple syrup (for serving)", quantity: "to taste" }
    ],
    instructions: [
      "In a large bowl, whisk together the flour, baking powder, salt, and sugar. Make a hole in the center.",
      "Pour the milk, egg, melted butter, and vanilla extract into the well. Mix until smooth. The batter should be slightly lumpy.",
      "Heat a lightly oiled griddle or frying pan over medium-high heat.",
      "Pour or scoop the batter onto the griddle, using approximately 1/4 cup of each per pancake.",
      "Cook until bubbles form on the surface and the edges are dry (about 2-3 minutes).",
      "Flip and cook until golden brown on the other side, about 1-2 minutes more.",
      "Serve hot with butter and maple syrup, or your favorite toppings."
    ]
  },
  {
    _id: "3",
    name: "Egusi Soup",
    category: "Lunch",
    cookingTime: "60",
    prepTime: "15",
    rating: "4.8 (120 reviews)",
    image: "https://images.unsplash.com/photo-1643797686159-6f58f9e4d76d",
    description: "A hearty melon seed soup often prepared with leafy vegetables and served with a swallow food like Pounded Yam.",
    ingredients: [],
    instructions: []
  },
  {
    _id: "4",
    name: "Fruit Smoothie",
    category: "Drinks",
    cookingTime: "5",
    prepTime: "5",
    rating: "4.9 (300 reviews)",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
    description: "Chilled banana, mango, and pineapple smoothie—perfect for a quick energy boost.",
    ingredients: [],
    instructions: []
  },
  {
    _id: "5",
    name: "Meat Pie",
    category: "Snacks",
    cookingTime: "25",
    prepTime: "30",
    rating: "4.6 (90 reviews)",
    image: "https://images.unsplash.com/photo-1505575967455-40e256f73376",
    description: "Golden pastry filled with spicy minced meat and veggies, a Nigerian favorite.",
    ingredients: [],
    instructions: []
  },
  {
    _id: "6",
    name: "Parfait",
    category: "Breakfast",
    cookingTime: "10",
    prepTime: "5",
    rating: "4.7 (210 reviews)",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    description: "Layered yogurt, granola, and fresh fruits for a healthy start to the day.",
    ingredients: [],
    instructions: []
  },
  {
    _id: "7",
    name: "Zobo Drink",
    category: "Drinks",
    cookingTime: "20",
    prepTime: "10",
    rating: "4.4 (150 reviews)",
    image: "https://images.unsplash.com/photo-1610440042665-fb83a40d712b",
    description: "Refreshing hibiscus drink spiced with ginger and pineapple, served chilled.",
    ingredients: [],
    instructions: []
  },
  {
    _id: "8",
    name: "Chin Chin",
    category: "Snacks",
    cookingTime: "30",
    prepTime: "15",
    rating: "4.3 (70 reviews)",
    image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb",
    description: "Crispy sweet fried dough snack loved across Nigeria and West Africa.",
    ingredients: [],
    instructions: []
  }
];

const homeRecipes = document.getElementById("homeRecipes");

function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.dataset.id = recipe._id;
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

  if (!data || data.length === 0) {
    targetElement.innerHTML = `<p style="text-align:center; color:#777; margin-top: 30px;">No recipes available.</p>`;
    return;
  }

  data.forEach(recipe => {
    const card = createRecipeCard(recipe);
    targetElement.appendChild(card);
  });
}

function renderSearchResults(data) {
    const searchResults = document.getElementById("searchResults");
    renderRecipes(data, searchResults);
}

const categoryButtons = document.querySelectorAll(".filter-btn"); 

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.filter.toLowerCase();
    if (category === "all") renderRecipes(dummyRecipes, homeRecipes);
    else {
      const filtered = dummyRecipes.filter(r => r.category.toLowerCase() === category);
      renderRecipes(filtered, homeRecipes);
    }
    pages.forEach(p => p.classList.remove("active-page"));
    document.getElementById("homePage").classList.add("active-page");
  });
});

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  
  if (query.length < 2) {
    searchResults.innerHTML = `<p style="text-align:center; color:#777; margin-top: 30px;">Start typing to search for recipes...</p>`;
    return;
  }

  const filtered = dummyRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(query) ||
    recipe.description.toLowerCase().includes(query) ||
    recipe.category.toLowerCase().includes(query)
  );
  
  renderSearchResults(filtered);
});

const recipeDetailPage = document.getElementById("recipeDetailPage");

document.addEventListener("click", (e) => {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const recipe = dummyRecipes.find(r => r._id === card.dataset.id);
  if (!recipe) return;

  document.getElementById("detailName").textContent = recipe.name;
  document.getElementById("detailDescription").textContent = recipe.description;
  document.getElementById("detailImage").src = recipe.image;
  
  document.getElementById("detailPrepTime").querySelector("span").textContent = `${recipe.prepTime || 'N/A'} mins`;
  document.getElementById("detailCookTime").querySelector("span").textContent = `${recipe.cookingTime || 'N/A'} mins`;
  document.getElementById("detailCategory").textContent = recipe.category;
  document.getElementById("detailRating").textContent = recipe.rating || 'N/A';
  
  const ingredientsList = document.getElementById("detailIngredients");
  ingredientsList.innerHTML = "";
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    recipe.ingredients.forEach(item => {
      const li = document.createElement("li");
      li.classList.add("ingredient-item");
      li.innerHTML = `${item.name} <span class="quantity-text">${item.quantity}</span>`;
      ingredientsList.appendChild(li);
    });
  } else {
    ingredientsList.innerHTML = `<p style="padding: 1rem 0; color: #777;">Ingredients list not available.</p>`;
  }

  const instructionsContainer = document.getElementById("detailInstructions");
  instructionsContainer.innerHTML = "";
  if (recipe.instructions && recipe.instructions.length > 0) {
    recipe.instructions.forEach((step, index) => {
      const div = document.createElement("div");
      div.classList.add("instruction-item");
      div.innerHTML = `
        <p>
          <span class="instruction-number">${index + 1}</span> 
          ${step}
        </p>
      `;
      instructionsContainer.appendChild(div);
    });
  } else {
    instructionsContainer.innerHTML = `<p style="padding: 1rem 0; color: #777;">Instructions not available.</p>`;
  }

  pages.forEach(p => p.classList.remove("active-page"));
  recipeDetailPage.classList.add("active-page");
});

renderRecipes(dummyRecipes, homeRecipes);

if (searchResults) {
    searchResults.innerHTML = `<p style="text-align:center; color:#777; margin-top: 30px;">Start typing to search for recipes...</p>`;
}
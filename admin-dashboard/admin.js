document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".menu-item");
  const recipeList = document.getElementById("recipeList");
  const totalRecipes = document.getElementById("totalRecipes");
  const addRecipeForm = document.getElementById("addRecipeForm");
  const modal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModal");

  // Edit Modal Elements
  const editModal = document.getElementById("editRecipeModal"); 
  const closeEditModalBtn = document.getElementById("closeEditModal");
  const editRecipeForm = document.getElementById("editRecipeForm");

  // ==============================
  // STATIC RECIPES (locked)
  // ==============================
  const STATIC_RECIPES = [
    { name: "Pancakes", category: "Breakfast", time: "15 mins", desc: "Fluffy pancakes served warm with syrup and fresh berries.", image: "https://images.unsplash.com/photo-1587731253361-1f75c9c1a6a1?w=800", source: 'static' },
    { name: "Jollof Rice", category: "Lunch", time: "45 mins", desc: "A West African classic — spicy rice cooked with tomatoes, peppers, and seasoning.", image: "https://images.unsplash.com/photo-1625948969879-1b3fbc0b30f5?w=800", source: 'static' },
    { name: "Puff Puff", category: "Snacks", time: "30 mins", desc: "Fluffy deep-fried dough balls — slightly sweet and addictive, perfect for snacks.", image: "https://images.unsplash.com/photo-1641602700357-c7f4e73a4a21?w=800", source: 'static' },
    { name: "Grilled Chicken", category: "Dinner", time: "35 mins", desc: "Juicy grilled chicken marinated in herbs and spices — smoky and delicious.", image: "https://images.unsplash.com/photo-1601050690597-df6a8a02f6e3?w=800", source: 'static' },
    { name: "Smoothie", category: "Drinks", time: "5 mins", desc: "A refreshing fruit smoothie packed with vitamins and a cool burst of energy.", image: "https://images.unsplash.com/photo-1572441710534-680b583e0f9b?w=800", source: 'static' }
  ];

  // Initialize localStorage if empty
  if (!localStorage.getItem("recipes")) {
    localStorage.setItem("recipes", JSON.stringify(STATIC_RECIPES));
  }

  // ==============================
  // Helper to get all recipes
  // ==============================
  function getAllRecipes() {
    return JSON.parse(localStorage.getItem("recipes") || "[]");
  }

  // ==============================
  // Load recipes into table
  // ==============================
  function loadRecipes() {
    const recipes = getAllRecipes();
    if (totalRecipes) totalRecipes.textContent = recipes.length;
    if (!recipeList) return;

    recipeList.innerHTML = "";

    if (recipes.length === 0) {
      recipeList.innerHTML = `<tr><td colspan="5" class="empty">No recipes added yet.</td></tr>`;
      return;
    }

    recipes.forEach((r, index) => {
      const isUserAdded = r.source !== 'static'; // ONLY user-added can be edited/deleted
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td><img src="${r.image}" alt="${r.name}" /></td>
        <td>${r.name}</td>
        <td>${r.category}</td>
        <td>${r.time}</td>
        <td>
          ${isUserAdded 
            ? `<button class="action-btn action-edit" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i></button>
               <button class="action-btn action-delete" data-index="${index}"><i class="fa-solid fa-trash"></i></button>`
            : `<button class="action-btn action-protected" disabled title="Protected"><i class="fa-solid fa-lock"></i></button>`
          }
        </td>
      `;

      recipeList.appendChild(tr);
    });

    // Attach edit event listeners
    document.querySelectorAll(".action-edit").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.currentTarget.dataset.index);
        openEditModal(recipes[index]);
      });
    });

    // Attach delete event listeners
    document.querySelectorAll(".action-delete").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = parseInt(e.currentTarget.dataset.index);
        if (!confirm(`Are you sure you want to delete "${recipes[index].name}"?`)) return;

        const updatedRecipes = recipes.filter((_, i) => i !== index);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        loadRecipes();
      });
    });
  }

  // ==============================
  // Edit modal handling
  // ==============================
  let originalIndex = null;

  function openEditModal(recipe) {
    const recipes = getAllRecipes();
    originalIndex = recipes.findIndex(r => r.name === recipe.name && r.category === recipe.category && r.source !== 'static');
    if (originalIndex === -1) return alert("Cannot edit static recipe!");

    document.getElementById("editRecipeName").value = recipe.name;
    const categorySelect = document.getElementById("editRecipeCategory");
    Array.from(categorySelect.options).forEach(opt => opt.text === recipe.category ? opt.selected = true : opt.selected = false);
    document.getElementById("editPrepTime").value = recipe.time.replace(" mins", "").trim();
    document.getElementById("editRecipeDesc").value = recipe.desc;
    document.getElementById("editRecipeImage").value = recipe.image;

    editModal.classList.add("active");
  }

  if (closeEditModalBtn) closeEditModalBtn.addEventListener("click", () => editModal.classList.remove("active"));

  if (editRecipeForm) {
    editRecipeForm.addEventListener("submit", e => {
      e.preventDefault();
      if (originalIndex === null) return;

      const recipes = getAllRecipes();
      const updatedRecipe = {
        ...recipes[originalIndex],
        name: document.getElementById("editRecipeName").value,
        category: document.getElementById("editRecipeCategory").selectedOptions[0].text,
        time: document.getElementById("editPrepTime").value + " mins",
        desc: document.getElementById("editRecipeDesc").value,
        image: document.getElementById("editRecipeImage").value,
        source: 'user'
      };

      recipes[originalIndex] = updatedRecipe;
      localStorage.setItem("recipes", JSON.stringify(recipes));
      editModal.classList.remove("active");
      loadRecipes();
      alert(`Recipe "${updatedRecipe.name}" updated successfully!`);
    });
  }

  // ==============================
  // Add recipe handling
  // ==============================
  if (addRecipeForm) {
    addRecipeForm.addEventListener("submit", e => {
      e.preventDefault();

      const newRecipe = {
        name: document.getElementById("recipeName").value,
        category: document.getElementById("recipeCategory").selectedOptions[0].text,
        time: document.getElementById("prepTime").value + " mins",
        desc: document.getElementById("recipeDesc").value,
        image: document.getElementById("recipeImage").value,
        source: 'user'
      };

      const recipes = getAllRecipes();
      recipes.push(newRecipe);
      localStorage.setItem("recipes", JSON.stringify(recipes));

      addRecipeForm.reset();
      loadRecipes();
      modal.classList.add("active");
    });
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", () => modal.classList.remove("active"));

  // ==============================
  // Sidebar navigation
  // ==============================
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (link.classList.contains("back-dashboard")) return;
      e.preventDefault();

      const targetPage = link.dataset.page;
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      pages.forEach(p => p.classList.remove("active-page"));
      document.getElementById(targetPage).classList.add("active-page");
      loadRecipes();
    });
  });

  loadRecipes();
});

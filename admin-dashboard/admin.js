document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".menu-item");
  const recipeList = document.getElementById("recipeList");
  const totalRecipes = document.getElementById("totalRecipes");
  const addRecipeForm = document.getElementById("addRecipeForm");
  const modal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModal");

  // Sidebar Navigation
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      // 🧠 Allow the back-dashboard link to work normally
      if (link.classList.contains("back-dashboard")) return;

      e.preventDefault();
      const targetPage = link.dataset.page;

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      pages.forEach(page => page.classList.remove("active-page"));
      document.getElementById(targetPage).classList.add("active-page");
      loadRecipes();
    });
  });

  // Load Recipes
  function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
    if (totalRecipes) totalRecipes.textContent = recipes.length;
    if (!recipeList) return;

    recipeList.innerHTML = "";

    if (recipes.length === 0) {
      recipeList.innerHTML = `<tr><td colspan="5" class="empty">No recipes added yet.</td></tr>`;
      return;
    }

    recipes.forEach((r, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${r.image}" alt="${r.name}" /></td>
        <td>${r.name}</td>
        <td>${r.category}</td>
        <td>${r.time}</td>
        <td>
          <button class="action-btn action-delete" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      recipeList.appendChild(tr);
    });

    document.querySelectorAll(".action-delete").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.currentTarget.dataset.index;
        const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
        recipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        loadRecipes();
      });
    });
  }

  loadRecipes();

  // Live Preview
  const previewName = document.getElementById("previewName");
  const previewCategory = document.getElementById("previewCategory");
  const previewTime = document.getElementById("previewTime");
  const previewDesc = document.getElementById("previewDesc");
  const previewImage = document.getElementById("previewImage");

  const updatePreview = () => {
    previewName.textContent = document.getElementById("recipeName").value || "Recipe Name";
    previewCategory.textContent = document.getElementById("recipeCategory").value || "Category";
    previewTime.textContent = "Prep Time: " + (document.getElementById("prepTime").value || "--");
    previewDesc.textContent = document.getElementById("recipeDesc").value || "Description will appear here...";
    const imgUrl = document.getElementById("recipeImage").value;
    previewImage.src = imgUrl ? imgUrl : "https://via.placeholder.com/300x200?text=Preview";
  };

  document.querySelectorAll("#recipeName, #recipeCategory, #prepTime, #recipeDesc, #recipeImage")
    .forEach(input => input.addEventListener("input", updatePreview));

  // Add Recipe
  if (addRecipeForm) {
    addRecipeForm.addEventListener("submit", e => {
      e.preventDefault();

      const recipe = {
        name: document.getElementById("recipeName").value,
        category: document.getElementById("recipeCategory").value,
        time: document.getElementById("prepTime").value,
        desc: document.getElementById("recipeDesc").value,
        image: document.getElementById("recipeImage").value,
      };

      const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");
      recipes.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(recipes));

      addRecipeForm.reset();
      updatePreview();
      loadRecipes();

      // Show modal
      modal.classList.add("active");
    });
  }

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

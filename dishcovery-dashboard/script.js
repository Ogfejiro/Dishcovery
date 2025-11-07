// ==============================
// Dishcovery Dashboard JS (Updated for LocalStorage Sync & Auto-Refresh)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const toggleSidebarBtn = document.getElementById("toggleSidebar");
  const closeSidebarBtn = document.getElementById("closeSidebar");
  const homeRecipes = document.getElementById("homeRecipes");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const categoryButtons = document.querySelectorAll(".filter-btn");
  const recipeDetailPage = document.getElementById("recipeDetailPage");

  // ===============================
  // 💾 DATA LOADER: COMBINE STATIC AND ADMIN RECIPES
  // ===============================
    
  // 1. Static Recipes (NOTE: Category values are converted to lowercase for filtering)
  const STATIC_RECIPES = [
    {
      _id: 1,
      name: "Pancakes",
      category: "breakfast", // CONVERTED TO LOWERCASE
      image:
        "https://media.istockphoto.com/id/518525367/photo/breakfast-pancakes-and-syrup.webp?a=1&b=1&s=612x612&w=0&k=20&c=aU5gXk1huHPXP0tupPAvQP8-6tkxpQ28zziXIxyMOG4=",
      cookingTime: 15,
      description:
        "Fluffy pancakes served warm with syrup and fresh berries — the perfect breakfast treat.",
      ingredients: [
        "1 ½ cups flour", "1 tbsp sugar", "2 tsp baking powder", "1 cup milk", "1 egg", "2 tbsp butter, melted",
      ],
      instructions: [
        "In a bowl, whisk flour, sugar, and baking powder.", "Add milk, egg, and melted butter; whisk until smooth.", 
         "Heat a nonstick pan and pour ¼ cup batter per pancake.", "Cook both sides until golden brown. Serve with syrup.",
      ],
    },
    {
      _id: 2,
      name: "Jollof Rice",
      category: "lunch", // CONVERTED TO LOWERCASE
      image:
        "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am9sbG9mJTIwcmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      cookingTime: 45,
      description:
        "A West African classic — spicy rice cooked with tomatoes, peppers, and seasoning.",
      ingredients: [
        "2 cups rice", "5 tomatoes", "1 red bell pepper", "1 onion", "Seasoning cubes and salt",
      ],
      instructions: [
        "Blend tomatoes, pepper, and onion.", "Cook sauce with oil and seasoning until thick.", 
         "Add rice and water, cover, and simmer until done.",
      ],
    },
    {
      _id: 3,
      name: "Puff Puff",
      category: "snacks", // CONVERTED TO LOWERCASE
      image:
        "https://images.unsplash.com/photo-1664993085274-80c6ba725ccc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVmZiUyMHB1ZmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      cookingTime: 30,
      description:
        "Fluffy deep-fried dough balls — slightly sweet and addictive, perfect for snacks.",
      ingredients: [
        "2 cups flour", "½ cup sugar", "2 tsp yeast", "1 cup warm water", "Oil for frying",
      ],
      instructions: [
        "Mix flour, sugar, yeast, and water into thick batter.", "Allow to rise for 1 hour.", 
         "Fry in hot oil until golden brown.",
      ],
    },
    {
      _id: 4,
      name: "Grilled Chicken",
      category: "dinner", // CONVERTED TO LOWERCASE
      image:
        "https://plus.unsplash.com/premium_photo-1695931844305-b5dd90ab6138?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JpbGxlZCUyMGNoaWNrZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      cookingTime: 35,
      description:
        "Juicy grilled chicken marinated in herbs and spices — smoky and delicious.",
      ingredients: [
        "4 chicken pieces", "2 tbsp olive oil", "Garlic, pepper, salt", "1 tsp paprika",
      ],
      instructions: [
        "Marinate chicken in all ingredients for 30 mins.", "Grill each side for 10–15 mins until golden brown.",
      ],
    },
    {
      _id: 5,
      name: "Smoothie",
      category: "drinks", // CONVERTED TO LOWERCASE
      image:
        "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      cookingTime: 5,
      description:
        "A refreshing fruit smoothie packed with vitamins and a cool burst of energy.",
      ingredients: [
        "1 banana", "1 cup strawberries", "1 cup milk", "1 tbsp honey",
      ],
      instructions: ["Blend all ingredients until smooth.", "Serve chilled."],
    },
    {
      _id: 6,
      name: "Avocado Toast",
      category: "breakfast", // CONVERTED TO LOWERCASE
      image:
        "https://media.istockphoto.com/id/1518833009/photo/avocado-toast.webp?a=1&b=1&s=612x612&w=0&k=20&c=6m3ocHfARNgjtgykJ6nm2nP9ziHv_5bNA11G-XgEcs4=",
      cookingTime: 10,
      description:
        "Toasted bread topped with creamy avocado and seasonings — simple and satisfying.",
      ingredients: [
        "2 slices bread", "1 avocado", "Salt, pepper, lemon juice",
      ],
      instructions: [
        "Toast bread slices.", "Mash avocado and season with salt, pepper, and lemon.", 
         "Spread on toast and serve.",
      ],
    },
    {
      _id: 7,
      name: "Spaghetti Bolognese",
      category: "lunch", // CONVERTED TO LOWERCASE
      image:
        "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      cookingTime: 40,
      description:
        "Classic Italian pasta with rich tomato meat sauce — comforting and hearty.",
      ingredients: [
        "200g spaghetti", "150g minced meat", "Tomato sauce", "Garlic, onion, salt",
      ],
      instructions: [
        "Cook spaghetti and set aside.", "Sauté garlic, onion, and meat; add sauce and simmer.", 
         "Mix with spaghetti and serve warm.",
      ],
    },
    {
      _id: 8,
      name: "Chicken Salad",
      category: "dinner", // CONVERTED TO LOWERCASE
      image:
        "https://images.unsplash.com/photo-1605291535065-e1d52d2b264a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMHNhbGFkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      cookingTime: 20,
      description:
        "Light and healthy — grilled chicken tossed with crisp vegetables and dressing.",
      ingredients: [
        "1 chicken breast", "Lettuce, tomato, cucumber", "Salad dressing",
      ],
      instructions: [
        "Grill chicken and slice.", "Toss all ingredients with dressing.",
      ],
    },
    {
      _id: 9,
      name: "Fried Rice",
      category: "lunch", // CONVERTED TO LOWERCASE
      image:
        "https://media.istockphoto.com/id/2154268555/photo/asian-chicken-fried-rice-comfort-food-takeaway-food-top-down-rice-dish-photography.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y2qaDNcEUamRMoa-vJw4Ulp_CE8fZFXyrkAw1vAIAdg=",
      cookingTime: 35,
      description:
        "Colorful rice stir-fried with veggies and proteins — a Nigerian party favorite.",
      ingredients: [
        "2 cups rice", "Carrots, peas, sweetcorn", "Soy sauce", "Seasoning cubes",
      ],
      instructions: [
        "Parboil rice and set aside.", "Stir-fry vegetables and add rice.", "Add soy sauce and seasoning, mix well.",
      ],
    },
    {
      _id: 10,
      name: "Chapman Drink",
      category: "drinks", // CONVERTED TO LOWERCASE
      image:
        "https://images.unsplash.com/photo-1557935260-03ada3026d41?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
      cookingTime: 5,
      description:
        "Popular Nigerian cocktail made with Fanta, Sprite, and bitters — sweet and zesty.",
      ingredients: [
        "Fanta, Sprite", "Angostura bitters", "Grenadine syrup", "Cucumber slices & ice",
      ],
      instructions: [
        "Mix all ingredients in a tall glass.", "Add ice and cucumber slices to garnish.",
      ],
    },
    {
      _id: 11,
      name: "Suya",
      category: "dinner", // CONVERTED TO LOWERCASE
      image:
        "https://media.istockphoto.com/id/2182713829/photo/nigerian-beef-suya-steak-served-at-a-party.webp?a=1&b=1&s=612x612&w=0&k=20&c=h_cPDQaG20hs0CZe1upzFpIMoHwXji97TwjRxojCKT8=",
      cookingTime: 25,
      description:
        "Spicy Nigerian street food — grilled beef skewers coated with yaji pepper mix.",
      ingredients: [
        "500g beef", "Suya spice (yaji)", "Groundnut oil, salt",
      ],
      instructions: [
        "Cut beef into strips, season with suya spice.", "Thread on sticks and grill until cooked.",
      ],
    },
    {
      _id: 12,
      name: "Fruit Parfait",
      category: "snacks", // CONVERTED TO LOWERCASE
      image:
        "https://plus.unsplash.com/premium_photo-1669680784119-1f2ac0260295?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RnJ1aXQlMjBQYXJmYWl0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      cookingTime: 10,
      description:
        "Layered yogurt, fruits, and granola — delicious and refreshing.",
      ingredients: [
        "Greek yogurt", "Granola", "Assorted fruits",
      ],
      instructions: ["Layer yogurt, fruits, and granola in a glass."],
    },
  ];

    function loadAllRecipes() {
      // Load recipes added via the Admin Dashboard from localStorage
      const adminRecipesRaw = localStorage.getItem("recipes");
      let adminRecipes = [];
      
      if (adminRecipesRaw) {
        try {
          // NOTE: We skip the first 12 recipes if they match the static list 
           // to avoid duplicating static recipes that might have been automatically
           // added by the admin.js initialization.
          const storedRecipes = JSON.parse(adminRecipesRaw);
           
           // If the stored list is larger than the static list, take the newer ones.
           // This is a basic way to include admin-added recipes without duplicating static ones.
           // A more robust solution would use unique IDs.
           const recipesToDisplay = storedRecipes.length > STATIC_RECIPES.length 
               ? storedRecipes.slice(STATIC_RECIPES.length) : [];
           
          adminRecipes = recipesToDisplay.map((r, index) => ({
            _id: 'admin-' + Date.now() + index, // Unique ID
            name: r.name,
            category: r.category ? r.category.toLowerCase() : 'uncategorized', // Ensure lowercase
            image: r.image,
            cookingTime: parseInt(r.time ? r.time.replace(/[^0-9]/g, '') : 0) || 0,
            description: r.desc,
            ingredients: ["Ingredients not detailed in admin panel."], 
            instructions: ["Instructions not detailed in admin panel."], 
          }));
        } catch (e) {
          console.error("Error parsing admin recipes from localStorage", e);
        }
      }

      // Combine static recipes and new admin recipes
      return [...STATIC_RECIPES, ...adminRecipes];
    }

    // This function will be called on load and on tab focus
    function initializeDashboard() {
        const ALL_RECIPES = loadAllRecipes();

        // Initial render for the home page
        renderRecipes(ALL_RECIPES, homeRecipes);
        
        // Initial render for the search page (if active)
        if (document.getElementById("searchPage") && document.getElementById("searchPage").classList.contains("active-page")) {
            renderRecipes(ALL_RECIPES, searchResults);
        }
        
        // --- Update Event Listeners to use ALL_RECIPES scope ---
        // We redefine the filter and search logic here so they always use the fresh ALL_RECIPES array
        
        // Category filter logic using the fresh ALL_RECIPES
        categoryButtons.forEach((btn) => {
            // We use the same click listener, but its logic now relies on ALL_RECIPES
            btn.onclick = () => {
                categoryButtons.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                const filter = btn.dataset.filter;
                const filtered =
                    filter === "all"
                        ? ALL_RECIPES
                        : ALL_RECIPES.filter(
                              (r) => r.category.toLowerCase() === filter.toLowerCase()
                          );
                renderRecipes(filtered, homeRecipes);
            };
        });

        // Search logic using the fresh ALL_RECIPES
        if (searchInput) {
            searchInput.oninput = (e) => {
                const query = e.target.value.toLowerCase();
                const results = ALL_RECIPES.filter(
                    (r) =>
                        r.name.toLowerCase().includes(query) ||
                        r.description.toLowerCase().includes(query)
                );
                renderRecipes(results, searchResults);
            };
        }
    }
    
// ===============================
// END DATA LOADER
// ===============================


  // ===============================
  // 🧭 PAGE NAVIGATION LOGIC (FIXED)
  // ===============================
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      
      // NEW FIX: If the link has a target URL (not just '#'), let the browser navigate
      if (link.getAttribute('href') !== '#') {
          // Allow link to navigate to its href (e.g., inactive.html)
          return; 
      }
      
      e.preventDefault(); // ONLY prevent default if the link is handled internally
      
      // 1. Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // 2. Determine target page ID and switch page view
      const targetPageId = link.dataset.page + "Page"; 
      pages.forEach((p) => p.classList.remove("active-page"));
      const targetPage = document.getElementById(targetPageId);
      
      if (targetPage) {
        targetPage.classList.add("active-page");
        
        // When navigating to the search page, ensure results area is cleared/ready
        if (link.dataset.page === "search") {
          searchResults.innerHTML = ""; 
          searchInput.value = "";
          // Re-initialize the dashboard to ensure search results use fresh data
          initializeDashboard(); 
        }
      }

      // 3. Close sidebar on mobile after navigation
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    });
  });

  // ===============================
  // SIDEBAR TOGGLE LOGIC (For Mobile/Toggle Button)
  // ===============================
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    });
  }
  
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }


  // Render recipe cards
  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.dataset.id = recipe._id;

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-info">
        <button class="tag">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</button>
        <h3>${recipe.name}</h3>
        <p class="meta"><i class="fa-regular fa-clock"></i> ${recipe.cookingTime} mins</p>
        <p class="desc">${recipe.description}</p>
      </div>
    `;

    card.addEventListener("click", () => showRecipeDetail(recipe));
    return card;
  }

  function renderRecipes(data, targetElement) {
    targetElement.innerHTML = "";
    data.forEach((r) => targetElement.appendChild(createRecipeCard(r)));
    if (data.length === 0) {
        targetElement.innerHTML = `<p style="text-align:center; color:#777; margin-top: 30px; grid-column: 1 / -1;">No recipes found.</p>`;
    }
  }
  
  // NOTE: The initial render, category filter, and search logic is now inside initializeDashboard()
  // to ensure it always uses the latest data.


  // Show recipe detail
  function showRecipeDetail(recipe) {
    pages.forEach((p) => p.classList.remove("active-page"));
    recipeDetailPage.classList.add("active-page");

    recipeDetailPage.innerHTML = `
      <button class="back-btn" style="margin:15px; background:none; border:none; color:#E74C3C; font-weight:600; cursor:pointer;">
        ← Back to Dashboard
      </button>
      <div class="detail-header">
        <img src="${recipe.image}" alt="${recipe.name}" class="detail-img" style="width:100%; border-radius:20px; max-height:350px; object-fit:cover;"/>
      </div>
      <div class="detail-content" style="padding:20px;">
        <h2>${recipe.name}</h2>
        <button class="tag">${recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}</button>
        <p style="margin-top:10px;">${recipe.description}</p>
        <h3 style="margin-top:20px;">Ingredients</h3>
        <ul style="margin-left:20px;">
          ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
        </ul>
        <h3 style="margin-top:20px;">Instructions</h3>
        <ol style="margin-left:20px;">
          ${recipe.instructions.map((s) => `<li>${s}</li>`).join("")}
        </ol>
      </div>
    `;

    recipeDetailPage
      .querySelector(".back-btn")
      .addEventListener("click", () => {
        recipeDetailPage.classList.remove("active-page");
        const activeNav = document.querySelector(".nav-link.active");
        const backTargetId = activeNav ? activeNav.dataset.page + "Page" : "homePage";
        document.getElementById(backTargetId).classList.add("active-page");
      });
  }

    // ===============================
    // 🚦 FINAL INITIALIZATION & SYNC FIX
    // ===============================
    
    // 1. Initial Load
    initializeDashboard();

    // 2. Auto-Refresh Fix: Reload data when the browser tab is refocused
    window.addEventListener('focus', () => {
        console.log("Tab focus detected. Reloading recipes from localStorage...");
        initializeDashboard();
    });

});
document.addEventListener("DOMContentLoaded", () => {
    // ==============================
    // MOBILE TOGGLE FUNCTIONALITY
    // ==============================
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelectorAll(".menu-item");
    
    // Create backdrop element for mobile
    const backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    document.body.appendChild(backdrop);

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle("open");
        backdrop.classList.toggle("active");
        
        // Prevent body scroll when sidebar is open on mobile
        if (sidebar.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    // Toggle button click event
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    // Close sidebar when clicking on backdrop
    backdrop.addEventListener("click", () => {
        toggleSidebar();
    });

    // ==============================
    // BACK TO DISHDISCOVERY BUTTON (FIXED)
    // ==============================
    const backToDishcoveryBtn = document.querySelector('.back-dashboard');
    if (backToDishcoveryBtn) {
        backToDishcoveryBtn.addEventListener('click', (e) => {
            // Close sidebar on mobile if open
            if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                toggleSidebar();
            }
            // Let the natural link navigation happen - don't prevent default
        });
    }

    // ==============================
    // PAGE NAVIGATION AND RECIPE MANAGEMENT
    // ==============================
    const pages = document.querySelectorAll(".page");
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
    // STATIC RECIPES (12 LOCKED ITEMS)
    // ==============================
    const STATIC_RECIPES = [
        { name: "Pancakes", category: "Breakfast", time: "15 mins", desc: "Fluffy pancakes served warm with syrup and fresh berries.", image: "https://media.istockphoto.com/id/518525367/photo/breakfast-pancakes-and-syrup.webp?a=1&b=1&s=612x612&w=0&k=20&c=aU5gXk1huHPXP0tupPAvQP8-6tkxpQ28zziXIxyMOG4=", source: 'static' },
        { name: "Jollof Rice", category: "Lunch", time: "45 mins", desc: "A West African classic — spicy rice cooked with tomatoes, peppers, and seasoning.", image: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am9sbG9mJTIwcmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Puff Puff", category: "Snacks", time: "30 mins", desc: "Fluffy deep-fried dough balls — slightly sweet and addictive, perfect for snacks.", image: "https://images.unsplash.com/photo-1664993085274-80c6ba725ccc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVmZiUyMHB1ZmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Grilled Chicken", category: "Dinner", time: "35 mins", desc: "Juicy grilled chicken marinated in herbs and spices — smoky and delicious.", image: "https://plus.unsplash.com/premium_photo-1695931844305-b5dd90ab6138?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JpbGxlZCUyMGNoaWNrZW58ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Smoothie", category: "Drinks", time: "5 mins", desc: "A refreshing fruit smoothie packed with vitamins and a cool burst of energy.", image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Avocado Toast", category: "Breakfast", time: "10 mins", desc: "Toasted bread topped with creamy avocado and seasonings — simple and satisfying.", image: "https://media.istockphoto.com/id/1518833009/photo/avocado-toast.webp?a=1&b=1&s=612x612&w=0&k=20&c=6m3ocHfARNgjtgykJ6nm2nP9ziHv_5bNA11G-XgEcs4=", source: 'static' },
        { name: "Spaghetti Bolognese", category: "Lunch", time: "40 mins", desc: "Classic Italian pasta with rich tomato meat sauce — comforting and hearty.", image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Chicken Salad", category: "Dinner", time: "20 mins", desc: "Light and healthy — grilled chicken tossed with crisp vegetables and dressing.", image: "https://images.unsplash.com/photo-1605291535065-e1d52d2b264a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMHNhbGFkfGVufDB8fDB8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Fried Rice", category: "Lunch", time: "35 mins", desc: "Colorful rice stir-fried with veggies and proteins — a Nigerian party favorite.", image: "https://media.istockphoto.com/id/2154268555/photo/asian-chicken-fried-rice-comfort-food-takeaway-food-top-down-rice-dish-photography.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y2qaDNcEUamRMoa-vJw4Ulp_CE8fZFXyrkAw1vAIAdg=", source: 'static' },
        { name: "Chapman Drink", category: "Drinks", time: "5 mins", desc: "Popular Nigerian cocktail made with Fanta, Sprite, and bitters — sweet and zesty.", image: "https://images.unsplash.com/photo-1557935260-03ada3026d41?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcG1hbnxlbnwwfHx8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Suya", category: "Dinner", time: "25 mins", desc: "Spicy Nigerian street food — grilled beef skewers coated with yaji pepper mix.", image: "https://media.istockphoto.com/id/2182713829/photo/nigerian-beef-suya-steak-served-at-a-party.webp?a=1&b=1&s=612x612&w=0&k=20&c=h_cPDQaG20hs0CZe1upzFpIMoHwXji97TwjRxojCKT8=", source: 'static' },
        { name: "Fruit Parfait", category: "Snacks", time: "10 mins", desc: "Layered yogurt, fruits, and granola — delicious and refreshing.", image: "https://plus.unsplash.com/premium_photo-1669680784119-1f2ac0260295?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RnJ1aXQlMjBQYXJmYWl0fGVufDB8fDB8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' }
    ];

    // ==============================
    // CORE FIX: Initialization Logic to Prevent Duplication
    // ==============================
    function initializeRecipes() {
        const loadedFlag = localStorage.getItem("staticRecipesLoaded");
        let recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

        // ONLY RUN THIS BLOCK ONCE
        if (!loadedFlag) {
            
            // 1. Ensure any user recipes are kept and not overwritten
            const userRecipes = recipes.filter(r => r.source === 'user'); 
            
            // 2. Set the list to the STATIC recipes + any user recipes
            const finalRecipes = [...STATIC_RECIPES, ...userRecipes];
            
            // 3. Save the final list and set the flag to prevent re-running
            localStorage.setItem("recipes", JSON.stringify(finalRecipes));
            localStorage.setItem("staticRecipesLoaded", "true");
            
            return finalRecipes;
        } 
        
        // Return the current recipe list from storage
        return recipes;
    }

    let recipes = initializeRecipes();

    function getAllRecipes() {
        return JSON.parse(localStorage.getItem("recipes") || "[]");
    }

    // ==============================
    // NAVIGATION (FIXED - Back button now works)
    // ==============================
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Don't prevent default behavior for the back-to-dashboard link
            if (link.classList.contains('back-dashboard')) {
                // Close sidebar on mobile if open
                if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                    toggleSidebar();
                }
                return; // Let the natural link behavior happen
            }
            
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const targetPageId = link.dataset.page; 
            pages.forEach(p => p.classList.remove("active-page"));
            const newActivePage = document.getElementById(targetPageId);
            
            if (newActivePage) {
                newActivePage.classList.add("active-page");
            }

            if (targetPageId === "manage") {
                renderRecipeList();
            } else if (targetPageId === "dashboard") {
                recipes = getAllRecipes();
                totalRecipes.textContent = recipes.length;
            }

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains("open") && 
            !sidebar.contains(e.target) && 
            e.target !== menuToggle) {
            toggleSidebar();
        }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("open");
            backdrop.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    // ==============================
    // RECIPE MANAGEMENT (CRUD) - FIXED EDIT/DELETE
    // ==============================

    // RENDER: Render the list of recipes (Static + User-added)
    function renderRecipeList() {
        recipes = getAllRecipes(); 
        
        recipeList.innerHTML = "";
        totalRecipes.textContent = recipes.length; 

        if (recipes.length === 0) {
            recipeList.innerHTML = `<tr class="empty"><td colspan="5" style="text-align: center; color: #777; padding: 2rem;">No recipes found. Use the 'Add Recipe' tab to create one.</td></tr>`;
            return;
        }

        recipes.forEach((recipe, index) => {
            const isStatic = recipe.source === 'static';
            const row = document.createElement("tr");
            
            row.innerHTML = `
                <td>
                    <img src="${recipe.image || 'https://via.placeholder.com/50x35?text=No+Image'}" 
                         alt="${recipe.name}" 
                         class="recipe-thumb"
                         loading="lazy">
                </td>
                <td>${recipe.name}</td>
                <td>${recipe.category}</td>
                <td>${recipe.time}</td> 
                <td>
                    ${isStatic 
                        ? `<span class="locked-icon" title="Static recipe: Cannot edit or delete.">
                             <i class="fa-solid fa-lock"></i>
                             <span class="sr-only">Locked</span>
                           </span>`
                        : `
                          <div class="action-buttons">
                            <button class="action-btn edit-btn" data-id="${index}" aria-label="Edit ${recipe.name}">
                                <i class="fa-solid fa-pen"></i>
                                <span class="btn-text">Edit</span>
                            </button>
                            <button class="action-btn delete-btn" data-id="${index}" aria-label="Delete ${recipe.name}">
                                <i class="fa-solid fa-trash"></i>
                                <span class="btn-text">Delete</span>
                            </button>
                          </div>
                        `
                    }
                </td>
            `;
            recipeList.appendChild(row);
        });
        
        attachActionListeners();
    }

    // C: Handle Add Recipe Form Submission
    if (addRecipeForm) {
        addRecipeForm.addEventListener("submit", (e) => {
            e.preventDefault();

            let currentRecipes = getAllRecipes();

            const newRecipe = {
                name: document.getElementById("recipeName").value,
                category: document.getElementById("recipeCategory").value,
                time: document.getElementById("prepTime").value,
                desc: document.getElementById("recipeDesc").value,
                image: document.getElementById("recipeImage").value,
                source: 'user',
            };

            currentRecipes.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(currentRecipes));

            modal.style.display = "block";
            addRecipeForm.reset();
            
            // Navigate to the 'manage' page
            pages.forEach(p => p.classList.remove("active-page"));
            document.getElementById("manage").classList.add("active-page");
            navLinks.forEach(l => l.classList.remove("active"));
            document.querySelector('[data-page="manage"]').classList.add("active");
            
            renderRecipeList(); 
        });
    }

    // U: Handle Edit Recipe (Open Modal)
    function openEditModal(index) {
        console.log("Opening edit modal for index:", index); // Debug log
        recipes = getAllRecipes();
        const recipeToEdit = recipes[index];
        
        if (!recipeToEdit || recipeToEdit.source === 'static') {
            console.log("Cannot edit - recipe is static or doesn't exist");
            return;
        }

        document.getElementById("editRecipeId").value = index; 
        document.getElementById("editRecipeName").value = recipeToEdit.name;
        document.getElementById("editRecipeCategory").value = recipeToEdit.category;
        document.getElementById("editPrepTime").value = recipeToEdit.time;
        document.getElementById("editRecipeDesc").value = recipeToEdit.desc;
        document.getElementById("editRecipeImage").value = recipeToEdit.image;
        
        editModal.style.display = "block";
        console.log("Edit modal should be visible now");
    }

    // U: Handle Edit Recipe (Save Changes)
    if (editRecipeForm) {
        editRecipeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const index = parseInt(document.getElementById("editRecipeId").value);
            console.log("Saving edits for index:", index); // Debug log
            
            recipes = getAllRecipes();
            
            if (!recipes[index] || recipes[index].source === 'static') {
                console.log("Cannot save - recipe is static or doesn't exist");
                editModal.style.display = "none";
                return;
            }

            recipes[index] = {
                ...recipes[index], 
                name: document.getElementById("editRecipeName").value,
                category: document.getElementById("editRecipeCategory").value,
                time: document.getElementById("editPrepTime").value,
                desc: document.getElementById("editRecipeDesc").value,
                image: document.getElementById("editRecipeImage").value,
            };

            localStorage.setItem("recipes", JSON.stringify(recipes));
            editModal.style.display = "none";
            renderRecipeList();
            console.log("Recipe updated successfully");
        });
    }
    
    // D: Handle Delete Recipe
    function deleteRecipe(index) {
        console.log("Deleting recipe at index:", index); // Debug log
        recipes = getAllRecipes();
        
        if (!recipes[index] || recipes[index].source === 'static') {
            console.log("Cannot delete - recipe is static or doesn't exist");
            return; 
        }

        if (confirm(`Are you sure you want to delete the recipe: "${recipes[index].name}"?`)) {
            recipes.splice(index, 1);
            localStorage.setItem("recipes", JSON.stringify(recipes));
            renderRecipeList();
            console.log("Recipe deleted successfully");
        }
    }

    // Attach listeners to dynamically created buttons - FIXED VERSION
    function attachActionListeners() {
        console.log("Attaching action listeners..."); // Debug log
        
        // Edit buttons
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(btn.getAttribute("data-id"));
                console.log("Edit button clicked, index:", index); // Debug log
                openEditModal(index);
            });
        });

        // Delete buttons
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(btn.getAttribute("data-id"));
                console.log("Delete button clicked, index:", index); // Debug log
                deleteRecipe(index);
            });
        });
        
        console.log("Action listeners attached to:", document.querySelectorAll(".edit-btn").length, "edit buttons and", document.querySelectorAll(".delete-btn").length, "delete buttons"); // Debug log
    }

    // ==============================
    // MODAL CONTROLS
    // ==============================
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            editModal.style.display = "none";
        });
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
        if (e.target === editModal) {
            editModal.style.display = "none";
        }
    });

    // ==============================
    // REAL-TIME PREVIEW FUNCTIONALITY
    // ==============================
    const previewFields = ['recipeName', 'recipeCategory', 'prepTime', 'recipeDesc', 'recipeImage'];
    
    previewFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updatePreview);
        }
    });

    function updatePreview() {
        const name = document.getElementById('recipeName').value || 'Recipe Name';
        const category = document.getElementById('recipeCategory').value || 'Category';
        const time = document.getElementById('prepTime').value || '--';
        const desc = document.getElementById('recipeDesc').value || 'Description will appear here...';
        const image = document.getElementById('recipeImage').value || 'https://via.placeholder.com/300x200?text=Preview';

        document.getElementById('previewName').textContent = name;
        document.getElementById('previewCategory').textContent = category;
        document.getElementById('previewTime').textContent = `Prep Time: ${time}`;
        document.getElementById('previewDesc').textContent = desc;
        document.getElementById('previewImage').src = image;
    }

    // ==============================
    // INITIAL LOAD
    // ==============================
    renderRecipeList();
    updatePreview(); // Initialize preview with placeholder values

    // Set initial dashboard stats
    recipes = getAllRecipes();
    totalRecipes.textContent = recipes.length;
    
    console.log("Admin dashboard initialized successfully"); // Debug log
});
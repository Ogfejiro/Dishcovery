document.addEventListener("DOMContentLoaded", () => {
    // FIX: The HTML sections are named 'dashboard', 'manage', 'add', 'profile', 'settings'.
    // The JavaScript should use these IDs directly.
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

    // FIX: Corrected ID for Preparation Time input in the Edit Modal
    const editPrepTimeInput = document.getElementById("editPrepTime");


    // ==============================
    // STATIC RECIPES (locked) - 12 items
    // ==============================
    const STATIC_RECIPES = [
        { name: "Pancakes", category: "Breakfast", time: "15 mins", desc: "Fluffy pancakes served warm with syrup and fresh berries.", image: "https://media.istockphoto.com/id/518525367/photo/breakfast-pancakes-and-syrup.webp?a=1&b=1&s=612x612&w=0&k=20&c=aU5gXk1huHPXP0tupPAvQP8-6tkxpQ28zziXIxyMOG4=", source: 'static' },
        { name: "Jollof Rice", category: "Lunch", time: "45 mins", desc: "A West African classic — spicy rice cooked with tomatoes, peppers, and seasoning.", image: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am9sbG9mJTIwcmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Puff Puff", category: "Snacks", time: "30 mins", desc: "Fluffy deep-fried dough balls — slightly sweet and addictive, perfect for snacks.", image: "https://images.unsplash.com/photo-1664993085274-80c6ba725ccc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVmZiUyMHB1ZmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Grilled Chicken", category: "Dinner", time: "35 mins", desc: "Juicy grilled chicken marinated in herbs and spices — smoky and delicious.", image: "https://plus.unsplash.com/premium_photo-1695931844305-b5dd90ab6138?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JpbGxlZCUyMGNoaWNrZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Smoothie", category: "Drinks", time: "5 mins", desc: "A refreshing fruit smoothie packed with vitamins and a cool burst of energy.", image: "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21vb3RoaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Avocado Toast", category: "Breakfast", time: "10 mins", desc: "Toasted bread topped with creamy avocado and seasonings — simple and satisfying.", image: "https://media.istockphoto.com/id/1518833009/photo/avocado-toast.webp?a=1&b=1&s=612x612&w=0&k=20&c=6m3ocHfARNgjtgykJ6nm2nP9ziHv_5bNA11G-XgEcs4=", source: 'static' },
        { name: "Spaghetti Bolognese", category: "Lunch", time: "40 mins", desc: "Classic Italian pasta with rich tomato meat sauce — comforting and hearty.", image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BhZ2hldHRpJTIwYm9sb2duZXNlfGVufDB8fDB8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Chicken Salad", category: "Dinner", time: "20 mins", desc: "Light and healthy — grilled chicken tossed with crisp vegetables and dressing.", image: "https://images.unsplash.com/photo-1605291535065-e1d52d2b264a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMHNhbGFkfGVufDB8fDB8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Fried Rice", category: "Lunch", time: "35 mins", desc: "Colorful rice stir-fried with veggies and proteins — a Nigerian party favorite.", image: "https://media.istockphoto.com/id/2154268555/photo/asian-chicken-fried-rice-comfort-food-takeaway-food-top-down-rice-dish-photography.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y2qaDNcEUamRMoa-vJw4Ulp_CE8fZFXyrkAw1vAIAdg=", source: 'static' },
        { name: "Chapman Drink", category: "Drinks", time: "5 mins", desc: "Popular Nigerian cocktail made with Fanta, Sprite, and bitters — sweet and zesty.", image: "https://images.unsplash.com/photo-1557935260-03ada3026d41?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhcG1hbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500", source: 'static' },
        { name: "Suya", category: "Dinner", time: "25 mins", desc: "Spicy Nigerian street food — grilled beef skewers coated with yaji pepper mix.", image: "https://media.istockphoto.com/id/2182713829/photo/nigerian-beef-suya-steak-served-at-a-party.webp?a=1&b=1&s=612x612&w=0&k=20&c=h_cPDQaG20hs0CZe1upzFpIMoHwXji97TwjRxojCKT8=", source: 'static' },
        { name: "Fruit Parfait", category: "Snacks", time: "10 mins", desc: "Layered yogurt, fruits, and granola — delicious and refreshing.", image: "https://plus.unsplash.com/premium_photo-1669680784119-1f2ac0260295?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RnJ1aXQlMjBQYXJmYWl0fGVufDB8fDB8fDA%3D&auto=format&fit=crop&q=60&w=500", source: 'static' }
    ];

    // Initialize localStorage and handle static data reset
    let recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

    // 1. Filter out all existing static recipes (to clean up old duplicates)
    let userRecipes = recipes.filter(r => r.source !== 'static');

    // 2. Rebuild the list: 12 clean static recipes + any user-added recipes
    const finalRecipes = [...STATIC_RECIPES, ...userRecipes];

    localStorage.setItem("recipes", JSON.stringify(finalRecipes));

    // ==============================
    // Helper to get all recipes
    // ==============================
    function getAllRecipes() {
        return JSON.parse(localStorage.getItem("recipes") || "[]");
    }

    // ==============================
    // Page Navigation (CORRECTED)
    // ==============================
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 1. Update active nav link
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // 2. Determine target page ID and switch page view
            const targetPageId = link.dataset.page; // Use the data-page attribute directly ('dashboard', 'manage', 'add', etc.)

            pages.forEach(p => p.classList.remove("active-page"));
            const newActivePage = document.getElementById(targetPageId);
            
            if (newActivePage) {
                newActivePage.classList.add("active-page");
            }

            // 3. Re-render list ONLY if switching to the 'Manage Recipes' section
            if (targetPageId === "manage") {
                renderRecipeList();
            } else if (targetPageId === "dashboard") {
                // Ensure stats are updated if needed
                recipes = getAllRecipes();
                totalRecipes.textContent = recipes.length;
            }
        });
    });

    // ==============================
    // Recipe Management (CRUD)
    // ==============================

    // RENDER: Render the list of recipes in the dashboard
    function renderRecipeList() {
        recipes = getAllRecipes();
        recipeList.innerHTML = "";
        totalRecipes.textContent = recipes.length; // Update the stat card

        if (recipes.length === 0) {
            recipeList.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #777;">No recipes found. Use the 'Add Recipe' tab to create one.</td></tr>`;
            return;
        }

        recipes.forEach((recipe, index) => {
            const isStatic = recipe.source === 'static';
            const row = document.createElement("tr");
            
            // The HTML has an extra <th> for Recipe #
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${recipe.image || 'placeholder.jpg'}" alt="${recipe.name}" class="recipe-thumb"></td>
                <td>${recipe.name}</td>
                <td>${recipe.category}</td>
                <td>${recipe.time}</td>
                <td>
                    <button class="action-btn view-btn" data-id="${index}">View</button>
                    ${isStatic 
                        ? `<span class="locked-icon" title="Static recipe: Cannot edit or delete."><i class="fa-solid fa-lock"></i></span>`
                        : `<button class="action-btn edit-btn" data-id="${index}">Edit</button>`
                    }
                    ${isStatic 
                        ? '' 
                        : `<button class="action-btn delete-btn" data-id="${index}">Delete</button>`
                    }
                </td>
            `;
            recipeList.appendChild(row);
        });
        
        // Attach event listeners to the new buttons
        attachActionListeners();
    }

    // C: Handle Add Recipe Form Submission
    addRecipeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newRecipe = {
            name: document.getElementById("recipeName").value,
            category: document.getElementById("recipeCategory").value,
            time: document.getElementById("prepTime").value, // FIX: Use prepTime ID
            desc: document.getElementById("recipeDesc").value,
            image: document.getElementById("recipeImage").value,
            source: 'user', // Mark as user-added
        };

        recipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        // Show success modal
        modal.style.display = "block";
        addRecipeForm.reset();
        
        // Switch to the 'manage' page after adding
        pages.forEach(p => p.classList.remove("active-page"));
        document.getElementById("manage").classList.add("active-page");
        navLinks.forEach(l => l.classList.remove("active"));
        document.querySelector('[data-page="manage"]').classList.add("active");
        renderRecipeList();
    });

    // U: Handle Edit Recipe (Open Modal)
    function openEditModal(index) {
        const recipeToEdit = recipes[index];
        if (recipeToEdit.source === 'static') return;

        // Populate the edit form fields
        document.getElementById("editRecipeId").value = index; 
        document.getElementById("editRecipeName").value = recipeToEdit.name;
        document.getElementById("editRecipeCategory").value = recipeToEdit.category;
        document.getElementById("editPrepTime").value = recipeToEdit.time; // FIX: Use editPrepTime ID
        document.getElementById("editRecipeDesc").value = recipeToEdit.desc;
        document.getElementById("editRecipeImage").value = recipeToEdit.image;
        
        editModal.style.display = "block";
    }

    // U: Handle Edit Recipe (Save Changes)
    editRecipeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const index = document.getElementById("editRecipeId").value;
        
        // Check if the hidden ID field is missing in the HTML, if so, add it:
        // <input type="hidden" id="editRecipeId" value="">
        if (!recipes[index]) {
            console.error("Recipe ID not found for editing.");
            editModal.style.display = "none";
            return;
        }

        recipes[index] = {
            ...recipes[index], 
            name: document.getElementById("editRecipeName").value,
            category: document.getElementById("editRecipeCategory").value,
            time: document.getElementById("editPrepTime").value, // FIX: Use editPrepTime ID
            desc: document.getElementById("editRecipeDesc").value,
            image: document.getElementById("editRecipeImage").value,
        };

        localStorage.setItem("recipes", JSON.stringify(recipes));
        editModal.style.display = "none";
        renderRecipeList();
    });
    
    // D: Handle Delete Recipe
    function deleteRecipe(index) {
        if (recipes[index].source === 'static') return; 

        if (confirm(`Are you sure you want to delete the recipe: ${recipes[index].name}?`)) {
            recipes.splice(index, 1);
            localStorage.setItem("recipes", JSON.stringify(recipes));
            renderRecipeList();
        }
    }

    // Attach listeners to dynamically created buttons
    function attachActionListeners() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = parseInt(e.target.dataset.id);
                openEditModal(index);
            });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = parseInt(e.target.dataset.id);
                deleteRecipe(index);
            });
        });

        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = parseInt(e.target.dataset.id);
                alert(`Viewing details for: ${recipes[index].name}\n\nDescription: ${recipes[index].desc}`);
            });
        });
    }

    // ==============================
    // Modal Control & Preview
    // ==============================

    // Success Modal Close
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
    
    // Edit Modal Close
    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener("click", () => {
            editModal.style.display = "none";
        });
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
    }

    // Optional: Add simple form preview functionality
    const previewName = document.getElementById('previewName');
    const previewCategory = document.getElementById('previewCategory');
    const previewTime = document.getElementById('previewTime');
    const previewDesc = document.getElementById('previewDesc');
    const previewImage = document.getElementById('previewImage');

    if (addRecipeForm) {
        addRecipeForm.addEventListener('input', () => {
            previewName.textContent = document.getElementById("recipeName").value || "Recipe Name";
            previewCategory.textContent = document.getElementById("recipeCategory").value.charAt(0).toUpperCase() + document.getElementById("recipeCategory").value.slice(1) || "Category";
            previewTime.textContent = `Prep Time: ${document.getElementById("prepTime").value || '--'}`;
            previewDesc.textContent = document.getElementById("recipeDesc").value || "Description will appear here...";
            const imgUrl = document.getElementById("recipeImage").value;
            if (imgUrl) {
                previewImage.src = imgUrl;
            } else {
                previewImage.src = "https://via.placeholder.com/300x200?text=Preview";
            }
        });
    }

    // ==============================
    // Initial Load
    // ==============================
    // On initial load, we only need to call renderRecipeList IF the 'manage' section is the active one in HTML.
    // If not, it will be called when the user clicks the 'Manage Recipes' link.
    // Let's call it here to ensure the total count is always correct for the dashboard section.
    renderRecipeList();
});
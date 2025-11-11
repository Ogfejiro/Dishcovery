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
    const publishedRecipes = document.getElementById("publishedRecipes");
    const dashboardRecipes = document.getElementById("dashboardRecipes");
    const addRecipeForm = document.getElementById("addRecipeForm");
    const modal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModal");

    // Edit Modal Elements
    const editModal = document.getElementById("editRecipeModal"); 
    const closeEditModalBtn = document.getElementById("closeEditModal");
    const editRecipeForm = document.getElementById("editRecipeForm");

    // RECIPE STORAGE SYSTEM - Use the same key as HTML
    const DISHDISCOVERY_RECIPES_KEY = 'dishcovery_all_recipes';

    // ==============================
    // CORE FIX: Use the same storage system as HTML
    // ==============================
    function initializeRecipes() {
        const existingRecipes = getAllRecipes();
        if (existingRecipes.length === 0) {
            const demoRecipes = [
                {
                    id: '1',
                    name: 'Classic Pancakes',
                    category: 'breakfast',
                    prepTime: '20 mins',
                    description: 'Fluffy homemade pancakes perfect for weekend breakfast',
                    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
                    status: 'published',
                    createdAt: new Date().toISOString(),
                    createdBy: 'system'
                },
                {
                    id: '2',
                    name: 'Avocado Toast',
                    category: 'breakfast',
                    prepTime: '10 mins',
                    description: 'Creamy avocado on toasted artisan bread',
                    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
                    status: 'published',
                    createdAt: new Date().toISOString(),
                    createdBy: 'system'
                },
                {
                    id: '3',
                    name: 'Grilled Chicken Salad',
                    category: 'lunch',
                    prepTime: '25 mins',
                    description: 'Healthy grilled chicken with fresh garden vegetables',
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
                    status: 'published',
                    createdAt: new Date().toISOString(),
                    createdBy: 'system'
                }
            ];
            localStorage.setItem(DISHDISCOVERY_RECIPES_KEY, JSON.stringify(demoRecipes));
            return demoRecipes;
        }
        return existingRecipes;
    }

    function getAllRecipes() {
        try {
            const recipes = localStorage.getItem(DISHDISCOVERY_RECIPES_KEY);
            return recipes ? JSON.parse(recipes) : [];
        } catch (error) {
            console.error('Error reading recipes from localStorage:', error);
            return [];
        }
    }

    function getPublishedRecipes() {
        const recipes = getAllRecipes();
        return recipes.filter(recipe => recipe.status === 'published');
    }

    function saveRecipe(recipe) {
        const recipes = getAllRecipes();
        const newRecipe = {
            id: Date.now().toString(),
            name: recipe.name,
            category: recipe.category,
            prepTime: recipe.prepTime,
            description: recipe.description,
            image: recipe.image,
            status: recipe.status || 'published',
            createdAt: new Date().toISOString(),
            createdBy: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).email : 'admin'
        };
        
        recipes.push(newRecipe);
        try {
            localStorage.setItem(DISHDISCOVERY_RECIPES_KEY, JSON.stringify(recipes));
            return newRecipe;
        } catch (error) {
            console.error('Error saving recipe:', error);
            throw new Error('Failed to save recipe');
        }
    }

    function updateRecipe(recipeId, updatedData) {
        const recipes = getAllRecipes();
        const recipeIndex = recipes.findIndex(r => r.id === recipeId);
        
        if (recipeIndex !== -1) {
            recipes[recipeIndex] = { ...recipes[recipeIndex], ...updatedData };
            try {
                localStorage.setItem(DISHDISCOVERY_RECIPES_KEY, JSON.stringify(recipes));
                return true;
            } catch (error) {
                console.error('Error updating recipe:', error);
                return false;
            }
        }
        return false;
    }

    function updateRecipeCount() {
        const recipes = getAllRecipes();
        const publishedRecipesList = getPublishedRecipes();
        
        if (totalRecipes) totalRecipes.textContent = recipes.length;
        if (publishedRecipes) publishedRecipes.textContent = publishedRecipesList.length;
        if (dashboardRecipes) dashboardRecipes.textContent = publishedRecipesList.length;
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
                updateRecipeCount();
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
    // RECIPE MANAGEMENT (CRUD) - FIXED TO WORK WITH HTML SYSTEM
    // ==============================

    // RENDER: Render the list of recipes
    function renderRecipeList() {
        const recipes = getAllRecipes(); 
        
        if (recipeList) {
            recipeList.innerHTML = "";
            
            if (recipes.length === 0) {
                recipeList.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 40px; color: #666;">
                            <i class="fa-solid fa-utensils" style="font-size: 48px; margin-bottom: 10px; display: block; color: #ddd;"></i>
                            No recipes found. Add your first recipe!
                        </td>
                    </tr>
                `;
                return;
            }

            recipes.forEach((recipe) => {
                const row = document.createElement("tr");
                
                row.innerHTML = `
                    <td>
                        <img src="${recipe.image}" alt="${recipe.name}" 
                             style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"
                             onerror="this.src='https://via.placeholder.com/50x50?text=No+Image'">
                    </td>
                    <td><strong>${recipe.name}</strong></td>
                    <td>${recipe.category ? recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1) : 'Uncategorized'}</td>
                    <td>${recipe.prepTime || 'Not specified'}</td>
                    <td>
                        <span class="status-badge ${recipe.status === 'published' ? 'status-published' : 'status-draft'}">
                            ${recipe.status || 'draft'}
                        </span>
                    </td>
                    <td>${recipe.status === 'published' ? '✅ Visible' : '❌ Hidden'}</td>
                    <td>
                        <button class="edit-btn" onclick="editRecipe('${recipe.id}')">
                            <i class="fa-solid fa-edit"></i> Edit
                        </button>
                        <button class="delete-btn" onclick="deleteRecipe('${recipe.id}')">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </td>
                `;
                recipeList.appendChild(row);
            });
        }
        
        updateRecipeCount();
    }

    // C: Handle Add Recipe Form Submission
    if (addRecipeForm) {
        addRecipeForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const recipeData = {
                name: document.getElementById("recipeName").value,
                category: document.getElementById("recipeCategory").value,
                prepTime: document.getElementById("prepTime").value,
                description: document.getElementById("recipeDesc").value,
                image: document.getElementById("recipeImage").value,
                status: document.getElementById("recipeStatus").value
            };

            try {
                const newRecipe = saveRecipe(recipeData);
                
                // Show success message
                const successMessage = document.getElementById("successMessage");
                if (successMessage) {
                    if (recipeData.status === 'published') {
                        successMessage.textContent = 'Recipe published successfully! It will appear on the main Dishcovery dashboard. 🎉';
                    } else {
                        successMessage.textContent = 'Recipe saved as draft successfully! It will not appear on the main dashboard.';
                    }
                }
                
                if (modal) {
                    modal.style.display = "block";
                }
                
                addRecipeForm.reset();
                updatePreview();
                renderRecipeList();
                
            } catch (error) {
                console.error('Error adding recipe:', error);
                alert('Error adding recipe. Please try again.');
            }
        });
    }

    // U: Handle Edit Recipe (Save Changes)
    if (editRecipeForm) {
        editRecipeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const recipeId = document.getElementById("editRecipeId").value;
            
            const updatedData = {
                name: document.getElementById("editRecipeName").value,
                category: document.getElementById("editRecipeCategory").value,
                prepTime: document.getElementById("editPrepTime").value,
                description: document.getElementById("editRecipeDesc").value,
                image: document.getElementById("editRecipeImage").value,
                status: document.getElementById("editRecipeStatus").value
            };
            
            const success = updateRecipe(recipeId, updatedData);
            if (success) {
                if (editModal) {
                    editModal.style.display = "none";
                }
                renderRecipeList();
                alert('Recipe updated successfully!');
            } else {
                alert('Error updating recipe. Please try again.');
            }
        });
    }

    // Clear recipe from saved recipes in main dashboard
    function clearRecipeFromSaved(recipeId) {
        try {
            // Convert recipeId to match the format used in main dashboard
            const adminRecipeId = -Math.abs(parseInt(recipeId));
            
            // Get current saved recipes
            const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
            
            // Remove the deleted recipe from saved recipes
            const updatedSavedRecipes = savedRecipes.filter(id => id !== adminRecipeId);
            
            // Save back to localStorage
            localStorage.setItem('savedRecipes', JSON.stringify(updatedSavedRecipes));
            
            console.log('Cleared recipe from saved recipes:', recipeId);
        } catch (error) {
            console.error('Error clearing recipe from saved:', error);
        }
    }

    // ==============================
    // GLOBAL FUNCTIONS FOR HTML BUTTONS
    // ==============================
    window.editRecipe = function(recipeId) {
        const recipes = getAllRecipes();
        const recipe = recipes.find(r => r.id === recipeId);
        
        if (recipe && editModal) {
            document.getElementById('editRecipeId').value = recipe.id;
            document.getElementById('editRecipeName').value = recipe.name;
            document.getElementById('editRecipeCategory').value = recipe.category;
            document.getElementById('editPrepTime').value = recipe.prepTime;
            document.getElementById('editRecipeDesc').value = recipe.description;
            document.getElementById('editRecipeImage').value = recipe.image;
            document.getElementById('editRecipeStatus').value = recipe.status;
            
            editModal.style.display = 'block';
        }
    };

    window.deleteRecipe = function(recipeId) {
        if (confirm('Are you sure you want to delete this recipe? This will remove it from both admin and main dashboard.')) {
            const recipes = getAllRecipes();
            const filteredRecipes = recipes.filter(recipe => recipe.id !== recipeId);
            
            try {
                localStorage.setItem(DISHDISCOVERY_RECIPES_KEY, JSON.stringify(filteredRecipes));
                
                // Clear any saved references in the main dashboard
                clearRecipeFromSaved(recipeId);
                
                renderRecipeList();
                alert('Recipe deleted successfully from both admin and main dashboard!');
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert('Error deleting recipe. Please try again.');
            }
        }
    };

    window.logout = function() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.location.href = "../login-active_folder/login-active.html";
        }
    };

    // ==============================
    // MODAL CONTROLS
    // ==============================
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            if (modal) modal.style.display = "none";
        });
    }

    if (closeEditModalBtn) {
        closeEditModalBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (editModal) editModal.style.display = "none";
        });
    }

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
        if (modal && e.target === modal) {
            modal.style.display = "none";
        }
        if (editModal && e.target === editModal) {
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
        const status = document.getElementById('recipeStatus') ? document.getElementById('recipeStatus').value : 'draft';

        const previewName = document.getElementById('previewName');
        const previewCategory = document.getElementById('previewCategory');
        const previewTime = document.getElementById('previewTime');
        const previewDesc = document.getElementById('previewDesc');
        const previewImage = document.getElementById('previewImage');
        const previewStatus = document.getElementById('previewStatus');

        if (previewName) previewName.textContent = name;
        if (previewCategory) previewCategory.textContent = category;
        if (previewTime) previewTime.textContent = `Prep Time: ${time}`;
        if (previewDesc) previewDesc.textContent = desc;
        if (previewImage) previewImage.src = image;
        if (previewStatus) {
            previewStatus.textContent = status === 'published' ? 'Published' : 'Draft';
            previewStatus.className = `status-badge ${status === 'published' ? 'status-published' : 'status-draft'}`;
        }
    }

    // ==============================
    // INITIAL LOAD
    // ==============================
    initializeRecipes();
    renderRecipeList();
    updatePreview(); // Initialize preview with placeholder values
    updateRecipeCount();
    
    console.log("Admin dashboard initialized successfully with unified storage system");
});
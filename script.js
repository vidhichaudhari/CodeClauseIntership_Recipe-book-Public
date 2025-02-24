document.addEventListener("DOMContentLoaded", function() {
    const addRecipeBtn = document.getElementById("addRecipeBtn");
    const recipeForm = document.getElementById("recipeForm");
    const saveRecipeBtn = document.getElementById("saveRecipeBtn");
    const recipeList = document.getElementById("recipeList");

    function preloadRecipes() {
        if (!localStorage.getItem("recipes")) {
            const defaultRecipes = [
                {
                    title: "Paneer Tikka",
                    description: "Delicious grilled paneer marinated in Indian spices.",
                    imageUrl: "panner_tikka.jpg",
                    ingredients: ["Paneer", "Yogurt", "Spices", "Lemon Juice"],
                    instructions: "Marinate paneer. Grill until golden brown. Serve hot."
                },
                {
                    title: "Manchurian",
                    description: "Spicy and tangy Indo-Chinese vegetable Manchurian.",
                    imageUrl: "manchurian.jpg",
                    ingredients: ["Cabbage", "Carrot", "Corn Flour", "Soy Sauce"],
                    instructions: "Make vegetable balls. Deep fry. Toss in spicy sauce."
                },
                {
                    title: "Veg Curry",
                    description: "A rich and creamy vegetable curry with Indian spices.",
                    imageUrl: "veg_curry.jpg",
                    ingredients: ["Mixed Vegetables", "Tomato", "Cream", "Indian Spices"],
                    instructions: "Cook vegetables. Add spices. Simmer with tomato gravy."
                },
                {
                    title: "Malai Kofta",
                    description: "Soft cottage cheese dumplings in a creamy gravy.",
                    imageUrl: "malai_kofta.jpg",
                    ingredients: ["Paneer", "Potato", "Cashews", "Cream"],
                    instructions: "Prepare kofta balls. Fry until golden. Simmer in gravy."
                }
                
            ];
            localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
        }
    }

    addRecipeBtn.addEventListener("click", function() {
        recipeForm.classList.toggle("hidden");
    });

    saveRecipeBtn.addEventListener("click", function() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const imageUrl = document.getElementById("imageUrl").value || "default.jpg";
        const ingredients = document.getElementById("ingredients").value.split(",");
        const instructions = document.getElementById("instructions").value;

        if (title && description && ingredients.length && instructions) {
            const newRecipe = { title, description, imageUrl, ingredients, instructions };

            let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
            recipes.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(recipes));

            displayRecipes();
            recipeForm.classList.add("hidden");
        }
    });

    function displayRecipes() {
        recipeList.innerHTML = "";
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    
        recipes.forEach((recipe, index) => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src="${recipe.imageUrl}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button onclick="deleteRecipe(${index})" class="btn">Delete</button>
            `;
            recipeList.appendChild(recipeDiv);
        });
    }

    window.deleteRecipe = function(index) {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        displayRecipes();
    }

    preloadRecipes();
    displayRecipes();
});

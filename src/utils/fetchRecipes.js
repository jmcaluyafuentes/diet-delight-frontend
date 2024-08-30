export const fetchRecipes = async (dietCriteria, healthCriteria, setRecipes) => {
    try {
        // Construct URL with query parameters
        const queryParams = new URLSearchParams();

        // Append dietary criteria to query parameters
        dietCriteria.forEach(diet => queryParams.append('diet', diet));
        // Append health criteria to query parameters
        healthCriteria.forEach(health => queryParams.append('health', health));
        
        // Fetch recipes from the API with the constructed query parameters
        const response = await fetch(`https://diet-delight-backend.onrender.com/recipes?${queryParams.toString()}`);
        
        if (!response.ok) {
            // Throw an error if response is not OK
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Update the state with the fetched recipes
        setRecipes(data.recipes);

    } catch (error) {
        console.error('Error fetching recipes:', error);
        // Update the state with an empty array in case of an error
        setRecipes([]);
    }
};

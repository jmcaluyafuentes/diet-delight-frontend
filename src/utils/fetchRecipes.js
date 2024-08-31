export const fetchRecipes = async (dietCriteria, healthCriteria, setRecipes, setIsLoading) => {
    try {
        // Show the loading spinner by setting its state to true
        setIsLoading(true)
        // Create URLSearchParams object to build query string
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
        // Update recipes state with fetched data
        setRecipes(data.recipes);

    } catch (error) {
        console.error('Error fetching recipes:', error);
        // Set recipes state to an empty array if there's an error
        setRecipes([]);
    } finally {
        // Set loading spinner state to false regardless of the outcome
        setIsLoading(false)
    }
};

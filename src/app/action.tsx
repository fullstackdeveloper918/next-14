// "use server"

const APP_ID = '2e28311c';
const APP_KEY = 'f0d2f537dd9650b98529fbf27e8156a8';
const baseUrl = 'https://api.edamam.com/api/recipes/v2'

export const getRecipes = async () => {
  try {
    const response = await fetch(
      `${baseUrl}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&health=dairy-free&cuisineType=Asian`
    );
    const data = await response.json();
    console.log(data, "sjdsjad")
    return data
  } catch (error) {
    console.error('Error fetching recipes:', error);
    // return [];
  }
};
export const getRecipeById = async (id: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};
export const getId1 = async (id: string) => {
  
  try {
    const response = await fetch(
      `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};
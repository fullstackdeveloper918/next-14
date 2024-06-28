const APP_ID = '2e28311c';
const APP_KEY = 'f0d2f537dd9650b98529fbf27e8156a8';
const baseUrl='https://api.edamam.com/api/recipes/v2'
export const getRecipes = async () => {
  try {
    const response = await fetch(
      `${baseUrl}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&health=dairy-free&cuisineType=Asian`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
export const getRecipes1 = async () => {
  try {
    const response = await fetch(
      `https://apis.ethicalswag.com/api/category`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
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
export const getId = async (id: string) => {
  try {
    const response = await fetch(
      `https://chinese-food-db.p.rapidapi.com/${id}?app_key=ef237a62b4msh3ef2a53c0c815cbp1758d6jsnc75e569b07b9`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
};

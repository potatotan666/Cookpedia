const apiBaseUrl = "http://localhost:3001";
// const apiBaseUrl = "https://foodrecipe-server.herokuapp.com";

export const apiUrl = {
  getAllRecipes: `${apiBaseUrl}/recipe`,
  createRecipe: `${apiBaseUrl}/recipe`,
  getCategories: `${apiBaseUrl}/categories`,
  getRecipeById: `${apiBaseUrl}/recipe/`,
  login: `${apiBaseUrl}/login`,
  register: `${apiBaseUrl}/register`,
  getRatingByUser: `${apiBaseUrl}/rating/user/`,
  createUpdateRating: `${apiBaseUrl}/rating/`,
};

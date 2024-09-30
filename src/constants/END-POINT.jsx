const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1'; 

export const BASE_URL_IMG = 'https://upskilling-egypt.com:3006';

// Users URL base
const BASE_USERS = `${BASE_URL}/Users`;

export const URLS = {
  Login: `${BASE_USERS}/Login`,
  Register: `${BASE_USERS}/Register`,
  deleteUser: (id) => `${BASE_USERS}/${id}`,
  resetRequest: `${BASE_USERS}/Reset/Request`,
  reset: `${BASE_USERS}/Reset`,
  getUser: (id) => `${BASE_USERS}/${id}`,
  verifyAccount: `${BASE_USERS}/verify`,
  currentUser: `${BASE_USERS}/currentUser`,
  getUsers: `${BASE_USERS}`,
};

// Categories URL base
const BASE_CATEGORY = `${BASE_URL}/Category`;

export const CATEGORIES_URLS = {
  getList: BASE_CATEGORY,
  getcategoriesId: (id) => `${BASE_CATEGORY}/${id}`,
  deleteCategory: (id) => `${BASE_CATEGORY}/${id}`,
  getCategory: (id) => `${BASE_CATEGORY}/${id}`,
  addCategory: BASE_CATEGORY,
};

// Recipe URL base
const BASE_RECIPE = `${BASE_URL}/Recipe`;

export const RECIPE_URLS = {
  getList: BASE_RECIPE,
  getRecipeId: (id) => `${BASE_RECIPE}/${id}`,
  deleteRecipe: (id) => `${BASE_RECIPE}/${id}`,
  putRecipe: (id) => `${BASE_RECIPE}/${id}`,
  createRecipe: BASE_RECIPE,
};

// User Recipe URL base
const BASE_USER_RECIPE = `${BASE_URL}/userRecipe`;

export const USER_RECIPE_URLS = {
  getList: BASE_USER_RECIPE,
  addToFav: BASE_USER_RECIPE,
  deleteFav: (id) => `${BASE_USER_RECIPE}/${id}`,
};

// Tag URL
export const GETALLTAG = `${BASE_URL}/tag`;

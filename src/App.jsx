import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Login from './modules/Authentication/componants/Login/Login';
import Authlayout from './modules/shared/componant/Authlayout/Authlayout';
import Notfound from './modules/shared/componant/Notfound/Notfound';
import ForgetPassword from './modules/Authentication/componants/ForgetPassword/ForgetPassword';
import ResetPassword from './modules/Authentication/componants/ResetPassword/ResetPassword';
import Register from './modules/Authentication/componants/Register/Register';
import Masterlayout from './modules/shared/componant/Masterlayout/Masterlayout';
import Home from './modules/Home/componant/Home/Home';
import RecipesList from './modules/Recipes/Componant/RecipesList/RecipesList';
import CategoriesList from './modules/Categories/Componant/CategoriesList/CategoriesList';
import ProtectedRoute from './modules/shared/componant/ProtectedRoute/ProtectedRoute';
import UsersList from './modules/Users/Componant/UsersList/UsersList';
import RecipesData from './modules/Recipes/Componant/RecipesData/RecipesData';
import VerifyAccount from './modules/Authentication/componants/VerifyAccount/VerifyAccount';
import Favorites from './modules/Favorites/Favorites';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Authlayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: 'register', element: <Register /> },
        { path: 'verify-account', element: <VerifyAccount /> },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Masterlayout />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'UsersList', element: <UsersList /> },
        { path: 'recipiesList', element: <RecipesList /> },
        { path: 'recipies-data/:id', element: <RecipesData /> },
        { path: 'CategoriesList', element: <CategoriesList /> },
        { path: 'favorites', element: <Favorites /> },

      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

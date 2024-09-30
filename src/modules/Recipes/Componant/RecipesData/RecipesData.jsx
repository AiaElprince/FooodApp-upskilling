import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES_URLS, GETALLTAG, RECIPE_URLS } from './../../../../constants/END-POINT';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RecipesData() {
  const { register, handleSubmit, getValues,formState: { errors }, reset } = useForm();
  const [tagList, setTagList] = useState([]);
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();
  const location = useLocation();

  // Fetch categories
  const getCategory = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch tags
  const getAllData = async () => {
    try {
      let response = await axios.get(GETALLTAG, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTagList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Append form data
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('categoriesIds', data.categoriesIds);
    formData.append('tagId', data.tagId);
    formData.append('recipeImage', data.recipeImage[0]);
    return formData;
  };

  // Handle form submission for both POST (create) and PUT (update)
  const onSubmit = async (data) => {
    const isUpdate = location.state?.type === 'edit';
    const recipeId = location.state?.recipieData?.id;
    
    let recipeData = appendToFormData(data);
    let url = isUpdate && recipeId ? RECIPE_URLS.updateRecipe(recipeId) : RECIPE_URLS.createRecipe;
    let method = isUpdate ? 'put' : 'post';

    try {
      let response = await axios({
        method: method,
        url: url,
        data: recipeData,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (isUpdate) {
        toast.success("Recipe updated successfully");
      } else {
        toast.success("Recipe added successfully");
      }

      reset();
      navigate('/dashboard/recipiesList');
    } catch (error) {
      console.log(error);
      toast.error(isUpdate ? "Failed to update recipe" : "Failed to add recipe");
    }
  };

  useEffect(() => {
    getAllData();
    getCategory();

    // Load existing data if editing
    if (location.state?.type === 'edit' && location.state?.recipieData) {
      reset(location.state.recipieData);
    }
  }, [location.state, reset]);
   
  

  return (
    <>
      <div className='home-container py-3 px-5 my-3 d-flex justify-content-between align-items-center'>
        <div className='home-title'>
          <h4>Fill The <span className='text-success'>Recipe! Items</span></h4>
          <p>You can now fill the meals easily using the table and form.<br/>
            Click here and fill it with the table.
          </p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/recipiesList')} 
          className='btn btn-success'>
          Fill Recipes
          <FontAwesomeIcon icon={faArrowAltCircleRight}/> 
        </button>
      </div>
      <form className="w-75 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Recipe name"
          aria-label="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span className="text-danger">{errors.name.message}</span>}

        <select 
          className="form-control my-2"
          {...register('tagId', { required: 'Tag is required' })}
          defaultValue="" 
        >
          <option value="" disabled>Select Tag</option>
          {tagList.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tagId && <span className="text-danger">{errors.tagId.message}</span>}

        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter Your price"
          aria-label="price"
          {...register('price', { required: 'Price is required' })}
        />
        {errors.price && <span className="text-danger">{errors.price.message}</span>}

        <select 
          className="form-control my-2"
          {...register('categoriesIds', { required: 'Category is required' })}
          defaultValue=""
        >
          <option value="" disabled>Select Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoriesIds && <span className="text-danger">{errors.categoriesIds.message}</span>}

        <textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Description"
          className="form-control my-2"
        />
        {errors.description && <span className="text-danger">{errors.description.message}</span>}

        <input
          type="file"
          className="form-control my-2"
          placeholder="Upload photo"
          aria-label="recipeImage"
          {...register('recipeImage', { required: 'Recipe image is required' })}
        />
        {errors.recipeImage && <span className="text-danger">{errors.recipeImage.message}</span>}

        <div className="">
        <button 
  type="button" 
  className='btn btn-outline-success w-15 my-3'
  onClick={() => {
    localStorage.removeItem('recipe-data'); 
    navigate('/dashboard/recipiesList'); 
  }}
>
            Cancel
          </button>
          <button 
            type="submit" 
            className='btn btn-danger w-20 my-3 m-4'
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

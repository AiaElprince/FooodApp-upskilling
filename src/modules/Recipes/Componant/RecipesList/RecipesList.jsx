import Header from "../../../shared/componant/Header/Header";
import boy from '../../../../assets/boy.png';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import NoData from "../../../shared/componant/NoData/NoData";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import '../../../../App.css';
import { CATEGORIES_URLS, GETALLTAG, RECIPE_URLS, BASE_URL_IMG, USER_RECIPE_URLS } from "../../../../constants/END-POINT";
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from "../../../shared/componant/DeleteConfirmation/DeleteConfirmation";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function RecipesList() {
  let {loginData} = useContext(AuthContext)
  let navigate = useNavigate();
  const [recipeList, setRecipeList] = useState([]);
  const [show, setShow] = useState(false);
  const [recipeId, setRecipeId] = useState(0);
  const [arrayOfPage, setArrayOfPage] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nameValue, setNameValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [catValue, setCatValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  };

  // Fetch categories
  const getCategory = async () => {
    try {
      let response = await axios.get(CATEGORIES_URLS.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTagList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // About delete recipe
  const deleteRecipe = async () => {
    try {
      const response = await axios.delete(RECIPE_URLS.deleteRecipe(recipeId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Deleted successfully");
      setRecipeList(recipeList.filter((recipe) => recipe.id !== recipeId));
      console.log(response);
      handleClose();
    } catch (error) {
      toast.error("Failed to delete recipe");
      console.error(error);
    }
  };

  // Get recipes list
  const getRecipe = async (pageSize = 2, pageNumber = 1, name = '', tagId = '', categoryId = '') => {
    try {
      let response = await axios.get(RECIPE_URLS.getList, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: { 
          pageSize,
          pageNumber,
          name,
          tagid: tagId,
          catid: categoryId
        },
      });
      setRecipeList(response.data.data); 
      setArrayOfPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
    } catch (error) {
      toast.error(error.message);
    }
  };
  // handle add to favorites
  const handleAddToFavorites= async(id)=>{
   try {
    let response = await axios.post(USER_RECIPE_URLS.addToFav,
      {"recipeId":id},
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }})
      toast.success("Added to favorites successfully");
   } catch (error) {
    toast.error("Failed to add to favorites");
    console.log(error)
   }
  }

  // Handlers for search and filter inputs
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setNameValue(value);
    if (name === 'tag') setTagValue(value);
    if (name === 'category') setCatValue(value);
    getRecipe(2, 1, nameValue, tagValue, catValue);
  };

  // Fetch initial data
  useEffect(() => {
    getRecipe(2, 1);
    getAllData();
    getCategory();
  }, []);

  // Handle pagination click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    getRecipe(2, pageNumber, nameValue, tagValue, catValue);
  };

  return (
    <>
      <ToastContainer />
      <Header 
        title={'Recipes Items'}
        description={'You can now add your item that any user can order it from the application and you can edit.'}
        imgUrl={boy}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='title p-4 d-flex justify-content-between'>
        <div className='title-info'>
          <h4>Recipes List</h4>
          <span>You Can Check all details</span>
        </div>
        <Button className='btn btn-success' onClick={() => navigate('/dashboard/recipies-data')}>
          Add new Recipes
        </Button>
      </div>

      {/* Search and filter inputs */}
      <div className="table-container mb-4">
  <div className="row">
    {/* Search input */}
    <div className="col-md-2">
      <input
        type="text"
        name="name"
        placeholder="Search by name..."
        className="form-control"
        value={nameValue}
        onChange={handleSearchChange}
        style={{
          padding: "10px", // Add some padding for a larger input
          fontSize: "14px", // Adjust font size for readability
        }}
      />
    </div>

    {/* Tag select */}
    <div className="col-md-2">
      <select
        name="tag"
        className="form-control"
        value={tagValue}
        onChange={handleSearchChange}
        style={{
          padding: "10px", // Add padding for select
          fontSize: "14px", // Adjust font size for readability
        }}
      >
        <option value="" disabled>Select Tag</option>
        {tagList.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>

    {/* Category select */}
    <div className="col-md-4">
      <select
        name="category"
        className="form-control"
        value={catValue}
        onChange={handleSearchChange}
        style={{
          padding: "10px", // Add padding for select
          fontSize: "14px", // Adjust font size for readability
        }}
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  </div>
</div>

      <div className="table-container mt-4" style={{ overflowX: 'auto' }}>
        {recipeList.length > 0 ? (
          <table className="table" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              <tr>
                <th scope="col">Tag Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                {loginData?.userGroup == "SuperAdmin" ?(
                <th scope="col">Actions</th>

                ):("")}
              </tr>
            </thead>
            <tbody>
              {recipeList.map((recipe) => (
                <tr key={recipe.id}>
                  <td style={{ width: '20%' }}>{recipe.tag.name}</td>
                  <td style={{ width: '20%' }}><img className="img-list" src={`${BASE_URL_IMG}/${recipe.imagePath}`} alt={recipe.name} /></td>
                  <td style={{ width: '10%' }}>{recipe.price}</td>
                  <td style={{ width: '40%' }}>{recipe.description}</td>
                  {loginData?.userGroup =="SuperAdmin" ? (<td style={{ width: '10%' }}>
                    <Button className="icon-button">
                    <Link
  to={`/dashboard/recipies-data/${recipe.id}`}
  state={{ recipieData: recipe, type: "edit" }}
  className="icon-button"  // Apply button styles to Link
  style={{ textDecoration: "none", color: "inherit" }}  // Remove default link styles
>
  <FontAwesomeIcon icon={faPenToSquare} />
</Link>
                    </Button>
                    <Button className="icon-button" onClick={() => handleShow(recipe.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>):( <Button 
  className="icon-button" 
  style={{ color: 'red', borderRadius: '50%', backgroundColor: '#f8f9fa', padding: '10px' }}
  onClick={() => handleAddToFavorites(recipe.id)}
>
  <FontAwesomeIcon icon={faHeart} />
</Button>)}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <Button 
              className="page-link" 
              onClick={() => handlePageClick(currentPage - 1)} 
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </Button>
          </li>
          {arrayOfPage
            .filter(pageNumber => pageNumber <= 4 || pageNumber === arrayOfPage.length) // Show only 4 pages plus the last one
            .map(pageNumber => (
              <li key={pageNumber} className="page-item">
                <Button className="page-link" onClick={() => handlePageClick(pageNumber)}>
                  {pageNumber}
                </Button>
              </li>
            ))}
          <li className="page-item">
            <Button 
              className="page-link" 
              onClick={() => handlePageClick(currentPage + 1)} 
              disabled={currentPage === arrayOfPage.length}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}

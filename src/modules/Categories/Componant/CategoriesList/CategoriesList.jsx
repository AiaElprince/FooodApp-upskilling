import { useState, useEffect } from 'react';
import boy from '../../../../assets/boy.png';
import Header from '../../../shared/componant/Header/Header';
import axios from 'axios';
import { CATEGORIES_URLS } from '../../../../constants/END-POINT.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../shared/componant/DeleteConfirmation/DeleteConfirmation.jsx';
import NoData from '../../../shared/componant/NoData/NoData.jsx';
import { useForm } from 'react-hook-form';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState(0);  
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState(''); // Store selected category name
  const [arrayOfPage, setArrayOfPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id);
    setShow(true);
  };

  const handleCloseupdate = () => setShowUpdate(false); // Corrected modal closing function
  const handleShowupdate = (category) => {
    setCatId(category.id);
    setSelectedCategoryName(category.name); // Store the category name to update
    setValue('name', category.name); // Populate the form with the category name
    setShowUpdate(true);
  };

  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

  const addNewCategory = async (data) => {
    try {
      const response = await axios.post(CATEGORIES_URLS.addCategory, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      handleAddClose();
      getCategory(1, 4, '');
      toast.success("New category added successfully");
    } catch (error) {
      toast.error("Failed to add new category");
      console.error(error);
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await axios.delete(CATEGORIES_URLS.deleteCategory(catId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Deleted successfully");
      setCategories(categories.filter((category) => category.id !== catId));
      handleClose();
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  const getCategory = async (pageNo, pageSize, name) => {
    try {
      const response = await axios.get(CATEGORIES_URLS.getList, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          pageSize,
          pageNumber: pageNo,
          name,
        },
      });
      setArrayOfPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
      setCategories(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
      console.error(error);
    }
  };

  // Updating category
  const updateCategory = async (data) => {
    try {
      const response = await axios.put(CATEGORIES_URLS.updateCategory(catId), data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success("Updated successfully");
      getCategory(1, 4, '');
      handleCloseupdate(); // Close the update modal after success
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  };

  const getNameValue = (input) => {
    getCategory(1, 4, input.target.value);
  };

  useEffect(() => {
    getCategory(1, 4, '');
  }, []);

  return (
    <>
      <Header
        title={'Categories Items!'}
        description={'You can now add your item that any user can order from the application and you can edit it.'}
        imgUrl={boy}
      />

      <ToastContainer />

      {/* Modal for adding a new category */}
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <h4>Add New Category</h4>
          <form onSubmit={handleSubmit(addNewCategory)}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Category Name"
              {...register('name', { required: "Category name is required" })}
            />
            <Button type="submit" variant="success">Save</Button>
          </form>
          {errors.name && <span className="text-danger">{errors.name.message}</span>}
        </Modal.Body>
      </Modal>

      {/* Modal for deleting a category */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation DeletItem={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteCategory}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for updating a category */}
      <Modal show={showUpdate} onHide={handleCloseupdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(updateCategory)}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Updated Category Name"
              defaultValue={selectedCategoryName} // Set the existing category name as the default value
              {...register('name', { required: "Category name is required" })}
            />
            <Button type="submit" variant="success" className="mt-3">Update</Button>
          </form>
          {errors.name && <span className="text-danger">{errors.name.message}</span>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseupdate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title p-4 d-flex justify-content-between">
        <div className="title-info">
          <h4>Categories Table Details</h4>
          <span>You Can Check all details</span>
        </div>
        <button className="btn btn-success" onClick={handleAddShow}>
          Add New Category
        </button>
      </div>

      {/* Search by name */}
      <input
        type="text"
        placeholder="Search by name..."
        className="form-control"
        onChange={getNameValue}
      />

      <div className="table-container">
        {categories.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Category Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <th scope="col">{category.id}</th>
                  <th scope="col">{category.name}</th>
                  <th scope="col">{category.creationDate}</th>
                  <th scope="col">
                    <Button className="icon-button" onClick={() => handleShowupdate(category)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button className="icon-button" onClick={() => handleShow(category.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </th>
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
          {/* Previous button */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Page numbers */}
          {arrayOfPage.slice(0, 4).map((pageNo) => (
            <li key={pageNo} className={`page-item ${pageNo === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(pageNo)}>
                {pageNo}
              </button>
            </li>
          ))}

          {/* Next button */}
          <li className={`page-item ${currentPage === arrayOfPage.length ? 'disabled' : ''}`}>
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => currentPage < arrayOfPage.length && setCurrentPage((prev) => prev + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

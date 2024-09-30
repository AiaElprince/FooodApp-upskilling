import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import boy from '../../../../assets/boy.png';
import Header from '../../../shared/componant/Header/Header';
import { URLS } from '../../../../constants/END-POINT';
import DeleteConfirmation from '../../../shared/componant/DeleteConfirmation/DeleteConfirmation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import NoData from '../../../shared/componant/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../../../context/AuthContext';

export default function UsersList() {
  let {loginData}= useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [show, setShow] = useState(false);
  const [arrayOfPage, setArrayOfPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  // Fetch users with filters and pagination
  const getUser = async (pageNumber = 1, pageSize = 5) => {
    try {
      const response = await axios.get(URLS.getUsers, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          pageSize,
          pageNumber,
        },
      });
      setUsers(response.data.data);
      setArrayOfPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1));
      // toast.success('Users fetched successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch users');
    }
  };

  // Delete a user
  const deleteUser = async () => {
    try {
      await axios.delete(URLS.deleteUser(userId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      toast.success('User deleted successfully');
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user');
    }
  };

  // Fetch users on initial render
  useEffect(() => {
    getUser(currentPage, 10);
  }, [currentPage]);

  // Handle page change
  const handlePageClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= arrayOfPage.length) {
      setCurrentPage(pageNumber);
      getUser(pageNumber, 10);
    }
  };

  return (
    <>
      <Header 
        title="Users List!"
        description="You can now add your item that any user can order it from the application and you can edit."
        imgUrl={boy}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem="user" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteUser}>
            Delete this user
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title p-4 d-flex justify-content-between">
        <div className="title-info">
          <h4>User Table Details</h4>
          <span>You can check all details</span>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Country</th>
              {loginData?.userGroup=="superAdmin"? (
                <th scope="col">Actions</th>
              ):("")}
            
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.country}</td>
                  {loginData?.userGroup=="superAdmin"? (
                    <td>
                    <Button className="icon-button" onClick={() => handleShow(user.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                  ):("")}
                  
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {/* Previous button */}
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

          {/* Display subset of pages */}
          {arrayOfPage
            .filter(pageNumber => {
              if (arrayOfPage.length <= 4) return true;
              if (currentPage <= 2) return pageNumber <= 4;
              if (currentPage >= arrayOfPage.length - 1) return pageNumber >= arrayOfPage.length - 3;
              return pageNumber >= currentPage - 1 && pageNumber <= currentPage + 2;
            })
            .map(pageNumber => (
              <li key={pageNumber} className="page-item">
                <Button 
                  className={`page-link ${pageNumber === currentPage ? 'active' : ''}`} 
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </Button>
              </li>
          ))}

          {/* Next button */}
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

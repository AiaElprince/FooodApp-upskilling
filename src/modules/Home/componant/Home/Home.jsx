import header22 from '../../../../assets/header22.png';
import Header from '../../../shared/componant/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate(); // Corrected: added parentheses to call the hook

  const handleNavigate = () => {
    navigate('/dashboard/recipiesList'); 
  };
  useEffect(() => {
    
  if(localStorage.getItem("token")){
    navigate('/dashboard'); // Redirect to dashboard if user is authenticated.
  }
    
  }, [])
  

  return (
    <>
      <Header 
        title={'Welcome to Upskilling!'}
        description={'This is the welcoming screen for the entry of the application. You can see the options.'}
        imgUrl={header22}
      />
      <div className='home-container py-3 px-5 my-3 d-flex justify-content-between align-items-center'>
        <div className='home-title'>
          <h4>Fill The <span className='text-success'>Recipe!</span></h4>
          <p>You can now fill the meals easily using the table and form.
            <br/>
            Click here and fill it with the table.
          </p>
        </div>
        <button 
          onClick={handleNavigate} 
          className='btn btn-success'>
          Fill Recipes
          <FontAwesomeIcon icon={faArrowAltCircleRight}/> 
        </button>
      </div>
    </>
  );
}

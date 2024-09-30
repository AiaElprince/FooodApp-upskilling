import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL_IMG, USER_RECIPE_URLS } from "../../constants/END-POINT"
import Header from "../shared/componant/Header/Header"
import boy from "../../assets/boy.png";
import NoData from "../shared/componant/NoData/NoData";
import { toast } from "react-toastify";




export default function Favorites() {
    const[favList,setFavList] = useState([])


    let FavList = async ()=>{
        try {
            let response = await axios.get(USER_RECIPE_URLS.getList, 
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }}) 
        setFavList(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    let removeFromFav = async (id) => {
        try {
            const response = await axios.delete(USER_RECIPE_URLS.deleteFav(id), {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            
            // Display success toast
            toast.success("Item successfully removed from favorites!");
            
            console.log("Item removed from favorites:", response);
            favList()
            
            // Optional: Add feedback or state update after successful deletion
        } catch (error) {
            // Display error toast
            toast.error("Failed to remove item from favorites.");
            
            console.error("Error removing from favorites:", error.response ? error.response.data : error);
        }
    };
    useEffect(() => {
    
        FavList()
    }, [])
    // remove from favorites
   
    
    
  return (
<>
<Header 
    title={'Favorites Items'}
    description={'You can now add your item that any user can order it from the application and you can edit.'}
    imgUrl={boy}
  />
    {favList.length >0 ?(
        <div className="container">
        <div className="row">
  {favList.map((faV) => (
    <div key={faV.id} className="col-md-6 my-3">
      <div className="recipes card">
        <div className="text-center">
          <img 
            className="img-fluid rounded" 
            style={{ width: '15%', height: 'auto', objectFit: 'cover' }} 
            src={`${BASE_URL_IMG}/${faV.recipe.imagePath}`} 
            alt={faV.recipe.name} 
          />
        </div>
        <div className="card-body text-center">
          <h1 className="card-title" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            {faV.recipe.name}
          </h1>
          <p className="card-text">
            {faV.recipe.description}
          </p>
          <button 
            className="btn btn-outline-danger btn-block w-75 mx-auto" 
            onClick={() => removeFromFav(faV.id)}
          >
            Remove From Favorites
          </button>
        </div>
      </div>
    </div>
  ))}
</div>



        </div>
    ):(<NoData/>)}
</>
  )
}

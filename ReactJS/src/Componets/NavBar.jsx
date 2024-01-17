import { useNavigate } from "react-router-dom";

function NavBar(){
  const navigator = useNavigate();

  const handleAddClick = () => {
  navigator('/new-movie');
  };

    return(     <nav class="navbart my-5">
    <div >
   <div className="d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center">        <h2 className="text-white">My movies</h2><img src="images/add-circle.png "               onClick={handleAddClick}
 className="mx-2 img-add" width={32} height={32} alt="add-circle"></img>
</div>
<div className="d-flex align-items-center">    <p className="text-white m-0">Logout</p>
<img  src="images/logout.png "               
 className="mx-2 img-add " width={32} height={32} alt="logout"></img>

</div>

   </div>
  
    </div>
  </nav>)
}
export default NavBar
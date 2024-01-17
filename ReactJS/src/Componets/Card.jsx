import { useNavigate } from "react-router-dom";

function Card({data}){
    let navigate=useNavigate();
    const handleCardClick = (data) => {
        navigate(`/edit-movies/${data.id}/${data?.title}`)
      };
    
console.log("hhhhh",data);
    return( <div class="col-lg-2 col-md-4 col-sm-6 col-6 mb-2"   
        onClick={()=>handleCardClick(data)}
    key={data?.id}  style={{width:"282px",height:"504px"}}>
    <div class="card h-100" >
<img src={data?.poster}  class="img-card" alt="..."/>
<div class="card-body d-flex align-items-center py-0">
<div>  <p class="card-text mb-0">{data?.title}</p>
<p className="mb-0">{data?.publishingYear}</p>  </div></div>
</div>
</div>)
}
export default Card
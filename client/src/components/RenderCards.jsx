import { useNavigate } from 'react-router-dom';//font-medium
import {Link} from 'react-router-dom'
import Card from './Card';
import { useAppContext } from '../context/appContext';

const  RenderCards = ({ data, title,btnClass }) => {
    const navigate=useNavigate();
    
    const {isAuthenticated}=useAppContext();
  
    if (data?.length > 0) {
      return (
        data.map((post) => <Card key={post._id} {...post} show={true} />)
      );
    }
  
    return (
      <div>
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase mb-3">{title}</h2>
      {isAuthenticated?(
        <Link to={"/create-post"} className="font-inter font-medium bg-[#020205] text-white px-4 py-2 rounded-md">
        Create it now  
       </Link>
      ):(
        <button onClick={()=>{
          alert("please login");
          navigate('/auth');
        }} className={`font-inter ${btnClass} bg-[#020205] text-white px-4 py-2 rounded-md`}>
        Create it now
      </button>
      )} 
      
      </div>
    );
  };
 
  export default RenderCards;
import React,{useState,useEffect} from 'react'
import { Loader,FormField,Navbar,RenderCards } from '../components'
import { useAppContext } from '../context/appContext';




const Home = () => {
    const {isLoading,getAllPost,allPosts,userPosts,getUserPost,isAuthenticated,deleteUserPost}=useAppContext();
    useEffect(()=>{
     
     getAllPost();
     if(isAuthenticated) getUserPost();
     else deleteUserPost();
    
    },[isAuthenticated]);
    
    
    const [showAllPostArray,setShowAllPostArray]=useState(true);
    const [dummyload,setDummyload]=useState(false);
    const [string,setString]=useState("Browse your history");


    const [searchText,setSearchText]=useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    

    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      setSearchTimeout(
        setTimeout(() => {
          
          const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResult);
        }, 500),
      );
    };
    const handleClick= ()=>{
      
      
        setDummyload(true);
      setShowAllPostArray(prev=>{
        if(prev){
          setString('Back to home')
        }else{
          setString('Browse your history')
        }
        return !prev;
      });
      setTimeout(() => {
       setDummyload(false);
      }, 500)
      
      
    }


  return (
    <>
    <Navbar/>
    <main  className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <section className='max-w-7xl mx-auto'>
        <div>
          <h1 className='font-extrabold text=[#222328] text=[32px]'> 
            THe Community Showcase
          </h1>
          <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
          </p>
        </div>
        <div className='mt-8'>
        <button
        type="button"
        onClick={handleClick}
        className="font-semibold text-sm bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
        >
        {string}
      </button>
        </div>
        {showAllPostArray && (
          <div className='mt-8'>
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
      </div>
        )}
        <div className='mt-10'>
          {isLoading || dummyload ? (
            <div className='flex justify-center items-center'>
              <Loader/>
            </div>
          ):(
          <>
               {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
               )}
               <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No Search Results Found"
                    btnClass='font-medium'
                  />
                ) : (
                  <RenderCards
                    data={showAllPostArray===true?allPosts:userPosts}
                    title="No Posts Yet"
                    btnClass='font-medium'
                  />
                )}
               </div>
          </>
          )}

        </div>
      </section>
    </main>
    </>
  )
}

export default Home

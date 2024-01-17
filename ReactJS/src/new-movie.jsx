import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NewMovie() {
  const [title, setTitle] = useState('');
  const [publishingYear, setpublishingYear] = useState('');
  const [poster, setPoster] = useState({});
  const [error, setError] = useState('');
  let navigator=useNavigate();
  let token=localStorage?.getItem("token")

  let navigate=useNavigate();
  
  const [selectedImage, setSelectedImage] = useState(null);


  const handleUpload = async (selectedFile) => {
  
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, 
        },
       
      });
        setPoster(response.data.Files[0])
      console.log('Upload successful', response.data);
    }  catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
          setError(error?.response?.data.message);
        } 
        else {
          setError(error?.response?.data.message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError(error?.response?.data.message);
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(error?.response?.data.message);
      }

    }
  };


  const handleposterChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

  setSelectedImage(imageUrl);
    console.log("file",file);
     handleUpload(file)
    
  };
  useEffect(()=>{
    if(!token){
      navigate("/")
    }
  },[])

console.log("posterrr",process.env.REACT_APP_API_URL);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const posterJSONString = {FilePath:poster.File,tokenId:poster.tokenId}
 

    let data={title:title,publishingYear:publishingYear?Number(publishingYear):"",poster:posterJSONString}


    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/movie`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
      if(response?.data?.statusCode===201&&response?.data?.result){

         return navigate("/movies")
      }
      console.log('API Response:', response.data);
      // Handle success, redirect, or update state as needed
    }  catch (error) {
      if (error.response) {
        if (error.response.data.statusCode === 401) {
          navigator("/")
        } 
       else if (error.response.status === 400) {
          setError(error?.response?.data.message);
        } else {
          setError('An unexpected error occurred');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred');
      }

    }
  };
  return (
    <>
    <div className="container" style={{height: '82.5vh'}}>
      <h2 className="text-white movie-title">Create a new movie</h2>

      <div className="row">
        <div className="col">
          <div className="dotted-border imgupload-box">
            <label htmlFor="poster-upload">
            {selectedImage ? (
              <img src={selectedImage} alt="filedownload" width={"470px"} height={"50px"} />
              ) : (
          <>
            <img className="/images/file-download" src="/images/file-download.png" alt="filedownload" />
            <p className="m-0 text-white">Drop a poster here</p>
          </>
        )}

              <input
                type="file"
                id="poster-upload"
                accept="poster/*"
                onChange={handleposterChange}
                style={{ display: 'none' }}
              />
            </label>
            {error?.poster && (
              <div className="invalid-feedback d-block">{error?.poster.join(', ')}</div>
            )}
          </div>
        </div>

        <div className="col">
          <form style={{ width: '362px' }} onSubmit={handleSubmit}>
            <div className="input-group mb-4">
              <input
                type="text"
                className="form-control input-title"
                placeholder="Title"
                aria-label="Username"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
                   {error?.title && (
              <div className="invalid-feedback d-block">{error?.title.join(', ')}</div>
            )}
            </div>

            <div className="input-group mb-3" style={{ width: '216px' }}>
              <input
                type="text"
                className="form-control input-publishingYear"
                placeholder="publishingYear"
                aria-label="publishingYear"
                value={publishingYear}
                onChange={(e) => setpublishingYear(e.target.value)}
              />
                   {error?.publishingYear && (
              <div className="invalid-feedback d-block">{error?.publishingYear.join(', ')}</div>
            )}
            </div>

            <div className="d-flex justify-content-between div-button">
              <button type="button" className="btn btn-primary cancel-button" onClick={()=>navigate("/movies")}> 
                Cancel
              </button>
              <button type="submit" className="btn btn-primary submit-button">
                Submit
              </button>
            </div>
            { typeof error ==="string" && (
              <div className="invalid-feedback d-block">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
    <div className='position-relative bottom-0'>
          <img
            src="/images/bottom-img.png"
            alt="Bottom Image"
            className="footer-image"
          />
      </div>
    </>
  );
}

export default NewMovie;

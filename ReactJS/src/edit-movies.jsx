import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

function EditMovie() {
  let param = useParams();
  let [movieData, setMovieData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  let navigate = useNavigate();
  const [title, setTitle] = useState(movieData?.title);
  const [publishingYear, setpublishingYear] = useState(movieData?.publishingYear);
  const [poster, setPoster] = useState({});
  const [error, setError] = useState('');
  let token=localStorage?.getItem("token")

  const handleposterChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    handleUpload(file)

    // console.log("file",file);
    //  handleUpload(file)

  };
  console.log("param", param);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/movie/${param?.id}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
      setTitle(response?.data?.result?.title || "");
      setPoster({ File: response.data?.result?.poster ? response.data?.result?.poster : "", tokenId: response.data?.result?.tokenId ? response.data?.result?.tokenId : "" })
      setpublishingYear(response?.data?.result?.publishingYear || "");
      setSelectedImage(response?.data?.result?.poster || "")
      setMovieData(response?.data?.result);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const posterJSONString = { FilePath: poster?.File, tokenId: poster?.tokenId }


      let data = { title: title, publishingYear: publishingYear?Number(publishingYear):"", poster: posterJSONString }


    let response=  await axios.patch(`${process.env.REACT_APP_API_URL}/movie/${param?.id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      });

      if(response?.data?.statusCode===201&&response?.data?.result){

        return navigate("/movies")
     }    }  catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 400) {
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

  useEffect(() => {
    if(!token){
      navigate("/")
    }
    fetchData()
  }, [])
  console.log("moviedatat", poster);
  return (
    <>

    <div className="container" style={{height: '88vh'}}>
      <h2 className="text-white movie-title">Edit </h2>


      <div class="row">
        <div class="col">
          <div className="dotted-border imgupload-box">
            <label htmlFor="poster-upload">
              {selectedImage ? (
                <img src={selectedImage} alt="filedownload"width={"470px"} height={"500px"} />
              ) : (
                <>
                  <img className="images/file-download" src="file-download.png" alt="filedownload" />
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
          </div> </div>
        <div class="col">
          <form style={{ width: "362px" }} onSubmit={handleUpdate}>
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
            { typeof error ==="string" && (
                <div className="invalid-feedback d-block">{error}</div>
              )}
            <div className="d-flex justify-content-between div-button">
              <button type="submit" className="btn btn-primary cancel-button " onClick={()=>navigate("/movies")}>
                Cancel
              </button> <button type="submit" className="btn btn-primary submit-button ">
                Update
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
  )
}

export default EditMovie
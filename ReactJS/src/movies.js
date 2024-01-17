import { useEffect, useState } from "react";
import "../src/App.css";
import NavBar from "./Componets/NavBar";
import Pagination from "./Componets/Pagination";
import axios from "axios";
import Card from "./Componets/Card";
import { useNavigate } from "react-router-dom";
function Movie() {
  let [movieData, setMovieData] = useState([]);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  let navigator = useNavigate();
  let token = localStorage?.getItem("token");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/movie?pagination=yes&page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("resss", response);
      setData(response.data);
      setMeta(response.data.meta);

      setMovieData(response.data.data);
    } catch (error) {
      if (error.response) {
        if (error.response.data.statusCode === 401) {
          navigator("/");
        } else {
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);
  const renderPaginationItems = () => {
    const items = [];

    for (let i = meta?.startPage; i <= meta?.totalPages; i++) {
      items.push(
        <li
          key={i}
          className={`page-item m-1 ${currentPage === i ? "active" : ""}`}
        >
          <a className="page-link" onClick={() => handlePageChange(i)} href="#">
            {i}
          </a>
        </li>
      );
    }

    return items;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (<>
    <div className="container">
      {/* navbar section */}
      <section>
        <NavBar />
      </section>
      {/* card section */}
      <section>
        <div>
          <div class="row d-flex justify-content-center">
            {movieData?.map((item) => (
              <Card key={item?.id} data={item} />
            ))}
          </div>
        </div>
      </section>

      {/* pagination section */}
      <section>
        <Pagination
          meta={meta}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </section>
    </div>
    <div className='position-relative bottom-0 '>
        <img
          src="images/bottom-img.png"
          alt="Bottom Image"
          className="footer-image"
        />
    </div>
  </>
  );
}
export default Movie;

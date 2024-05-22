//import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.scss";
// import {fetchAllHotel} from "../../../services/Client/hotelService"
import {fetchAllHotels} from "../../../servises/hotelService"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const [listHotels, setListHotels] = useState([]);

  useEffect(() => {
    // Your effect code here
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    let response = await fetchAllHotels(1, 30);

    if (response && response.EC === 0) {
      console.log(">>checl",response.DT.hotels);

      setListHotels(response.DT.hotels);

    }
  };


  const list = listHotels.length;
  return (
    <div className="fp">

      {listHotels && listHotels.length > 0 ? (
        <>
          {listHotels.slice(0, 5).map((item, index) => {

            return (
              <Link
              className="searchItem"
              to={`/hotel/${item.id}`}
            >
              <div className="fpItem" key={item.id}>
                <img
                  src={JSON.parse(item.photos)[0]}
                  alt="loi"
                  className="fpImg"
                />

                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ${item.cheapest_price}</span>
                {item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
              </div>
              </Link>
            );
          })}
        </>
      ) : (
        <>
          <tr>
            <td>Not Found User</td>

          </tr>
          <div>
            Số lượng người dùng: {list}
          </div>
        </>
      )}

    </div>
  );
};

export default FeaturedProperties;
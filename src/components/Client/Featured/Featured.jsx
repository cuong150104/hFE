import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import "./featured.scss";
import { useEffect } from "react";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/api/v1/hotel/countByCity?cities=Ha Noi,Da Nang,Ho Chi Minh"
  );


  return (
    <div className="featured">
      {
        loading ? (
          "Loading please wait"
        ) :
          (
            <>

              <Link className="nav-link-featured" to="/hotels/city/Da Nang"
              >
                <div className="featuredItem">
                  <img
                    src="https://besthuecitytour.com/wp-content/uploads/2020/09/Things-To-Do-In-Da-Nang-Best-Hue-City-Tour-Travel-1.jpg"
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1>Đà Nẵng</h1>

                    <h2>{data[1]?.count} properties</h2>
                  </div>
                </div>
              </Link>
              <Link className="nav-link-featured" to="/hotels/city/Ho Chi Minh"
              >
                <div className="featuredItem">
                  <img
                    src="https://th.bing.com/th/id/OIP.SmHwWGYmv8vEdyZ2H7h_XgHaEU?w=327&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt=""
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1>Hồ Chí Minh</h1>
                    <h2>{data[2]?.count} properties</h2>
                  </div>
                </div>
              </Link>
              <Link className="nav-link-featured" to="/hotels/city/Ha Noi"
              >
                <div className="featuredItem">
                  <img
                    src="https://th.bing.com/th/id/OIP.WbPNl65eZxzL1QDIitlvZgHaE7?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                    alt=""
                    className="featuredImg"
                  />
                  <div className="featuredTitles">
                    <h1>Hà Nội</h1>
                    <h2>{data[0]?.count} properties</h2>
                  </div>

                </div>
              </Link>
            </>
          )}
    </div>
  );
};

export default Featured;
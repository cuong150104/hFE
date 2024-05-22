import axios from "../setup/axios";


//hotel
const fetchAllHotels = (page, limit) => {
  return axios.get(`/api/v1/hotelAdmin/read?page=${page}&limit=${limit}`);
};

const createNewHotel = (userHotel) => {
  return axios.post("/api/v1/hotel/create", {
    ...userHotel,
  });
};

const updateCurrentHotel = (userHotel) => {
  return axios.put("/api/v1/hotel/update", {
    ...userHotel,
  });
};

const deleteHotel = (user) => {
  return axios.delete("/api/v1/hotel/delete", {
    data: { id: user.id },
  });
};


const fetchDateHotel = () => {
  return axios.get(`/api/v1/hotels/read`);
}
export {

  fetchAllHotels,
  createNewHotel,
  updateCurrentHotel,
  deleteHotel,
  fetchDateHotel,
};

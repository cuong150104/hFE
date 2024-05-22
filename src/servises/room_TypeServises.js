import axios from "../setup/axios";

const fetchRoomTypeByHotel = (hotelID) => {
  return axios.get(`/api/v1/hotel/room_type/by-hotel/${hotelID}`);
};

const getRoomTypes = () => {
  return axios.get("/api/v1/roomTypes");
};

export { fetchRoomTypeByHotel, getRoomTypes };

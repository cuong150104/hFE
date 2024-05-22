import axios from "../setup/axios";

const fetchRoom_By_RoomType = (roomTypeId) => {
  return axios.get(`/api/v1/hotel/room/by-roomType/${roomTypeId}`);
};

const getRoomsByHotelId = (hotelId, page) => {
  return axios.get(`/api/v1/hotel/${hotelId}/rooms`, {
    params: {
      page,
    },
  });
};

const createRoom = (data) => {
  return axios.post("/api/v1/rooms", data);
};

const updateRoom = ({ id, ...data }) => {
  return axios.put(`/api/v1/rooms/${id}`, data);
};

const deleteRoom = (roomId) => {
  return axios.delete(`/api/v1/rooms/${roomId}`);
};

export {
  fetchRoom_By_RoomType,
  getRoomsByHotelId,
  createRoom,
  updateRoom,
  deleteRoom,
};

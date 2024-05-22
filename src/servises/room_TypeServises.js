import axios from "../setup/axios";

const fetchRoomTypeByHotel = (hotelID) => {
    return axios.get(`/api/v1/hotel/room_type/by-hotel/${hotelID}`);
}


export {
    fetchRoomTypeByHotel,
};

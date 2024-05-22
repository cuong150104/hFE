import axios from "../setup/axios";

const fetchRoom_By_RoomType = (roomTypeId) => {
    return axios.get(`/api/v1/hotel/room/by-roomType/${roomTypeId}`);
}


export {
    fetchRoom_By_RoomType,
};

import axios from "../setup/axios";

const createNewReservationDetail = (userReservationDetail) => {
    return axios.post("/api/v1/hotel/reservation_detail/create", {
      ...userReservationDetail,
    });
  };



export {
    createNewReservationDetail,

  };
  
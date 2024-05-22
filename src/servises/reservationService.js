import axios from "../setup/axios";

const createNewReservation = (userReservation) => {
    return axios.post("/api/v1/reservation/create", {
      ...userReservation,
    });
  };
const getMaxIdReservation = () => {
  return axios.get("/api/v1/hotel/maxIdReservation");
}
const bookingMessage = (data) => {
  return axios.put("/api/v1/hotel/booking-message", {...data});
}
export {
    createNewReservation,
    getMaxIdReservation,
    bookingMessage,
  };
  
import axios from "../setup/axios";

const createNewReservation = (userReservation) => {
  return axios.post("/api/v1/reservation/create", {
    ...userReservation,
  });
};
const getMaxIdReservation = () => {
  return axios.get("/api/v1/hotel/maxIdReservation");
};
const bookingMessage = (data) => {
  return axios.put("/api/v1/hotel/booking-message", { ...data });
};

const getAllBooking = (page, limit) => {
  return axios.get("/api/v1/bookings", {
    params: {
      page,
      limit,
    },
  });
};

const getBookingDetail = (id, page, limit) => {
  return axios.get(`/api/v1/bookings/${id}`, {
    params: { page, limit },
  });
};

const updateBookingStatus = (bookingId, status) => {
  return axios.put(`/api/v1/bookings/${bookingId}/updateStatus`, {
    status,
  });
};

export {
  createNewReservation,
  getMaxIdReservation,
  bookingMessage,
  getAllBooking,
  getBookingDetail,
  updateBookingStatus,
};

import axios from "../setup/axios";

const getStatistics = (type) => {
  return axios.get("/api/v1/statistics", {
    params: { type },
  });
};

const getTopBookingRooms = () => {
  return axios.get("/api/v1/statistics/top-booking-rooms");
};

export { getStatistics, getTopBookingRooms };

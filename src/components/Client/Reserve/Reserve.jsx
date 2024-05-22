import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.scss";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useContext, useState } from "react";
import { searchContext } from "../../../context/searchContext";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import React from 'react';
// import _ from "lodash";
import {
  createNewReservation
} from "../../../servises/reservationService"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import _, { cloneDeep } from "lodash";


import { fetchRoomTypeByHotel } from "../../../servises/room_TypeServises";
import { fetchRoom_By_RoomType } from "../../../servises/roomServises";
import { getMaxIdReservation } from "../../../servises/reservationService";
import { createNewReservationDetail } from "../../../servises/reservationDetailService";

const Reserve1 = ({ hotelId, userId, email }) => {
  const { data } = useFetch(`/api/v1/hotels/room/${hotelId}`);
  const { dates } = useContext(searchContext);








  const defaultReservationData = {
    userId: userId,
    hotelId: hotelId,
    roomCount: "",
    totalPrice: "",
    reservationStatus: "",
    discountPercent: "",
    description: "",
    isPayment: "",
    startDate: "",
    endDate: "",
    reservationDate: "",
  };

  const validInputsDefault = {
    roomCount: true,
  };





  const [reservationData, setReservationData] = useState(defaultReservationData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);





  //

  useEffect(() => {
    getRoomTypeByHotel();
    handleSelectRooms();
    getRoom_By_TypeRoom();
  }, []);

  const [ListRoomTypeByHotel, setListRoomTypeByHotel] = useState([]);
  const [roomTypeId, setRoomTypeId] = useState([0]);
  // const [selectRoom, setSelectRoom] = useState("");
  // const [selectedRooms, setSelectedRooms] = useState([]);


  const getRoomTypeByHotel = async () => {
    let data = await fetchRoomTypeByHotel(hotelId);
    if (data && +data.EC === 0) {

      setListRoomTypeByHotel(data.DT);
      // setRoomTypeId(data.DT.id);
    }
  }


  const [Room_By_TypeRoom, setRoom_By_TypeRoom] = useState([]);
  const getRoom_By_TypeRoom = async (roomTypeId) => {
    let data = await fetchRoom_By_RoomType(1);
    if (data && +data.EC === 0) {
      setRoom_By_TypeRoom(data.DT);

      return data.DT;
    }
    return null;
  }





  // const defaultReservationDetailData = {
  //   roomId: "",
  //   selectedRooms: "",
  //   PriceByRoom: "",
  // };

  const selectRooms = {
    roomId: "",
    roomTypeId: "",
    selectedRooms: 0,
    PriceByRoom: "",
    isSelected: false,
    typeRoom: false,
    countRoom: "",
    price: "",
  };

  // const [reservationDetailData, setReservationDetailData] = useState(defaultReservationDetailData);
  const [arrSelect, setArrSelect] = useState([]);
  const handleSelectRooms = () => {
    for (let i = 0; i < ListRoomTypeByHotel.length; i++) {
      setArrSelect(prevArr => [...prevArr, selectRooms]); // Sửa đổi ở đây, sử dụng `push` để thêm phần tử vào mảng
    }

    let newArrSelect = [...arrSelect];
    for (let i = 0; i < ListRoomTypeByHotel.length; i++) {
      newArrSelect.push({
        roomTypeId: ListRoomTypeByHotel[i].id,
      });
    }
    setArrSelect(newArrSelect);

  }






  //////////////////////// ngay thang nam
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }


    return dates;
  };

  // const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const startDate = new Date('2024-04-20');
  const endDate = new Date('2024-04-23');
  const alldates = getDatesInRange(startDate, endDate);

  const isAvailable = (reservation) => {
    const reservationStartDate = new Date(reservation.startDate);
    const reservationEndDate = new Date(reservation.endDate);

    for (let currentDate = reservationStartDate; currentDate <= reservationEndDate; currentDate.setDate(currentDate.getDate() + 1)) {
      if (alldates.includes(currentDate.getTime())) {
        return false; // Ngày đã được đặt phòng
      }
    }

    return true; // Không có ngày nào đã được đặt phòng trong khoảng thời gian đặt phòng này
  };





  const defaultReservationDetailData = {
    userId: 1, // ID của người dùng
    reservationId: "",
    startDate: '2024-06-01',
    endDate: '2024-06-05',

    bookingDetails: [] // Mảng chứa các chi tiết đặt phòng
  };

  const [reservationDetailData, setReservationDetailData] = useState(defaultReservationDetailData);

  const defaultReservation = {
    userId: userId,
    hotelId: hotelId,
    roomCount: "",
    totalPrice: "",
    reservationStatus: "",
    discountPercent: "",
    description: "",
    isPayment: "",
    startDate: startDate,
    endDate: endDate,
    reservationDate: "",

    name: "",
    address: "",
    phoneNumber: "",
    email:email,
  };

  const [reservation, setReservation] = useState(defaultReservation);

  const handleSelectRoomChange = async (value) => {
    let reservationId = await getMaxIdReservation();
    console.log(">>>check max id1", reservationId.DT + 1);
    setReservationDetailData(prevState => ({
      ...prevState,
      reservationId: reservationId.DT + 1// Assuming reservationId.DT contains the new reservation ID
    }));
    console.log(">>>check max id2", reservationDetailData.reservationId);
    if (value) {
      const [selectedCountRoom, roomTypeId, totalPrice] = value.split('-');
      console.log(">>check roomchang var: ", selectedCountRoom, roomTypeId, totalPrice);

      const newBookingDetail = {
        roomTypeId: parseInt(roomTypeId),
        selectedRooms: parseInt(selectedCountRoom),
        PriceByRoom: parseInt(totalPrice),
      };

      setReservationDetailData(prevData => {
        const existingIndex = prevData.bookingDetails.findIndex(detail => detail.roomTypeId === newBookingDetail.roomTypeId);

        if (existingIndex !== -1) {
          if (newBookingDetail.selectedRooms === 0) {
            // Xóa mục khỏi danh sách nếu selectedRooms bằng 0
            return {
              ...prevData,
              bookingDetails: prevData.bookingDetails.filter(detail => detail.roomTypeId !== newBookingDetail.roomTypeId)
            };
          } else {
            // Cập nhật thông tin đặt phòng nếu đã tồn tại
            const updatedDetails = [...prevData.bookingDetails];
            updatedDetails[existingIndex] = newBookingDetail;
            return {
              ...prevData,
              bookingDetails: updatedDetails
            };
          }
        } else {
          // Thêm mới thông tin đặt phòng nếu selectedRooms không bằng 0
          return newBookingDetail.selectedRooms !== 0 ? {
            ...prevData,
            bookingDetails: [...prevData.bookingDetails, newBookingDetail]
          } : prevData;
        }
      });
    }

  };



  const saveReservationDetails = async () => {
    try {
      const reservationId = await getMaxIdReservation();
      let totalRoom = 0;
      let totalPrice = 0;
      for (const detail of reservationDetailData.bookingDetails) {
        const { roomTypeId, selectedRooms, PriceByRoom } = detail;
        totalRoom += selectedRooms;

        const roomData = await fetchRoom_By_RoomType(roomTypeId);
        if (roomData.EC !== 0) {
          console.error(roomData.EM);
          continue;
        }

        const availableRooms = roomData.DT.rooms.filter(room => room.roomStatus === 0);
        if (availableRooms.length === 0) {
          console.log(`No available rooms found for room type ID ${roomTypeId}`);
          continue;
        }

        for (let i = 0; i < selectedRooms; i++) {
          if (i >= availableRooms.length) {
            console.log("Not enough available rooms to fulfill the reservation request.");
            break;
          }
          const roomIdSelected = availableRooms[i].id;
          totalPrice += PriceByRoom;
          await createNewReservationDetail({
            roomId: roomIdSelected,
            reservationId: reservationDetailData.reservationId,
            price: PriceByRoom,
            startDate: reservationDetailData.startDate,
            endDate: reservationDetailData.endDate
          });
        }
      }

      setReservation(prev => ({ ...prev, roomCount: totalRoom, totalPrice: totalPrice }));
      console.log("Total rooms reserved:", totalRoom);
    } catch (error) {
      console.error('Error saving reservation details:', error);
    }
  };







  const history = useHistory();

  const handleClick = async () => {

  };




  const handleConfirmReservation = async () => {
    if (userId) {
      await saveReservationDetails();
      // await createNewReservation(reservation);

      toast.success('Reservation confirmed!');
    } else {
      history.push('/login');
    }
  };


  const handleOnChangeInput = (value, name) => {
    let _reserveData = _.cloneDeep(reservationData);
    _reserveData[name] = value;
    setReservationData(_reserveData);
  };

  return (

    <div className="reserveContainer">

      <div className="ReserveTable">
        <div className="ReserveWrapper">
          <table className="table table-bordered table-bordered-middle">
            <thead className="reserve-thead">
              <tr>
                <th className="col">Room type</th>
                <th className="col ">Number of guests</th>
                <th className="col">Today's price</th>
                <th className="col">Your choices</th>
                <th className="col">Select rooms</th>
              </tr>
            </thead>
            <tbody className="">
              {ListRoomTypeByHotel && ListRoomTypeByHotel.length > 0 ? (
                <>
                  {ListRoomTypeByHotel.map((item, index) => {
                    return (
                      <tr className="">
                        <td>
                          <div>
                            {item.type_name}
                          </div>
                        </td>
                        <td>
                          <div className="">
                            Max persons: <b>{item.max_people}</b>
                          </div>
                        </td>
                        <td>
                          <div className="">
                            Current price:  {item.price} VND
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <span>{item.yourChoices}</span>
                          </div>
                        </td>
                        <td>
                          <div className="">
                            <label >
                              <span className="select_room">Select rooms</span>
                            </label>
                            <select
                              className="form-select"
                              onChange={(event) => handleSelectRoomChange(event.target.value)}
                            >
                              <option key={0} value={`0-${item.id}-0`}>0</option>
                              {Array.from({ length: item.countRoom }, (_, index) => {
                                const selectedCountRoom = index + 1;
                                return (
                                  <option key={index + 1} value={`${selectedCountRoom}-${item.id}-${item.price}`}>
                                    {selectedCountRoom} &nbsp; &nbsp;&nbsp;&nbsp;($&nbsp;{selectedCountRoom * item.price})
                                  </option>
                                );
                              })}
                            </select>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not Found User</td>
                  </tr>
                </>
              )}

            </tbody>

          </table>
        </div>
      </div>

      {/* <Button variant="primary"
        onClick={() => handleConfirmReservation()}
      >
        Reserve Now!

      </Button> */}
      {/* <div>
        <Link to="/reservation">Reserve Now!</Link>
      </div> */}

      <Link
        to={{
          pathname: "/reservation",
          state: {
            reservation,
          }
        }}
        onClick={handleConfirmReservation}
      >
        Reserve Now!
      </Link>
    </div>

  );
};

export default Reserve1;

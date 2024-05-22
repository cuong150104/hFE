import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./Reserve.scss";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useContext, useState } from "react";
import { searchContext } from "../../../context/searchContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React from 'react';
import _ from "lodash";
import {
  createNewReservation
} from "../../../servises/reservationService"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";


import { fetchRoomTypeByHotel } from "../../../servises/room_TypeServises";
import { fetchRoom_By_RoomType } from "../../../servises/roomServises";

const Reserve1 = ({ hotelId, userId }) => {
  const { data } = useFetch(`/api/v1/hotels/room/${hotelId}`);
  const { dates } = useContext(searchContext);

  // console.log(">> check data_+", data);






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

  const defaultReservationDetailData = {
    roomId: "",
    reservationId: "",
    roomCount: "",
    price: "",
    startDate: "",
    endDate: "",
  };

  const validInputsDefault = {
    roomCount: true,
  };





  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [reservationData, setReservationData] = useState(defaultReservationData);
  const [reservationDetailData, setReservationDetailData] = useState(defaultReservationData);
  const [selectedRooms, setSelectedRooms] = useState([]);


  //
  const [RoomTypeByHotel, setRoomTypeByHotel] = useState([]);
  const [Room_By_TypeRoom, setRoom_By_TypeRoom] = useState([]);
  const [roomType, setRoomType] = useState([0]);

  useEffect(() => {
    getRoomTypeByHotel();
  }, []);

  const getRoomTypeByHotel = async () => {
    let data = await fetchRoomTypeByHotel(hotelId);
    if (data && +data.EC === 0) {
      console.log(">> check roomTypeHotel", data);
    }
  }

  const getRoom_By_TypeRoom = async () => {
    let data = await fetchRoom_By_RoomType(hotelId);
    if (data && +data.EC === 0) {
      console.log(">> check roomTypeHotel", data);
    }
  }


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




  const history = useHistory();

  const handleClick = async () => {

  };


  const groupedRooms = {};
  data.forEach((item) => {
    if (!groupedRooms[item.title]) {
      groupedRooms[item.title] = [];
    }
    groupedRooms[item.title].push(item);
  });

  const handleOnChangeInput = (value, name) => {
    let _reserveData = _.cloneDeep(reservationData);
    _reserveData[name] = value;
    setReservationData(_reserveData);
  };


  const handleConfirmReservation = async () => {
    // let check = checkValidateInputs();
    let check = true;
    if (userId) {
      let res = await createNewReservation({ ...reservationData });

      if (res && res.EC === 0) {
        // props.onHide();
        setReservationData({
          ...defaultReservationData,

        });
        toast.success("reservation success");
      } else {
        // toast.error(res.EM);
        // let _validInputs = _.cloneDeep(validInputsDefault);
        // _validInputs[res.DT] = false;
        // setValidInputs(_validInputs);
        // toast.success("reservation unsuccess");
        // 
      }
    } else {
      history.push("/login");
    }
  };

  // const [PriceWithCountRoom, setPriceWithCountRoom] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   const totalPrice = 0;
  //   setPriceWithCountRoom(totalPrice);
  //   handleOnChangeInput(totalPrice, "totalPrice");
  //   total
  // }, [selectedRooms]);


  const handleSelectedRoomsChange = (event) => {
    const selectedRoomCount = parseInt(event.target.value);
    const price = 0;
    setReservationDetailData({
      ...reservationDetailData,
      roomCount: selectedRoomCount,
      price: price,
    });
    setSelectedRooms(Array.from({ length: selectedRoomCount }, () => ({
      roomId: "", // Thay bằng id thực tế của phòng
      ...reservationDetailData,
    })));
  };


  return (
    <div className="reserve">
      <div className="rContainer">




        <div className="ReserveContainer">
          <div className="ReserveWrapper">
            <table className="table table-bordered table-bordered-middle">
              <thead className="custom-thead">
                <tr>
                  <th className="col">Room type</th>
                  <th className="col ">Number of guests</th>
                  <th className="col">Today's price</th>
                  <th className="col">Your choices</th>
                  <th className="col">Select rooms</th>
                </tr>
              </thead>
              <tbody>

                {Object.keys(groupedRooms).map((roomType) => (
                  <React.Fragment key={roomType}>
                    {groupedRooms[roomType].map((room) => (
                      <tr key={room.id}>

                        <td>
                          <div className="hprt-block">
                            <div>

                              <span>{roomType}</span>
                              <span>{reservationData.userId}</span>

                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="hprt-block">
                            <span className="bui-u-sr-only">
                              Max persons: <b>{title.max_people}</b>
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="hprt-price-block">
                            <div className="">
                              <div>
                                <span className="bui-u-sr-only">
                                  {/* Current price: $ {room.price} */}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                            <ul >
                              <line>
                                <div className="bui-list__description">
                                  <span>yourChoices</span> breakfast $&nbsp;10
                                </div>
                              </line>
                              <li>
                                <div>
                                  <span >
                                    <strong >Free cancellation</strong> anytime
                                  </span>
                                </div>
                              </li>
                              <li className="bui-list__item" >
                                <span className="">
                                  <strong >No prepayment needed</strong> - pay at the property
                                </span>
                              </li>
                            </ul>
                          </div>
                        </td>

                        <td>
                          <div className="hprt-block">
                            <label >
                              <span className="invisible_spoken">Select rooms</span>

                            </label>
                            <select
                              className="form-select"
                              onChange={(event) => {
                                const selectedRoomCount = parseInt(event.target.value);
                                const totalPrice = selectedRoomCount * room.price;
                                setSelectedRooms(selectedRoomCount); // Cập nhật số phòng được chọn


                                //setPriceWithCountRoom(totalPrice);
                                // handleOnChangeInput(totalPrice, "totalPrice"); // Gọi hàm xử lý khi tổng giá tiền thay đổi
                              }
                              }
                            >
                              <option key={0} value={0}>
                                0 &nbsp; &nbsp;&nbsp;&nbsp;($0)
                              </option>
                              {Array.from({ length: room.roomNumbers }, (_, index) => {
                                const roomNumber = index + 1;
                                return (
                                  <option key={roomNumber} value={roomNumber}>
                                    {roomNumber} &nbsp; &nbsp;&nbsp;&nbsp;($&nbsp;{roomNumber * room.price})
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                        </td>
                      </tr>

                    ))}
                  </React.Fragment>
                ))}


              </tbody>

            </table>
          </div>
        </div>

        <Button variant="primary" onClick={() => handleConfirmReservation()}>
          Reserve Now!

        </Button>
      </div>
    </div>
  );
};

export default Reserve1;




<select
  className="form-select"
  onChange={(event) => {

  }
  }
>

  const roomNumber = index + 1;
  return (
  <option key={roomNumber} value={roomNumber}>
    {roomNumber} &nbsp; &nbsp;&nbsp;&nbsp;($&nbsp;{roomNumber * room.price})

  </option>
  )

</select>



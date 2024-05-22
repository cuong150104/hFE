import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import "./Rooms.scss";

import { toast } from "react-toastify";
import _ from "lodash";
import { defaultRoomData, validInputsDefault } from "./const";
import { getRoomTypes } from "../../../servises/room_TypeServises";
import { createRoom, updateRoom } from "../../../servises/roomServises";

const ModalRoom = (props) => {
  const { action, dataModalRoom, hotelId } = props;

  const [roomData, setRoomData] = useState(defaultRoomData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    if (action === "UPDATE") {
      setRoomData(dataModalRoom);
    }
  }, [dataModalRoom]);

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    const response = await getRoomTypes();

    if (response && response.EC === 0) {
      setRoomTypes(response.DT);
    }
  };

  const handleOnChangeInput = (value, name) => {
    let _roomData = _.cloneDeep(roomData);
    _roomData[name] = value;
    setRoomData(_roomData);
  };

  const checkValidateInputs = () => {
    if (action === "UPDATE") return true;
    setValidInputs(validInputsDefault);
    let arr = [
      "title",
      "price",
      "max_people",
      "description",
      "roomNumbers",
      "roomTypeId",
      "roomStatus",
    ];

    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!roomData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmHotel = async () => {
    const isFormValid = checkValidateInputs();

    if (isFormValid) {
      const res =
        action === "CREATE"
          ? await createRoom({
              ...roomData,
              roomNumbers: +roomData.roomNumbers,
              hotelId,
            })
          : await updateRoom({
              ...roomData,
              hotelId,
            });

      if (res && res.EC === 0) {
        props.onHide();
        setRoomData(defaultRoomData);
        toast.success("Successfully");
      } else {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModalHotel = () => {
    props.onHide();
    setRoomData(defaultRoomData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-room"
        onHide={() => handleCloseModalHotel()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new room" : "Edit a room"}
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Title <span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                value={roomData.title}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "title")
                }
                placeholder="Room title"
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Price <span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                value={roomData.price}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "price")
                }
                placeholder="Room price"
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Max People <span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                value={roomData.max_people}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "max_people")
                }
                placeholder="Max people"
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Room Number <span className="red">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                value={roomData.roomNumbers}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "roomNumbers")
                }
                placeholder="Room number"
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Room Type <span className="red">*</span>
              </label>

              <select
                class="form-select"
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "roomTypeId")
                }
                value={roomData.roomTypeId}
              >
                <option selected value="">
                  Select room type
                </option>
                {roomTypes?.map((it) => (
                  <option key={it.id} value={it.id}>
                    {it.type_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>
                Room Status <span className="red">*</span>
              </label>

              <select
                class="form-select"
                onChange={(event) => {
                  handleOnChangeInput(event.target.value, "roomStatus");
                }}
                value={roomData.roomStatus}
              >
                <option selected value="">
                  Select room status
                </option>
                <option value="0">Occupied</option>
                <option value="1">Vacant</option>
              </select>
            </div>

            <div className="col-12 form-group">
              <label>
                Description <span className="red">*</span>
              </label>

              <textarea
                class="form-control"
                rows="3"
                placeholder="Room description"
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "description")
                }
                value={roomData.description}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalHotel()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmHotel()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalRoom;

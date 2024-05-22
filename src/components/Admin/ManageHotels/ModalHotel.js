import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
// import {
//   fetchGroup,
//   createNewUser,
//   updateCurrentUser,
// } from "../../servicesAdmin/userService";

import {
  createNewHotel,
  updateCurrentHotel,
} from "../../../servises/hotelService";

import { toast } from "react-toastify";
import _ from "lodash";

const ModalHotel = (props) => {
  const { action, dataModalHotel } = props;
  const defaultHotelData = {
    category: "",
    name: "",
    type: "",
    city: "",
    address: "",
    description: "",
    phone: "",
    country: "",
    photos: [],
    rating: "",
    cheapestPrice: "",
  };

  const validInputsDefault = {
    category: true,
    name: true,
    type: true,
    city: true,
    address: true,
    description: true,
    phone: true,
    country: true,
    photos: true,
    rating: true,
    cheapestPrice: true,
  };

  const [hotelData, setHotelData] = useState(defaultHotelData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  const [userGroups, setUserGroups] = useState([]);

  // useEffect(() => {
  //   getGroups();
  // }, []);

  useEffect(() => {
    if (action === "UPDATE") {
      setHotelData({
        ...dataModalHotel,
        group: dataModalHotel.Group ? dataModalHotel.Group.id : "",
      });
    }
  }, [dataModalHotel]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setHotelData({ ...hotelData, group: userGroups[0].id });
      }
    }
  }, [action]);

  // const getGroups = async () => {
  //   let res = await fetchGroup();
  //   if (res && res.EC === 0) {
  //     setUserGroups(res.DT);
  //     if (res.DT && res.DT.length > 0) {
  //       let groups = res.DT;
  //       setHotelData({ ...hotelData, group: groups[0].id });
  //     }
  //   } else {
  //     toast.error(res.EM);
  //   }
  // };

  const handleOnChangeInput = (value, name) => {
    let _hotelData = _.cloneDeep(hotelData);
    _hotelData[name] = value;
    setHotelData(_hotelData);
  };

  const checkValidateInputs = () => {
    // create hotel
    if (action === "UPDATE") return true;
    setValidInputs(validInputsDefault);
    let arr = ["name", "phone", "photos", "group"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!hotelData[arr[i]]) {
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
    // create hotel
    // let check = checkValidateInputs();
    let check = true;
    console.log(">> check create hotel: ", hotelData);
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewHotel({
            ...hotelData,
            // photos: hotelData.photos.length === 0 ? '[]' : JSON.stringify(hotelData.photos)
          })
          : await updateCurrentHotel({
            ...hotelData,
          });
      if (res && res.EC === 0) {
        props.onHide();
        setHotelData({
          ...defaultHotelData,
        });
        toast.success("UPDATE success");
      } else {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
        toast.success("UPDATE unsuccess");
      }
    }
  };

  const handleCloseModalHotel = () => {
    props.onHide();
    setHotelData(defaultHotelData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-hotel"
        onHide={() => handleCloseModalHotel()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new hotel" : "Edit a hotel"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Name Hotel (<span className="red">*</span>):
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.name}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "name")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                City :
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.city}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "city")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Rating:
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.rating}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "rating")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone Number:
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.phone}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "phone")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Description:</label>
              <input
                className="form-control"
                type="text"
                value={hotelData.description}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "description")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                country :
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.country}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "country")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Cheapest Price(<span className="red">*</span>):

              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.cheapestPrice}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "cheapestPrice")
                }
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Type:
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.type}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "type")
                }
              />
            </div>



            <div className="col-12 col-sm-12  form-group ">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                value={hotelData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>
            <div className="col-12 col-sm-12  form-group ">
              <label>
                Photos(<span className="red">*</span>):
              </label>
              <input
                className="form-control"
                type="text"
                value={hotelData.photos}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, ["photos"])
                }
              />
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

export default ModalHotel;
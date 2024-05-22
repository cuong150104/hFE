import React, { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import "./Reservation.scss";
import { getMaxIdReservation } from "../../servises/reservationService";
import { fetchRoom_By_RoomType } from "../../servises/roomServises";
import { createNewReservationDetail } from "../../servises/reservationDetailService";
import { useLocation } from 'react-router-dom';
import {
    createNewReservation
} from "../../servises/reservationService";
import Button from "react-bootstrap/Button";
import { useHistory, Link } from "react-router-dom";

import { bookingMessage } from "../../servises/reservationService";
const Reservation = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const [formData, setFormData] = useState(location.state.reservation);
    console.log("loi loi loi", formData);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (!formData.name || !formData.address || !formData.phoneNumber) {
            toast.error("Please fill in all fields");
            return;
        }
        toast.success("Reservation submitted successfully!");
        console.log("Submitted Data:", formData);
        // Here you would typically handle the submission, e.g., send to an API
    };

    const handleConfirmReservation = async () => {

        await createNewReservation(formData);

        toast.success('Reservation confirmed!');
        history.push('/login');

    };

    const handBookingMessage = async () => {
        // if(formData.name && formData.phoneNumber && form.address)
        let data = {
            email: formData.email,
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
        }
        console.log(">>>> check email, n", data);

        let response = await bookingMessage(data);
        if (response && response.EC === 0) {

            toast.success(response.EM);
        } else {
            toast.error(response.EM);
        }

    }
    return (
        <div className="reservation-form-containerRR">
            <form className="reservation-formRR" onSubmit={handleSubmit}>
                <h2 className='h2RR'>Hotel Reservation Form</h2>
                <label className='labelRR' htmlFor="name">Full Name</label>
                <input
                    className='inputRR'
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <label htmlFor="address">Address</label>
                <input
                    className='inputRR'
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    className='inputRR'
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />

                {/* <button className='butotnRR' onClick={handleConfirmReservation} type="submit">Submit Reservation</button> */}
                <Button
                    variant="primary"
                    className='butotnRR'
                    type="submit"
                    onClick={() => {
                        handleConfirmReservation();
                        handBookingMessage();
                    }}
                >
                    Reserve Now!
                </Button>
            </form>
            <ToastContainer />
        </div>
    );
};



export default Reservation;
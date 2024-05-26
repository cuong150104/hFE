import { useEffect, useState } from "react";
import styles from "./index.module.scss";

import ReactPaginate from "react-paginate";
import {
  getBookingDetail,
  updateBookingStatus,
} from "../../../servises/reservationService";
import dayjs from "dayjs";
import { renderBookingStatus } from "../../../utils/common";
import { useParams } from "react-router-dom";

const DEFAULT_LIMIT = 4;

const BookingDetail = () => {
  const params = useParams();

  const [bookingDetail, setBookingDetail] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!params?.bookingId) return;

    fetchBookings();
  }, [currentPage, params?.bookingId]);

  const fetchBookings = async () => {
    let response = await getBookingDetail(params?.bookingId, currentPage);

    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setBookingDetail(response.DT.data);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const onUpdateStatus = async (status) => {
    const isConfirm = window.confirm(
      "Are you sure you want to update this status?"
    );

    if (isConfirm) {
      try {
        await updateBookingStatus(params?.bookingId, status);
        fetchBookings();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="manage-booking-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Booking Detail</h3>
            </div>
          </div>

          <div className={styles.bookingInfo}>
            <p>Hotel: {bookingDetail[0]?.booking.hotel.name}</p>
            <p>Total price: {bookingDetail[0]?.booking.totalPrice}</p>
            <p>
              Status:{" "}
              {renderBookingStatus(
                +bookingDetail[0]?.booking.reservationStatus
              )}
            </p>
            <div className={styles.updateStatus}>
              <p>Update status:</p>
              <div className={styles.listStatus}>
                <button
                  onClick={() => onUpdateStatus(1)}
                  type="button"
                  class="btn btn-danger"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onUpdateStatus(2)}
                  type="button"
                  class="btn btn-success"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>

          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Room Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Check-in -&gt; Check-out</th>
                </tr>
              </thead>
              <tbody>
                {bookingDetail && bookingDetail.length > 0 ? (
                  <>
                    {bookingDetail.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * DEFAULT_LIMIT + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.room.title}</td>
                          <td>{item.price}</td>
                          <td>
                            {dayjs(item.startDate).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}{" "}
                            -{" "}
                            {dayjs(item.endDate).format("DD/MM/YYYY HH:mm:ss")}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Booking not found</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={9}
                marginPagesDisplayed={4}
                pageCount={totalPages}
                previousLabel="< Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetail;

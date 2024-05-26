import { useEffect, useState } from "react";
import "./index.scss";

import ReactPaginate from "react-paginate";
import { getAllBooking } from "../../../servises/reservationService";
import dayjs from "dayjs";
import { renderBookingStatus } from "../../../utils/common";

import { useHistory } from "react-router-dom";

const DEFAULT_LIMIT = 4;

const BookingList = () => {
  const history = useHistory();

  const [listBooking, setListBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, [currentPage]);

  const fetchBookings = async () => {
    let response = await getAllBooking(currentPage);

    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListBooking(response.DT.bookings);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleRefresh = () => {
    fetchBookings();
  };

  const onNavigateToBookingDetail = (bookingId) => {
    history.push(`/bookings/${bookingId}`);
  };

  return (
    <>
      <div className="container">
        <div className="manage-booking-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Booking Management</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success refresh"
                onClick={handleRefresh}
              >
                <i className="fa fa-refresh"></i>
                Refresh
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">User Book</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Room Count</th>
                  <th scope="col">Status</th>
                  <th scope="col">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {listBooking && listBooking.length > 0 ? (
                  <>
                    {listBooking.map((item, index) => {
                      return (
                        <tr
                          key={`row-${index}`}
                          onClick={() => {
                            onNavigateToBookingDetail(item.id);
                          }}
                        >
                          <td>
                            {(currentPage - 1) * DEFAULT_LIMIT + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.user?.username}</td>
                          <td>{item.hotel?.name}</td>
                          <td>{item.totalPrice}</td>
                          <td>{item.roomCount}</td>
                          <td>
                            {renderBookingStatus(+item.reservationStatus)}
                          </td>
                          <td>
                            {dayjs(item.reservationDate).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Room not found</td>
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

export default BookingList;

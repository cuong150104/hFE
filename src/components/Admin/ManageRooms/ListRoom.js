import { useEffect, useState } from "react";
import "./Rooms.scss";

import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import { deleteRoom, getRoomsByHotelId } from "../../../servises/roomServises";
import { useParams } from "react-router-dom";
import ModalRoom from "./ModelRoom";

const DEFAULT_LIMIT = 4;

const ListRoom = () => {
  const params = useParams();

  const [listRoom, setListRoom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const [isShowModalRoom, setIsShowModalRoom] = useState(false);
  const [actionModalRoom, setActionModalRoom] = useState("CREATE");
  const [dataModalRoom, setDataModalRoom] = useState({});

  useEffect(() => {
    fetchRooms();
  }, [currentPage]);

  const fetchRooms = async () => {
    let response = await getRoomsByHotelId(params?.hotelId, currentPage);

    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListRoom(response.DT.rooms);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteRoom = async (user) => {
    setDataModal(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModal({});
  };

  const confirmDeleteRoom = async () => {
    const response = await deleteRoom(dataModal.id);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchRooms();
      setIsShowModalDelete(false);
    } else {
      toast.error(response.EM);
    }
  };

  const onHideModalHotel = () => {
    setIsShowModalRoom(false);
    setDataModalRoom({});
    fetchRooms();
  };

  const handleEditRoom = (data) => {
    setActionModalRoom("UPDATE");
    setDataModalRoom(data);
    setIsShowModalRoom(true);
  };

  const handleRefresh = () => {
    fetchRooms();
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title mt-3">
              <h3>Manage {listRoom?.[0]?.hotel?.name}'s Room</h3>
            </div>
            <div className="actions my-3">
              <button
                className="btn btn-success refresh"
                onClick={handleRefresh}
              >
                <i className="fa fa-refresh"></i>
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalRoom(true);
                  setActionModalRoom("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i>
                Add New Room
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Room Number</th>
                  <th scope="col">Price</th>
                  <th scope="col">Max People</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listRoom && listRoom.length > 0 ? (
                  <>
                    {listRoom.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * DEFAULT_LIMIT + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.roomNumbers}</td>
                          <td>{item.price}</td>
                          <td>{item.max_people}</td>
                          <td>{item.roomType.type_name}</td>
                          <td>
                            {item.roomStatus === 0 ? "Occupied" : "Vacant"}
                          </td>

                          <td>
                            <span
                              title="Edit"
                              className="edit"
                              onClick={() => handleEditRoom(item)}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="Delete"
                              className="delete"
                              onClick={() => handleDeleteRoom(item)}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
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

      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleClose}
        confirmDeleteRoom={confirmDeleteRoom}
        dataModal={dataModal}
      />

      <ModalRoom
        show={isShowModalRoom}
        onHide={onHideModalHotel}
        action={actionModalRoom}
        dataModalRoom={dataModalRoom}
        hotelId={params?.hotelId}
      />
    </>
  );
};

export default ListRoom;

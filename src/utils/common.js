export const renderBookingStatus = (status) => {
  switch (status) {
    case 0: {
      return "Chưa thanh toán";
    }

    case 1: {
      return "Huỷ phòng";
    }

    case 2: {
      return "Thành công";
    }
  }
};

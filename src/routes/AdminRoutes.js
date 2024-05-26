import { Switch, Route } from "react-router-dom";
import Users from "../components/Admin/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Admin/Role/Role";
import GroupRole from "../components/Admin/GroupRole/GroupRole";
import Hotels from "../components/Admin/ManageHotels/Hotels";
import Admin from "../components/Admin/Admin";
import NotFound from "../components/NotFound/NotFound";
import ListRoom from "../components/Admin/ManageRooms/ListRoom";
import BookingList from "../components/Admin/BookingManager/BookingList";
import BookingDetail from "../components/Admin/BookingDetail/BookingDetail";
import Statistics from "../components/Admin/Statistics/Statistics";

const AppRoutes = (props) => {
  const Project = () => {
    return <span>Hotels</span>;
  };
  return (
    <>
      <Switch>
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/projects" component={Project} />
        <PrivateRoutes path="/roles" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />
        <PrivateRoutes path="/hotels/:hotelId/rooms" component={ListRoom} />
        <PrivateRoutes path="/hotels" component={Hotels} />
        <PrivateRoutes path="/bookings/:bookingId" component={BookingDetail} />
        <PrivateRoutes path="/bookings" component={BookingList} />
        <PrivateRoutes path="/statistics" component={Statistics} />

        <Route path="/admin" exact>
          <Admin />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default AppRoutes;

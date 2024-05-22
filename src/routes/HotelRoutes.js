import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../components/NotFound/NotFound";
import Hotels from "../components/Admin/ManageHotels/Hotels";
import ListRoom from "../components/Admin/ManageRooms/ListRoom";

const CompanyRoutes = () => {
  return (
    <Switch>
      <PrivateRoutes path="/hotels/:hotelId/rooms" component={ListRoom} />
      <PrivateRoutes path="/hotels" component={Hotels} />

      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default CompanyRoutes;

import { Switch, Route } from "react-router-dom";
import Users from "../components/Admin/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Admin/Role/Role";
import GroupRole from "../components/Admin/GroupRole/GroupRole";
import Hotels from "../components/Admin/ManageHotels/Hotels";
import Admin from "../components/Admin/Admin";
import NotFound from "../components/NotFound/NotFound";
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
        <PrivateRoutes path="/hotels" component={Hotels} />

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

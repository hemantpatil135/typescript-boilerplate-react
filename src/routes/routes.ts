import { RouteConfig } from "./routerConfig";
import Login from "../components/Login/Login";
import UserDetails from "../components/UserDetails/UserDetails";
import UserForm from "../components/UserDetails/UserForm";

const routes: RouteConfig[] = [
  { path: "/", component: Login },
  { path: "/users", component: UserDetails, protected: true },
  { path: "/user/add", component: UserForm, protected: true },
  { path: "/user/edit/:userId", component: UserForm, protected: true },
];

export default routes;

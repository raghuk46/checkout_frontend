import LoginContainer from "./containers/LoginContainer";
import CheckoutContainer from "./containers/CheckoutContainer";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginContainer
  },
  {
    path: "/login",
    component: LoginContainer
  },
  {
    path: "/checkout",
    type: "protected",
    component: CheckoutContainer
  }
];

export default routes;

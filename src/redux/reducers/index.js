import { combineReducers } from "redux";
import AuthReducer from "../../components/login/client/redux/auth.reducer";
import AdCardReducer from "../../components/adCards/client/redux/adCard.reducer";

export default combineReducers({
  auth: AuthReducer,
  adCard: AdCardReducer
});

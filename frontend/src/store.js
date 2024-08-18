import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  newProjectReducer,
  newProjectReviewReducer,
  projectDetailsReducer,
  projectReducer,
  projectsReducer,
} from "./reducers/projectReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  newUserReviewReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import {
  allBidsReducer,
  bidDetailsReducer,
  bidReducer,
  myBidsReducer,
  newBidReducer,
} from "./reducers/bidReducer";
import { bidItemsReducer } from "./reducers/bidReducer";
import {
  allEarningReducer,
  makeEarningReducer,
  userEarningsReducer,
} from "./reducers/earningReducer";

const reducer = combineReducers({
  projects: projectsReducer,
  projectDetails: projectDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  bidItems: bidItemsReducer,
  newBid: newBidReducer,
  myBids: myBidsReducer,
  bidDetails: bidDetailsReducer,
  newProjectReview: newProjectReviewReducer,
  makeEarning: makeEarningReducer,
  allEarning: allEarningReducer,
  userEarnings: userEarningsReducer,
  newProject: newProjectReducer,
  project: projectReducer,
  allBids: allBidsReducer,
  bid: bidReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  newUserReview: newUserReviewReducer,
});

let initialState = {
  // bid: {
  //   bidItems: localStorage.getItem("bidItems")
  //     ? JSON.parse(localStorage.getItem("bidItems"))
  //     : [],
  // },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

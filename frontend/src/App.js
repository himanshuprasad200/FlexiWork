import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProjectDetails from "./component/Project/ProjectDetails.js";
import Projects from "./component/Project/Projects.js";
import Search from "./component/Project/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Proposal from "./component/Project/Proposal.js";
import BidSuccess from "./component/Project/BidSuccess.js";
import MyBids from "./component/Bid/MyBids.js";
import AccountAnalytics from "./component/User/AccountAnalytics.js";
import BidDetails from "./component/Bid/BidDetails.js";
import JoinAsClient from "./component/Admin/JoinAsClient.js";
import ProjectList from "./component/Admin/ProjectList.js";
import NewProject from "./component/Admin/NewProject.js";
import UpdateProject from "./component/Admin/UpdateProject.js";
import BidList from "./component/Admin/BidList.js";
import ProcessResponse from "./component/Admin/ProcessResponse.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import UserReview from "./component/Admin/UserReview.js";
import Payment from "./component/Admin/Payment.js";
import About from "./component/layout/About/about.js";
import TermsOfService from "./component/layout/TermsOfService/termsOfService.js";
import Contact from "./component/layout/Contact/contact.js";
import ScrollToTop from "./component/ScrollToTop.js"; 
import PrivacyPolicy from "./component/layout/PrivacyPolicy/PrivacyPolicy.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Header />
      {isAuthenticated ? (
        <UserOptions user={user} />
      ) : (
        <div className="profile-img-container">
          <img src="/Profile.png" alt="Profile" className="profile-img" />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:keyword" element={<Projects />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/success" element={<BidSuccess />} />
          <Route path="/bids" element={<MyBids />} />
          <Route path="/user/earning" element={<AccountAnalytics />} />
          <Route path="/bid/:id" element={<BidDetails />} />
        </Route>

        <Route element={<ProtectedRoute isAdminRoute={true} />}>
          <Route path="/admin/joinasclient" element={<JoinAsClient />} />
          <Route path="/admin/projects" element={<ProjectList />} />
          <Route path="/admin/project" element={<NewProject />} />
          <Route path="/admin/project/:id" element={<UpdateProject />} />
          <Route path="/admin/bids" element={<BidList />} />
          <Route path="/admin/bid/:id" element={<ProcessResponse />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/user/review/:id" element={<UserReview />} />
          <Route path="/admin/user/payment/:id" element={<Payment />} />
        </Route>

        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

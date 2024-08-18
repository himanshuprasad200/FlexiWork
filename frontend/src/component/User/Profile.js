import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard";
import "./Profile.css";
import { Rating } from "@material-ui/lab"; 

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const options = {  
    value: user.ratings,
    readOnly: true,
    precision: 0.5
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={user?.avatar?.url ? user.avatar.url : "Profile.png"}
                alt={user?.name}
              />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Country</h4>
                <p>{user?.country}</p>
              </div>
              <div>
                <h4>Profession</h4>
                <p>{user?.professionalHeadline}</p>
              </div>
              <div>
                <h4>No Of Reviews</h4>
                <p>{user?.numOfReviews}</p>
              </div>
              <div>
                <h4>Ratings</h4>
                <p><Rating {...options} /></p>
              </div>
              <div>
                <h4>Account No</h4>
                <p>{user?.accountNo}</p>
              </div>
              <div>
                <h4>UPI Id</h4>
                <p>{user?.upiId}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <Link to="/bids">My Bids</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
          <div className="reviewContainer">
            <h3 className="userReviewsHeading">Reviews</h3>
            {user?.reviews && user.reviews.length > 0 ? (
              <div className="reviews">
                {user.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            ) : (
              <p className="noReviewss">No Reviews Yet</p>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

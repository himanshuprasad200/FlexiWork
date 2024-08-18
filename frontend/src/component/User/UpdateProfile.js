import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader.js";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import {
  MdAccountBalance,
  MdOutlinePayments,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant.js";
import MetaData from "../layout/MetaData.js";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [professionalHeadline, setProfessionalHeadline] = useState("");
  const [country, setCountry] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [upiId, setUpiId] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("professionalHeadline", professionalHeadline);
    myForm.set("country", country);
    myForm.set("accountNo", accountNo);
    myForm.set("upiId", upiId);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfessionalHeadline(user.professionalHeadline);
      setCountry(user.country);
      setAccountNo(user.accountNo);
      setUpiId(user.upiId);
      setAvatarPreview(user.avatar ? user.avatar.url : "/Profile.png");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2>Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="professionalHeadline">
                  <MdOutlineWorkOutline />
                  <input
                    type="text"
                    placeholder="Your Work Profession"
                    required
                    name="professionalHeadline"
                    value={professionalHeadline}
                    onChange={(e) => setProfessionalHeadline(e.target.value)}
                  />
                </div>
                <div className="country">
                  <FaEarthAmericas />
                  <input
                    type="text"
                    placeholder="Country Name"
                    required
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="accountNo">
                  <MdAccountBalance />
                  <input
                    type="number"
                    placeholder="Account No"
                    required
                    name="accountNo"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                </div>
                <div className="upiId">
                  <MdOutlinePayments />
                  <input
                    type="text"
                    placeholder="Upi Id"
                    required
                    name="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <h6 className="profilePicture">Update Profile Picture</h6>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div> 
                <input
                  type="submit"
                  value="Update Profile"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;

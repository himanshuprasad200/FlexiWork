import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { newReviewForUser, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { USER_REVIEW_RESET } from "../../constants/userConstant";

const UserReview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { success, error: userReviewError } = useSelector(
    (state) => state.newUserReview
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("userId", id);

    dispatch(newReviewForUser(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (userReviewError) {
      alert.error(userReviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted successfully");
      dispatch({ type: USER_REVIEW_RESET });
    }
  }, [alert, dispatch, userReviewError, success]);

  return (
    <Fragment>
      <MetaData title="Submit User Review" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProjectContainer">
          <form className="updateOrderForm" onSubmit="">
            <h1>Submit Review</h1>
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(Number(e.target.value))}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            <Button onClick={submitReviewToggle} id="createProductBtn">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UserReview;

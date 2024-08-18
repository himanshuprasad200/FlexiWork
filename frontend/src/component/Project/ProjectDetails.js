import React, { Fragment, useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProjectDetails,
  newReviewForProject,
} from "../../actions/projectAction";
import { Link, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import { addToBidItems } from "../../actions/bidAction.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/projectConstant.js";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { project, loading, error } = useSelector(
    (state) => state.projectDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newProjectReview
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProjectDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  const options = {
    value: project ? project.ratings : 0,
    readOnly: true,
    precision: 0.5,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addBidItemsHandler = () => {
    dispatch(addToBidItems(id));
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("projectId", id);

    dispatch(newReviewForProject(myForm));

    setOpen(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${project?.title} -- FlexiWork`} />
          <div className="projectDetails">
            <div className="boxContainer">
              <div className="left">
                <span className="breadcrumbs">
                  Category: {project?.category}
                </span>
                <h1>{project?.title}</h1>
                <div className="user">
                  <img
                    className="pp"
                    src={project?.postedBy?.avatar?.url || "/Profile.png"}
                    alt="Profile"
                  />
                  <span>{project?.postedBy?.name}</span>
                  <div className="stars">
                    <Rating {...options} />
                    <span>({project?.numOfReviews} Reviews)</span>
                  </div>
                </div>
                <div className="projectImage">
                  {project?.images && project.images.length > 0 && (
                    <img src={project.images[0].url} alt={project.name} />
                  )}
                </div>
                <hr />
                <h2>Project Details</h2>
                <p>{project?.desc}</p>
                <div className="item">
                  <div className="secondUser">
                    <img
                      src={project?.postedBy?.avatar?.url || "/Profile.png"}
                      alt="Profile"
                    />
                    <div className="info">
                      <span>{project?.postedBy?.name}</span>
                      <div className="country">
                        <span>{project?.postedBy?.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="secondstars">
                    <Rating {...options} />
                    <a href="mailto:flexiworkclient@gmail.com">
                      <button className="contactButton">Contact Me</button>
                    </a>
                    <button
                      onClick={submitReviewToggle}
                      className="submitReview"
                    >
                      Submit Review
                    </button>
                  </div>
                  <hr />
                  <h3 className="reviewsHeading">Reviews</h3>

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

                  {project?.reviews && project?.reviews[0] ? (
                    <div className="reviews">
                      {project?.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <p className="noReviews">No Reviews Yet</p>
                  )}
                </div>
              </div>
              <div className="right">
                <div className="price">
                  <h2>{project?.title}</h2>
                  <h3>{`₹${project?.price}`}</h3>
                </div>
                <span>Category: {project?.category}</span>
                <p>{project?.desc}</p>
                <Link to="/proposal">
                  <button onClick={addBidItemsHandler}>Continue</button>
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProjectDetails;

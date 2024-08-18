import React, { Fragment, useEffect } from "react";
import "./BidDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getBidDetails } from "../../actions/bidAction";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";

const BidDetails = () => {
  const { bid, error, loading } = useSelector((state) => state.bidDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBidDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Bid Details" />
          <div className="bidDetailsPage">
            <div className="bidDetailsContainer">
              <Typography component="h1" className="bidHeader">
                Bid #{bid?._id}
              </Typography>
              <Typography variant="h6" className="sectionHeader">
                Bid Info
              </Typography>
              <div className="bidDetailsContainerBox">
                <div className="bidDetail">
                  <p className="bidDetailLabel">Name:</p>
                  <span className="bidDetailValue">
                    {bid?.user?.name || "N/A"}
                  </span>
                </div>
                <div className="bidDetail">
                  <h5 className="bidDetailLabel">Proposal</h5>
                  <p className="bidDetailValue">{bid?.proposal || "N/A"}</p>
                </div>
              </div>
              <Typography variant="h6" className="sectionHeader">
                Bid Response
              </Typography>
              <div className="bidDetailsContainerBox">
                <div className="bidDetail">
                  <p
                    className={
                      bid?.response
                        ? bid.response === "Approved"
                          ? "statusLabel greenColor"
                          : bid.response === "Pending"
                          ? "statusLabel orangeColor"
                          : "statusLabel redColor"
                        : "statusLabel"
                    }
                  >
                    {bid?.response || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bidDetailsBidItems">
            <Typography variant="h5">Bid Items:</Typography>
            <div className="bidDetailsBidItemsContainer">
              {bid?.bidsItems &&
                bid.bidsItems.map((item) => (
                  <div key={item.project} className="bidItemCard">
                    <div className="bidItemImageContainer">
                      <img
                        src={item.image}
                        alt="Project"
                        className="bidItemImage"
                      />
                    </div>
                    <div className="bidItemContent">
                      <span className="bidItemName">
                        Client's Name: {item.name}
                      </span>
                      <Link
                        to={`/project/${item.project}`}
                        className="bidItemTitle"
                      >
                        {item.title}
                      </Link>
                      <span className="bidItemCategory">
                        Category: {item.category}
                      </span>
                      <span className="bidItemPrice">₹ {item.price}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BidDetails;

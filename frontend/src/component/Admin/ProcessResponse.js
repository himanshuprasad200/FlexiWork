import React, { Fragment, useEffect, useState } from "react";
import "./ProcessResponse.css"
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_BID_RESET } from "../../constants/bidConstant";
import { getBidDetails, clearErrors, updateBid } from "../../actions/bidAction";
import { useNavigate, useParams } from "react-router-dom";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";

const ProcessResponse = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const { bid, error, loading } = useSelector((state) => state.bidDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.bid);

  const [status, setStatus] = useState("");

  const updateBidSubmitHandler = (e) => {
    e.preventDefault();

    if (!status) {
      alert.error("Please select a valid status.");
      return;
    }

    const myForm = new FormData();
    myForm.set("status", status);

    dispatch(updateBid(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Response Updated Successfully");
      dispatch({ type: UPDATE_BID_RESET });
      navigate("/admin/bids")
    }

    if (!bid || bid._id !== id) {
      dispatch(getBidDetails(id));
    } else {
      setStatus(bid.response); // Initialize status state with current bid response
    }
  }, [dispatch, alert, error, id, isUpdated, updateError, bid, navigate]);

  return (
    <Fragment>
      <MetaData title="Process Bid" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProjectContainer">
          <form className="updateOrderForm" onSubmit={updateBidSubmitHandler}>
            <h1>Process Response</h1>

            <div>
              <AccountTreeIcon />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={!bid}
              >
                <option value="">Choose Status</option>
                {bid && bid.response === "Pending" && (
                  <>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </>
                )}
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading || !status}
            >
              Process
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessResponse;

import React, { Fragment, useEffect, useState } from "react";
import "./Proposal.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { createBid, clearErrors } from "../../actions/bidAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { CREATE_BID_RESET } from "../../constants/bidConstant";

const Proposal = () => {
  const dispatch = useDispatch(); 
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.newBid
  );
  const { bidItems } = useSelector(
    (state) => state.bidItems
  );
  

  const [proposal, setProposal] = useState("");
  const [file, setFile] = useState(null);

  const handleProposalChange = (e) => {
    setProposal(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bid = {
      proposal,
      file,
      bidsItems: bidItems,
    };

    dispatch(createBid(bid));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Bid placed successfully");
      navigate("/success");
      setProposal("");
      setFile(null);
      dispatch({ type: CREATE_BID_RESET });
    }
  }, [dispatch, error, success, alert, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <form className="proposal-form" onSubmit={handleSubmit}>
            <textarea
              className="proposal-textarea"
              value={proposal}
              onChange={handleProposalChange}
              placeholder="Write your proposal here..."
            />
            <h4 className="proposalUpload">Upload Image/Video if needed</h4>
            <input
              type="file"
              className="proposal-file"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <button type="submit" className="proposal-submit">
              Place a Bid
            </button>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Proposal;

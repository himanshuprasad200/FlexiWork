import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Button } from "@material-ui/core";
import { createEarning, clearErrors } from "../../actions/earningAction"; // Adjust the path as needed
import "./Payment.css";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  // Accessing loading and error state from the Redux store
  const { loading, error, success } = useSelector((state) => state.makeEarning);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = id; // Replace with actual userId, e.g., from authentication context or props

    // Dispatch the createEarning action
    dispatch(createEarning(amount, userId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Payment Processed successfully");
    }
  }, [dispatch, error, success, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Process Payment" />
          <div className="dashboard">
            <Sidebar />
            <div className="newProjectContainer">
              <form className="updateOrderForm" onSubmit={handleSubmit}>
                <h1>Process Payment</h1>

                <div className="form-group">
                  <MdOutlineAttachMoney size={30} />
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    required
                    className="amountInput"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading}
                  className="submit-button"
                >
                  {loading ? "Processing..." : "Process Payment"}
                </Button>

                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Payment;

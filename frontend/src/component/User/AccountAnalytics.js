import React, { useEffect, useMemo, useRef } from "react";
import { Line } from "react-chartjs-2";
import "./AccountAnalytics.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchEarnings } from "../../actions/earningAction";

const AccountAnalytics = () => {
  const dispatch = useDispatch();
  const { earnings, loading, error } = useSelector((state) => state.userEarnings);

  

  useEffect(() => {
    dispatch(fetchEarnings());
  }, [dispatch]);

  // Calculate labels and data for the chart
  const labels = Array.isArray(earnings) &&
    earnings.map((e) => new Date(e.recievedAt).toLocaleDateString());
  const data = Array.isArray(earnings) && earnings.map((e) => e.amount);

  const lineState = {
    labels,
    datasets: [
      {
        label: "Earnings Over Time",
        data,
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Use useRef to keep track of the accumulated total amount
  const totalAmountRef = useRef(0);

  useMemo(() => {
    if (Array.isArray(earnings)) {
      totalAmountRef.current = earnings.reduce((sum, e) => sum + e.amount, 0);
    }
  }, [earnings]);

  return (
    <div className="accountAnalytics">
      <div className="card">
        <h2>Account Analytics</h2>
        {loading ? (
          <p>Loading...</p> 
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="earningDetails">
            <p>Total Amount Earned: ₹{totalAmountRef.current}</p>
            <p>Most Recent Amount Earned: ₹{earnings.length ? earnings[earnings.length - 1].amount : 0}</p>
            <p>Received At: {earnings.length ? new Date(earnings[earnings.length - 1].recievedAt).toLocaleDateString() : "N/A"}</p>
          </div>
        )}
      </div>
      <div className="chart">
        {data && data.length ? <Line data={lineState} /> : <p>No data available for chart.</p>}
      </div>
    </div>
  );
};

export default AccountAnalytics;

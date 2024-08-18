import React, { useEffect, useMemo, useRef } from "react";
import Sidebar from "./Sidebar.js";
import "./JoinAsClient.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProject } from "../../actions/projectAction.js";
import { getAllBids } from "../../actions/bidAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { getAllEarnings } from "../../actions/earningAction.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const JoinAsClient = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { bids } = useSelector((state) => state.allBids);
  const { users } = useSelector((state) => state.allUsers);
  const { earning = [] } = useSelector((state) => state.allEarning); // Ensure this key matches your state

  useEffect(() => {
    dispatch(getAdminProject());
    dispatch(getAllBids());
    dispatch(getAllUsers());
    dispatch(getAllEarnings()); // Fetch earnings data
  }, [dispatch]);

  // Use useRef to keep track of the total amount
  const totalAmountRef = useRef(0);

  useMemo(() => {
    if (Array.isArray(earning)) {
      totalAmountRef.current = earning.reduce((sum, e) => sum + e.amount, 0);
    }
  }, [earning]);

  // Format earning data for the chart
  const chartData = useMemo(() => {
    const labels = earning.map((e) => new Date(e.recievedAt).toLocaleDateString()); // Format dates
    const data = earning.map((e) => e.amount);
    return {
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
  }, [earning]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmountRef.current}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/projects">
              <p>Project</p>
              <p>{projects && projects.length}</p>
            </Link>
            <Link to="/admin/bids">
              <p>Bids</p>
              <p>{bids && bids.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default JoinAsClient;

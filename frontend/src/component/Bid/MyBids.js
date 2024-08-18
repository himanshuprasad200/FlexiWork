import React, { Fragment, useEffect } from "react";
import "./MyBids.css";
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, myBids } from "../../actions/bidAction";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";

const MyBids = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, bids } = useSelector((state) => state.myBids);
  const { user } = useSelector((state) => state.user);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const columns = [
    { field: "id", headerName: "Bid ID", minWidth: 250, flex: 0.5 },
    { field: "proposal", headerName: "Proposal", minWidth: 250, flex: 0.5 },
    {
      field: "response",
      headerName: "Response",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        switch (params.value) {
          case "Approved":
            return "greenColor";
          case "Pending":
            return "orangeColor";
          default:
            return "redColor";
        }
      },
    },
    { field: "createdAt", headerName: "Created At", minWidth: 120, flex: 0.3 },
    {
      field: "actions",
      headerName: "Bids Details",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/bid/${params.row.id}`}> 
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = bids
    ? bids
        .map((item) => ({
          id: item._id,
          response: item.response,
          proposal: item.proposal,
          createdAt: formatDate(item.createdAt),
        }))
    : [];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myBids());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Bids`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myBidsPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myBidsTable"
            autoHeight
          />
          <Typography id="myBidsHeading">{user.name}'s Bids</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyBids;

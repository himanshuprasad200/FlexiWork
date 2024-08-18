import React, { Fragment, useEffect } from "react";
import "./ProjectList.css";
import { DataGrid } from '@material-ui/data-grid';
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { deleteBid, getAllBids, clearErrors } from "../../actions/bidAction";
import LaunchIcon from "@material-ui/icons/Launch";
import { DELETE_BID_RESET } from "../../constants/bidConstant";

const BidList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const { error, bids } = useSelector((state) => state.allBids);
  const { error: deleteError, isDeleted } = useSelector((state) => state.bid);

  const deleteBidHandler = (id) => {
    dispatch(deleteBid(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Bid Deleted Successfully");
      navigate("/admin/bids");
      dispatch({ type: DELETE_BID_RESET });
    }
    dispatch(getAllBids());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Bid ID", minWidth: 250, flex: 0.5 },
    { field: "proposal", headerName: "Proposal", minWidth: 250, flex: 0.5 },
    {
      field: "response",
      headerName: "Response",
      minWidth: 120,
      flex: 0.3,
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
    { field: "createdAt", headerName: "Created At", minWidth: 150, flex: 0.3 },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 100,
      flex: 0.3,
      renderCell: (params) => {
        const bidId = params.getValue(params.id, "id");
        return (
          <Fragment>
            <Link to={`/admin/bid/${bidId}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteBidHandler(bidId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
    {
      field: "details",
      headerName: "User Bids",
      minWidth: 150,
      flex: 0.3,
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
          proposal: item.proposal,
          response: item.response,
          createdAt: formatDate(item.createdAt),
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort bids by createdAt in descending order
    : [];

  return (
    <Fragment>
      <MetaData title={`ALL BIDS -- CLIENT`} />
      <div className="dashboard">
        <Sidebar />
        <div className="projectListContainer">
          <h1 id="projectListHeading">ALL BIDS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="projectListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default BidList;

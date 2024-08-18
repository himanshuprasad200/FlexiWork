import React, { Fragment, useEffect } from "react";
import "./ProjectList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import LaunchIcon from "@material-ui/icons/Launch";
import { DELETE_USER_RESET } from "../../constants/userConstant";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profile
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError); // Changed to display the correct deleteError
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 0.3 },
    { field: "email", headerName: "Email", minWidth: 150, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 100, flex: 0.3 },
    {
      field: "accountNo",
      headerName: "Account No",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "upiId",
      headerName: "UPI",
      type: "string",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "greenColor" : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 100,
      flex: 0.3,
      renderCell: (params) => {
        const userId = params.getValue(params.id, "id");
        return (
          <Fragment>
            <Link to={`/admin/user/${userId}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteUserHandler(userId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
    {
      field: "payment",
      headerName: "Make Payment",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/admin/user/payment/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
    {
      field: "userReview",
      headerName: "Submit Review ",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/admin/user/review/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = users
    ? users.map((item) => ({
        id: item._id,
        email: item.email,
        name: item.name,
        accountNo: item.accountNo,
        upiId: item.upiId,
        role: item.role,
      }))
    : [];

  return (
    <Fragment>
      <MetaData title={`ALL USERS -- CLIENT`} />
      <div className="dashboard">
        <Sidebar />
        <div className="projectListContainer">
          <h1 id="projectListHeading">ALL USERS</h1>
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

export default UsersList;

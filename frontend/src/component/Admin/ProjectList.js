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
import {
  clearErrors,
  deleteProject,
  getAdminProject,
} from "../../actions/projectAction";
import { DELETE_PROJECT_RESET } from "../../constants/projectConstant";

const ProjectList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, projects } = useSelector((state) => state.projects);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.project
  );

  const deleteProjectHandler = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Project Deleted Successfully");
      navigate("/admin/joinasclient");
      dispatch({ type: DELETE_PROJECT_RESET });
    }
    dispatch(getAdminProject());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Project ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
    { field: "category", headerName: "Category", minWidth: 200, flex: 0.5 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        const projectId = params.getValue(params.id, "id");
        return (
          <Fragment>
            <Link to={`/admin/project/${projectId}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProjectHandler(projectId)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  projects &&
    projects.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PROJECTS -- CLIENT`} />
      <div className="dashboard">
        <Sidebar />
        <div className="projectListContainer">
          <h1 id="projectListHeading">ALL PROJECTS</h1>
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

export default ProjectList;

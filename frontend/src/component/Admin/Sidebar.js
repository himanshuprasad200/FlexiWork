import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo2.png";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="FlexiWork" />
      </Link>
      <Link to="/admin/joinasclient">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Projects">
            <Link to="/admin/projects">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon />}
              ></TreeItem>
            </Link>
            <Link to="/admin/project">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/bids">
        <p>
          <ListAltIcon />
          Bids
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;

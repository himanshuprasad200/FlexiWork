import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Project from "./ProjectCard.js";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProject } from "../../actions/projectAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, projects } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProject());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="FlexiWork" />
          <div className="banner">
            <p>Welcome to FlexiWork</p>
            <h1>Find the right freelance service right away</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Popular Services</h2>
          <div className="container" id="container">
            {projects &&
              projects.map((project) => (
                <Project key={project._id} project={project} /> // Add a unique key prop
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

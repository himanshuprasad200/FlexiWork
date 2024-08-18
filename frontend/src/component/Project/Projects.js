import React, { Fragment, useEffect, useState } from "react";
import "./Project.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProject } from "../../actions/projectAction";
import Loader from "../layout/Loader/Loader";
import ProjectCard from "../Home/ProjectCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
  "Article",
  "Creative Writing",
  "Translations",
  "Speech Writing",
  "Video Editing",
  "Website Development",
  "Animation",
  "Graphic Design",
  "Logo Design",
  "Photo Editing",
  "Song Writing",
  "Audio Making",
  "Fashion Design",
  "Game Design",
  "Digital Marketing",
]; 

const Projects = () => {
  const dispatch = useDispatch();
  const keyword = useParams();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 90000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { projects, loading, error, projectsCount, resultPerPage } =
    useSelector((state) => state.projects);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProject(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Projects -- FlexiWork"/>
          <h2 className="projectsHeading">Projects</h2>
          <div className="projects">
            {projects &&
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={90000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < projectsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={projectsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Projects;

import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { MdTitle } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProjectDetails,
  updateProject,
} from "../../actions/projectAction";
import { UPDATE_PROJECT_RESET } from "../../constants/projectConstant";

const UpdateProject = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id: projectId } = useParams(); // Destructure and get the id from useParams

  const {
    loading,
    error: UpdateError,
    isUpdated,
  } = useSelector((state) => state.project);
  const { project, error } = useSelector((state) => state.projectDetails);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  useEffect(() => {
    if (!project || project._id !== projectId) {
      dispatch(getProjectDetails(projectId));
    } else {
      setName(project.name || "");
      setTitle(project.title || "");
      setDesc(project.desc || "");
      setCategory(project.category || "");
      setPrice(project.price || 0);
      setOldImages(project.images || []);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (UpdateError) {
      alert.error(UpdateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Project Updated Successfully");
      navigate("/admin/projects");
      dispatch({ type: UPDATE_PROJECT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    projectId,
    project,
    UpdateError,
  ]);

  const updateProjectSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("title", title);
    myForm.set("desc", desc);
    myForm.set("category", category);
    myForm.set("price", price);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProject(projectId, myForm));
  };

  const updateProjectFormImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Update Project" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProjectContainer">
          <form
            className="createProjectForm"
            encType="multipart/form-data"
            onSubmit={updateProjectSubmitHandler}
          >
            <h1>Update Project</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MdTitle size={25} />
              <input
                type="text"
                placeholder="Project Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Project Description"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                cols="30"
                rows="4"
              />
            </div>
            <div>
              <MdOutlineAttachMoney size={30} />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select
                value={category} // Set the value of the select to the current category
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div id="createProjectFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProjectFormImagesChange}
                multiple
              />
            </div>
            <div id="createProjectFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Old Project Preview" />
              ))}
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Project Preview" />
                ))}
            </div>
            <Button
              id="createProjectBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProject;

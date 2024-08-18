import React, { Fragment, useEffect, useState } from "react";
import "./NewProject.css";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { MdTitle } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProject } from "../../actions/projectAction";
import { NEW_PROJECT_RESET } from "../../constants/projectConstant";

const NewProject = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newProject);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
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
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (success) {
      alert.success("Project created successfully");
      navigate("/admin/joinasclient");
      dispatch({ type: NEW_PROJECT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProjectSubmitHandler = (e) => {
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
    dispatch(createProject(myForm));
  };

  const createProjectFormImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      <MetaData title="Create Project" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProjectContainer">
          <form
            className="createProjectForm"
            encType="multipart/form-data"
            onSubmit={createProjectSubmitHandler}
          >
            <h1>Create Project</h1>
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
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
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
                onChange={createProjectFormImagesChange}
                multiple
              />
            </div>
            <div id="createProjectFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Project Preview" />
              ))}
            </div>
            <Button
              id="createProjectBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProject;

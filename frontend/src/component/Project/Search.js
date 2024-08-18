import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css"
import MetaData from "../layout/MetaData";

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/projects/${keyword}`);
    } else {
      navigate("/projects");
    }
  };

  return (
    <Fragment>
    <MetaData title="Search -- FlexiWork"/>
      <div className="searchContainer">
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search Projects..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      </div>
    </Fragment>
  );
};

export default Search;

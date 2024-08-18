import React from "react";
import "./aboutSection.css";
import { Button, Typography } from "@material-ui/core";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import logo from "../../../images/logo2.png";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer"> 
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <img src={logo} alt="logo2"/>
            <Typography>FlexiWork</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            FlexiWork is your premier destination for connecting with top freelance talent across various industries. Our platform empowers both freelancers and clients by providing a seamless environment to collaborate, innovate, and achieve remarkable results. Join us and discover a world of opportunities tailored to your professional needs.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect With Us</Typography>
            <a
              href="https://in.pinterest.com/"
              target="blank"
            >
              <FaPinterest size={25} className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com" target="blank">
              <FaInstagram size={25} className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
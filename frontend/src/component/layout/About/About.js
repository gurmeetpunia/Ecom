import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
const About = () => {
  const linkedinvis = () => {
    window.location = "https://www.linkedin.com/in/gurmeet-756279235/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Gurmeet Punia</Typography>
            <Button onClick={linkedinvis} color="primary">
              LINKEDIN
            </Button>
            <span>
              This is a sample wesbite made by Gurmeet Punia.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
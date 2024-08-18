import React from 'react'
import "./BidSuccess.css"
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const BidSuccess = () => {
  return (
    <div className="BidSuccess">
    <CheckCircleIcon />

    <Typography>Your Bid has been Placed successfully </Typography>
    <Link to="/bids">View Bids</Link>
  </div>
  ) 
}

export default BidSuccess

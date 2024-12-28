import React from "react";
import "./Footer.css";
import { Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>Ajith. © 2024</Typography>
      </Grid>
      <div className="footer-links">
        <a href="https://github.com/ajithdolly" target="_blank" rel="noopener noreferrer"><b>GitHub</b></a>
        <a href="http://linkedin.com/in/ajith-dollichan-developer" target="_blank" rel="noopener noreferrer"><b>LinkedIn</b></a>
        <a href="mailto:ajithdolly@gmail.com"><b>Email</b></a>
      </div>
    </div>
  );
};

export default Footer;


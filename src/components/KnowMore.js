import { Grid, Typography } from "@mui/material";
import React from "react";
import "../App.css";
import DvrIcon from '@mui/icons-material/Dvr';
import SchoolIcon from '@mui/icons-material/School';

function KnowMore() {
  return (
    <div style={{
      //  color: "white"
        }}>
      <Grid container padding='2rem'>
      <Grid item xs={12} style={{ paddingBottom: "1rem" }}>
        <Typography
          variant="h7"
          style={{ fontWeight: "lighter", paddingLeft: "2rem" }}
        >
          Get To Know More
        </Typography>
      </Grid>




      <Grid item xs={12}>
        <Typography variant="h3" style={{ fontWeight: "Bold" }}>
          About Me
        </Typography>
      </Grid>

      </Grid>
      <Grid container>



  <Grid 
    item 
    xs={12}  // This makes it full width on small screens
    sm={4}   // This makes it 3 columns wide on medium and larger screens
    style={{ padding: '2rem', display: 'flex', justifyContent: 'start', alignItems: 'flex-start' }}
  >
    <div className="containerKnowMore">
    <DvrIcon style={{ fontSize: '30px' }} />
      <Typography style={{
        fontSize:'1.5rem',
        // color: 'white', 
        fontWeight: 'bolder' }}>
        Experience
      </Typography>
      <p style={{ 
        // color: 'white', 
        fontSize:'1rem',
        fontWeight: 'bold', fontSize: '1.3rem'}}>
        2+ years fullstack development
      </p>
    </div>
  </Grid>





  <Grid 
    item 
    xs={12}  // This makes it full width on small screens
    sm={4}   // This makes it 3 columns wide on medium and larger screens
    style={{ padding: '2rem', display: 'flex', justifyContent: 'start', alignItems: 'flex-start' }}
  >
    <div className="containerKnowMore">
    <SchoolIcon style={{ fontSize: '30px' }}/>
      <Typography style={{
        fontSize:'1.5rem',
          fontWeight: 'bolder' }}>
        Education
      </Typography>
      <p style={{ 
        // color: 'white',
        fontSize:'1rem',
         fontWeight: 'bold', fontSize: '1.3rem' }}>
      Bachelor of Computer Application
      </p>
    </div>
  </Grid>


  <Grid item xs={12} sm={8}>
  <Typography style={{ padding: '1.5rem' }}>
    As a Software Developer specializing in React, Material-UI (MUI), CSS, JavaScript, and HTML, I have developed a strong foundation in front-end web development. I am proficient in building responsive and user-friendly applications using modern JavaScript frameworks and libraries, with a focus on clean, maintainable code and seamless user experiences. Additionally, I possess practical knowledge in Spring Boot and RESTful APIs, which enables me to create robust, scalable back-end solutions.
    Alongside my technical skills, I have a solid academic background, having ranked in the top 0.35% of my cohort. This achievement reflects my dedication, problem-solving ability, and deep understanding of software development principles. I am always eager to learn, adapt, and implement innovative solutions in both front-end and back-end development.
  </Typography>
</Grid>

</Grid>
    </div>
  );
}

export default KnowMore;

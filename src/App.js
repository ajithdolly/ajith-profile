import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import AjithImage from "./components/Photos/AjithSquare.jpeg"
import { useTheme } from '@mui/material/styles';
import KnowMore from "./components/KnowMore";
import ExplorePage from "./components/Explore";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Contact from "./components/Contact";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MobileHeader from "./components/MobileHeader";
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const name = "AAjith Dollichan"; // The name string should be start with the fist letter twice as recat useeffect has a bug
  const [displayedName, setDisplayedName] = useState("");
  const [stopAnimation, setStopAnimation] = useState(false);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  const scrollHandler = (id) => {
    const element = document.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }




  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {

      setDisplayedName((prev) => prev + name[index]);
      index++;
      if (index === name.length - 1) {
        setStopAnimation(true);
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <div
      style={{ background: 'white' }}
    >


      {!isMobile ? <>

        <ThemeProvider theme={theme}>
      <Grid container xs={12} style={{ display: 'flex', justifyContent: "center", alignItems: 'center', paddingBottom: "10px" }}>
        <Header onScroll={scrollHandler} />
      </Grid>
      </ThemeProvider>

        <Grid container xs={12} style={{ paddingTop: "4rem" }}>

          <Grid item xs={4} style={{ paddingLeft: '15%' }}>
            <div className="image-container">
              <img
                style={{
                  width: '350px',
                  height: '350px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} src={AjithImage}
                alt="Ajith" className="round-image" />
            </div>
          </Grid>




          <Grid item xs={8} style={{ paddingTop: '5%', display: 'flex', justifyContent: 'start', alignItems: 'flex-start' }}>
            <div className="container">

              <Typography style={{ fontWeight: 'bold' }}>Hello I'm</Typography>
              <p style={{ fontSize: '55px', fontWeight: 'bolder', marginTop: '-1px' }} className={stopAnimation ? "nameWithNoEffect" : "name"}>
                {displayedName}
              </p>
              {/* <p style={{
          // color:'white',
          fontWeight:'bold',fontSize:'1.3rem',padding:'1rem'}}>
          I am a passionate software developer with experience in various
          technologies. I specialize in front-end development using React and Micro service development using SpringBoot.
        </p> */}


              <Grid container display='flex' justifyContent='center' marginTop='-20px'>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'black', // Set the border color to black
                    borderRadius: '50px', // Make the edges rounded
                    margin: '10px',
                    color: 'black',
                    fontSize: '.66rem', // Set a margin (you can adjust this value)
                    padding: '13px 20px', // Adjust padding for better button appearance
                    '&:hover': {
                      borderColor: 'black', // Border color stays black on hover
                    }
                  }}
                >
                  Download CV
                </Button>


                <Button
                  variant="outlined"
                  onClick={() => { window.location.href = "mailto:ajithdollichan@gmail.com"; }}
                  sx={{
                    borderColor: 'black', // Set the border color to black
                    borderRadius: '50px',
                    background: 'black',
                    color: 'white',
                    fontSize: '.66rem', // Make the edges rounded
                    margin: '10px', // Set a margin (you can adjust this value)
                    padding: '8px 20px', // Adjust padding for better button appearance
                    '&:hover': {
                      borderColor: 'black', // Border color stays black on hover
                    }
                  }}
                >
                  Contact Info
                </Button>

                <Grid container display='flex' justifyContent='center' marginTop='1.5rem'>

                  <a href="https://github.com/ajithdolly" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon style={{ paddingRight: '1.5rem', fontSize: '40px', color: 'black' }} />
                  </a>
                  <a href="http://linkedin.com/in/ajith-dollichan-developer" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon
                      style={{
                        fontSize: '40px',
                        backgroundColor: 'black',
                        borderRadius: '50%',
                        color: 'white',
                      }}

                    />
                  </a>

                </Grid>



              </Grid>
            </div>

          </Grid>

        </Grid>

        <Grid container xs={12} display='flex' justifyContent='end' alignItems='end' padding='8rem 8rem 0 0'>
          <KeyboardDoubleArrowDownIcon href="#" onClick={() => scrollHandler('About')} sx={{ fontSize: 50 }} />
        </Grid>



        <section id="About">
          <Grid style={{ paddingLeft: "10%", paddingTop: '5%' }}>


            <KnowMore />


          </Grid>


        </section>




        <Grid container xs={12} display='flex' justifyContent='end' alignItems='end' padding='1rem 8rem 0 0'>
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: 50 }} href="#" onClick={() => scrollHandler('Experience')} />
        </Grid>


        <section id="Experience">
          <ExplorePage />
        </section>


        <Grid container xs={12} display='flex' justifyContent='end' alignItems='end' padding='1rem 8rem 5rem 8rem'>
          <KeyboardDoubleArrowDownIcon href="#" onClick={() => scrollHandler('Contact')} sx={{ fontSize: 50 }} />
        </Grid>

      </> : <>

        {/* // this is for mobile view  */}
      <Grid container xs={12} style={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}>
        <MobileHeader onScroll={scrollHandler} />
      </Grid>

        <Grid
          container
          style={{ paddingTop: "1rem" }}
        >



          <Grid
            item
            xs={12}
            style={{
              // marginLeft:'4rem',
              display: 'flex', // Use flexbox for centering
              justifyContent: 'center', // Horizontally center
              alignItems: 'center', // Vertically center
            }}
          >
            <div className="image-container">
              <img
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  objectFit: 'cover', // Ensures the image maintains its aspect ratio
                }}
                src={AjithImage}
                alt="Ajith"
                className="round-image"
              />
            </div>
          </Grid>



          <Grid
            item
            xs={12}
            style={{
              paddingTop: '5%',
              display: 'flex',
              flexDirection: 'column', // Stack text vertically
              alignItems: 'center', // Center text horizontally
            }}
          >
            <div className="containerMobile">
              <Typography style={{ fontWeight: 'bold' }}>Hello I'm</Typography>
              <p
                style={{
                  fontWeight: 'bolder',
                  marginTop: '-1px',
                  fontSize: '1.5rem'
                }}
                className={stopAnimation ? "nameWithNoEffect" : "name"}
              >
                {displayedName}
              </p>

              <Grid container display="flex" justifyContent="center" marginTop="-20px">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'black',
                    borderRadius: '50px',
                    margin: '10px',
                    color: 'black',
                    fontSize: '.66rem',
                    padding: '13px 20px',
                    '&:hover': {
                      borderColor: 'black',
                    }
                  }}
                >
                  Download CV
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => { window.location.href = "mailto:ajithdollichan@gmail.com"; }}
                  sx={{
                    borderColor: 'black',
                    borderRadius: '50px',
                    background: 'black',
                    color: 'white',
                    fontSize: '.66rem',
                    margin: '10px',
                    padding: '8px 20px',
                    '&:hover': {
                      borderColor: 'black',
                    }
                  }}
                >
                  Contact Info
                </Button>
              </Grid>

              <Grid container display="flex" justifyContent="center" marginTop="1.5rem">
                <a href="https://github.com/ajithdolly" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon style={{ paddingRight: '1.5rem', fontSize: '40px', color: 'black' }} />
                </a>
                <a href="https://github.com/ajithdolly" target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon
                    style={{
                      fontSize: '40px',
                      backgroundColor: 'black',
                      borderRadius: '50%',
                      color: 'white',
                    }}
                  />
                </a>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid container xs={12} display='flex' justifyContent='end' alignItems='end' padding='1rem 2rem 0 0'>
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: 30 }} href="#" onClick={() => scrollHandler('About')} />
        </Grid>

        <section id="About">

          {/* <Grid item xs={12} style={{ padding: '4rem 10rem' }}> */}

            <KnowMore />
          {/* </Grid> */}
        </section>

        <Grid container xs={12} display='flex' justifyContent='end' alignItems='end' padding='0 2rem 0 0'>
          <KeyboardDoubleArrowDownIcon sx={{ fontSize: 30 }} href="#" onClick={() => scrollHandler('Experience')} />
        </Grid>


        <section id="Experience">
          <ExplorePage />
        </section>


        <Grid container xs={12} display='flex' justifyContent='end' alignItems='end' padding='4rem 2rem 4rem 0'>
          <KeyboardDoubleArrowDownIcon href="#" onClick={() => scrollHandler('Contact')} sx={{ fontSize: 30 }} />
        </Grid>


      </>}







      <section id="Contact">
        <Contact />
      </section>
      <Grid container xs={12} style={{ display: 'flex', justifyContent: "center", alignItems: 'center', marginTop: '5rem', paddingBottom: '2rem' }}>
        <Footer />
      </Grid>
    </div>
  );
}

export default App;

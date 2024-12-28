import React from "react";
import "./Header.css";
import { Grid, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Header = ({ onScroll }) => {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <div className="header">
      {!isMobile ? (
        <Grid container xs={12}>
          <Grid item xs={7} className="header-text" style={{
            display: "flex",
            justifyContent: 'start',
            paddingLeft: '8%',
            fontSize: '2rem'
          }}>
            Ajith Dollichan
          </Grid>
          <Grid container xs={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={3} style={{ fontSize: "1.4rem" }} className="header-text" href="#" onClick={() => onScroll('About')}>About</Grid>
            <Grid item xs={3} style={{ fontSize: "1.4rem" }} className="header-text" href="#" onClick={() => onScroll('Experience')}>Experience</Grid>
            <Grid item xs={3} style={{ fontSize: "1.4rem" }} className="header-text" href="#" onClick={() => onScroll('Project')}>Project</Grid>
            <Grid item xs={3} style={{ fontSize: "1.4rem" }} className="header-text" href="#" onClick={() => onScroll('Contact')}>Contact</Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid container xs={12}>
            <Grid item xs={2}>
              {/* Always render the MenuIcon */}
              <IconButton onClick={() => toggleDrawer(true)} style={{ display: 'flex', alignItems: 'center' }}>
                <MenuIcon style={{ color: 'red' }} />
              </IconButton>
            </Grid>
            <Grid item xs={10} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', paddingRight: "25%" }}>
              <Typography style={{ color: 'Black' }} variant="h5">
                Ajith Dollichan
              </Typography>
            </Grid>
          </Grid>
        </>
      )}

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "transparent", // Make the drawer's background transparent
            boxShadow: "none", // Remove any shadow if you want a cleaner look
          },
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(142, 61, 115, 0.64)", // You can adjust the opacity of the backdrop here if needed
          }
        }}>
        <List>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText style={{color:"rgb(51, 254, 0)"}}primary="About" />
          </ListItem>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText style={{color:"rgb(51, 254, 0)"}} primary="Experience" />
          </ListItem>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText  style={{color:"rgb(51, 254, 0)"}} primary="Project" />
          </ListItem>
          <ListItem button onClick={() => toggleDrawer(false)}>
            <ListItemText style={{color:"rgb(51, 254, 0)"}} primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;

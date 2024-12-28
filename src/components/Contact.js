import React from 'react';
import { Grid, Typography, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Contact = () => {
  return (
    <Grid item xs={12}>
      <Typography gutterBottom sx={{ textAlign: 'center', fontSize: '.95rem' }}>
        Get in Touch
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center',paddingBottom:'1rem',fontWeight:'bold' }}>
        Contact Me
      </Typography>

      <Grid container alignItems="center" display="flex" justifyContent="center">
        <Grid container xs={8} lg={3} border="1px solid black" padding=".5rem" sx={{ borderRadius: '20px' }}>
          <Grid
            item
            xs={12}
            lg={8}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0.5rem',
            }}
          >
            <Link href="mailto:ajithdollichan@gmail.com" sx={{ display: 'flex', alignItems: 'center' }}>
              <MailOutlineIcon sx={{ marginRight: '0.5rem' }} />
              <Typography>ajithdollichan@gmail.com</Typography>
            </Link>
          </Grid>

          {/* LinkedIn Section */}
          <Grid
            item
            xs={12}
            lg={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link
              href="http://linkedin.com/in/ajith-dollichan-developer"
              target="_blank"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LinkedInIcon sx={{ marginRight: '0.5rem' }} />
              <Typography style={{fontSize:'1rem'}}>LinkedIn</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;

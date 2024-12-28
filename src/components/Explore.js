import React from 'react';
import { Grid, Typography, Box, colors } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function ExplorePage() {
  const skills = [
    {
      category: 'Frontend Development',
      skills: [
        { name: 'React', level: 'proficient' },
        { name: 'CSS', level: 'proficient' },
        { name: 'HTML', level: 'proficient' },
        { name: 'JavaScript', level: 'proficient' },
        { name: 'TypeScript', level: 'proficient' },
        { name: 'Material UI', level: 'proficient' },
      ],
    },
    {
      category: 'Backend Development',
      skills: [
        { name: 'Spring Boot', level: 'proficient' },
        { name: 'Postgres', level: 'proficient' },
        { name: 'Mongo DB', level: 'proficient' },
        { name: 'Rest API', level: 'proficient' },
        { name: 'Micro services', level: 'proficient' },
        { name: 'Devops', level: 'Experienced' },
      ],
    },
  ];

  return (
    <Grid container spacing={1} justifyContent="center" paddingTop='6rem'> {/* Reduced spacing */}
      <Grid item xs={12}>
      <Typography  gutterBottom sx={{ textAlign: 'center',fontSize:'.95rem' }}>
         Explore My
        </Typography>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center',fontWeight:'bold' }}>
         Experience
        </Typography>
      </Grid>

<Grid container style={{padding:'0 16%'}}>

      {skills.map((section, index) => (
        <Grid item xs={12} sm={6} key={index} stys>
          <Box
            sx={{
                padding: '1rem',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                height: '80%',
                maxWidth: '100%',
                margin: '2rem',
                padding: '1rem',
                border:'1px solid black',
                borderRadius:'30px',
                transition: 'box-shadow 0.1s ease-in-out',
                '&:hover': {
                  boxShadow: '0 0 30px rgba(214, 103, 155, 0.8)',
                },
              }}
          >
            {/* Category Title */}
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', paddingBottom: '1rem',fontWeight:'bolder' }}>
              {section.category}
            </Typography>

            {/* Skills Section */}
            <Grid container spacing={1} justifyContent="center">
              {/* Left Column for skills */}
              <Grid item xs={6}>
                {section.skills.slice(0, Math.ceil(section.skills.length / 2)).map((skill, skillIndex) => (
                  <Grid item xs={12} key={skillIndex} display="flex" alignItems="center" justifyContent="center" padding={'.5rem'}>
                    <CheckCircleIcon checked sx={{ '& .MuiSvgIcon-root': { fontSize: '20px' } }} />
                    <div style={{ marginLeft: '5px' }}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Typography variant="body2">{skill.level}</Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>

              {/* Right Column for skills */}
              <Grid item xs={6}>
                {section.skills.slice(Math.ceil(section.skills.length / 2)).map((skill, skillIndex) => (
                  <Grid item xs={12} key={skillIndex} display="flex" alignItems="center" justifyContent="center" padding='.5rem'>
                    <CheckCircleIcon checked sx={{ '& .MuiSvgIcon-root': { fontSize: '20px' } }} />
                    <div style={{ marginLeft: '5px' }}>
                      <Typography variant="body1">{skill.name}</Typography>
                      <Typography variant="body2">{skill.level}</Typography>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>


    </Grid>
  );
}

export default ExplorePage;

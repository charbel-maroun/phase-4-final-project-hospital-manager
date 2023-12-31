
import {Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';

const DoctorCard = ({name, department, image_url, description}) => {

    const [clickedCard, setClickedCard] = useState(false)
  return (
    <Card sx={{ width:345, height:400, margin:"auto", marginTop:"3rem"}}onMouseEnter={() => {
        setClickedCard(true)}} onMouseLeave={() => {
            setClickedCard(false)}}>

        <CardMedia
          component="img"
          style={{width: "50%", marginLeft: "auto", marginRight: "auto" ,display:clickedCard ? "none" : ""}}
          height="300"
          image={image_url}
          alt="doctor_picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {department}
          </Typography>
          <Typography variant="body2" color="text.secondary" display={clickedCard ? "" : "none"}>
            {description}
          </Typography>
        </CardContent>
    </Card>
  );
}

export default DoctorCard;

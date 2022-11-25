import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Title from '../Title';

type PointsProps = {
  point :number;
  weekPoint :number;
}

export default function Points(props: PointsProps) {
  const d = new Date();
  return (
    <React.Fragment>
      <Box sx={{mb:2}}>
        <Title>累計 ConPoint</Title>
        <Typography component="p" variant="h4">
          {props.point.toString()}
        </Typography>
      </Box>
      <Box sx={{mb:2}}>
        <Title>今週の ConPoint</Title>
        <Typography component="p" variant="h4">
          {props.weekPoint.toString()}
        </Typography>
      </Box>
      <Typography color="text.secondary" sx={{ flex: 1, fontSize: 15}}>
        {d.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
      </Typography>
    </React.Fragment>
  );
}
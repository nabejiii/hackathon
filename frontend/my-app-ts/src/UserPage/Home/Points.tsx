import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

type PointsProps = {
  point :Number;
}

export default function Points(props: PointsProps) {
  const d = new Date();
  return (
    <React.Fragment>
      <Title>累計 ConPoint</Title>
      <Typography component="p" variant="h4">
        {props.point.toString()}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, fontSize: 15}}>
        {d.toLocaleDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
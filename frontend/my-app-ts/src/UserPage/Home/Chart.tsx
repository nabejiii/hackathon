import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import { Con } from '../Con';

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

var day0 = new Date()
var day1 = new Date()
var day2 = new Date()
var day3 = new Date()
var day4 = new Date()
var day5 = new Date()
var day6 = new Date()
day0.setDate(day0.getDate() - 6)
day1.setDate(day1.getDate() - 5)
day2.setDate(day2.getDate() - 4)
day3.setDate(day3.getDate() - 3)
day4.setDate(day4.getDate() - 2)
day5.setDate(day5.getDate() - 1)
day6.setDate(day6.getDate() - 0)

type ChartProps = {
  totalPoint: number
  RecCons: Con[]
}

export default function Chart(props :ChartProps) {
  const theme = useTheme();
  const data: {
    time: string;
    amount: number | undefined;
  }[]= [];
  const week = [day0, day1, day2, day3, day4, day5, day6];
  let prePoint = 0;
  for (let day = 6; day >= 0; day--) {
    let point:number = 0;
    for (const con of props.RecCons) {
      if (week[day].getDate() === con.time.getDate()) {
        point += con.point;
      }
    }
      if (data.length == 0) {
        data.push(createData(week[day].toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" }), props.totalPoint));
        prePoint = point;
      } else {
        const nextPoint = data[data.length - 1].amount;
        if (nextPoint != undefined) {
          prePoint = nextPoint - prePoint;
        }
        data.push(createData(week[day].toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" }), prePoint));
        prePoint = point;
      }
  }

  return (
    <React.Fragment>
      <Title>最近の推移</Title>
      <ResponsiveContainer>
        <LineChart
          data={data.reverse()}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              ConPoint
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
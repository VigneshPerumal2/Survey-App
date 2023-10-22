import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Paper, Typography, Grid, makeStyles } from "@material-ui/core";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  chartTitle: {
    marginBottom: theme.spacing(2),
  },
}));

function AdminDashboard() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fitnesssurvey.onrender.com/api/survey`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching survey data:", error);
      });
  }, []);

  // Process data for the histogram (age distribution)
  const ageBins = [20, 30, 40, 50, 60, 70];
  const ageDistribution = new Array(ageBins.length).fill(0);
  data.forEach((user) => {
    for (let i = 0; i < ageBins.length; i++) {
      if (user.age <= ageBins[i]) {
        ageDistribution[i]++;
        break;
      }
    }
  });

  // Process data for primary fitness goals
  const fitnessGoalsMap = {};
  data.forEach((user) => {
    if (!fitnessGoalsMap[user.primaryGoal]) {
      fitnessGoalsMap[user.primaryGoal] = 0;
    }
    fitnessGoalsMap[user.primaryGoal]++;
  });

  const fitnessGoalsLabels = Object.keys(fitnessGoalsMap);
  const fitnessGoalsData = Object.values(fitnessGoalsMap);

  // Process data for fitness activity comparison
  const fitnessActivitiesMap = {};
  data.forEach((user) => {
    user.fitnessActivities.forEach((activity) => {
      if (!fitnessActivitiesMap[activity]) {
        fitnessActivitiesMap[activity] = 0;
      }
      fitnessActivitiesMap[activity]++;
    });
  });

  const fitnessActivitiesLabels = Object.keys(fitnessActivitiesMap);
  const fitnessActivitiesData = Object.values(fitnessActivitiesMap);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.chartTitle}>
              Age Distribution
            </Typography>
            <Bar
              data={{
                labels: ["20-29", "30-39", "40-49", "50-59", "60-69", "70+"],
                datasets: [
                  {
                    data: ageDistribution,
                    backgroundColor: [
                      "#3f51b5",
                      "#4caf50",
                      "#ff9800",
                      "#f44336",
                      "#9c27b0",
                      "#2196f3",
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.chartTitle}>
              Primary Fitness Goals
            </Typography>
            <Pie
              data={{
                labels: fitnessGoalsLabels,
                datasets: [
                  {
                    data: fitnessGoalsData,
                    backgroundColor: [
                      "#3f51b5",
                      "#4caf50",
                      "#ff9800",
                      "#f44336",
                      "#9c27b0",
                      "#2196f3",
                    ],
                  },
                ],
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.chartTitle}>
              Fitness Activities Comparison
            </Typography>
            <Bar
              data={{
                labels: fitnessActivitiesLabels,
                datasets: [
                  {
                    data: fitnessActivitiesData,
                    backgroundColor: "#3f51b5",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;

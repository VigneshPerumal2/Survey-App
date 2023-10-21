import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Paper, Typography } from "@material-ui/core";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

function AdminDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}survey`)
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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
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
        />
      </Paper>

      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
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

      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>
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
    </div>
  );
}

export default AdminDashboard;

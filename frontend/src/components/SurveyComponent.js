import React from "react";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/modern.css";
import {
  Typography,
  makeStyles,
  Paper,
  List,
  ListItem,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  surveyContainer: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    width: "200%",
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  responseList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
}));

Survey.StylesManager.applyTheme("modern");

function SurveyComponent() {
  const classes = useStyles();
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [surveyResults, setSurveyResults] = React.useState(null);

  const surveyJSON = {
    title: "Health & Fitness Survey",
    showProgressBar: "top",
    pages: [
      {
        questions: [
          {
            type: "text",
            name: "name",
            title: "Your Name:",
            isRequired: true,
          },
        ],
      },
      {
        questions: [
          {
            type: "text",
            name: "age",
            title: "Your Age:",
            isRequired: true,
            validators: [
              {
                type: "numeric",
                minValue: 10,
                maxValue: 100,
              },
            ],
          },
        ],
      },
      {
        questions: [
          {
            type: "comment",
            name: "workoutRoutine",
            title: "Describe your workout routine:",
            isRequired: true,
          },
        ],
      },
      {
        questions: [
          {
            type: "radiogroup",
            name: "followsDiet",
            title: "Do you follow a specific diet?",
            isRequired: true,
            choices: ["Yes", "No"],
          },
        ],
      },
      {
        questions: [
          {
            type: "rating",
            name: "fitnessLevel",
            title: "Rate your fitness level",
            isRequired: true,
            minRateDescription: "Low",
            maxRateDescription: "High",
          },
        ],
      },
      {
        questions: [
          {
            type: "checkbox",
            name: "fitnessActivities",
            title: "Fitness activities you do:",
            isRequired: true,
            choices: [
              "Yoga",
              "Running",
              "Gym",
              "Swimming",
              "Pilates",
              "Dance",
              "Rock Climbing",
              "Aerobics",
              "Cycling",
            ],
          },
        ],
      },
      {
        questions: [
          {
            type: "dropdown",
            name: "primaryGoal",
            title: "Primary goal:",
            isRequired: true,
            choices: ["Weight Loss", "Muscle Gain", "Stay Fit"],
          },
        ],
      },
    ],
  };

  const onComplete = (survey, options) => {
    console.log("Survey results: ", survey.data);

    // Send the survey.data to the backend
    axios
      .post(`https://fitnesssurvey.onrender.com/api/survey`, survey.data)
      .then((response) => {
        // Set state to display results
        setSurveyResults(survey.data);
        setIsCompleted(true);
      })
      .catch((error) => {
        console.log("Error", error);
        alert("Error saving survey data!");
      });
  };

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      {isCompleted ? (
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.title}>
            Thank you for completing the survey!
          </Typography>
          <Typography variant="h6">Your Responses:</Typography>
          <List className={classes.responseList}>
            {Object.keys(surveyResults || {}).map((key) => (
              <ListItem key={key} className={classes.listItem}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                {Array.isArray(surveyResults[key])
                  ? surveyResults[key].join(", ")
                  : surveyResults[key]}
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <div className={classes.surveyContainer}>
            <Survey.Survey json={surveyJSON} onComplete={onComplete} />
          </div>
        </Paper>
      )}
    </Container>
  );
}

export default SurveyComponent;

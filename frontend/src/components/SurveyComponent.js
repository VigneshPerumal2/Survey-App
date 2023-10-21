// src/components/SurveyComponent.js

import React from "react";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/modern.css";

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

Survey.StylesManager.applyTheme("modern");

function SurveyComponent() {
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [surveyResults, setSurveyResults] = React.useState(null);

  const onComplete = (survey, options) => {
    console.log("Survey results: ", survey.data);

    // Send the survey.data to the backend
    axios
      .post(`${process.env.REACT_APP_API_URL}survey`, survey.data)
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
  if (isCompleted) {
    return (
      <div className="response-container">
        <h2>Thank you for completing the survey!</h2>
        <h3>Your Responses:</h3>
        <ul className="response-list">
          {Object.keys(surveyResults || {}).map((key) => (
            <li key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
              {Array.isArray(surveyResults[key])
                ? surveyResults[key].join(", ")
                : surveyResults[key]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div>
      <Survey.Survey json={surveyJSON} onComplete={onComplete} />
    </div>
  );
}

export default SurveyComponent;

# Fitness Survey App
## Overview

This Fitness Survey App is a web-based application that allows users to participate in fitness-related surveys and administrators to view the survey results. The application is designed to gather information on the fitness habits, goals, and activities of the participants. It offers a user-friendly interface for both survey participants and administrators.


## Live Demo

[Fitness Survey Web App](https://surveyfitness.onrender.com/)

Admin Info:
- Username: admin
- Password: admin123

*Note: The backend API for this application is hosted separately, and you may need to configure the connection settings accordingly if you plan to run this application locally or host it yourself.*

## Screenshots

| Homepage         | User Login       | Survey           | Admin Dashboard  | Survey Results   |
| ---------------- | ---------------- | ---------------- | ---------------- | ---------------- |
| ![Homepage](https://github.com/VigneshPerumal2/Survey-App/assets/34863107/f2a21131-a788-4b5a-8c5a-b1107b058811) | ![User Login](https://github.com/VigneshPerumal2/Survey-App/assets/34863107/40f417f5-52f7-4eae-b1dc-63bc174f82eb) | ![Survey](https://github.com/VigneshPerumal2/Survey-App/assets/34863107/6de4f487-a12d-4120-8575-60e2799ee922) | ![Admin Dashboard](https://github.com/VigneshPerumal2/Survey-App/assets/34863107/bd2be125-7265-4787-9453-c6ff203bff29) | ![Survey Results](https://github.com/VigneshPerumal2/Survey-App/assets/34863107/eefca181-8508-4aee-a44b-82a45e26971e) |


## User Stories

### General

- [x] Users can participate in fitness surveys from the website.
- [x] Administrators can log in to access administrative functions and view survey results.

### Participating in a Survey

- [x] Users can fill out the survey by answering a series of questions related to their fitness habits and goals.
- [x] Users can submit their responses to the survey.
- [x] Users receive a confirmation message upon successful submission of the survey.

### Admin Dashboard

- [x] Administrators can log in using predefined credentials.
- [x] Administrators can view the results of the fitness surveys.
- [x] Administrators can log out of the admin dashboard.

### Viewing Survey Results

- [x] Administrators can view survey results in a graphical representation (bar chart, pie chart, etc.).
- [x] Administrators can analyze the data to gather insights into the fitness habits and goals of the participants.

## Bonus Features
- [x] Graphical representation of survey results for easy analysis.

## Installation and Setup

To get the Fitness Survey App running on your local machine or a server, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) (usually installed with Node.js)

### Backend Setup

The backend for this application is separate, and you can find it [here](https://github.com/yourusername/fitness-survey-backend). Follow the instructions in its README to set it up and run it.

### Frontend Setup

1. **Clone the Repository**

   Open a terminal and run:

   ```bash
   git clone https://github.com/VigneshPerumal2/Survey-App.git
   cd fitness-survey-app
   ```

2. **Install Dependencies**

   Run:

   ```bash
   npm install
   ```

   This command will install all the necessary npm packages.

3. **Configuration**

   - Create a `.env` file in the root of your project and insert your key/value pairs in the following format of `KEY=VALUE`:
     ```bash
     REACT_APP_BACKEND_URL=your_backend_api_endpoint
     REACT_APP_AUTH0_DOMAIN=your_auth0_domain
     REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
     ```

   Replace `your_backend_api_endpoint`, `your_auth0_domain`, and `your_auth0_client_id` with your actual backend API endpoint and Auth0 credentials.

4. **Run the Application**

   ```bash
   npm start
   ```

   This command will start the development server and open the application in your default web browser.

### Accessing the Application

- The application will be running on `http://localhost:3000/` by default.
- You can log in as an admin using the credentials provided in the admin info section of the main README.

That’s it! You should now have the Fitness Survey App running locally on your machine. Feel free to modify the code and experiment with it to suit your needs.

## Contributing

If you would like to contribute to the development of this application, please follow the standard Github workflow:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request


## Acknowledgments

- [Material-UI](https://mui.com/) for providing a great library for React UI components.
- [Auth0](https://auth0.com/) for providing authentication services.
- [Chart.js](https://www.chartjs.org/) for providing easy-to-use charting options.
- [SurveyJS](https://surveyjs.io/): A modern way to add a survey to your website. It includes a visual survey builder.


# Time Tracker App

This project is a Time Tracker application built with React, incorporating various technologies and libraries to enhance functionality and user experience.

## Key Technologies and Libraries Used

- **Three.js and Three Fiber:** Utilized for 3D graphics rendering, adding interactive and visually appealing elements to the app.

- **Firebase Authentication:** Implements email-password signup and login features, providing a secure and reliable user authentication system.

- **Firebase Realtime Database:** Stores project data in real-time, allowing users to create, update, delete, and read project information seamlessly.

- **Echarts:** Used for creating interactive and responsive charts, enhancing data visualization capabilities within the app.

- **React-Spring:** Employs animation effects on the dashboard, providing a smooth and engaging user interface.

- **React-Timer-Hook:** Integrates timer functionality, allowing users to track and manage time effectively.

## Getting Started

Follow these instructions to set up and run the Time Tracker app on your local machine. Ensure you have Node.js installed, which you can download [here](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rashedevs/time-tracker-app.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd time-tracker-app
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

### Running The App

To run the app in development mode:

```bash
npm start
```

- Open http://localhost:3000 in your browser to view the app.
- The page will automatically reload when you make changes to the code.

### Building For Production

To build the app for production:

```bash
npm run build
```

- The build files will be located in the build folder.

### Interacting with 3D Elements

The Time Tracker app utilizes Three.js and Three Fiber for 3D graphics. To experience and interact with the 3D elements:

1. Navigate to the "Dashboard" section of the application.
2. Explore the visually engaging 3D graphics and animations incorporated into the dashboard.

### Additional Setup for Firebase

For Firebase functionality, including authentication and real-time database features:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Obtain your Firebase project credentials.
3. Replace the Firebase configuration in the project with your credentials. The configuration can usually be found in the Firebase console under Project Settings.

### Features

- Users can perform sign-up, login and logout.
- Users can create project with project form.
- The dashboard page displays all projects with individual cards specific user email.
- Each card of the project has a delete icon to remove a specific project based on its ID.
- Each card of the project also has a edit icon to update a specific project based on its ID.
- The bottom view of dashboard page features two charts for visualizing project hours data and projects data.

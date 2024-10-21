# 🎬 Movie Shortlister App

Movie Shortlister is a mobile application built using **React Native** that enables users to browse movies and shortlist their favorites. The app provides features such as user authentication (signup and login), managing user profiles, and keeping track of shortlisted movies.

---

## 📽️ Demo Video

Link : https://drive.google.com/file/d/1BpCocIEnJFtGeoc0FKCIOQ_jldbZhnis/view?usp=drive_link

---

## 🚀 Tech Stack

- **Frontend**: 
  - React Native
  - Redux for state management
  - AsyncStorage for storing user session
  - Axios for making API requests
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB for user and movie data storage
- **Icons and Styling**: 
  - React Native Paper
  - Expo Vector Icons
  - Custom styling with StyleSheet
- **Other Libraries**:
  - Bcrypt.js for password hashing
  - JWT for authentication and authorization

---

## ✨ Features

- User registration and login functionality
- User can shortlist favorite movies
- Profile management to view user details and shortlisted movies
- Logout functionality
- Real-time updating of shortlisted movies after login

---

## 🚀 How to Run the Project

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>=14.x)
- MongoDB (local or cloud-based like MongoDB Atlas)
- Expo CLI (for running the app)

### Backend Setup

1. Clone the backend repository:
    ```bash
    git clone <backend-repo-url>
    cd backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file and configure the following variables:
    ```
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Clone the frontend repository:
    ```bash
    git clone <frontend-repo-url>
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the Expo development server:
    ```bash
    npx expo start
    ```

4. Run the app on an emulator or physical device:
    - For iOS: Press `i` to run on iOS simulator.
    - For Android: Press `a` to run on an Android emulator.

---

## 📂 Folder Structure

```bash
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
├── frontend
│   ├── assets
│   ├── components
│   ├── redux
│   ├── screens
│   ├── App.js

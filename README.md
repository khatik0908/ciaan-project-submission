**# Mini LinkedIn-like Community Platform**

A full-stack web application built for the CIAAN Cyber Tech Pvt Ltd internship challenge. It features user authentication, a public post feed with full CRUD functionality, user profiles, and a modern, responsive UI.

---

**## 🔗 Live Links**

* ****Live Demo:**** [https://ciaan-project.netlify.app/]
* ****GitHub Repository:**** [https://github.com/khatik0908/ciaan-project-submission]

---

**## 🛠️ Tech Stack**

* ****Frontend:**** React (Vite), Tailwind CSS, React Router
* ****Backend:**** Node.js, Express.js
* ****Database:**** MongoDB (with Mongoose)
* ****Authentication:**** JSON Web Tokens (JWT)
* ****Deployment:**** Frontend on Netlify, Backend on Render

---

**## ✨ Features**

* ****User Authentication:**** Secure registration and login with email and password.
* ****Public Post Feed:**** View all posts from all users in a real-time feed.
* ****Full CRUD for Posts:**** Logged-in users can Create, Read, Update, and Delete their own posts.
* ****User Profile Pages:**** Click on any user's name to view their profile and all of their posts.
* ****Responsive Design:**** The UI is fully responsive and works beautifully on desktop, tablet, and mobile screens.

---

**## 👤 Demo User Login**

To easily test the application, you can use the following demo credentials:

* ****Email:**** `demo@example.com`
* ****Password:**** `password123`

_*(Note: Please make sure you have created this demo user on your live deployed site.)*_


**To easily test the application, you can also use the following Registered credentials:**

* ****Email:**** `user123@gmail.com`
* ****Password:**** `User@123`


---

**## 🚀 Local Setup and Installation**

**### Prerequisites**
* Node.js (v18 or higher)
* MongoDB Atlas account or local instance

**### Backend Setup**
1.  Navigate to the backend directory:
    ```bash
    cd ciaan-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file and add the required `MONGO_URI` and `JWT_SECRET` variables.
4.  Start the server:
    ```bash
    node server.js
    ```

**### Frontend Setup**
1.  Navigate to the frontend directory:
    ```bash
    cd ciaan-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env.local` file and add `VITE_API_URL=http://localhost:5000`.
4.  Start the development server:
    ```bash
    npm run dev
    ```
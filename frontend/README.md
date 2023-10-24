# Task Management App Readme

## Description

The Task Management App is a web application designed to help users manage their tasks efficiently. It is built using React for the frontend, Redux for state management. Additionally, a Django backend is integrated to handle user authentication and task data storage. This project serves as an excellent learning opportunity for developers, offering hands-on experience in building a multi-page web application with user authentication.

## Project Requirements

To ensure the successful development of the Task Management App, the following technologies and practices are employed:

- **React Router**: I use React Router to manage multiple pages within the application. Each page is defined as a separate route, providing a structured and organized user experience.

- **Redux/Redux Toolkit**: Redux is implemented for state management. It plays a crucial role in managing the list of tasks and user authentication, offering a centralized and predictable state container.

- **Django Backend**: The application is integrated with a Django backend, which handles user authentication and stores task data in a database.

- **Styled-components**: To maintain a consistent and visually appealing user interface across all pages, we employ styled-components for styling the components in the project.

## Project Features

The Task Management App boasts a range of features designed to enhance task management and user experience:

### Authentication Pages

1. **Sign Up Page**: Users can register with a unique username and password, enabling them to create an account.

2. **Log In Page**: Registered users can securely log in to their accounts.

3. **Logout Button**: Users can log out from any page, ensuring data privacy and security.

### Dashboard Page

After successful login, users are redirected to the Dashboard, where they can:

- **View a List of Tasks**: The Dashboard displays a list of tasks, making it easy for users to track their activities.

- **Filter Tasks**: Users can filter tasks based on their status (e.g., completed, incomplete), helping them prioritize their work.

- **Task Details**: By clicking on a task, users can view its details, facilitating a deeper understanding of the task at hand.

- **Create New Tasks**: Users have the ability to create new tasks, making it simple to add new items to their to-do lists.

- **Update Existing Tasks**: Existing tasks can be edited and updated, allowing users to modify task details as needed.

### Task Details Page

When users click on a task from the Dashboard, they are taken to a dedicated Task Details page, where they can:

- **View Task Details**: Users can access comprehensive details about the selected task, including its description, due date, and status.

- **Edit and Update Task Details**: Task details can be edited and updated, ensuring that users can keep their tasks up-to-date.

- **Delete the Task**: Users have the option to delete a task when it is no longer relevant or necessary.

### User Profile Page

The User Profile Page offers users a place to:

- **View and Edit Profile Information**: Users can view and modify their profile information.

- **Change Password**: Users can change their passwords to maintain the security of their accounts.

## Getting Started

To get started with the Task Management App, follow these steps:

1. Clone the repository to your local machine.

2. Install the required dependencies for both the frontend (React) and backend (Django) using `npm install` and `pip install -r requirements.txt`, respectively.

3. Start the development server for both the frontend and backend using `npm run dev` and `python manage.py runserver`.

4. Access the application through your web browser at `http://localhost:5173`.

## Contributors

- [Abdulmujeeb Ahmad]

## Acknowledgments

We would like to express our gratitude to the open-source community for their contributions and support in making this project a reality. We appreciate your dedication to learning and development.

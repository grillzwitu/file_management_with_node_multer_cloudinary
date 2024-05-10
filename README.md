# File Management with Node, Multer, and Cloudinary

This project is a simple demonstration of a file management backend application where an authenticated user can upload a file to a storage service, download, and delete the file.

## Programming Language and Frameworks, Libraries/Modules, Technologies

- **JavaScript:** The base programming language.
- **Node.js (Express):** As the server application framework.
- **Axios:** For making HTTP requests, specifically for downloading the file.
- **bcryptjs:** For character encryption and hashing, specifically for password encryption.
- **Cloudinary:** A cloud file storage service.
- **Cors:** To enable Cross-Origin Resource Sharing.
- **dotenv:** To enable the use of environment variables to store application secrets.
- **ejs:** To create simple views.
- **express-session:** To create sessions after authentication.
- **mongodb:** The cloud database storage service.
- **mongoose:** The ODM library for MongoDB.
- **multer:** Node.js middleware for handling multipart-form data, used for uploading files.
- **nodemon:** A dev dependency to maintain and restart a live server while making changes.
- **passport:** A Node.js authentication middleware.
- **passport-local:** The authentication strategy module, supports storing credentials locally in the application database.

## Current State

Backend MVP, testing can be done with a REST client, handles basic operations of user registration and authentication, file upload, retrieval, and deletion.

## Run Application

1. Clone the repository on your local machine.
2. Create two directories named "uploads" and "downloads", these are the destinations for local uploads and downloads. Please note that local uploads are automatically deleted once the upload process is complete, however, not having the directory will result in an error.
3. Create the file ".env" for storing your environment variables.
4. Create free accounts if you do not have on Cloudinary (https://cloudinary.com/) and MongoDB Atlas (https://www.mongodb.com/products/platform/atlas-database). Sign in to your accounts and on MongoDB, create a free tier cluster and connect (update the URI as an environment variable in ".env"), also update the product environment credentials for Cloudinary as environment variables in ".env". The ".env" file should have the values below:

```plaintext
PORT=your_preferred_port_number
MONGO_URI="mongodb+srv://....."
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_cloud_api_key"
CLOUD_API_SECRET="your_cloudinary_api_secret"
```

5. Install all the dependencies, run in the terminal "npm install".
6. Run the application, "npm run server".
7. To test the API endpoints open a REST client like Postman and set up the following endpoints:

  - **POST** (http://localhost:3000/register): To sign up or register as a user, requires a JSON body containing username, name, password, password2).
  - **POST** (http://localhost:3000/login): To log in as a user on the application.
  - **GET** (http://localhost:3000/logout): To log out and end a session.
  - **POST** (http://localhost:3000/uploadfile): To upload and store a file on the cloud service.
  - **GET** (http://localhost:3000/getfile/<id>): To download/retrieve a file from the application. Downloaded files are saved in the downloads folder which you created in the application's base location.
  - **DELETE** (http://localhost:3000/deletefile/<id>): To delete the file from the application.

Note: To carry out any file operation, the user must be logged in.

## Work in Progress
- Creating the views for a better testing experience.
- Testing extensively to handle errors related to specific edge cases.
- Implement notifications for events (registration, file upload and file deletion). 


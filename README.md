# File Management with Node, Multer, and Cloudinary

This project is a simple demonstration of a file management backend application where an authenticated user can upload a file to a storage service, download, and delete the file.

## Programming Language and Frameworks, Libraries/Modules, Technologies

- **JavaScript:** The base programming language.
- **node.js (Express):** As the server application framework.
- **axios:** For making HTTP requests, specifically for downloading the file.
- **bcryptjs:** For character encryption and hashing, specifically for password encryption.
- **cloudinary:** A cloud file storage service.
- **cors:** To enable Cross-Origin Resource Sharing.
- **dotenv:** To enable the use of environment variables to store application secrets.
- **ejs:** To create simple views.
- **express-session:** To create sessions after authentication.
- **express-validator:** To handle validation for user registration.
- **mongodb:** The cloud database storage service.
- **mongoose:** The ODM library for MongoDB.
- **multer:** Node.js middleware for handling multipart-form data, used for uploading files.
- **nodemon:** A dev dependency to maintain and restart a live server while making changes.
- **passport:** A Node.js authentication middleware.
- **passport-local:** The authentication strategy module, supports storing credentials locally in the application database.
- **express-validator:** To handle registration validation.
- **winston:** To handle application logging.

## Current State

Backend MVP, testing can be done with a REST client, handles basic operations of user registration and authentication, file upload, retrieval, and deletion.

## Run Application

1. Clone the main branch repository on your local machine.
2. Create the file ".env" for storing your environment variables.
3. Create free accounts if you do not have on Cloudinary (https://cloudinary.com/) and MongoDB Atlas (https://www.mongodb.com/products/platform/atlas-database). Sign in to your accounts and on MongoDB, create a free tier cluster and connect (update the URI as an environment variable in ".env"), also update the product environment credentials for Cloudinary as environment variables in ".env". The ".env" file should have the values below:

```plaintext
PORT=your_preferred_port_number
MONGO_URI="mongodb+srv://....."
CLOUD_NAME="your_cloudinary_cloud_name"
CLOUD_API_KEY="your_cloudinary_cloud_api_key"
CLOUD_API_SECRET="your_cloudinary_api_secret"
```

4. Install all the dependencies, run in the terminal "npm install".
5. Run the application, "npm run server".
6. To test the API endpoints, open a REST client like Postman and set up the following endpoints:

  - **POST** (http://localhost:3000/users/register): To sign up or register as a user, requires a JSON body containing username, email, name, password, password2.
  - **POST** (http://localhost:3000/users/login): To log in as a user on the application, requires a JSON body containing username and password.
  - **GET** (http://localhost:3000/users/logout): To log out.
  - **POST** (http://localhost:3000/files/uploadfile): To upload and store a file on the cloud service. Supported file formats based on the storage service used are images, videos, pdf.
  - **GET** (http://localhost:3000/files/getallfiles): To retrive a list of the record of all the user's files.
  - **GET** (http://localhost:3000/files/getfile/id): To download/retrieve a file from the application. Downloaded files are saved in the computer's default downloads folder.
  - **DELETE** (http://localhost:3000/files/deletefile/id): To delete the file from the application.

Note: 
 - To carry out any file operation, the user must be logged in.
 - Views are available for testing but it is still in the works, you may need to click on the redirect links and refresh the files page to see the changes you have made. To try it enter http://localhost:3000 in you browser after succesfully starting/running the appliaction.  


## Work in Progress
- Testing extensively to handle errors related to specific edge cases.
- Creating views with EJS to make templates for a better testing experience.
- Implement notifications for events (registration, file upload and file deletion).
- Implement application logging.
- Deploy/Host application.

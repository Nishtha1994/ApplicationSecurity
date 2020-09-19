Synopsis
This is a simple web app developed using NodeJS and Mongodb as its database. It accomplishes two things-
Allow users to upload a PNG, JPG, or GIF image with a caption (user can be permitted to leave caption blank)
Visitors to the site can view uploaded images, 10 per page (use next/ back links or buttons to bring them to the next 10 pictures), sorted by most recent.

Motivation
I developed a simple vulnerable web app that helps us to understand the basic functionality and working so as to find the vulnerabilities in the future.

Installation
1. Download MongoDB.-https://www.mongodb.com/download-center
2. Download NodeJS-https://nodejs.org/en/download/
3. Download RoboMongo-https://robomongo.org/download
4. Navigate to the package.json file on the command prompt and use npm install.
5. Set up the database running using the following two commands-
//commands for MongoDB
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"
"C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe
6. Go to the file location of server.js in the command prompt and type node server.js
If everything is installed properly you will be greeted with warm message of "Connection Successfull". Otherwise try to read the error.
7. Once everything is in place next part is to hit the APIs. Open browser. In the URL bar type http://localhost:3000/
8. A simple web-app for uploading the photos will pop up.
9. As and when you start uploading the photos, the photos are uploaded in the directory public/uploads.
10. The mongodb simply stores the metadata (path,name,user,caption) of each photos.

Tests
Tested with different file formats(png,Jpeg,TIFF).

Contributors
This application was developed by me(Nishtha Bhattacharjee) for the first assignment of Application Security.

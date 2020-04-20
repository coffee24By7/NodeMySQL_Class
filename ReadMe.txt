Setup instructions

Create a folder called Node-Manage-MySQL

Change to dir
Copy all files from this directory to yours <share>\\Downloads For Classes\Starter Files\Node-Manage-MySQL
Run NPM init

Answer questions

Run the following
npm install express express-fileupload body-parser mysql ejs req-flash --save

Run the following
npm install nodemon -g

create the DB with mysql script in the file
CreateDB.mysql



Run app like this

nodemon app.js

you should see something like this 
[nodemon] 2.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Server running on port: 5000
Connected to database

Browse to this address to check it
http://localhost:5000
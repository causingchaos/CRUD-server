\du   to see tables
CREATE USER justinberry WITH PASSWORD 'password' CREATEDB;
--> creates role
\du
\q

\dt list relations

login as new user

CREATE DATABASE nodelogin; 
--> create database

\l   list all databases
\c nodelogin   --> connect to database

CREATE TABLE users
(id BIGSERIAL PRIMARY KEY NOT NULL,
(> name VARCHAR(200) NOT NULL,
(> email VARCHAR(200) NOT NULL,
(> password VARCHAR(200) NOT NULL,
(> UNIQUE (email));    

--> an auto increment number (i.e BIGSERIAL) in psql
--> all emails need to be unique, i.e. can't have two of the same emails.

SELECT * FROM users;

\d users   --> see constraints on table.

create some data                                                                                                                                                                                                                                                      c
nodelogin=> INSERT INTO users (name,email,password)
nodelogin-> VALUES ('Justin','justin@justin.com','password');
INSERT 0 1
nodelogin=>

======================
knex migrate:make create-sticker
--> create the migration in migrations folder.
knex seed:make 01_sticker

knex migrate:latest     this runs migrations
knex seed:run           this runs the seeds
dropdb and remake db perferably? 
dropdb --if-exists -U justinberry
createdb -U justinberry


\d sticker
\x expanded display of table rows.

install nodemon --save-dev

npm install --save-dev mocha chai supertest
  -> install these globally as well

$mocha --> to run tests

====================================  OTHER =========
You can create a ~/.pgpass file (%APPDATA%\postgresql\pgpass.conf on Windows) with a line in the following format:

hostname:port:database:username:password
See the documentation for details.

cd %appdata%
mkdir postgresql
cd postgresql
notepad pgpass.conf
inside pgpass.conf paste your connection string (*:5432:*postgres:[mypassword]) and save the file. To connect to postgres use:
I have gotten it to work with the following:

pgpass.conf:

127.0.0.1:5432:*:username:password
However, I have it stored here:

create heroku for prod
heroku create 

will create a 2nd git repo
$heroku create crud-stickerss-api

git remote -v    will see the new git repo for heroku, push to this to send to PROD.
git push heroku master


heroku addons:create heroku-postgresql --app crud-stickerss-api
heroku pg:psql --app crud-stickerss-api

heroku pg:psql

to add data to production.
heroku run knex migrate:latest   migrate table
heroku run knex seed:run   run seeds on table with sample data in stickers.js

Added new User table, including knex migration, and knex seed. Also added new DB queries for users, and routes for users. Also added index route for root route of page which shows homepage (will seperate out into front end API later).
Added new Auth routes
Added new Cookie routes for testing purposes to understand CORS better.

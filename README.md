\du   to see tables
CREATE USER justinberry WITH PASSWORD 'password' CREATEDB;
--> creates role
\du
\q

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

knex seed:run

\d sticker
\x expanded display of table rows.

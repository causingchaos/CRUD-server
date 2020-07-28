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

install nodemon --save-dev

npm install --save-dev mocha chai supertest
  -> install these globally as well

$mocha --> to run tests


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

C:\Users\<user>\AppData\Roaming\postgresql
For some reason, on a previous iteration of Postgres, the database had generated the pgpass file and stored it there. I was running into the same issue you were having, moved it to that directory and it worked. I'm not sure why though.

Then, all you'll need to do is:

pg_dump -h myip mydb > mylocaldumpfile
...ensuring that myip and the ip in pgpass.conf are identical. If they are not, it will prompt you for a password.

CREATING DB
-----------------------------------------

postgres@akasky-VPCYB15AG:~$ psql
psql (10.4 (Ubuntu 10.4-0ubuntu0.18.04))
Type "help" for help.

postgres=# DROP ROLE akash;
DROP ROLE
postgres=# DROP ROLE akas;
DROP ROLE
postgres=# \du
[3]+  Stopped                 psql
postgres@akasky-VPCYB15AG:~$ exit
logout
There are stopped jobs.
postgres@akasky-VPCYB15AG:~$ exit
logout
akasky@akasky-VPCYB15AG:~$ clear

akasky@akasky-VPCYB15AG:~$ sudo -su postgres
postgres@akasky-VPCYB15AG:~$ exit
exit
akasky@akasky-VPCYB15AG:~$ sudo -i -u postgres
postgres@akasky-VPCYB15AG:~$ createuser --interactive
Enter name of role to add: akas
Shall the new role be a superuser? (y/n) y
postgres@akasky-VPCYB15AG:~$ createdb akas
postgres@akasky-VPCYB15AG:~$ sudo -i -u akas
sudo: unknown user: akas
sudo: unable to initialize policy plugin
postgres@akasky-VPCYB15AG:~$ exit
logout
akasky@akasky-VPCYB15AG:~$ sudo -i -u akas
sudo: unknown user: akas
sudo: unable to initialize policy plugin
akasky@akasky-VPCYB15AG:~$ sudo adduser akas
Adding user `akas' ...
Adding new group `akas' (1001) ...
Adding new user `akas' (1001) with group `akas' ...
The home directory `/home/akas' already exists.  Not copying from `/etc/skel'.
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
Changing the user information for akas
Enter the new value, or press ENTER for the default
	Full Name []: akash rai
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] 
akasky@akasky-VPCYB15AG:~$ sudo -i -u akas
akas@akasky-VPCYB15AG:~$ psql
psql (10.4 (Ubuntu 10.4-0ubuntu0.18.04))
Type "help" for help.

akas=# CREATE DATABASE library_management_db;
CREATE DATABASE
akas=# \l

[1]+  Stopped                 psql
akas@akasky-VPCYB15AG:~$ psql
psql (10.4 (Ubuntu 10.4-0ubuntu0.18.04))
Type "help" for help.

akas=# \conninfo
You are connected to database "akas" as user "akas" via socket in "/var/run/postgresql" at port "5432".
akas=# \c
You are now connected to database "akas" as user "akas".
akas=# \c library_management_db
You are now connected to database "library_management_db" as user "akas".
library_management_db=# 

==================CREATING TABLE================================

CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    name            varchar(255)
);

CREATE TABLE authors (
    id              SERIAL PRIMARY KEY,
    name            varchar(255)
);

CREATE TABLE books (
    id              SERIAL PRIMARY KEY,
    isbn           varchar(255) NOT NULL,
    name            varchar(255),
    auther_id       int REFERENCES authors(id)
);

CREATE TABLE loans (
    id              SERIAL PRIMARY KEY,
    borrower_id     int REFERENCES users(id),
    book_id         int REFERENCES books(id),
    issued_date     date,
    due_date        date,
    returned_date   date
);

CREATE TABLE categories (
    id          SERIAL PRIMARY KEY,
    name        varchar(100)
);

CREATE TABLE books_categories (
    id              SERIAL PRIMARY KEY,
    book_id         int REFERENCES books(id),
    category_id     int REFERENCES categories(id)
);

================= rename column name =====================
ALTER TABLE books RENAME COLUMN auther_id TO author_id;
ALTER TABLE books RENAME COLUMN isban TO isbn;


====================== change data type ==================
ALTER TABLE books ALTER COLUMN isbn SET NOT NULL;

===================== add new column ===================
ALTER TABLE users ADD COLUMN is_active BOOLEAN;
ALTER TABLE authors ADD COLUMN is_active BOOLEAN;
ALTER TABLE books ADD COLUMN is_avail BOOLEAN;

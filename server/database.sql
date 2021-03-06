CREATE DATABASE perntodo;

--set extension
--Create table for users
CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

--Create table for todo
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    date VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

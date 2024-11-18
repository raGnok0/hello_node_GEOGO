CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255),
  email VARCHAR(100)
);
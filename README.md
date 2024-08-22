# Blog App - A simple server-side web app with basic CRUD operation, made with Remix

## Features
- Load all posts and filter posts by their names
- Create a new post
- Update an existing post
- Delete a post

## Development
- Make an .env file in the app directory> An example .env is provided in .env.example
  ```shellscript
  POSTGRES_USER=your_username
  POSTGRES_PASSWORD=your_password
  POSTGRES_DB=your_db_name
  ```

- Install Docker Desktop at [Docker Homepage](https://www.docker.com/products/docker-desktop/) and follow the instructions

- Run the following command to set up the database
  ```shellscript
  docker compose up -d
  ```
- Install the necessary ```npm``` packages:
  ```shellscript
  npm install
  ```

- Run the dev server:

  ```shellscript
  npm run dev
  ```

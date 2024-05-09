# HackerNews API

By Samuel M. Muthaiga

This project is a NestJS application that connects to the public API of HackerNews. It provides endpoints to fetch data and perform calculations on the top 10 most occurring words in the titles of different sets of stories from HackerNews.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Resources](#resources)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

## Requirements

- [Node.js](https://nodejs.org/) (version 14.x or newer)
- [npm](https://www.npmjs.com/) (version 6.x or newer)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/sammuthaiga/autocheck-test/tree/main
    ```

2. **Navigate to the project directory**:
    ```bash
    cd hackernews-api
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

1. **Create a `.env` file**:
    - Create a file named `.env` in the root directory of the project.
    - Add any required environment variables, such as the base URL of the HackerNews API.

    Example:
    ```plaintext
    BASE_URL=https://hacker-news.firebaseio.com/v0
    ```

## Dependencies

The project uses the following main dependencies:

- **[@nestjs/axios](https://www.npmjs.com/package/@nestjs/axios)**: Axios integration for NestJS.
- **[@nestjs/common](https://www.npmjs.com/package/@nestjs/common)**: Common functionalities for NestJS applications.
- **[@nestjs/core](https://www.npmjs.com/package/@nestjs/core)**: The core module for NestJS applications.
- **[@nestjs/mapped-types](https://www.npmjs.com/package/@nestjs/mapped-types)**: Helps in type mapping within NestJS.
- **[@nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express)**: NestJS integration with the Express framework.
- **[class-transformer](https://www.npmjs.com/package/class-transformer)**: Helps with data transformation and validation.
- **[class-validator](https://www.npmjs.com/package/class-validator)**: Provides validation decorators for class properties.

## Resources

The application leverages the following resources:

- [HackerNews API](https://github.com/HackerNews/API): Used to fetch data and perform various calculations.
- [Firebase client libraries](https://firebase.google.com/docs/web/setup): For interacting with the HackerNews API.

## Running the Application

To run the application, use one of the following commands:

- **Development mode**:
    ```bash
    npm run start:dev
    ```

- **Production mode**:
    ```bash
    npm run start:prod
    ```

- **Watch mode**:
    ```bash
    npm run start:watch
    ```

The application will be available at `http://localhost:3000`.

## API Endpoints

The application provides the following API endpoints:

- **Top 10 most occurring words in the titles of the last 25 stories**:
    - `GET /hackernews/top10-last25`
    - Description: Fetches the top 10 most occurring words in the titles of the last 25 stories from HackerNews.

- **Top 10 most occurring words in the titles of the posts from the last week**:
    - `GET /hackernews/top10-lastweek`
    - Description: Fetches the top 10 most occurring words in the titles of posts from the last week from HackerNews.

- **Top 10 most occurring words in the titles of the last 600 stories of users with at least 10,000 karma**:
    - `GET /hackernews/top10-highkarma`
    - Description: Fetches the top 10 most occurring words in the titles of the last 600 stories of users with at least 10,000 karma.

## Testing Endpoints with a Browser Client

**Using Postman:**

1. Install Postman from [here](https://www.getpostman.com/).
2. Create a new **GET** request.
3. Set the request URL to the desired API endpoint:

    - For the top 10 most occurring words in the last 25 stories:
        ```plaintext
        http://localhost:3000/hackernews/top10-last25
        ```

    - For the top 10 most occurring words in the last week:
        ```plaintext
        http://localhost:3000/hackernews/top10-lastweek
        ```

    - For the top 10 most occurring words in the last 600 stories of users with high karma:
        ```plaintext
        http://localhost:3000/hackernews/top10-highkarma
        ```

4. Send the request.
5. Postman will display the response in JSON format from the API endpoints, containing the top 10 most occurring words in the titles respective to each endpoint requirement.

## Testing

To run the tests for the application, use the following command:

```bash
npm test
```
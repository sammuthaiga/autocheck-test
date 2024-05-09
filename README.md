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


## Requirements

- [Node.js](https://nodejs.org/) (version 14.x or newer)
- [npm](https://www.npmjs.com/) (version 6.x or newer)

## Installation

1. **Clone the repository**:

    ```bash
    git clone git@github.com:sammuthaiga/autocheck-test.git
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

The project utilizes the following core NestJS dependencies:

- **[@nestjs/axios](https://www.npmjs.com/package/@nestjs/axios)**: Integrates Axios for making HTTP requests within NestJS applications.
- **[@nestjs/common](https://www.npmjs.com/package/@nestjs/common)**: Provides common functionalities for building NestJS applications, including controllers, services, and decorators.
- **[@nestjs/core](https://www.npmjs.com/package/@nestjs/core)**: The core module for creating NestJS applications.
- **[@nestjs/mapped-types](https://www.npmjs.com/package/@nestjs/mapped-types)**: Assists in type mapping within NestJS, simplifying data transformation between DTOs and service models.
- **[@nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express)**: Enables integration of NestJS applications with the popular Express web framework.

Additional dependencies are included for data transformation and validation:

- **[class-transformer](https://www.npmjs.com/package/class-transformer)**: Offers functionality for data transformation and validation, often used for converting between DTOs and service models.
- **[class-validator](https://www.npmjs.com/package/class-validator)**: Provides decorators for validating properties within classes, ensuring data integrity.

## Resources

The application leverages the following resources:

- **[HackerNews API](https://github.com/HackerNews/API)**: Used to fetch data on stories and perform analyses.
- **[Firebase client libraries](https://firebase.google.com/docs/web/setup)** interacting with the HackerNews API depending on its specific implementation.

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

The application will be available at `http://localhost:3000`.


## API Endpoints

The application provides the following API endpoints:

- **Top 10 most occurring words in the titles of the last 25 stories**:
    - `GET /hackernews/top10-last25`
    - Description: Fetches the top 10 most occurring words in the titles of the last 25 stories from HackerNews.
    - Example response:
        ```json
        {
          "words": [
            { "word": "new", "count": 5 },
            { "word": "technology", "count": 4 },
            ...
          ]
        }
        ```

- **Top 10 most occurring words in the titles of the posts from the last week**:
    - `GET /hackernews/top10-lastweek`
    - Description: Fetches the top 10 most occurring words in the titles of posts from the last week from HackerNews.
    - Example response:
        ```json
        {
          "words": [
            { "word": "open", "count": 6 },
            { "word": "source", "count": 5 },
            ...
          ]
        }
        ```

- **Top 10 most occurring words in the titles of the last 600 stories of users with at least 10,000 karma**:
    - `GET /hackernews/top10-highkarma`
    - Description: Fetches the top 10 most occurring words in the titles of the last 600 stories of users with at least 10,000 karma.
    - Example response:
        ```json
        {
          "words": [
            { "word": "machine", "count": 7 },
            { "word": "learning", "count": 6 },
            ...
          ]
        }
        ```

## Code Examples

Here are some code examples demonstrating how to interact with the API:

- **Fetching top 10 words in the last 25 stories**:

    ```javascript
    const axios = require('axios');

    axios.get('http://localhost:3000/hackernews/top10-last25')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    ```

- **Fetching top 10 words in the last week**:

    ```javascript
    const axios = require('axios');

    axios.get('http://localhost:3000/hackernews/top10-lastweek')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    ```

- **Fetching top 10 words in the last 600 stories of high karma users**:

    ```javascript
    const axios = require('axios');

    axios.get('http://localhost:3000/hackernews/top10-highkarma')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    ```

## Testing

The application includes the following types of tests:

- **Unit tests**: These tests verify individual components and functions within the application. Run the tests with the following command:

    ```bash
    npm test
    ```

- **Integration tests**: These tests ensure that different parts of the application work together as expected. To run integration tests:

    ```bash
    npm run test:e2e
    ```

- **Code coverage**: You can check code coverage to ensure your tests are covering all parts of the application. Run the following command:

    ```bash
    npm run test:cov
    ```



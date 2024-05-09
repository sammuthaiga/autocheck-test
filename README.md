# HackerNews API

This project is a NestJS application that connects to the public API of HackerNews. It provides endpoints to fetch data and perform calculations on the top 10 most occurring words in the titles of different sets of stories from HackerNews.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
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
    - Add any required environment variables such as the base URL of the HackerNews API.

    Example:
    ```plaintext
    BASE_URL=https://hacker-news.firebaseio.com/v0
    ```

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

- **Top 10 most occurring words in the titles of the posts from exactly the last week**:
    - `GET /hackernews/top10-lastweek`
    - Description: Fetches the top 10 most occurring words in the titles of posts from the last week from HackerNews.

- **Top 10 most occurring words in the titles of the last 600 stories of users with at least 10,000 karma**:
    - `GET /hackernews/top10-highkarma`
    - Description: Fetches the top 10 most occurring words in the titles of the last 600 stories of users with at least 10,000 karma.
## Testing Endpoints with a Browser Client
**Using Postman:**

1. Install Postman (https://www.getpostman.com/) if you haven't already.
2. Create a new **GET** request.
3. Set the request URL to `http://localhost:3000/top-words/last-25` to hit the first endpoint -Top 10 most occurring words in the titles of the last 25 stories
4. Set the request URL to `http://localhost:3000/last-week` to hit the second endpoint - Top 10 most occurring words in the titles of the post of exactly the last week 3.
5. Set the request URL to `http://localhost:3000/high-karma` to hit the third endpoint  -Top 10 most occurring words in titles of the last 600 stories of users with at least
10.000 karma.
4. Send the request.
5. Postman will display the response in JSON FORMART from the API endpoints, containing the top 10 most occurring words in the titles respective to each endpoint requirements.


## Testing

To run the tests for the application, use the following command:

```bash
npm test

# Challenge_1

A small group project in connection with Kevin Chromik's MiniHackathon. The task was the topic of "learning". As a group, we created a digital learning wall for study groups, where every registered user can go into different subjects/groups and create learning notes (flashcards) for everyone.

## Installation

- [Docker](https://docs.docker.com/get-started/get-docker/)
- [NodeJS](https://nodejs.org/en)

## Quickstart

1. Clone the repository

    ```bash
    git clone git@github.com:MiniHackathon2-0/Challenge_1.git
    ```

1. Jump into the project

    ```bash
    cd Challenge_1
    ```

1. Configure the environment variables

    1. Copy the content of the example env file that is inside the Frontend folder into a .env file

        ```bash
        cp example.env .env
        ```

    1. The new .env file should contain all the environment variables necessary to run all the nodejs app in all the environments

        ```bash
        DATABASE_URL
        PORT
        ```

1. Start `Frontend` and `Backend` with Docker Compose

    ```bash
    docker compose up -d
    ```

    It started the **frontend**, **backend** and the **mongodb** in separeded containers.

1. Open `Frontend` in browser

    ```bash
    http://localhost:80
    ```

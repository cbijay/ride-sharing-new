# Ride Sharing App

It is a ride sharing app built using react as a frontend and express as a backend. It is also part of assignment to gain knowledge on mern stack

## Getting Started

To run this project locally, you have to run the server first. It can be run by following commands. In the server directory, you can run:

```console
cd server
```

Install dependencies:

```console
npm install
```

Start server:

```console
npm start
```

then in another terminal cd root of the project and

```console
cd client
```

Install dependencies:

```console
npm install
```

Start client:

```console
npm start
```

### Docker

You need to have docker alrady installed on your system. You can follow the link if you haven't installed docker on your system.
[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

Start and Run docker on your system. Open your project from vs code or any other ide. open vs code terminal or navigate to project directory from terminal or command prompt and type following commands to run the project:

```console
docker compose up
```

## Run Project

For Server

Runs the server in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to test it in the postman.

For Client

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## File Structure

For Server

Project has been structured according to service repository design pattern. The project contains src directory which have divided into - models, controllers, routes etc

![Alt text](server/src/screenshot/be_project_structure.png?raw=true "Server Project Structure")

For Client

Project has been structured according to feature type convetion of react. Tailwind is being used for styling app. The project contains src directory which have divided into - core (core or common) - features (features or modules)

![Alt text](client/public/fe_project_structure.png?raw=true "Client Project Structure")

## Seeding

To seed the user and rider to the different location. Run the following command in the server directory

For User

```console
npm seed:user
```

For Rider

```console
npm seed:rider
```

## Api Docs

For api docs to test or get the api endpoints used in the app.

Open [http://localhost:8000/api/doc](http://localhost:8000/api/doc) from the browser

## Testing

For Server

```console
npm test
```

To test in watch mode

```console
npm test:watch
```

For Client

```console
npm test
```

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Build Project

For Client

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

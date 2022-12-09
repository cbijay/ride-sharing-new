# Ride Sharing App

It is a ride sharing app built using react as a frontend and express as a backend. It is also part of assignment to gain knowledge on mern stack

## How to run this project

In order to run this project you have to run the server first and it can be run by following commands. In the server directory, you can run:

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

Start server:

```console
npm start
```

## Client

Project has been structured according to feature type convetion of react. Tailwind is being used for styling app. The project contains src directory which have divided into - core (core or common) - features (features or modules)

![Alt text](client/public/fe_project_structure.png?raw=true "Client Project Structure")

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Server

Project has been structured according to service repository design pattern. The project contains src directory which have divided into - models, controllers, routes etc

![Alt text](server/src/screenshot/be_project_structure.png?raw=true "Server Project Structure")

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to test it in the postman.

### `npm test`

To test the backend of the app

### `npm test:watch`

To test the backend of the app in watch mode

# Ride Sharing App

It is a ride sharing app built using react as a frontend, express as a backend and mongodb as a database. On client side React query has been used to fetch api requests, Redux and tookit for state management, react testing library and cypress for testing.

On server side jwt and google auth library has been used for authentication, mocha, chai and sinon js for testing, swagger ui for api docs and nodemailer for mail. It is also part of assignment to gain knowledge on mern stack.

## Getting Started

To run this project locally.

For Server

From root project directory

```console
cd server
```

Install dependencies:

```console
npm install
```

Copy .env.example to .env

```console
cp .env.example .env
```

Add value to .env variables

Start server:

```console
npm start
```

For client

From root project directory

```console
cd client
```

Install dependencies:

```console
npm install
```

Copy .env.example to .env

```console
cp .env.example .env
```

Add value to .env variables

Start Client:

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
npm run test
```

To test in watch mode

```console
npm run test:watch
```

For Client

```console
npm run test
```

### Build Project

For Client

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## File Structure

For Server

Project has been structured according to service repository design pattern. The project contains src directory which have divided into - models, controllers, routes etc

```bash
├── Dockerfile
├── package.json
├── src
│   ├── config
│   │   └── index.js
│   ├── controller
│   │   ├── auth.controller.js
│   │   ├── booking.controller.js
│   │   ├── dashboard.controller.js
│   │   └── rider.controller.js
│   ├── data
│   │   └── users.json
│   ├── db
│   │   ├── connection.js
│   │   └── seed
│   │       ├── rider.seed.js
│   │       └── user.seed.js
│   ├── docs
│   │   ├── definition
│   │   │   ├── index.js
│   │   │   └── path.js
│   │   └── swagger.js
│   ├── middleware
│   │   └── auth.middleware.js
│   ├── models
│   │   ├── booking.model.js
│   │   ├── rider.mdel.js
│   │   └── user.model.js
│   ├── repository
│   │   ├── auth.repository.js
│   │   ├── booking.repository.js
│   │   ├── dashboard.repository.js
│   │   └── rider.repository.js
│   ├── routes
│   │   ├── auth.route.js
│   │   ├── booking.route.js
│   │   ├── dashboard.route.js
│   │   ├── index.js
│   │   └── rider.route.js
│   ├── server.js
│   ├── services
│   │   ├── auth.service.js
│   │   ├── booking.service.js
│   │   ├── dashboard.service.js
│   │   └── rider.service.js
│   ├── test
│   │   ├── controller
│   │   │   ├── auth.controller.spec.js
│   │   │   ├── booking.controller.spec.js
│   │   │   ├── dashboard.controller.spec.js
│   │   │   └── rider.controller.spec.js
│   │   ├── repository
│   │   │   ├── auth.repository.spec.js
│   │   │   ├── booking.repository.spec.js
│   │   │   ├── dashboard.repository.spec.js
│   │   │   └── rider.repository.spec.js
│   │   └── services
│   │       ├── auth.service.spec.js
│   │       ├── booking.service.spec.js
│   │       ├── dashboard.service.spec.js
│   │       └── rider.service.spec.js
│   └── utils
│       ├── coordinate.js
│       ├── google.js
│       ├── mail.js
│       ├── mail.test.js
│       ├── pagination.js
│       └── response.js
└── yarn.lock
```

For Client

Project has been structured according to feature type convetion of react. Tailwind is being used for styling app. The project contains src directory which have divided into - core (core or common) - features (features or modules)

```bash
├── Dockerfile
├── README.md
├── cypress
│   ├── e2e
│   │   ├── app.cy.ts
│   │   └── cypress
│   │       ├── fixtures
│   │       │   └── example.json
│   │       └── support
│   │           ├── commands.ts
│   │           └── e2e.js
│   ├── fixtures
│   │   └── example.json
│   ├── support
│   │   ├── commands.ts
│   │   └── e2e.ts
│   └── tsconfig.json
├── cypress.config.ts
├── cypress.env.json
├── package-lock.json
├── package.json
├── public
│   ├── fe_project_structure.png
│   ├── index.html
│   ├── manifest.json
│   ├── ride_share_logo.png
│   ├── robots.txt
│   ├── unauthorized.svg
│   └── unauthorized.webp
├── src
│   ├── App.tsx
│   ├── core
│   │   ├── components
│   │   │   ├── avatar
│   │   │   │   └── Avatar.tsx
│   │   │   ├── buttons
│   │   │   │   └── Button.tsx
│   │   │   ├── card
│   │   │   │   ├── Card.tsx
│   │   │   │   └── EmptyCard.tsx
│   │   │   ├── drawer
│   │   │   │   └── Drawer.tsx
│   │   │   ├── error
│   │   │   │   └── ErrorData.tsx
│   │   │   ├── layout
│   │   │   │   ├── AppHeader.tsx
│   │   │   │   └── AppSidebar.tsx
│   │   │   ├── loading
│   │   │   │   └── LoadingSpinner.tsx
│   │   │   ├── logo
│   │   │   │   └── AppLogo.tsx
│   │   │   ├── route
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   └── enum
│   │   │   │       └── Role.tsx
│   │   │   ├── toast
│   │   │   │   ├── container
│   │   │   │   │   └── ToastContainer.tsx
│   │   │   │   └── message
│   │   │   │       └── ToastMessage.tsx
│   │   │   └── unauthorized
│   │   │       └── UnAuthorized.tsx
│   │   ├── hooks
│   │   │   ├── layout
│   │   │   │   └── useAppSidebar.tsx
│   │   │   ├── provider
│   │   │   │   └── useAppProvider.tsx
│   │   │   └── routes
│   │   │       └── useAppRoute.tsx
│   │   ├── layouts
│   │   │   └── AppLayout.tsx
│   │   ├── lib
│   │   │   ├── api.ts
│   │   │   └── cookie.ts
│   │   ├── providers
│   │   │   └── AppProvider.tsx
│   │   ├── routes
│   │   │   └── AppRouter.tsx
│   │   ├── store
│   │   │   ├── auth
│   │   │   │   ├── actions
│   │   │   │   │   └── auth.actions.ts
│   │   │   │   └── reducer
│   │   │   │       └── auth.reducer.ts
│   │   │   ├── booking
│   │   │   │   ├── actions
│   │   │   │   │   └── booking.actions.ts
│   │   │   │   └── reducer
│   │   │   │       └── booking.reducer.ts
│   │   │   ├── form
│   │   │   │   ├── actions
│   │   │   │   │   └── form.actions.ts
│   │   │   │   └── reducer
│   │   │   │       └── form.reducer.ts
│   │   │   ├── index.ts
│   │   │   ├── location
│   │   │   │   ├── actions
│   │   │   │   │   └── location.action.ts
│   │   │   │   └── reducer
│   │   │   │       └── location.reducer.ts
│   │   │   ├── rider
│   │   │   │   ├── actions
│   │   │   │   │   └── rider.actions.ts
│   │   │   │   └── reducer
│   │   │   │       └── rider.reducer.ts
│   │   │   ├── stat
│   │   │   │   ├── actions
│   │   │   │   │   └── stat.actions.ts
│   │   │   │   └── reducer
│   │   │   │       └── stat.reducer.ts
│   │   │   ├── step
│   │   │   │   ├── actions
│   │   │   │   │   └── step.actions.ts
│   │   │   │   └── reducer
│   │   │   │       └── step.reducer.ts
│   │   │   └── toast
│   │   │       ├── actions
│   │   │       │   └── toast.actions.ts
│   │   │       └── reducer
│   │   │           └── toast.reducer.ts
│   │   ├── styles
│   │   │   ├── app.scss
│   │   │   └── components
│   │   │       ├── button
│   │   │       │   └── button.scss
│   │   │       └── card
│   │   │           └── card.scss
│   │   ├── types
│   │   │   ├── components
│   │   │   │   ├── avatar
│   │   │   │   │   └── TAvatar.ts
│   │   │   │   ├── button
│   │   │   │   │   └── TButton.ts
│   │   │   │   ├── card
│   │   │   │   │   ├── TBookingCard.ts
│   │   │   │   │   └── TCard.ts
│   │   │   │   ├── toast
│   │   │   │   │   ├── TToast.tsx
│   │   │   │   │   └── TToastContainer.tsx
│   │   │   │   └── welcome_text
│   │   │   │       └── TWelcomeText.ts
│   │   │   ├── global
│   │   │   │   └── IResponse.ts
│   │   │   └── layouts
│   │   │       └── TAppLayout.ts
│   │   └── utils
│   │       ├── tests
│   │       │   ├── client.tsx
│   │       │   ├── handler.tsx
│   │       │   ├── render.tsx
│   │       │   └── wrapper.tsx
│   │       └── uuid.tsx
│   ├── features
│   │   ├── auth
│   │   │   ├── __tests__
│   │   │   │   ├── Login.test.js
│   │   │   │   └── Signup.test.js
│   │   │   ├── api
│   │   │   │   ├── login.ts
│   │   │   │   └── signup.ts
│   │   │   ├── components
│   │   │   │   └── Auth.tsx
│   │   │   ├── hooks
│   │   │   │   ├── api
│   │   │   │   │   ├── useLoginUser.tsx
│   │   │   │   │   └── useSignupUser.tsx
│   │   │   │   └── components
│   │   │   │       ├── useGeoLocation.tsx
│   │   │   │       ├── useLogin.tsx
│   │   │   │       └── useSignup.tsx
│   │   │   ├── pages
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Signup.tsx
│   │   │   ├── types
│   │   │   │   ├── IAuthResponse.ts
│   │   │   │   └── TAuth.ts
│   │   │   └── utils
│   │   │       └── google.ts
│   │   ├── booking
│   │   │   ├── __tests__
│   │   │   │   ├── components
│   │   │   │   │   └── BookingHistory.test.js
│   │   │   │   └── pages
│   │   │   │       └── BookingDetail.test.js
│   │   │   ├── api
│   │   │   │   ├── booking.tsx
│   │   │   │   └── rider.tsx
│   │   │   ├── components
│   │   │   │   ├── autocomplete
│   │   │   │   │   └── Autocomplete.tsx
│   │   │   │   ├── booking_info
│   │   │   │   │   └── BookingInfo.tsx
│   │   │   │   ├── card
│   │   │   │   │   ├── booking
│   │   │   │   │   │   └── BookingCard.tsx
│   │   │   │   │   └── rider
│   │   │   │   │       └── RiderCard.tsx
│   │   │   │   ├── detail
│   │   │   │   │   └── BookingDetailCard.tsx
│   │   │   │   ├── distance_time
│   │   │   │   │   └── DistanceTime.tsx
│   │   │   │   ├── form
│   │   │   │   │   ├── BookingForm._test.js
│   │   │   │   │   └── BookingForm.tsx
│   │   │   │   ├── history
│   │   │   │   │   └── BookingHistory.tsx
│   │   │   │   ├── map
│   │   │   │   │   ├── MapRoute.tsx
│   │   │   │   │   └── RideMap.tsx
│   │   │   │   ├── riders
│   │   │   │   │   ├── BookRider.tsx
│   │   │   │   │   └── RiderList.tsx
│   │   │   │   └── step_form
│   │   │   │       ├── BookRide.tsx
│   │   │   │       └── FindRider.tsx
│   │   │   ├── hooks
│   │   │   │   ├── api
│   │   │   │   │   ├── useBookRider.tsx
│   │   │   │   │   ├── useBookingRequest.tsx
│   │   │   │   │   ├── useBookingStatus.tsx
│   │   │   │   │   ├── useFetchBookingDetail.tsx
│   │   │   │   │   ├── useFetchBookingHistory.tsx
│   │   │   │   │   ├── useFetchCurrentBooking.tsx
│   │   │   │   │   └── useFindRider.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── autocomplete
│   │   │   │   │   │   └── useAutoComplete.tsx
│   │   │   │   │   ├── booking
│   │   │   │   │   │   ├── useBookingHistory.tsx
│   │   │   │   │   │   └── useCurrentBooking.tsx
│   │   │   │   │   ├── form
│   │   │   │   │   │   └── useBookingForm.tsx
│   │   │   │   │   ├── map
│   │   │   │   │   │   └── useRideMap.tsx
│   │   │   │   │   └── rider
│   │   │   │   │       ├── useRider.tsx
│   │   │   │   │       ├── useRiderRequest.tsx
│   │   │   │   │       └── useUpdateStatus.tsx
│   │   │   │   └── pages
│   │   │   │       └── useBookingDetail.tsx
│   │   │   ├── pages
│   │   │   │   ├── BookRide.tsx
│   │   │   │   ├── BookingDetail.tsx
│   │   │   │   ├── History.tsx
│   │   │   │   └── RiderRequest.tsx
│   │   │   └── types
│   │   │       ├── IBooking.tsx
│   │   │       ├── IBookingRider.ts
│   │   │       ├── IPlace.ts
│   │   │       ├── IRiderBooking.ts
│   │   │       ├── IUser.ts
│   │   │       └── IUserBooking.ts
│   │   └── dashboard
│   │       ├── __tests__
│   │       │   └── components
│   │       │       ├── DashboardCard.test.js
│   │       │       └── DashboardStat.test.js
│   │       ├── api
│   │       │   └── dashboard.tsx
│   │       ├── components
│   │       │   ├── card
│   │       │   │   └── DashboardCard.tsx
│   │       │   └── stat
│   │       │       └── DashboardStat.tsx
│   │       ├── hooks
│   │       │   ├── api
│   │       │   │   └── useDashboardStat.tsx
│   │       │   └── components
│   │       │       └── useDashboardStat.tsx
│   │       ├── pages
│   │       │   └── Dashboard.tsx
│   │       └── types
│   │           └── IDashboardStat.tsx
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock
```

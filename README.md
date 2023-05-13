# Pokedex

## Description
Test project created using React and accessing the [pokeapi](https://pokeapi.co/docs/v2.) to search for Pokemon and get information about them

## Requirements and features
 * Search for Pokemon by name (with auto suggest)
 * View basic Pokemon info and evolution and CTA to see evolution phase
 * See history of searches and CTA search result to see Pokemon info

## Implementation notes, key points, issues
 * As long as application is "read only" I do not see any extra changes to be done
 * The full list of Pokemon names is loaded twice on page load and I did not figure out how to address that (apparently this happens due to React.StrictMode)
 * Some basic tests were added
 * Styling is pretty basic as I tried to focus on usability, stability and performance
 * I did not use Context or Redux but if the app will need to have more features Context would be the next thing to add

## Setup
 * Check out the `main` branch
 * Make sure you have Node and npm installed
 * and run `npm install`

## Running the app 
* Following sections are from original readme provided with create-react-app

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

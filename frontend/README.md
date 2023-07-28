# Gardener

## Overview

This is a Node.js React frontend application that accesses the Gardener backend server and renders pages for the Gardener app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

2. Install packages:

   ```
   $ npm i
   ```

3. Create a config.json file in the src folder with the appropriate values:

   ```
   {
   "GARDENER_DEV_SERVER_BASE_URL": "[development server url, backend is set up for http://localhost:3000/]",
   "GARDENER_PROD_SERVER_BASE_URL": "[production server url]"
   }
   ```

4. To deploy:

   Run the app in development mode.  
   Opens in your default browser at localhost:[your port #]:

   ```
   $ npm start
   ```

   Build for production:

   ```
   $ npm build
   ```

   Test with Jest:

   ```
   $ npm test
   ```

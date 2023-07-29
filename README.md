# Gardener

Deployed at https://gardenbloom.surge.sh/

## Overview

This is a Node.js React frontend and Express backend application that gives users a visual interface for planning a flower garden. A user can search for (from [Trefle API](https://trefle.io//api/v1)) and save plants to a personal list, then place those plants in a virtual garden bed that displays the colors of the flowers that will be blooming in a selected month.

The features chosen for the site are those that will help a home gardener plant species that will present visual interest year-round.

Future added features will include Trefle API searches limited to plants native to the user's location or to plant type, making gardens publically viewable, statistics on users' plant choices, and password recovery.

## Standard User Flow

A non-logged-in user should see buttons to "Log In" and "Register" on the home page. After logging in or registering, they can select "Plants" from the navigation bar to view their saved plants. If they'd like to add plants to their list, they can select "Get more plants" to find the new plant page. Here they can search the Trefle API for plant species and add results to the new plant form, or just manually add information directly to the form.

A user can select "Gardens" from the navigation bar to see a list of their saved gardens. Clicking "Add a garden" takes them to the new garden page. Clicking a saved garden link sends the user to the display page where they can see a visual representation of it at any month of the year. Selecting the "edit" button takes them to the garden editing page.

## Setup and Testing

Readme files for the frontend and backend can be found in their respective folders.

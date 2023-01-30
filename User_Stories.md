# User Stories

## User Search - Location

As a user, I would like to search events based on a specific area.

Features:

- Form that accepts user location input
- Hit backend server Ticketmaster API to get information
- Display results

Acceptance Tests:

- Display applicable results from API

## User Search - Genre

As a user, I would like to search events based on genre.

Features:

- Form that accepts user genre input
- Use genre drop-down (stretch goal)
- Hit backend server Ticketmaster API to get information
- Display results

Acceptance Tests:

- Display applicable results from API

## Admin User Display

As an authenticated admin, I would like to see a list of all our users.

Features:

- If authenticated, show admin Route
- Display list of users on a table

Acceptance Tests

- Display applicable results from database

## Admin Update and Delete Users

As an admin, I would like to be able to update and delete users.

Features:

- Display options for adding and delete users
- Add search for user (stretch goal)
- Update table as changes are made
- Be able to update user information
- Be able to delete user information

Acceptance Tests

- Display filtered results (stretch goal)
- Ensure table updates after user update / deletions
- On update, ensure database properly updates user information
- On delete, ensure database deletes user information

## Admin Database Initialization

As a developer, I would like to be able to seed the database with users.

Features:

- Add seed users with name, email, location information

Acceptance tests:

- Verify database populates with seeded users

## Stretch Goals

- Background animations
- Genre dropdown
- User database search
- Email API for welcome, reminders
- Related news API
- Google Adsense

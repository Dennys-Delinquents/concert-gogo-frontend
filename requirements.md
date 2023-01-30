# Software Requirements

## Vision

This site will help people more easily location concerts in their area.
It encourages people to have fun.
Provides another search alternative to going directly to ticketmaster (even though we're using their API).

## Scope

In scope:

- Event location and genre search
- User creation, update, and deletion

Out of scope:

- Processing transactions

## Minimum Viable Product

Display list of concerts within a given location / genre.
Uses Auth0
CRUD server functionality

Stretch goals:

- Background animations
- Genre dropdown
- User database search
- Email API for welcome, reminders
- Related news API

## Functional Requirements

As a user, I would like to search events based on a specific area.
As a user, I would like to search events based on genre.
As an authenticated admin, I would like to see a list of all our users.
As an admin, I would like to be able to update and delete users.
As a developer, I would like to be able to seed the database with users.

[Link to flow of data](https://mikeshen926191.invisionapp.com/freehand/concert-go-go-HyCbDYwGh)

## Non-Functional Requirements

Data security: keep user information private and secure.  Keep API keys and database urls in .env files.

Essential CSS / bootstrap: making sure everything is positioned and displayed correctly.  General presentable appearance.

Database scalability: if user database continues to grow, we need to be able to maintain the database. Use mongoDB to ensure scalability.

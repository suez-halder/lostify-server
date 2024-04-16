# Lostify Server API Overview

This is the overview of lostify server api built with express and prisma where user can report their lost items and claim it with proper proof.

## Live Link

[https://lostify-server.vercel.app/](https://lostify-server.vercel.app/)

### Run Locally

Clone the project

```bash
  git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-suez-halder.git
```

Go to the project directory

```bash
  cd l2-b2-fullstack-track-assignment-8-suez-halder/
```

Install dependencies

```bash
  npm install --global yarn
```

Start the server

```bash
  yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DATABASE_URL`
`NODE_ENV`
`SALT_ROUNDS`
`JWT_SECRET`
`JWT_EXPIRES_IN`
`JWT_REFRESH_TOKEN_SECRET`
`JWT_REFRESH_TOKEN_EXPIRES_IN`

## API Reference

#### `User`

##### User Registration

-   Endpoint: POST /api/users/register
-   Functionality: Handles user registration, creating both the user account and corresponding user profile.
-   Response: Returns the user details along with a success message.

##### User Login

-   Endpoint: POST /api/users/login
-   Functionality: Authenticates a user and returns a JWT token.
-   Response: Returns a JWT token along with user details.

#### `Found Item Category`

##### Create Found Item Category

-   Endpoint: POST /api/found-items/categories
-   Functionality: Allows authenticated users to create a new category for found items.
-   Response: Returns the details of the newly created category along with a success message.

#### `Found Item`

##### Report a Found Item

-   Endpoint: POST /api/found-items
-   Functionality: Creates a new found item using the user's details extracted from the authorization token.
-   Response: Returns the details of the reported found item along with a success message.

##### Get Paginated and Filtered Found Items

-   Endpoint: GET /api/found-items
-   Functionality: Retrieves a paginated and filtered list of found items based on various query parameters.
-   Response: Returns a list of found items along with pagination details.

#### `Claim`

##### Create a Claim

-   Endpoint: POST /api/claims
-   Functionality: Allows users to create a claim for a found item.
-   Response: Returns the details of the newly created claim along with a success message.

##### Get Claims

-   Endpoint: GET /api/claims
-   Functionality: Retrieves the claims made by the authenticated user.
-   Response: Returns a list of claims made by the user.

##### Update Claim Status

-   Endpoint: PUT /api/claims/:claimId
-   Functionality: Allows updating the status of a claim.
-   Response: Returns the updated claim details along with a success message.

#### `Profile`

##### Get Profile

-   Endpoint: GET /api/users/profile
-   Functionality: Retrieves the authenticated user's profile information.
-   Response: Returns the user's profile details.

##### Update My Profile

-   Endpoint: PUT /api/users/profile
-   Functionality: Allows the authenticated user to update their profile information.
-   Response: Returns the updated profile details along with a success message.

### Additional Notes

-   **User Roles and Permissions**:
    -   Only authenticated users with the role of `USER` can create and manage found items and claims.
    -   Claims can only be made by users who are authorized as `USER` or `CLAIMER`.
    -   The approval of claims is restricted to users with appropriate permissions, ensuring that only authorized personnel can approve claims.

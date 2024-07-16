### Documentation for `signUp` Endpoint

#### Endpoint: `POST /api/signUp`

#### Description:
This endpoint allows new users to create an account by providing their name, email, and password. Upon successful registration, the user is authenticated, and a JWT token is issued and set as an HTTP-only cookie.

#### Request Body:
The request body should be in JSON format and include the following fields:
- `name` (string, required): The name of the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user's account.

#### Example Request:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

#### Example Response:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Validation:
1. **Required Fields**: Ensure that `name`, `email`, and `password` are provided. If any field is missing, return a 400 Bad Request response with an appropriate message.
2. **Unique Email**: Check if the provided email is already in use. If it is, return a 409 Conflict response with an appropriate message.

#### Internal Workflow:
1. **Validate Input**: Check if all required fields (`name`, `email`, `password`) are present. If not, return an error.
2. **Check Existing User**: Query the database to see if a user with the provided email already exists. If so, return an error.
3. **Hash Password**: Hash the provided password using bcrypt with a salt round of 10.
4. **Create User**: Create a new user document with the provided name, email, and hashed password, and save it to the database.
5. **Generate JWT Token**: Create a JWT token for the new user with an expiration time of 12 hours.
6. **Set Cookie**: Set the JWT token as an HTTP-only cookie in the response.
7. **Sanitize User Data**: Remove sensitive information (password, Plaid access token) from the user object.
8. **Send Response**: Return a JSON response indicating the user was created successfully, including the sanitized user data.

### Dependencies:
- `bcrypt`: Library for hashing passwords.
- `jsonwebtoken`: Library for creating JWT tokens.
- `User`: User model for interacting with the database.
- `formatResponse`: Custom utility for formatting the API response.
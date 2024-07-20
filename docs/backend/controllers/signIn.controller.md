### Documentation for `signIn` Endpoint

#### Endpoint: `POST /api/signIn`

#### Description:
This endpoint handles user sign-in by verifying the provided email and password. If the credentials are valid, it generates a JWT token and sets it as an HTTP-only cookie.

#### Request Body:
The request body should be in JSON format and include the following fields:

- `email` (string, required): The email address of the user.
- `password` (string, required): The password of the user.

#### Example Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Response:
A JSON object indicating the success or failure of the sign-in attempt. On success, it includes the user details (excluding sensitive information) and sets a JWT token as an HTTP-only cookie.

#### Example Response on Success:
```json
{
  "success": true,
  "message": "User signed in successfully",
  "data": {
    "email": "user@example.com",
    "name": "John Doe",
    "profilePicture": "1721464880581_12345.jpg",
    "isPlaidLinked": false
  }
}
```

#### Example Response on Failure:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### Internal Workflow:
1. **Validate Input**: Ensure both `email` and `password` are provided in the request body.
2. **Find User**: Query the database to find a user with the provided email.
3. **Check User Existence**: If no user is found, return a 401 Unauthorized response with an appropriate message.
4. **Verify Password**: Compare the provided password with the stored hashed password using `bcrypt`.
5. **Handle Password Mismatch**: If the password is incorrect, return a 401 Unauthorized response with an appropriate message.
6. **Generate JWT Token**: If the password is correct, generate a JWT token with a 12-hour expiration.
7. **Set HTTP-Only Cookie**: Set the generated JWT token as an HTTP-only cookie with secure and same-site attributes.
8. **Sanitize User Data**: Remove sensitive information (password, Plaid access token) from the user object.
9. **Send Response**: Return a 200 OK response with the sanitized user data and a success message.

#### Dependencies:
- `bcrypt`: For hashing and verifying passwords.
- `jsonwebtoken`: For generating JWT tokens.
- `User`: The user model for querying the database.
- `formatResponse`: Custom utility for formatting the API response.
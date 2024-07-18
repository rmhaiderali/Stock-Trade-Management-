### Documentation for `validateUser` Endpoint

#### Endpoint: `GET /api/validateUser`

#### Description:
This endpoint verifies if a user is currently authenticated and returns the user's profile information, excluding sensitive data such as the password and Plaid access token.

#### Request Headers:
- `Authorization`: Bearer token (JWT) for user authentication.

#### Example Request:
```http
GET /api/validateUser
Authorization: Bearer <your_jwt_token>
```

#### Example Response on Success:
```json
{
  "success": true,
  "message": "User is signed in",
  "data": {
    "email": "user@example.com",
    "name": "John Doe",
    "profilePicture": "data:image/jpeg;base64,...",
    "isPlaidLinked": false
  }
}
```

#### Example Response on Failure:
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

#### Internal Workflow:
1. **Extract User**: Retrieve the user from the request object, which is typically populated by authentication middleware.
2. **Sanitize User Data**: Remove sensitive information such as the password and Plaid access token from the user object.
3. **Send Response**: Return a JSON response indicating the user is signed in, along with the sanitized user data.

### Middleware:
This endpoint uses authentication middleware that populates `req.user` with the authenticated user's data. If the user is not authenticated, the middleware should prevent access to this endpoint and respond with an appropriate error.

### Dependencies:
- `formatResponse`: Custom utility for formatting the API response.
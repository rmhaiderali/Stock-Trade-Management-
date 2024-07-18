### Documentation for `signOut` Endpoint

#### Endpoint: `POST /api/signOut`

#### Description:
This endpoint handles user sign-out by clearing the JWT token cookie, effectively logging the user out of the application.

#### Request Body:
No request body parameters are required.

#### Response:
A JSON object indicating the success of the sign-out operation.

#### Example Response:
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

#### Internal Workflow:
1. **Clear Cookie**: Clear the JWT token cookie from the client's browser.
2. **Send Response**: Return a JSON response indicating the user has been logged out successfully.

### Dependencies:
- `formatResponse`: Custom utility for formatting the API response.
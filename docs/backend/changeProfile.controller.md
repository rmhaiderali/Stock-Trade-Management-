### Documentation for `changeProfile` Endpoint

#### Endpoint: `POST /api/changeProfile`

#### Description:
This endpoint allows users to update their profile information, including their name, email, and profile picture.

#### Request Body:
The request body should be in `multipart/form-data` format and can include the following fields:
- `name` (string, optional): The new name of the user.
- `email` (string, optional): The new email address of the user.
- `profilePicture` (file, optional): The new profile picture of the user. The file size should not exceed 5MB.

#### Example Request:
| Field          | Value                      |
| -------------- | -------------------------- |
| name           | New Name                   |
| email          | new.email@example.com      |
| profilePicture | New Profile Picture (File) |

#### Example Response:
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "name": "New Name",
    "email": "new.email@example.com",
    "profilePicture": "1721464880581_12345.jpg"
  }
}
```

#### Validation:
1. **Profile Picture Size**: If a profile picture is provided, its size should not exceed 5MB. If it does, return a 400 Bad Request response with an appropriate message.
2. **Email Format**: If an email is provided, it should match a basic email pattern. If it does not, return a 400 Bad Request response with an appropriate message.

#### Internal Workflow:
1. **Check for Profile Picture**:
   - If a file is uploaded, verify its size. If it exceeds 5MB, return an error.
   - Convert the image to a Base64 string and update the user's profile picture.
2. **Update Name**: If a new name is provided, update the user's name.
3. **Validate and Update Email**:
   - If a new email is provided, validate its format.
   - If valid, update the user's email.
4. **Save Changes**: Save the updated user information to the database.
5. **Sanitize User Data**: Remove sensitive information (password, Plaid access token) from the user object.
6. **Send Response**: Return a JSON response indicating the profile was updated successfully, including the updated user data.

#### Dependencies:
- `formatResponse`: Custom utility for formatting the API response.
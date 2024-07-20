### User Model Documentation

The `User` model is a Mongoose schema that defines the structure of user data in the database. This model includes various fields related to user information and authentication, such as name, email, password, and integration with Plaid API for financial data.

---

### Fields

1. **name**
   - **Type:** String
   - **Required:** Yes
   - **Description:** The name of the user.
   - **Additional Info:** The name is trimmed of whitespace.

2. **email**
   - **Type:** String
   - **Required:** Yes
   - **Description:** The email address of the user.
   - **Additional Info:** The email is unique, converted to lowercase, and trimmed of whitespace.

3. **password**
   - **Type:** String
   - **Required:** Yes
   - **Description:** The hashed password of the user.

4. **plaidAccessToken**
   - **Type:** String
   - **Description:** The access token provided by Plaid API for fetching financial data.

5. **isPlaidLinked**
   - **Type:** Boolean
   - **Default:** false
   - **Description:** A flag indicating whether the user's account is linked to Plaid.

6. **profilePicture**
   - **Type:** String
   - **Default:** "/default_profile.jpg"
   - **Description:** The URL or path to the user's profile picture.

---

### Usage

This model is used to interact with the `users` collection in the MongoDB database. Each instance of the `User` model represents a user record in the database.
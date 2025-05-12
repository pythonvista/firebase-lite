
# Firebase Solyte

Firebase Solyte is a lightweight wrapper around Firebase Authentication, Firestore, and Storage, providing simplified methods for common operations.

## Installation

```bash
npm install firebase-solyte
```

## Setup

First, initialize Firebase with your configuration:

```javascript
import { initializeFirebaseLite } from 'firebase-solyte';

const firebaseConfig = {
  // Your Firebase configuration object
};

const firebase = initializeFirebaseLite(firebaseConfig);
```

## Authentication Methods

### User Registration
```javascript
// Signup with email and password
firebase.Auth.signup(email, password)
  .then((userCredential) => {
    // User signed up successfully
  })
  .catch((error) => {
    // Handle errors
  });
```

### Login Methods
```javascript
// Email/Password Login
firebase.Auth.login(email, password)
  .then((userCredential) => {
    // User logged in successfully
  })
  .catch((error) => {
    // Handle errors
  });

// Phone Number Login
firebase.Auth.Phone(phoneNumber, appVerifier)
  .then((confirmationResult) => {
    // Phone authentication initiated
  })
  .catch((error) => {
    // Handle errors
  });

// Google Login
firebase.Auth.GoogleLogin(googleProvider)
  .then((result) => {
    // User logged in with Google
  })
  .catch((error) => {
    // Handle errors
  });
```

### Other Authentication Operations
```javascript
// Sign Out
firebase.Auth.signout();

// Send Password Reset Email
firebase.Auth.reset(email);

// Verify Email
firebase.Auth.verifyemail(user);

// Change Email
firebase.Auth.changeEmail(user, newEmail);

// Change Password
firebase.Auth.changePassword(user, newPassword);

// Get Current User State
const currentUser = firebase.Auth.UserState();
```

## Firestore Methods

### Adding Documents
```javascript
// Add document with specific ID
firebase.Firestore.addDocWithId('users', userId, { name: 'John', age: 30 });

// Add document with auto-generated ID
firebase.Firestore.addDocWithoutId('posts', { title: 'Hello World', content: '...' });
```

### Retrieving Documents
```javascript
// Get a single document
firebase.Firestore.getSingleDoc('users', userId)
  .then((doc) => {
    // Handle document data
  });

// Get all documents (optional sorting)
firebase.Firestore.getAllDoc('users', 'desc')
  .then((docs) => {
    // Array of documents
  });

// Get documents with query
firebase.Firestore.getAllQueryDoc('users', 'role', 'admin', 'asc')
  .then((docs) => {
    // Filtered and sorted documents
  });
```

### Updating and Deleting Documents
```javascript
// Update a document
firebase.Firestore.updateDocument('users', userId, { name: 'New Name' });

// Remove a document
firebase.Firestore.removeDoc('users', documentId);
```

## Storage Methods

### Uploading Images
```javascript
// Upload an image file
firebase.Storage.UploadImg(file)
  .then(({ url, path }) => {
    // url: download URL
    // path: storage path of the uploaded file
  });
```

### Deleting Images
```javascript
// Delete an image by its storage path
firebase.Storage.DeleteImg(imagePath);
```

## Real-time Listeners
```javascript
// Create a query snapshot listener
const unsubscribe = onSnapshot(
  firebase.Firestore.collectionSnapDocs('messages', 'roomId', 'room1', 'type', 'text'),
  (snapshot) => {
    // Handle real-time updates
  }
);

// Don't forget to unsubscribe when no longer needed
unsubscribe();
```

## Error Handling

Always use `.catch()` to handle potential errors in authentication, firestore, and storage operations.

## Notes
- All Firestore methods automatically add a `CreatedAt` timestamp
- Supports basic filtering, sorting, and pagination
- Simplified wrapper around Firebase V9 modular SDK

## License
MIT

## Contributing
Contributions are welcome! Please submit pull requests or open issues on the GitHub repository.

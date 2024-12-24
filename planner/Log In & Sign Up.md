# Log In & Sign Up

## Code Implementation

### `constants.ts`

-   Create a new constant variable called `BACKEND_SERVER_ADDRESS` which will
    contain a string of the backend server address.

### `LogInPage.tsx`

- Inside the `LogInPage` component
	- Create a function called `onGoogleLogin` that takes a `response: TokenResponse`
	    - Send a response to backend URL `` `${BACKEND_SERVER_ADDRESS}/api/v1/users/google-auth/login` `` with the token in the `response` parameter as the body of a request, and store the result in a variable called `res`.
	    - Get the JSON response from `res`, and store it in a variable called `json`
	    - If `json.status === "fail"`, then alert the user that their Gmail is not yet registered in our database and they need to sign up first
	    - Otherwise, store `json.token` into the `localStorage` with a key of `jwt`.

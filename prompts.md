Continuing with the development of my React + TypeScript application, which adheres to Clean Architecture principles and utilizes Firebase for authentication, I now need to define the specific use cases for the authentication domain logic.

We have previously established the following AuthRepository interface and the domain User model:

**Domain Repository Interface `(./src/domain/auth/repository/AuthRepository.ts)`:**

```typescript
import type {User} from "@/domain/auth/models/User.ts"; // Assuming path based on previous context

export interface AuthRepository {
signInWithGoogle(): Promise<User | null>;
signOut(): Promise<void>;
onAuthStateChanged(callback: (user: User | null) => void): () => void;
}
```

**Domain User Model `(./src/domain/auth/models/User.ts)`:**
```typescript
export interface User {
    userId: string;
    email?: string | null;
    displayName: string | null;
    photoUrl?: string | null;
    emailVerified: boolean;
    createdAt: string; // Or your chosen type (e.g., Date, number)
    lastLoginAt: string; // Or your chosen type
    hostedEvents: string[];
}
```
Based on these definitions, please define and provide the TypeScript implementation for the following use cases, which will reside in the domain layer `(e.g., under src/domain/auth/usecases/)`:
1. `SignInWithGoogleUseCase`:
   - Purpose: To orchestrate the user sign-in process via Google.
   - Dependencies: AuthRepository.
   - Input Parameters: None.
   - Return Value: Promise<User | null> (the domain User object upon successful authentication, or null if authentication fails or is cancelled by the user).
   - Core Logic: Calls the signInWithGoogle method of the AuthRepository.

2. `SignOutUseCase`:
    - Purpose: To handle the user sign-out process.
    - Dependencies: AuthRepository.
    - Input Parameters: None.
    - Return Value: Promise<void> (resolves upon successful sign-out).
    - Core Logic: Calls the signOut method of the AuthRepository.
      
3. `ObserveAuthStateUseCase`:
   - Purpose: To allow other parts of the application (typically ViewModels in the presentation layer) to subscribe to real-time authentication state changes.
   - Dependencies: AuthRepository.
   - Input Parameters: A callback function of type (user: User | null) => void.
   - Return Value: An unsubscribe function (typically () => void). 
   - Core Logic: Calls the onAuthStateChanged method of the AuthRepository and returns the resulting unsubscribe function.

**For each use case, please provide:**
- **TypeScript Class Definition:**
  - The class should have a clear name (e.g., SignInWithGoogleUseCase).
  - Include a constructor for injecting its dependency (the AuthRepository interface).
  - Define a single public execution method (e.g., execute(), call(), or a more descriptive name like listen() for the observer pattern).
- **Method Implementation**: Show the implementation of the execution method, including how it interacts with the injected `AuthRepository`.
- **Type Definitions**: Ensure all parameters and return types are clearly defined using TypeScript.
- **Error Handling Philosophy**: Briefly explain how errors originating from the `AuthRepository` (e.g., network issues, sign-in cancelled) should ideally be handled or propagated by the use case. (Specific error classes are not required unless you want to suggest a pattern)
- **Suggested File Path**: (e.g., `src/domain/auth/usecases/SignInWithGoogleUseCase.ts`).

These use cases should be framework-agnostic, focusing solely on orchestrating the domain logic related to authentication. Thank you!"


### Presentation Layer

I'm developing a React + TypeScript application using Clean Architecture and MVVM. The domain layer for authentication is established, including an AuthRepository interface, a domain User model, and the following use cases: SignInWithGoogleUseCase, SignOutUseCase, and ObserveAuthStateUseCase.
Now, I need to implement the Presentation Layer (ViewModels and Views/Components) for the Google Authentication feature and set up client-side routing using React Router v6, including public and protected routes.
Current Routing Idea:
I envision a routing structure similar to this:

```JavaScript

// Example in App.tsx or a dedicated Router component
<Routes>
   <Route path="/signin" element={<SignInPage/>}/> {/* Public sign-in page */}
   <Route element={<ProtectedRoute/>}> {/* Wrapper for protected routes */}
    <Route element={<BottomNavLayout/>}> {/* Layout for main app sections */}
        <Route index element={<HomePage/>}/>
        <Route path="events" element={<EventsPage/>}/>
        {/* Other protected routes with BottomNavLayout */}
    </Route>
   {/* Potentially other protected routes without BottomNavLayout */}
   </Route>
</Routes>
```
(Placeholder components like `HomePage`, `EventsPage`, `BottomNavLayout` can be assumed to exist or be simple stubs for now.)

**Please provide guidance and code examples for the following:**

1. `AuthViewModel.ts` Implementation:
   - **Purpose**: Manage authentication state (e.g., current domain User object, loading status for auth operations, error messages) and expose methods to interact with the authentication use cases.
   - **Dependencies**: Inject SignInWithGoogleUseCase, SignOutUseCase, and ObserveAuthStateUseCase.
   - **State Management**: Demonstrate using React Hooks (e.g., useState, useEffect, useReducer) for managing the ViewModel's internal state.
   - **Methods**:
     - A method to initiate Google sign-in (calling SignInWithGoogleUseCase).
     - A method to sign out (calling SignOutUseCase).
     - A mechanism to expose the current authentication status and user data (derived from ObserveAuthStateUseCase).
   - **Error Handling**: Show how errors from use cases can be caught and exposed as state for the UI.

2. **`SignInPage.tsx` (or `SignInView.tsx`) Component:**
   - **Purpose**: A view component for the /signin route. 
   - **Interaction**:
     - Use/Instantiate the AuthViewModel. 
     - Display a "Sign in with Google" button. 
     - On button click, call the sign-in method on the AuthViewModel. 
     - Display loading indicators and error messages based on the AuthViewModel's state. 
     - Handle navigation/redirection upon successful sign-in (e.g., to the home page or a previously intended protected route).

3. ProtectedRoute.tsx Component Implementation:

   - **Purpose**: A wrapper component to guard routes that require authentication.
   - **Logic**:
     - How it consumes the authentication state (e.g., from an AuthViewModel instance, or potentially via a React Context populated by the AuthViewModel). 
     - If the user is not authenticated, it should redirect to the /signin page (potentially preserving the intended destination via location.state). 
     - If the user is authenticated, it should render its children (or <Outlet /> if used as a layout route). 
     - Consider showing a loading state while authentication status is being determined initially.

4. **Global Authentication State Management & Initialization:**

   - Where and how should the ObserveAuthStateUseCase be initiated (e.g., in a top-level component like App.tsx, potentially managed by a global instance or context provider for the AuthViewModel)? 
   - How can the application ensure that the initial authentication state is resolved before rendering protected routes to avoid flashes of content or premature redirects?

5. **React Router Setup (`App.tsx` or `Router.tsx`):**

   - Show the complete router configuration using `<BrowserRouter>`, `<Routes>`, and `<Route>` based on the structure provided above, integrating the `SignInPage` and `ProtectedRoute` components.
   
6. Suggestions for Improvement (Crucial):

   - **Critique my proposed routing structure:** Are there better or more flexible ways to organize public/protected routes and layouts with React Router v6?
   - **Auth State for Routing:** What are the best practices for making authentication state available to routing components like ProtectedRoute? (e.g., Prop drilling AuthViewModel, React Context, a dedicated auth hook that uses the ViewModel).
   - **Redirect Logic:** Are there more robust ways to handle redirects after login/logout, especially if needing to return to a specific page the user was trying to access?
   - **Overall Authentication Flow:** Any suggestions to improve the user experience or a developer experience related to the authentication process within the presentation layer.
   
**Please provide:**
- Clear TypeScript code snippets for `AuthViewModel.ts`, `SignInPage.tsx`, `ProtectedRoute.tsx`, and the main router setup.
- Explanations for the design choices and how the components interact.
- Your valuable suggestions as requested in point 6.

Assume that the domain use cases (`SignInWithGoogleUseCase`, `SignOutUseCase`, `ObserveAuthStateUseCase`) are correctly implemented and available for injection. Thank you!

### Firebase database
Now that my application's authentication (sign-in, sign-out, protected routes using React Router) is functional, I need to implement the capability to interact with Firebase Database for general C.R.U.D. (Create, Read, Update, Delete) operations for various data entities.
I want to create a reusable 'adapter' or 'API service' within my Data Layer, following Clean Architecture principles. This adapter will serve as a generic Data Source for Firebase Realtime Database. My existing Firebase setup (including an exported `firebaseDatabase` instance) is in `./src/core/config/firebase.ts`.
Please create a comprehensive guide that explains how to build this. The guide should cover:
1. **Generic Data Source Interface (e.g., FirebaseRtdbDataSource.ts):**
   - Define a TypeScript interface for this data source.
   - It must be generic (`<T extends { id?: string }>`) to handle different data entity types (assuming entities will typically have an `id` field, which might be optional before creation or managed by Firebase push keys).
   - include methods for:
     - `create(path: string, data: T, id?: string): Promise<string>`: Creates data at the specified path. If `id` is provided, it sets data at `path/id`. If id is not provided, it should use Firebase's `push()` to generate a unique ID under `path` and return this new ID.
     - `readById<T>(path: string, id: string): Promise<T | null>`: Reads a collection of data entities from the specified path. (Realtime Database often returns collections as objects where keys are IDs). Alternatively, `Promise<T[] | null>` if conversion to an array is preferred (though this requires handling Firebase's object-based collections). Please discuss the pros/cons if suggesting an array.
     - `update<T>(path: string, id: string, data: Partial<T>): Promise<void>`: Deletes a data entity at `path/id`.
   - Provide clear explanations for the purpose, parameters (especially `path` conventions), and return types of each method.
2. **Firebase Realtime Database Data Source Implementation (e.g., `FirebaseRtdbDataSourceImpl.ts`):**
   - Provide a TypeScript class that implements the `FirebaseRtdbDataSource` interface.
   - Demonstrate how to use the Firebase Realtime Database SDK functions (e.g., `ref()`, `set()`, `get()`, `push()`, `update()`, `remove()`) from the `firebase/database` module for each interface method.
   - Show how this implementation class would be constructed, likely taking the `firebaseDatabase` instance (from `firebase/database`) as a dependency.
   - Include robust error handling for common Firebase operations (e.g., permission denied, network issues, data not found), explaining how errors might be caught and potentially re-thrown or handled.
3. **Practical Usage Examples:**
    - Show how this `FirebaseRtdbDataSourceImpl` could be instantiated.
    - Provide examples of using it to perform all CRUD operations for a hypothetical data model, for instance:
    ```typescript
    interface Event {
        id?: string; // Optional as it can be generated by Firebase push
        name: string;
        date: string; // e.g., ISO string
        location: string;
    }
    ```
   - Illustrate:
     - Creating a new event (both with a client-provided ID and a Firebase-generated push ID).
     - Reading a specific event by its ID.
     - Reading all events from an 'events' path.
     - Updating an existing event.
     - Deleting an event.
4. **Integration within Clean Architecture:**
   - Briefly explain how this generic `FirebaseRtdbDataSourceImpl` would typically be injected into and used by more specific `RepositoryImpl` classes (e.g., `EventRepositoryImpl`) in the Data Layer. These `RepositoryImpl` classes would then implement `Repository` interfaces defined in the Domain Layer. (No need to implement full repositories, just illustrate the conceptual connection and data flow).
5. **Best Practices for Realtime Database & This Adapter:**
    - Mention any relevant best practices for structuring data paths (e.g., `/entityName/${id}`).
    - Considerations for data querying/filtering if this generic adapter needs to support it (though complex queries are often better handled by more specific data source methods or directly in repository implementations for RTDB). For this guide, basic path-based retrieval is the primary focus.

Please ensure the guide includes clear TypeScript code examples, detailed explanations for each part, and focuses on creating a maintainable, reusable, and type-safe solution for interacting with Firebase Realtime Database. Thank you!
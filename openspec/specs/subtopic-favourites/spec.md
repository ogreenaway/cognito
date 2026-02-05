## Requirements

### Requirement: User can mark subtopic as favorite

The system SHALL display a favorite button (star icon) next to each subtopic link on the CoursePage. When a user clicks the star button on an unfavorited subtopic, the system SHALL immediately mark it as favorite with visual feedback (yellow star) and persist the selection.

#### Scenario: User marks unfavorited subtopic

- **WHEN** user clicks the star button on a subtopic that is not currently favorited
- **THEN** the star button changes to yellow (selected state) immediately
- **AND** the subtopic code is added to the favorites list in local storage
- **AND** a backend sync request is initiated

#### Scenario: User attempts to favorite when at limit

- **WHEN** user has already favorited 20 subtopics for the current course
- **AND** user clicks the star button on an unfavorited subtopic
- **THEN** the system displays a message indicating the 20-favorite limit has been reached
- **AND** the subtopic is not added to favorites

### Requirement: User can unmark subtopic as favorite

The system SHALL allow users to remove a subtopic from their favorites by clicking the star button on a favorited subtopic.

#### Scenario: User unmarks favorited subtopic

- **WHEN** user clicks the star button on a subtopic that is currently favorited (yellow star)
- **THEN** the star button changes to white (unselected state) immediately
- **AND** the subtopic code is removed from the favorites list in local storage
- **AND** a backend sync request is initiated

### Requirement: Favorites persist across sessions

The system SHALL store favorite subtopics in browser local storage using a course-specific key format. Favorites SHALL persist across browser sessions and page refreshes.

#### Scenario: User returns to course page

- **WHEN** user navigates to a course page they have previously visited
- **THEN** all subtopics marked as favorites display yellow stars
- **AND** all unfavorited subtopics display white stars
- **AND** the favorite state matches what was stored in local storage

#### Scenario: User visits course on different device

- **WHEN** user visits the same course on a different device or browser
- **THEN** favorites do not appear (local storage is device-specific)
- **AND** user can create a new set of favorites for that device

### Requirement: Optimistic UI updates

The system SHALL update the UI immediately when a user toggles a favorite, before the backend sync completes. This provides instant feedback and improved perceived performance.

#### Scenario: Backend sync in progress

- **WHEN** user toggles a favorite
- **THEN** the UI updates immediately (star color changes)
- **AND** the backend sync initiates asynchronously
- **AND** the UI remains interactive during the sync

### Requirement: Error handling for failed syncs

The system SHALL handle backend sync failures gracefully by displaying an error state and allowing the user to retry.

#### Scenario: Backend sync fails

- **WHEN** user toggles a favorite
- **AND** the backend sync request fails
- **THEN** the star button displays in error state (yellow star remains)
- **AND** error text "failed to save" appears below the star button
- **AND** the local storage state is reverted to match the previous server state

#### Scenario: User retries after error

- **WHEN** a favorite is in error state
- **AND** user clicks the star button again
- **THEN** the system attempts to sync again
- **AND** if successful, the error state is cleared
- **AND** the favorite state is confirmed

### Requirement: Error simulation for testing

The system SHALL provide a mechanism to simulate backend errors for testing purposes using a query parameter.

#### Scenario: Error simulation enabled

- **WHEN** the URL contains query parameter `favouriteEndpointError=true`
- **AND** user toggles a favorite
- **THEN** the backend simulation waits 1 second and returns an error
- **AND** the error handling flow is triggered

#### Scenario: Normal operation without error simulation

- **WHEN** the URL does not contain query parameter `favouriteEndpointError=true`
- **AND** user toggles a favorite
- **THEN** the backend simulation waits 1 second and returns success
- **AND** no error state is displayed

### Requirement: Maximum 20 favorites per course

The system SHALL enforce a limit of 20 favorite subtopics per course to prevent storage bloat and encourage intentional curation.

#### Scenario: Favorites count displayed

- **WHEN** user views a course page
- **THEN** the system tracks the count of favorited subtopics for that course
- **AND** prevents adding more than 20 favorites

#### Scenario: User removes favorite when at limit

- **WHEN** user has 20 favorites
- **AND** user removes one favorite
- **THEN** user can add a new favorite again

### Requirement: Visual feedback for favorite states

The system SHALL provide clear visual indicators for three distinct states: unselected, selected, and error.

#### Scenario: Unselected state display

- **WHEN** a subtopic is not favorited
- **THEN** the star button displays with white/outline styling

#### Scenario: Selected state display

- **WHEN** a subtopic is favorited and no error has occurred
- **THEN** the star button displays with yellow fill styling

#### Scenario: Error state display

- **WHEN** a favorite sync has failed
- **THEN** the star button displays with yellow fill styling
- **AND** text "failed to save" appears below the button

### Requirement: Local storage utility functions

The system SHALL provide utility functions for managing favorites in local storage that follow the existing codebase patterns.

#### Scenario: Get favorites for course

- **WHEN** the system needs to retrieve favorites for a course
- **THEN** it calls `getFavourites(courseCode)` which returns an array of subtopic codes or null

#### Scenario: Set favorites for course

- **WHEN** the system needs to update favorites for a course
- **THEN** it calls `setFavourites(courseCode, subtopicCodes)` which stores the array in local storage with key `favourites_${courseCode}`

### Requirement: Backend sync simulation

The system SHALL simulate a backend API call with realistic delay to enable testing of async behavior and error handling.

#### Scenario: Successful sync simulation

- **WHEN** the system calls the sync API
- **THEN** it waits 1 second before resolving
- **AND** resolves successfully if no error simulation is active

#### Scenario: Failed sync simulation

- **WHEN** the system calls the sync API
- **AND** query parameter `favouriteEndpointError=true` is present
- **THEN** it waits 1 second before rejecting
- **AND** rejects with an error

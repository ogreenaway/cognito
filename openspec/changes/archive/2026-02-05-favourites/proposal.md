## Why

Users need a way to mark and track their favorite subtopics for quick access and personalized learning. This enables learners to curate their own study paths and easily return to important content they want to revisit.

## What Changes

- Add a favorite button (star icon) next to each subtopic link on the CoursePage
- Implement local storage persistence for favorite subtopics (maximum 20 per course)
- Create optimistic UI updates with simulated backend synchronization
- Add error handling with visual feedback when favorites fail to save
- Create new `FavouriteButton` component with three states: unselected (white star), selected (yellow star), and error (with "failed to save" text)
- Add utility functions for managing favorites in local storage (get/set by course code)
- Simulate backend API with 1-second delay and query parameter-based error simulation (`favouriteEndpointError=true`)

## Capabilities

### New Capabilities

- `subtopic-favourites`: Managing favorite subtopics including UI components, local storage persistence, optimistic updates, backend synchronization simulation, and error handling

### Modified Capabilities

<!-- No existing specs require requirement changes -->

## Impact

**Affected Components:**

- `CoursePage` component - needs to retrieve favorites from storage and pass to subtopic links
- `SubtopicLink` component - needs to integrate favorite button
- `utils/localStorage.ts` - needs new favorites utility functions

**New Components:**

- `FavouriteButton` component - reusable star button with state management

**Dependencies:**

- No new external dependencies required
- Uses existing React hooks and local storage APIs

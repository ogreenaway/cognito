## Why

Students need a place to capture personal notes while studying a course. Having notes directly on the course page reduces context-switching and helps learners retain information by writing in their own words.

## What Changes

- Add a notes text area section at the bottom of the CoursePage for students to write personal notes
- Implement auto-save as the user types (debounced, not a manual save button)
- Display a visible status indicator showing saving/saved/error states
- Persist notes in localStorage using the existing helper functions (`getLocalStorage`/`setLocalStorage`) with new `getNotes` and `setNotes` wrapper functions
- Create simulated backend synchronization similar to `api/favourites.ts` with a `notesEndpointError=true` query param to fake API errors for testing
- Handle edge cases like save failures while the user continues typing

## Capabilities

### New Capabilities

- `course-notes`: Managing course-level notes including the notes text area component, auto-save with debounce, status indicator, localStorage persistence, backend sync simulation, and error handling

### Modified Capabilities

## Impact

**Affected Components:**

- `CoursePage` component - needs to integrate the notes section

**New Components:**

- `CourseNotes` component - text area with auto-save and status indicator

**New Files:**

- `api/notes.ts` - simulated backend sync (similar to `api/favourites.ts`) with `notesEndpointError` query param

**Modified Files:**

- `utils/localStorage.ts` - add `notes_${courseCode}` key type and `getNotes`/`setNotes` wrapper functions

**Dependencies:**

- No new external dependencies required
- Uses existing React hooks and localStorage APIs


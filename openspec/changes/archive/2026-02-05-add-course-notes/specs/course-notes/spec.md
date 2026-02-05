## ADDED Requirements

### Requirement: Notes text area displayed on CoursePage

The CoursePage SHALL display a CourseNotes component at the bottom of the page, after all course content. The component SHALL include a multi-line text area for entering notes and a status indicator.

#### Scenario: Notes section visible on CoursePage

- **WHEN** user navigates to a CoursePage
- **THEN** a notes section is visible at the bottom of the page with a text area and status indicator

#### Scenario: Notes text area is editable

- **WHEN** user clicks on the notes text area
- **THEN** the text area receives focus and user can type notes

### Requirement: Notes auto-save with debounce

The system SHALL automatically save notes to localStorage after the user stops typing for 1 second (debounced). The system SHALL NOT save while the user is actively typing.

#### Scenario: Notes saved after typing pause

- **WHEN** user types in the notes text area
- **AND** user stops typing for 1 second
- **THEN** notes are saved to localStorage under the key `notes_{courseCode}`

#### Scenario: Save debounced during continuous typing

- **WHEN** user types continuously without pause
- **THEN** no save occurs until typing stops for 1 second

### Requirement: Save status indicator

The system SHALL display a status indicator showing the current save state. The indicator SHALL show one of: no indicator (idle), "Saving...", "Saved", or "Error saving".

#### Scenario: Saving status shown during save

- **WHEN** notes auto-save is triggered
- **THEN** status indicator shows "Saving..."

#### Scenario: Saved status shown after successful save

- **WHEN** notes are successfully saved to localStorage and backend sync completes
- **THEN** status indicator shows "Saved"

#### Scenario: Error status shown on sync failure

- **WHEN** backend sync fails
- **THEN** status indicator shows "Error saving"
- **AND** notes remain saved in localStorage (optimistic)

### Requirement: Notes persistence in localStorage

The system SHALL persist notes in localStorage using the existing helper pattern. The `LocalStorageKey` type SHALL include `notes_${string}`. The system SHALL provide `getNotes(courseCode)` and `setNotes(courseCode, notes)` functions.

#### Scenario: Notes retrieved on page load

- **WHEN** user navigates to a CoursePage
- **AND** notes exist in localStorage for that course
- **THEN** the notes text area is populated with the saved notes

#### Scenario: Notes empty for new course

- **WHEN** user navigates to a CoursePage
- **AND** no notes exist in localStorage for that course
- **THEN** the notes text area is empty

### Requirement: Simulated backend sync

The system SHALL simulate backend synchronization after saving to localStorage. The sync function SHALL be located in `api/notes.ts`. The sync SHALL include a simulated network delay.

#### Scenario: Backend sync called after localStorage save

- **WHEN** notes are saved to localStorage
- **THEN** the syncNotes function is called to simulate backend sync

#### Scenario: Sync simulates network delay

- **WHEN** syncNotes is called
- **THEN** the function waits for a simulated network delay before resolving

### Requirement: Error simulation via query parameter

The system SHALL support a `notesEndpointError=true` query parameter to simulate backend sync failures for testing purposes.

#### Scenario: Error simulated with query param

- **WHEN** syncNotes is called
- **AND** URL contains `notesEndpointError=true` query parameter
- **THEN** the sync function throws an error

#### Scenario: Normal operation without query param

- **WHEN** syncNotes is called
- **AND** URL does not contain `notesEndpointError=true` query parameter
- **THEN** the sync function resolves successfully after delay

### Requirement: Error recovery while typing

The system SHALL handle save errors gracefully while allowing the user to continue typing. Failed saves SHALL NOT block subsequent save attempts.

#### Scenario: User continues typing after error

- **WHEN** a save operation fails with an error
- **AND** user continues typing
- **THEN** user can still type in the text area
- **AND** a new save attempt is triggered after the debounce period

#### Scenario: Retry succeeds after previous failure

- **WHEN** a save operation fails
- **AND** user modifies notes
- **AND** the next save attempt succeeds
- **THEN** status indicator shows "Saved"

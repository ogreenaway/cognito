## Context

The CoursePage currently displays course information, categories, and subtopics. Students need a way to take notes while studying without leaving the page. The codebase already has patterns for localStorage persistence (`utils/localStorage.ts`) and simulated API calls (`api/favourites.ts`) that this feature will follow.

## Goals / Non-Goals

**Goals:**

- Provide a seamless note-taking experience directly on the CoursePage
- Auto-save notes without manual intervention (debounced to avoid excessive writes)
- Give clear feedback on save status (saving/saved/error)
- Persist notes per-course using localStorage
- Simulate backend sync with testable error handling

**Non-Goals:**

- Rich text editing (plain text only)
- Note sharing or collaboration
- Note organization/folders/tags
- Offline sync queue (notes are course-local only)
- Note search functionality

## Decisions

### 1. Notes section placement at bottom of CoursePage

**Decision**: Place the CourseNotes component at the bottom of the CoursePage, after all course content.

**Rationale**: Notes are supplementary to the main course content. Placing them at the bottom keeps the primary learning material prominent while still providing easy access. Students naturally scroll down after reading content.

**Alternatives considered**:
- Sidebar panel: Would require responsive design changes and reduce content width
- Modal/overlay: Adds friction and hides content while writing
- Collapsible section in middle: Interrupts content flow

### 2. Debounced auto-save with 1 second delay

**Decision**: Auto-save notes 1 second after the user stops typing using a debounce pattern.

**Rationale**: Balances responsiveness (user sees save status quickly) with avoiding excessive localStorage/API calls. Matches common auto-save UX patterns.

**Alternatives considered**:
- Save on blur: Feels unreliable, user might close tab before blurring
- Manual save button: Adds friction, risk of losing work
- Shorter debounce (300ms): Too aggressive, causes flickering status

### 3. Three-state status indicator (idle/saving/saved/error)

**Decision**: Show a text status indicator with states: idle (no indicator), "Saving...", "Saved", "Error saving".

**Rationale**: Clear, accessible feedback without visual clutter. Error state enables user to understand when sync failed.

**Alternatives considered**:
- Icon-only indicators: Less accessible, meaning unclear
- Toast notifications: Too intrusive for frequent auto-saves

### 4. Optimistic UI with localStorage-first approach

**Decision**: Write to localStorage immediately, then attempt simulated backend sync. UI reflects localStorage state, not backend state.

**Rationale**: Provides instant feedback. Backend sync is simulated anyway, so localStorage is the source of truth. Matches the favourites pattern.

**Alternatives considered**:
- Wait for backend before updating UI: Adds latency, feels sluggish

### 5. Extend existing localStorage helper pattern

**Decision**: Add `notes_${courseCode}` to the `LocalStorageKey` union type and create `getNotes`/`setNotes` wrapper functions following the existing pattern.

**Rationale**: Maintains consistency with existing codebase patterns. The generic helpers handle JSON serialization and error logging.

### 6. Simulated API with error query param

**Decision**: Create `api/notes.ts` with `syncNotes()` function matching the `favourites.ts` pattern, using `notesEndpointError=true` query param to simulate failures.

**Rationale**: Enables manual testing of error states without backend changes. Consistent with existing testing approach for favourites.

## Risks / Trade-offs

**[Risk] Notes lost on localStorage clear** → Acceptable for MVP. Notes are study aids, not critical data. Future: could add export functionality.

**[Risk] No cross-device sync** → Accepted non-goal. Would require actual backend. Users can copy/paste if needed.

**[Risk] Large notes impact performance** → Mitigated by debouncing. Could add character limit if issues arise.

**[Trade-off] Plain text only** → Simpler implementation, faster delivery. Rich text can be added later if users request it.

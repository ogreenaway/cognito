## 1. LocalStorage Infrastructure

- [x] 1.1 Add `notes_${string}` to the `LocalStorageKey` union type in `utils/localStorage.ts`
- [x] 1.2 Create `getNotes(courseCode: string)` function returning `string | null`
- [x] 1.3 Create `setNotes(courseCode: string, notes: string)` function

## 2. Simulated Backend API

- [x] 2.1 Create `api/notes.ts` with `syncNotes()` async function
- [x] 2.2 Add simulated network delay (similar to favourites.ts)
- [x] 2.3 Add `notesEndpointError=true` query param check to throw error for testing

## 3. CourseNotes Component

- [x] 3.1 Create `components/CourseNotes/CourseNotes.tsx` component structure
- [x] 3.2 Create `components/CourseNotes/CourseNotes.scss` with text area and status indicator styles
- [x] 3.3 Implement multi-line text area with controlled state
- [x] 3.4 Load existing notes from localStorage on mount using `getNotes()`
- [x] 3.5 Implement debounced auto-save (1 second delay) using `setNotes()`
- [x] 3.6 Call `syncNotes()` after localStorage save
- [x] 3.7 Implement status indicator state machine (idle/saving/saved/error)
- [x] 3.8 Handle error recovery - allow continued typing after save failure

## 4. CoursePage Integration

- [x] 4.1 Import and add CourseNotes component at the bottom of CoursePage
- [x] 4.2 Pass courseCode prop to CourseNotes component

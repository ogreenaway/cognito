## Context

The application currently displays course content organized by topics → categories → subtopics. Users navigate through this hierarchy on the CoursePage, which renders SubtopicLink components for each subtopic.

The codebase already has an established local storage pattern using type-safe keys and generic getter/setter utilities (`utils/localStorage.ts`). Components follow a composition pattern with clear separation between containers and presentational components.

## Goals / Non-Goals

**Goals:**

- Enable users to mark up to 20 subtopics as favorites per course
- Provide immediate visual feedback with optimistic UI updates
- Persist favorites locally and simulate backend synchronization
- Handle errors gracefully with clear user feedback
- Follow existing codebase patterns for consistency

**Non-Goals:**

- Cross-device synchronization (this is simulated, not implemented)
- Filtering or viewing only favorites (future enhancement)
- Analytics or tracking favorite usage
- Favorites for topics or categories (only subtopics)

## Decisions

### 1. Local Storage Structure

**Decision:** Store favorites as an array of subtopic codes keyed by course code.

**Rationale:**

- Follows existing pattern: `favourites_${courseCode}` matches `course_version_${courseCode}` convention
- Array of strings is simple, efficient for the 20-item limit
- Course-scoped storage prevents conflicts between different courses

**Alternative considered:** Single global favorites list → Rejected because it doesn't scale and makes course-specific operations harder

**Implementation:**

```typescript
type LocalStorageKey =
  | `course_version_${string}`
  | `course_categories_${string}`
  | `favourites_${string}`;  // New key pattern

getFavourites(courseCode: string): string[] | null
setFavourites(courseCode: string, subtopicCodes: string[]): void
```

### 2. Component Architecture

**Decision:** Create a self-contained `FavouriteButton` component that manages its own state and localStorage.

**Rationale:**

- Separation of concerns: SubtopicLink remains a simple link component
- FavouriteButton is fully self-contained - no props drilling needed
- Reads initial state from localStorage on mount
- Manages its own visual states (normal, selected, error)
- Easier to test and reuse if needed elsewhere

**Component hierarchy:**

```
CoursePage
  └─ CategoryAccordion
      └─ Container div
          ├─ SubtopicLink (presentational)
          └─ FavouriteButton (receives only: courseCode, subtopicCode)
```

**Props interface:**

```typescript
interface FavouriteButtonProps {
  courseCode: string;
  subtopicCode: string;
}
```

**Alternative considered:** Centralized state in CoursePage → Rejected because it adds unnecessary complexity and props drilling when the component can manage itself

### 3. State Management

**Decision:** Use React useState within FavouriteButton component only.

**Rationale:**

- Component reads from localStorage on mount to determine initial state
- Manages its own selected/error states locally
- Updates localStorage directly without parent coordination
- No props drilling or lifting state up needed
- Simpler data flow and cleaner component API

**State shape (internal to FavouriteButton):**

```typescript
const [isFavourite, setIsFavourite] = useState<boolean>(false);
const [hasError, setHasError] = useState<boolean>(false);
```

**Alternative considered:** Central state management → Rejected as unnecessary for independent button states

### 4. Optimistic Update Pattern

**Decision:** Three-phase update: optimistic → API call → confirm/revert.

**Flow:**

1. User clicks star → Immediately update local state and localStorage
2. Fire-and-forget API call with 1-second delay
3. On success: No action needed (already updated)
4. On failure: Revert localStorage and show error state

**Rationale:**

- Better perceived performance (instant feedback)
- Matches modern web app patterns (Twitter likes, etc.)
- Acceptable risk given the low-stakes nature of favorites

**Error handling:**

- Track error state per subtopic (allows granular error display)
- Show "failed to save" text below the star button
- Keep UI in error state until user retries or navigates away

### 5. FavouriteButton State Machine

**Decision:** Three-state enum: `'unselected' | 'selected' | 'error'`

**Visual states:**

- **Unselected**: White/outline star, clickable
- **Selected**: Yellow filled star, clickable (to unselect)
- **Error**: Yellow filled star with "failed to save" text below, clickable (to retry)

**Rationale:**

- Clear, unambiguous states
- Error state maintains selection to show what failed
- User can retry by clicking again

**Implementation approach:**

```typescript
type FavouriteState = "unselected" | "selected" | "error";
// State derived from: isFavourite && hasError ? 'error' : isFavourite ? 'selected' : 'unselected'
```

### 6. Backend Simulation

**Decision:** Create `api/favourites.ts` with fake async function that checks query parameters.

**Rationale:**

- Isolated in API layer (easy to swap for real endpoint later)
- Query parameter check (`favouriteEndpointError=true`) allows testing without code changes
- 1-second delay simulates realistic network latency

**Implementation:**

```typescript
// Fake API
export const syncFavourite = async (
  courseCode: string,
  subtopicCode: string,
  isFavourite: boolean
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("favouriteEndpointError") === "true") {
    throw new Error("Failed to sync favourite");
  }
};
```

### 7. 20-Item Limit Enforcement

**Decision:** Check limit before allowing new favorites, show alert/toast if exceeded.

**Rationale:**

- Prevents storage bloat
- Encourages intentional curation
- Simple validation before state update

**Implementation:** Check `favourites.length < 20` before adding, show user-friendly message if full

## Risks / Trade-offs

**[Risk]** Race conditions if user rapidly toggles favorites → **Mitigation:** Each API call is independent; last write wins (acceptable for favorites)

**[Risk]** LocalStorage can be cleared/unavailable → **Mitigation:** Graceful fallbacks (empty array if null), feature degrades gracefully

**[Risk]** 20-item limit might feel arbitrary to users → **Mitigation:** Clear messaging when limit reached; can be adjusted later

**[Trade-off]** Optimistic updates can show incorrect state briefly → **Trade-off accepted:** Better UX outweighs brief inconsistency risk

**[Trade-off]** Error state persists until interaction → **Trade-off accepted:** Keeps user informed; auto-retry could be added later

## Migration Plan

Not applicable - this is a new feature with no existing data to migrate.

**Rollout:**

1. Implement components and utilities
2. Test locally with `?favouriteEndpointError=true` query parameter
3. Deploy with feature flag (optional) to allow gradual rollout
4. Monitor for localStorage quota issues (unlikely with 20-item limit)

**Rollback:** Remove FavouriteButton from SubtopicLink rendering - no data loss, feature simply disappears

## Open Questions

None - requirements are clear and technical approach is straightforward.

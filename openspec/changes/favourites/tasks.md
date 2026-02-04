## 1. Local Storage Utilities

- [x] 1.1 Add `favourites_${string}` to LocalStorageKey type in utils/localStorage.ts
- [x] 1.2 Create getFavourites(courseCode: string) function that returns string[] | null
- [x] 1.3 Create setFavourites(courseCode: string, subtopicCodes: string[]) function
- [x] 1.4 Add helper function to check if subtopic is in favourites array
- [x] 1.5 Add helper function to toggle subtopic in favourites array (add/remove with 20-item limit check)

## 2. Backend Simulation API

- [x] 2.1 Create api/favourites.ts file
- [x] 2.2 Implement syncFavourite async function with 1-second delay
- [x] 2.3 Add query parameter check for favouriteEndpointError=true
- [x] 2.4 Throw error when query param is present, resolve successfully otherwise

## 3. FavouriteButton Component

- [x] 3.1 Create components/FavouriteButton directory
- [x] 3.2 Create FavouriteButton.tsx with component interface (courseCode, subtopicCode props)
- [x] 3.3 Add useState for isFavourite and hasError states
- [x] 3.4 Add useEffect to load initial state from localStorage on mount
- [x] 3.5 Implement handleToggle function with optimistic update pattern
- [x] 3.6 Add 20-item limit check before allowing new favorites
- [x] 3.7 Call syncFavourite API and handle success/error responses
- [x] 3.8 Implement error recovery (revert localStorage on failure)
- [x] 3.9 Add star icon rendering with conditional styling (white/yellow)
- [x] 3.10 Add "failed to save" error text display
- [x] 3.11 Export FavouriteButton component

## 4. FavouriteButton Styling

- [x] 4.1 Create FavouriteButton.scss file
- [x] 4.2 Add styles for unselected state (white/outline star)
- [x] 4.3 Add styles for selected state (yellow filled star)
- [x] 4.4 Add styles for error state (yellow star with red error text)
- [x] 4.5 Add hover and active states for better UX
- [x] 4.6 Ensure button is accessible (proper cursor, focus states)

## 5. Integration with CoursePage

- [x] 5.1 Import FavouriteButton component in CoursePage.tsx
- [x] 5.2 Get courseCode from course prop to pass to FavouriteButton
- [x] 5.3 Modify SubtopicLink rendering to include FavouriteButton alongside each link
- [x] 5.4 Pass courseCode and subtopic.code as props to FavouriteButton
- [x] 5.5 Adjust layout/styling so button appears next to subtopic link

## 6. Testing and Verification

- [x] 6.1 Test marking a subtopic as favorite (star turns yellow)
- [x] 6.2 Test unmarking a favorite (star turns white)
- [x] 6.3 Test persistence (refresh page, favorites remain)
- [x] 6.4 Test 20-item limit (try adding 21st favorite, see error message)
- [x] 6.5 Test error simulation with ?favouriteEndpointError=true query param
- [x] 6.6 Test error recovery (click again after error to retry)
- [x] 6.7 Test across different courses (favorites are course-specific)
- [x] 6.8 Verify localStorage keys follow pattern: favourites\_${courseCode}

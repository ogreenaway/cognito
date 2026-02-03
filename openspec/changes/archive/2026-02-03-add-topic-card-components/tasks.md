## 1. Setup Component Structure

- [x] 1.1 Create TopicCard folder with TopicCard.tsx and TopicCard.scss
- [x] 1.2 Create TopicCard/components folder for child components
- [x] 1.3 Create TopicCardGrid folder with TopicCardGrid.tsx and TopicCardGrid.scss

## 2. SubtopicLink Component

- [x] 2.1 Create SubtopicLink.tsx with props for subtopic name and URL
- [x] 2.2 Style SubtopicLink to match design (link styling, spacing)

## 3. CategoryAccordion Component

- [x] 3.1 Create CategoryAccordion.tsx with category name prop and children
- [x] 3.2 Add useState for open/closed state (default closed)
- [x] 3.3 Add useRef for content height measurement
- [x] 3.4 Implement click handler to toggle state and calculate height
- [x] 3.5 Create ChevronIcon.tsx component with rotation support
- [x] 3.6 Add SCSS for accordion styling (header, body, transitions)
- [x] 3.7 Implement smooth height animation using calculated scrollHeight

## 4. TopicCard Component

- [x] 4.1 Create TopicCard.tsx with topicName and categories props
- [x] 4.2 Render topic name header
- [x] 4.3 Render list of CategoryAccordion components with SubtopicLinks
- [x] 4.4 Add SCSS for card styling (border, background, padding)

## 5. TopicCardGrid Component

- [x] 5.1 Create TopicCardGrid.tsx as container for TopicCard children
- [x] 5.2 Add CSS Grid layout with responsive columns (auto-fill, minmax)
- [x] 5.3 Add SCSS for grid gap and container styling

## 6. Integration

- [x] 6.1 Create static sample data matching the design reference
- [x] 6.2 Add TopicCardGrid with sample TopicCards to App.tsx for testing

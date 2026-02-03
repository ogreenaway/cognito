## Why

The application needs reusable components to display topic navigation cards organized in a grid layout. These cards allow users to browse categories and subtopics within a subject area, with expandable sections for better content organization.

## What Changes

- Add `TopicCardGrid` component that uses CSS grid to display multiple topic cards
- Add `TopicCard` component with a topic name header and list of collapsible categories
- Add `CategoryAccordion` component with smooth open/close animation (multiple can be open simultaneously)
- Add `SubtopicLink` component for navigation links within categories
- Use static data initially; dynamic data integration deferred to later

## Capabilities

### New Capabilities

- `topic-card-navigation`: Reusable components for displaying topic cards with collapsible category accordions and subtopic links in a responsive grid layout

### Modified Capabilities

<!-- None - these are new components -->

## Impact

- **New files:**
  - `src/components/TopicCard/TopicCard.tsx`
  - `src/components/TopicCard/TopicCard.scss`
  - `src/components/TopicCard/components/CategoryAccordion.tsx`
  - `src/components/TopicCard/components/SubtopicLink.tsx`
  - `src/components/TopicCardGrid/TopicCardGrid.tsx`
  - `src/components/TopicCardGrid/TopicCardGrid.scss`
- **Dependencies:** None new (uses existing React and SCSS)
- **Integration:** Components can be imported and used in App.tsx or page layouts

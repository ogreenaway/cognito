### Requirement: TopicCardGrid displays cards in responsive grid

The TopicCardGrid component SHALL render its TopicCard children in a CSS Grid layout that automatically adjusts the number of columns based on available viewport width.

#### Scenario: Multiple cards render in grid

- **WHEN** TopicCardGrid contains multiple TopicCard children
- **THEN** cards are displayed in a responsive grid layout

#### Scenario: Grid adapts to viewport width

- **WHEN** viewport width changes
- **THEN** number of columns adjusts automatically (more columns on wider viewports, fewer on narrow)

### Requirement: TopicCard displays topic name header

The TopicCard component SHALL display a topic name as a header at the top of the card.

#### Scenario: Topic name is visible

- **WHEN** TopicCard is rendered with a topicName prop
- **THEN** the topic name is displayed as the card header

### Requirement: TopicCard contains category accordions

The TopicCard component SHALL render a list of CategoryAccordion components in its body.

#### Scenario: Categories are listed in card body

- **WHEN** TopicCard is rendered with categories data
- **THEN** each category appears as a CategoryAccordion inside the card body

### Requirement: CategoryAccordion is collapsed by default

The CategoryAccordion component SHALL render in a collapsed state by default, showing only the category name.

#### Scenario: Initial collapsed state

- **WHEN** CategoryAccordion is first rendered
- **THEN** only the category name is visible
- **AND** the subtopic links are hidden

### Requirement: CategoryAccordion expands on click

The CategoryAccordion component SHALL expand to reveal its subtopic links when the user clicks on the category header.

#### Scenario: User expands accordion

- **WHEN** user clicks on a collapsed CategoryAccordion header
- **THEN** the accordion expands to show the subtopic links

#### Scenario: User collapses accordion

- **WHEN** user clicks on an expanded CategoryAccordion header
- **THEN** the accordion collapses to hide the subtopic links

### Requirement: CategoryAccordion animates smoothly

The CategoryAccordion component SHALL animate its height transition smoothly when expanding or collapsing, using calculated true height.

#### Scenario: Smooth expand animation

- **WHEN** user clicks to expand a CategoryAccordion
- **THEN** the content height animates smoothly from 0 to the true content height

#### Scenario: Smooth collapse animation

- **WHEN** user clicks to collapse a CategoryAccordion
- **THEN** the content height animates smoothly from the current height to 0

### Requirement: Multiple accordions can be open simultaneously

Each CategoryAccordion SHALL manage its own open/closed state independently, allowing multiple accordions to be open at the same time.

#### Scenario: Open second accordion while first is open

- **WHEN** one CategoryAccordion is already expanded
- **AND** user clicks on a different collapsed CategoryAccordion
- **THEN** the second accordion expands
- **AND** the first accordion remains expanded

### Requirement: CategoryAccordion displays chevron indicator

The CategoryAccordion component SHALL display a chevron icon that indicates the current expand/collapse state and rotates when toggled.

#### Scenario: Chevron indicates collapsed state

- **WHEN** CategoryAccordion is collapsed
- **THEN** chevron points downward

#### Scenario: Chevron indicates expanded state

- **WHEN** CategoryAccordion is expanded
- **THEN** chevron points upward (rotated 180°)

### Requirement: SubtopicLink renders as navigation link

The SubtopicLink component SHALL render each subtopic as a clickable link element.

#### Scenario: Subtopic displays as link

- **WHEN** SubtopicLink is rendered with a subtopic name and URL
- **THEN** the subtopic name is displayed as a clickable link
- **AND** the link has the provided href attribute

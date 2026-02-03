# Breadcrumbs Navigation

### Requirement: Breadcrumbs component renders navigation trail

The Breadcrumbs component SHALL render a horizontal navigation trail displaying: Home icon, level (e.g., "GCSE"), subject (e.g., "Biology"), exam board (e.g., "AQA"), and "Revision Notes" in sequence. The level, subject, and exam board values SHALL be configurable via props with defaults.

#### Scenario: Component renders all breadcrumb items with default values

- **WHEN** the Breadcrumbs component is rendered without props
- **THEN** it displays five items in order: home icon, "GCSE", "Biology", "AQA", "Revision Notes"
- **AND** each item except the last is followed by a separator icon

#### Scenario: Component renders with custom prop values

- **WHEN** the Breadcrumbs component is rendered with `level="A-Level"`, `subject="Chemistry"`, `examBoard="OCR"`
- **THEN** it displays five items in order: home icon, "A-Level", "Chemistry", "OCR", "Revision Notes"
- **AND** each item except the last is followed by a separator icon

### Requirement: Home icon links to root URL

The home icon (first breadcrumb item) SHALL be a clickable link that navigates to the root URL (`/`).

#### Scenario: User clicks home icon

- **WHEN** user clicks the home icon
- **THEN** the browser navigates to "/"

### Requirement: Middle navigation items show demo alert

The middle breadcrumb items (GCSE, Biology, AQA) SHALL display a JavaScript alert indicating the feature is not implemented in the demo.

#### Scenario: User clicks GCSE link

- **WHEN** user clicks the "GCSE" breadcrumb
- **THEN** a JavaScript alert is displayed with message indicating this won't be implemented in the demo

#### Scenario: User clicks Biology link

- **WHEN** user clicks the "Biology" breadcrumb
- **THEN** a JavaScript alert is displayed with message indicating this won't be implemented in the demo

#### Scenario: User clicks AQA link

- **WHEN** user clicks the "AQA" breadcrumb
- **THEN** a JavaScript alert is displayed with message indicating this won't be implemented in the demo

### Requirement: Current page item is non-interactive

The last breadcrumb item ("Revision Notes") SHALL be displayed as static text without link styling or click behavior, indicating the current page.

#### Scenario: Current page item renders as text

- **WHEN** the Breadcrumbs component is rendered
- **THEN** the last item "Revision Notes" is displayed as a span element (not a link)
- **AND** it has distinct styling (bold, different color) to indicate current location

### Requirement: Separator icons between items

Each breadcrumb item except the last SHALL be followed by a forward slash separator icon.

#### Scenario: Separators render between items

- **WHEN** the Breadcrumbs component is rendered
- **THEN** a slash separator SVG appears after the home icon
- **AND** a slash separator SVG appears after "GCSE"
- **AND** a slash separator SVG appears after "Biology"
- **AND** a slash separator SVG appears after "AQA"
- **AND** no separator appears after "Revision Notes"

### Requirement: Mobile horizontal scroll behavior

On viewports narrower than 576px, the breadcrumbs container SHALL scroll horizontally with hidden scrollbar and fade effects at the edges.

#### Scenario: Mobile viewport enables horizontal scroll

- **WHEN** the viewport width is less than 576px
- **AND** breadcrumb content exceeds container width
- **THEN** the breadcrumbs container scrolls horizontally
- **AND** the scrollbar is hidden
- **AND** fade gradients appear at container edges

#### Scenario: Desktop viewport shows all items

- **WHEN** the viewport width is 576px or greater
- **THEN** all breadcrumb items are visible without scrolling
- **AND** no fade gradients are displayed

### Requirement: Breadcrumbs accepts dynamic props

The Breadcrumbs component SHALL accept optional `subject`, `examBoard`, and `level` props to customize the displayed navigation trail.

#### Scenario: Props have sensible defaults

- **WHEN** the Breadcrumbs component is rendered without props
- **THEN** `level` defaults to "GCSE"
- **AND** `subject` defaults to "Biology"
- **AND** `examBoard` defaults to "AQA"

#### Scenario: Props override defaults

- **WHEN** the Breadcrumbs component is rendered with `subject="Physics"`
- **THEN** "Physics" is displayed instead of "Biology"
- **AND** other values use their defaults

### Requirement: Breadcrumb URLs reflect prop values

The breadcrumb links SHALL use the prop values (lowercased) to construct URLs.

#### Scenario: URLs constructed from prop values

- **WHEN** Breadcrumbs is rendered with `level="GCSE"`, `subject="Biology"`, `examBoard="AQA"`
- **THEN** the level link href is `/gcse/`
- **AND** the subject link href is `/gcse/biology/`
- **AND** the exam board link href is `/gcse/biology/aqa/`

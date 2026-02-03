# Page Layout

### Requirement: Page component centers content

The Page component SHALL render a container that centers its children with a responsive max-width.

#### Scenario: Content is centered on desktop

- **WHEN** the Page component is rendered on a viewport 992px or wider
- **THEN** the content is horizontally centered with max-width constraint
- **AND** horizontal padding is applied (px-lg-5 equivalent)

#### Scenario: Content is full-width on mobile

- **WHEN** the Page component is rendered on a viewport less than 576px
- **THEN** the content spans the full width with appropriate padding

### Requirement: Page component provides vertical spacing

The Page component SHALL apply consistent vertical padding to its content.

#### Scenario: Vertical padding is applied

- **WHEN** the Page component is rendered
- **THEN** vertical padding (py-5 equivalent) is applied to the container

### Requirement: Page component renders children

The Page component SHALL render its children within the centered container.

#### Scenario: Children are rendered

- **WHEN** the Page component receives child elements
- **THEN** those children are rendered inside the page container

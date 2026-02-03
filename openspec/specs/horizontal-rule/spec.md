# Horizontal Rule

### Requirement: HR renders horizontal line

The HR component SHALL render a horizontal border separator.

#### Scenario: Horizontal line renders

- **WHEN** the HR component is rendered
- **THEN** it displays a horizontal line spanning the container width

### Requirement: HR uses border styling

The HR component SHALL use a bottom border style (not an hr element) matching the design.

#### Scenario: Border styling matches design

- **WHEN** the HR component is rendered
- **THEN** it uses a div with border-bottom
- **AND** the border color matches the design (uses color from constants)
- **AND** the border width is 1px

### Requirement: HR has no visible height

The HR component SHALL have no visible content height, only the border.

#### Scenario: Component has minimal height

- **WHEN** the HR component is rendered
- **THEN** it has no content height (only border is visible)

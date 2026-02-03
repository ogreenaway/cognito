# Style Constants

### Requirement: Breakpoint variables are defined

The constants SHALL define SCSS variables for responsive breakpoints matching the design documentation.

#### Scenario: Mobile breakpoint is available

- **WHEN** a component imports the breakpoints constants
- **THEN** it can use the mobile breakpoint variable (max-width: 575.98px)

#### Scenario: Large breakpoint is available

- **WHEN** a component imports the breakpoints constants
- **THEN** it can use the large breakpoint variable (min-width: 992px)

### Requirement: Color variables are defined

The constants SHALL define SCSS variables for the color palette used across components. Additionally, the constants SHALL provide CSS variable references that map to Bootstrap's CSS custom properties for runtime theming support.

#### Scenario: Muted text color is available

- **WHEN** a component imports the colors constants
- **THEN** it can use the muted text color variable (#6e6e6e or similar)

#### Scenario: Body text color is available

- **WHEN** a component imports the colors constants
- **THEN** it can use the body text color variable (#212529 or similar)

#### Scenario: Border color is available

- **WHEN** a component imports the colors constants
- **THEN** it can use the border color variable for separators and badges

#### Scenario: CSS variable references are available

- **WHEN** a component needs runtime theming support
- **THEN** it can use CSS variable references (e.g., `$var-text-muted: var(--bs-secondary-color)`)

#### Scenario: SCSS and CSS variables are synchronized

- **WHEN** the SCSS variable `$color-text-muted` is #6e6e6e
- **THEN** the corresponding CSS variable `--bs-secondary-color` is also overridden to #6e6e6e

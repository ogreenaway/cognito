## ADDED Requirements

### Requirement: Breakpoint variables are defined

The constants SHALL define SCSS variables for responsive breakpoints matching the design documentation.

#### Scenario: Mobile breakpoint is available

- **WHEN** a component imports the breakpoints constants
- **THEN** it can use the mobile breakpoint variable (max-width: 575.98px)

#### Scenario: Large breakpoint is available

- **WHEN** a component imports the breakpoints constants
- **THEN** it can use the large breakpoint variable (min-width: 992px)

### Requirement: Color variables are defined

The constants SHALL define SCSS variables for the color palette used across components.

#### Scenario: Muted text color is available

- **WHEN** a component imports the colors constants
- **THEN** it can use the muted text color variable (#6e6e6e or similar)

#### Scenario: Body text color is available

- **WHEN** a component imports the colors constants
- **THEN** it can use the body text color variable (#212529 or similar)

#### Scenario: Border color is available

- **WHEN** a component imports the colors constants
- **THEN** it can use the border color variable for separators and badges

# Bootstrap Theming

### Requirement: Bootstrap 5.3 CSS is loaded

The application SHALL load Bootstrap 5.3.3 CSS via CDN with integrity verification.

#### Scenario: Bootstrap CSS is available

- **WHEN** the application loads
- **THEN** Bootstrap 5.3.3 CSS is loaded from the jsdelivr CDN with integrity hash

### Requirement: Theme colors override Bootstrap defaults

The application SHALL override Bootstrap CSS custom properties to match the design color palette.

#### Scenario: Secondary color matches design muted color

- **WHEN** a component uses Bootstrap's `text-secondary` class
- **THEN** the text color is #6e6e6e (not Bootstrap's default #6c757d)

#### Scenario: Custom color variables are defined

- **WHEN** a component needs the spacer color
- **THEN** it can use the CSS variable `--color-spacer` (#b0b0b0)

#### Scenario: Custom hover color is defined

- **WHEN** a component needs the muted hover color
- **THEN** it can use the CSS variable `--color-muted-hover` (#4a4a4a)

### Requirement: Theme overrides are centralized

The theme color overrides SHALL be defined in a single location (index.scss) using CSS custom properties on the `:root` selector.

#### Scenario: All overrides in one file

- **WHEN** a developer needs to modify theme colors
- **THEN** they edit only `index.scss` to update the `:root` CSS variables

#### Scenario: Overrides work with CDN Bootstrap

- **WHEN** Bootstrap is loaded via CDN (not compiled from source)
- **THEN** the CSS variable overrides still apply correctly

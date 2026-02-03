# Page Title

### Requirement: PageTitle renders two-part heading

The PageTitle component SHALL render an H1 element with "AQA GCSE Biology" as muted text followed by "Revision Notes" as bold text.

#### Scenario: Title renders with correct structure

- **WHEN** the PageTitle component is rendered
- **THEN** it displays an H1 element
- **AND** "AQA GCSE Biology" appears in muted/subdued color
- **AND** "Revision Notes" appears in bold, darker color

### Requirement: PageTitle uses appropriate typography

The PageTitle component SHALL use heading typography that matches the design (h2 size styling on h1 element).

#### Scenario: Typography matches design

- **WHEN** the PageTitle component is rendered
- **THEN** the font size matches the design documentation (h2 equivalent)
- **AND** the muted portion uses color #6e6e6e or similar
- **AND** the bold portion uses the body text color

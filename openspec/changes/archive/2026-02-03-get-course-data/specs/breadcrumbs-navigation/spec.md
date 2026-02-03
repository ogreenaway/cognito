# Breadcrumbs Navigation

## MODIFIED Requirements

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

## ADDED Requirements

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

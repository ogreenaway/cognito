# Exam Code

## MODIFIED Requirements

### Requirement: ExamCode renders badge with code

The ExamCode component SHALL render a badge displaying "Exam code:" followed by the code value. The code SHALL be configurable via a prop with a default value.

#### Scenario: Badge content renders with default code

- **WHEN** the ExamCode component is rendered without props
- **THEN** it displays "Exam code:" in bold
- **AND** it displays "8461" after the label

#### Scenario: Badge content renders with custom code

- **WHEN** the ExamCode component is rendered with `code="9999"`
- **THEN** it displays "Exam code:" in bold
- **AND** it displays "9999" after the label

## ADDED Requirements

### Requirement: ExamCode accepts code prop

The ExamCode component SHALL accept an optional `code` prop to customize the displayed exam code.

#### Scenario: Code prop has default value

- **WHEN** the ExamCode component is rendered without a `code` prop
- **THEN** the code defaults to "8461"

#### Scenario: Code prop overrides default

- **WHEN** the ExamCode component is rendered with `code="1234"`
- **THEN** "1234" is displayed instead of "8461"

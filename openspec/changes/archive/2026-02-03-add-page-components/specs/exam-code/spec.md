## ADDED Requirements

### Requirement: ExamCode renders badge with code

The ExamCode component SHALL render a badge displaying "Exam code: 8461" with the label in bold.

#### Scenario: Badge content renders correctly

- **WHEN** the ExamCode component is rendered
- **THEN** it displays "Exam code:" in bold
- **AND** it displays "8461" after the label

### Requirement: ExamCode has badge styling

The ExamCode component SHALL be styled as a bordered badge with rounded corners and subtle background.

#### Scenario: Badge has correct visual styling

- **WHEN** the ExamCode component is rendered
- **THEN** it has a border (1px solid, border color from constants)
- **AND** it has rounded corners (0.5rem border-radius)
- **AND** it has a subtle background color
- **AND** it has appropriate padding (0.5rem 0.75rem)

### Requirement: ExamCode displays inline

The ExamCode component SHALL display as an inline-block element.

#### Scenario: Badge displays inline

- **WHEN** the ExamCode component is rendered
- **THEN** it displays as inline-block
- **AND** it does not take full width

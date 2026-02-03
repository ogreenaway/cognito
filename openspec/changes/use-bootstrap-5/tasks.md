## 1. Bootstrap Infrastructure

- [x] 1.1 Upgrade Bootstrap CDN link from 5.0.2 to 5.3.3 in `index.html`
- [x] 1.2 Add Bootstrap CSS variable overrides to `index.scss` (--bs-secondary-color, --color-spacer, --color-muted-hover)
- [x] 1.3 Update `_colors.scss` to include CSS variable references alongside SCSS variables

## 2. Simple Component Migrations

- [x] 2.1 Migrate Page component to use Bootstrap container utilities (`container py-5 px-lg-5`)
- [x] 2.2 Migrate HR component to use Bootstrap border utility (`border-bottom`)
- [x] 2.3 Migrate PageTitle component to use Bootstrap typography classes (`h2`, `text-secondary`)
- [x] 2.4 Migrate ExamCode component to use Bootstrap utilities (`d-inline-block p-2 border rounded bg-body-secondary text-secondary`)

## 3. Grid and Card Migrations

- [x] 3.1 Migrate TopicCardGrid to use Bootstrap row/column grid (`row gy-4`, `col-md-6`)
- [x] 3.2 Migrate TopicCard container to use Bootstrap card-like utilities (`bg-body-secondary border rounded`)
- [x] 3.3 Migrate TopicCard header to use Bootstrap utilities (`py-4 px-3 border-bottom`, `h6 mb-0`)
- [x] 3.4 Migrate TopicCard body to use Bootstrap spacing (`p-3 pb-0`)

## 4. Accordion Migrations

- [x] 4.1 Migrate CategoryAccordion container to use Bootstrap utilities (`rounded bg-body mb-3 border`)
- [x] 4.2 Migrate CategoryAccordion header button to use Bootstrap button classes (`btn btn-link w-100`)
- [x] 4.3 Migrate CategoryAccordion subtopic links to use Bootstrap link utilities (`d-block link-body-emphasis`)
- [x] 4.4 Keep custom CSS for chevron icon circle (not available in Bootstrap)

## 5. Breadcrumbs Migration

- [x] 5.1 Migrate Breadcrumbs wrapper to use Bootstrap margin utility (`mb-4`)
- [x] 5.2 Migrate Breadcrumbs links to use Bootstrap text decoration (`text-decoration-underline`)
- [x] 5.3 Keep custom CSS for horizontal scroll behavior and fade gradients
- [x] 5.4 Keep custom CSS for diagonal separator SVG color

## 6. Cleanup

- [x] 6.1 Remove unused custom CSS from component SCSS files
- [ ] 6.2 Verify visual consistency matches design screenshots
- [ ] 6.3 Test responsive behavior at mobile/tablet/desktop breakpoints

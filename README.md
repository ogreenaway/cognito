# How to run locally

In the frontend folder, run:
`npm install`
`npm start`

Visit `http://localhost:3000/`

Run the tests using `npm test`

# Tech stack

- Initial [React](https://react.dev/) app created in [TypeScript](https://www.typescriptlang.org/) by [Create React App](https://create-react-app.dev/)
- Testing: Jest, MSW
- Styling: SCSS and Bootstrap
- Apollo for API calls

# Technical decisions

- Testing: As real as possible. RTL because it's customer centric. Shadow file system
- 404 page
- Error boundary
- Styling: Scss to match your teddy stack and bootstrap to match the competition. BEM naming. Outdoor with unique names
- Storybook for fat feedback from designer and pm
- Selenium end to end tests
- Observability. Error logging and metrics. Add nick functions
- Reusable components. Card, page title
- Few API calls at possible. Small as possible
- Typescript. Generate API types
- AI generated categories
- Open spec

# If had more time and was building this for production I would:

- Create React App: Migrate to Vite

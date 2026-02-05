# Intro

Here's [a Loom I've recorded on how I use AI.](https://www.loom.com/share/6dab498ed1f244778e11bb66fc146b6b)

# How to run locally

In the root folder, create an `.env` file with your API key:

`REACT_APP_OPENAI_API_KEY=[OPEN AI API KEY]`

In the frontend folder, run:
`npm install`
`npm start`

Visit `http://localhost:3000/`

Run the tests using `npm test`

# Technical decisions and what I'd do if I had more time

### Matches the Save My Exams design

Save My Exams uses the Bootstrap css framework, a Google font, and some custom colours. To match them, I also used bootstrap and to match your tech stack, I used SCSS. Using Bootstrap mainly helped with matching their breakpoints, so it was easier to match the responsive design. I mainly tried to create reusable components (Page, PageTitle, Card, etc) to make the codebase easier to maintain and so that it's consistent for customers.

If I had more time, I would work closely with a designer to create a design system with tokens and a colour palette. We could then incorporate that into a Bootstrap theme or create our own SCSS framework from scratch.

### Implements a favourites feature

I added a star icon to each subtopic so a customer can select their favourites. It then stores it in local storage so the UI is optimistic and then makes a fake backend API call.

The query param `?favouriteEndpointError=true` can be used to trigger an error response in the fake backend.

If I had more time, I would test this feature more because there are quite a few customer journeys.

### Caches data intelligently

I used Apollo for all the GraphQL calls because it's easy to maintain and has a global cache.

I decided not to cache the initial course data API call. I didn't cache it because if we add or remove a topic or subtopic, we would be doing that because we think it improves the customers' experience, and so we would also want it to be shown to customers as soon as possible. On the other hand, I heavily cache the subsequent API calls because if the course has the same version,n then it should be unchanged.

Async JavaScript code can quickly become confusing, and so I tried to make it as easy for other engineers to understand.

I created a React component, CoursePageWrapper, to get the initial course data, check the version and decide if it should use the local storage cache or make fresh API calls.

The topic, subtopic, and LLM calls need to be made sequentially, and so I created a custom hook (useTopicData) with an async function to try to increase readability.

To handle errors, I decided to throw them immediately and catch them in an Error Boundary because this also keeps the logic very easy to read and follow.

If I had more time, I would add more testing for each API failing to check the Error Boundary, and a useful message would always be shown. I would also work with a backend engineer to try to update the GraphQL to allow getting all the subtopics in one API call. The app's latency could be greatly reduced if we could merge the concurrent API calls.

### Handles subtopic navigation

Unless I've misunderstood, I think this was pretty easy. I just created the href for the link.

### Implements a notes feature

I reused a lot of the helper functions and patterns I had used to create the favourites feature.

### LLM-generated categories

As explained at the end of the Loom, I gave the LLM all the context it needed to create the categories. I used a formatted schema for its response because I need an array of objects I could parse and display, not just text. To make the API call quicker and cheaper, I minimised the amount of info it needed to return, down to just the minimum IDs.

I picked a cheaper and faster model to help speed up the API, and I created a dynamic loading state to show the progress. I ran the API calls in parallel to reduce latency, but that does increase costs.

If I had more time, I would work with the PM and Backend to generate these categories in advance so that customers never have to wait for them to be generated.

### Testing

I think React Testing Library is the best testing framework because it is very customer-centric. I created a `renderApp` helper function, which renders most of the real app, which makes the RTL very realistic and very likely match what a customer experiences. I try to mock as little as possible, and so only mock things like local storage and API calls using MSW.

If I had more time, I would add more unit and integration tests. In the real world, I would also add some end-to-end Selenium tests. I used JSDOM, but I would explore using Vite instead.

### Storybook

If I had more time, I would add a storybook of all the reusable components. This is useful for designers to review, but also helps engineers build new features and get early feedback.

### Observability

If I had more time, I would add pageview and interaction tracking. I would also add error logging and performance measuring.

### API Types

In the real world, I would work with a backend engineer to create a system to generate TypeScript types for an endpoint based on their documentation. For this project, I just wrote the type myself.

# Screenshots

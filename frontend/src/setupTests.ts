// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Polyfill for react-router v7 (uses TextEncoder)
import { TextDecoder, TextEncoder } from "util";

import { server } from "./tests/mocks/server";
Object.assign(global, { TextEncoder, TextDecoder });


// Start MSW server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test (important for test isolation)
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());

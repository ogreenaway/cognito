// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { ReadableStream, TransformStream, WritableStream } from "stream/web";
// Polyfill for MSW v2 compatibility with Jest - MUST be first
import { TextDecoder, TextEncoder } from "util";

import { Blob } from "buffer";

// Mock BroadcastChannel for MSW
class BroadcastChannelMock {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
  onmessage = null;
  onmessageerror = null;
}

Object.assign(global, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  TransformStream,
  WritableStream,
  Blob,
  BroadcastChannel: BroadcastChannelMock,
});


// Import server after polyfills are set up
const { server } = require("./tests/mocks/server");

// Start MSW server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test (important for test isolation)
afterEach(() => server.resetHandlers());

// Clean up after all tests are done
afterAll(() => server.close());

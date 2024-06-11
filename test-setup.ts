import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { afterAll, afterEach, beforeAll } from "bun:test";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { getHandlers } from "@/utils/test-utils";

export const server = setupServer(...getHandlers());

GlobalRegistrator.register();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

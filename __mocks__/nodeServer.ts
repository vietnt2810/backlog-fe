import { setupServer } from "msw/node";
import handlers from "./handlers";

beforeAll(() => mockNodeServer.listen());
afterEach(() => {
  mockNodeServer.resetHandlers();
});
afterAll(() => mockNodeServer.close());

export const mockNodeServer = setupServer(...handlers);

export default {
  get: jest.fn(() => Promise.resolve({ data: "mocked" })),
  put: jest.fn(() => Promise.resolve({ data: "mocked" })),
};

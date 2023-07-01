import routeBuilder from "../../src/service/routeBuilder";

describe("routeBuilder", () => {
  it("has a home route", () => {
    expect(routeBuilder("home").route).toBe("/");
  });

  it("generates a home route", () => {
    expect(routeBuilder("home").generate()).toBe("/");
  });
});

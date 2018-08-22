import getRange from "./getRange";
describe("getRange", () => {
  it("should range entire range when more than 10", () => {
    expect(getRange(2, 20)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should range total pages since less than 10", () => {
    expect(getRange(2, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("should range total pages since current page less than 10", () => {
    expect(getRange(5, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should range total pages since current page less than 10", () => {
    expect(getRange(11, 20)).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it("should range total pages to a max pages", () => {
    expect(getRange(16, 17)).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
  });

  it("should range last 9 for last page", () => {
    expect(getRange(17, 17)).toEqual([9, 10, 11, 12, 13, 14, 15, 16, 17]);
  });
});

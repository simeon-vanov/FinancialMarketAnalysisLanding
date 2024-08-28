import { IPageParameters } from "./models";

export const generatePaginatedRequestQueryStringParams = (
  pageParameters: IPageParameters
) => {
  const paramsArray = [
    ["page", (pageParameters.page).toString()],
    ["pageSize", pageParameters.pageSize.toString()],
  ];

  if (pageParameters.sortBy) {
    paramsArray.push(["sortBy", pageParameters.sortBy.toString()]);
  }

  return paramsArray;
};

import _ from "lodash";

const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize; //calculating the start index of items from this pageNumber
  return _(items).slice(startIndex).take(pageSize).value();
};

export default paginate;

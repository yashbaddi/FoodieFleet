export function getUpdateExpression(updatedData) {
  const values = [];
  let updatePartialQuery = "";
  let index = 0;
  Object.entries(updatedData).forEach(([key, value]) => {
    updatePartialQuery = updatePartialQuery + ` ${key}=$${index + 1},`;
    values.push(value);
    index++;
  });
  return [updatePartialQuery.slice(0, -1), values];

  //   return { expression: expression.slice(0, -1), values: values };
}

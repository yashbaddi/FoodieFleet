export function getUpdateExpression(obj) {
  const values = [];
  let expression = "";
  let index = 0;
  Object.entries(obj).map(([key, value]) => {
    if (typeof value !== "object") {
      expression = expression + ` ${key}=$${index + 1},`;
      values.push(value);
      index++;
    }
  });
  return [expression.slice(0, -1), values];

  //   return { expression: expression.slice(0, -1), values: values };
}

export function ConvertToQuery(path, array) {
  if (!Array.isArray(array) || array.length === 0) {
    return "";
  }
  let queryParams = [];
  array.forEach((obj) => {
    for (let key in obj) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
      );
    }
  });

  return path + "?" + queryParams.join("&");
}

let searchParamsString = "";

export function setSearchParamString(url) {
  const paramString = new URL(url).search;
  searchParamsString = paramString;
}

export function getSearchParamString() {
  return searchParamsString;
}

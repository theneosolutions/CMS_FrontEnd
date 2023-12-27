export function BrandId() {
  const brand = JSON.parse(localStorage.getItem("brand"));
  return brand?.brandId;
}

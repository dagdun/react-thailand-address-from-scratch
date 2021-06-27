export function searchAddressByDistrict(search: string, maxResult: number) {}
export function searchAddressByAmphoe(search: string, maxResult: number) {}
export function searchAddressByProvince(search: string, maxResult: number) {}
export function searchAddressByZipcode(search: string, maxResult: number) {}

export interface AddressIf {
  district: string;
  amphoe: string;
  province: string;
  zipcode: string;
}

// export type addressField = "district" | "amphoe" | "province" | "zipcode";

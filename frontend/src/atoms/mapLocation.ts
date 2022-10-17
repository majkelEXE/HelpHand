import { atom } from 'recoil';

const mapLocationState = atom<{
  latitude: number;
  longitude: number;
  zoom: number;
}>({
  key: "mapLocation",
  default: { longitude: 19.211946, latitude: 52.112795, zoom: 6 },
});

export default mapLocationState;

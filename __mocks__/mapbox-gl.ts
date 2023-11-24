const mapboxgl = {};

export default mapboxgl;

export const mapOnSpy = jest.fn();
export const mapAddSourceSpy = jest.fn();
export const mapAddLayerSpy = jest.fn();
export const mapSetFeatureStateSpy = jest.fn();
export const mapAddControlSpy = jest.fn();
export const mapRemoveSpy = jest.fn();

export const markerAddToSpy = jest.fn();
export const markerSetLngLatSpy = jest.fn();

export const mapConstructorMock = jest.fn().mockImplementation(() => ({
  on: mapOnSpy,

  addSource: mapAddSourceSpy,

  addLayer: mapAddLayerSpy,

  setFeatureState: mapSetFeatureStateSpy,

  addControl: mapAddControlSpy,

  remove: mapRemoveSpy,
}));

export const Map = mapConstructorMock;

export const Marker = jest.fn().mockImplementation(() => ({
  setLngLat: markerSetLngLatSpy,
  addTo: markerAddToSpy,
}));

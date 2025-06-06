export const mapOnSpy = jest.fn();
export const mapOffSpy = jest.fn(); // Added for map.off
export const mapAddSourceSpy = jest.fn();
export const mapAddLayerSpy = jest.fn();
export const mapSetFeatureStateSpy = jest.fn();
export const mapAddControlSpy = jest.fn();
export const mapRemoveSpy = jest.fn();
export const mapIsStyleLoadedSpy = jest.fn();
export const mapGetSourceSpy = jest.fn();
export const mapQuerySourceFeaturesSpy = jest.fn();

export const markerAddToSpy = jest.fn();
export const markerSetLngLatSpy = jest.fn();

export const mapConstructorMock = jest.fn().mockImplementation(() => ({
  on: mapOnSpy,
  off: mapOffSpy,
  addSource: mapAddSourceSpy,
  addLayer: mapAddLayerSpy,
  setFeatureState: mapSetFeatureStateSpy,
  addControl: mapAddControlSpy,
  remove: mapRemoveSpy,
  isStyleLoaded: mapIsStyleLoadedSpy,
  getSource: mapGetSourceSpy,
  querySourceFeatures: mapQuerySourceFeaturesSpy,
  getCanvas: jest.fn().mockReturnValue({ style: {} }),
}));

export const Map = mapConstructorMock;

export const Marker = jest.fn().mockImplementation(() => ({
  setLngLat: markerSetLngLatSpy,
  addTo: markerAddToSpy,
}));

const mapboxgl = {
  Map: mapConstructorMock,
  Marker: Marker,
  LngLatBounds: jest
    .fn()
    .mockImplementation(([west, south], [east, north]) => ({
      getCenter: jest.fn().mockReturnValue({
        lng: (west + east) / 2,
        lat: (south + north) / 2,
      }),
    })),
  NavigationControl: jest.fn().mockImplementation(() => ({})),
};

export default mapboxgl;

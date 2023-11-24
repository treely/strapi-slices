export const MAPBOX_TOKEN =
  'pk.eyJ1IjoidHJlZS1seSIsImEiOiJja25rNG1heHgwNThjMnZwZTl2eThmeXUwIn0.SOrYUKfevZkbx8jZPxJesA';

export enum MapBoxStyle {
  Outdoors = 'mapbox://styles/mapbox/outdoors-v11',
  SatelliteStreets = 'mapbox://styles/mapbox/satellite-streets-v11',
  Satellite = 'mapbox://styles/mapbox/satellite-v9',
  CaliTerrain = 'mapbox://styles/tree-ly/clna54iq603ht01pbc199cszw',
}

export const MAPBOX_TILES_URL = `${
  process.env.NEXT_PUBLIC_MAPBOX_TILES_URL || 'http://localhost:8123'
}/vectortiles/v1/plots/{z}/{x}/{y}.mvt`;
export const MAPBOX_SOURCE_LAYER = 'plots';
export const MAPBOX_SOURCE_IDENTIFIER = 'plots';
export const MAPBOX_BORDER_LAYER_IDENTIFIER = 'plots-borders';
export const MAPBOX_FILL_LAYER_IDENTIFIER = 'plots-fill';
export const MAPBOX_TEXT_LAYER_IDENTIFIER = 'plots-text';

export const MAPBOX_TEXT_MIN_ZOOM = 15;
export const MAPBOX_SHAPES_MIN_ZOOM = 13;

export const MAPBOX_MAX_ZOOM = 19;
export const MAPBOX_INITIAL_ZOOM = 13;

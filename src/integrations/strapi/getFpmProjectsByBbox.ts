import { FeatureCollection } from 'geojson';
import fpmClient from '../fpmClient';

const getFpmProjectsByBbox = async (
  bbox: string,
  preview: boolean = false
): Promise<FeatureCollection> => {
  const [west, south, east, north] = bbox.split(',').map(Number);
  const cache = preview ? false : undefined;

  const fpmResponse = await fpmClient.get<FeatureCollection>(
    '/public/projects',
    {
      params: {
        bbox: `${west},${south},${east},${north}`,
      },
      cache,
    }
  );

  return fpmResponse.data;
};

export default getFpmProjectsByBbox;

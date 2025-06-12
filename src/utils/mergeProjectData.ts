import { FeatureCollection } from 'geojson';
import { IStrapiData, StrapiProject } from '..';

const mergeProjectData = (
  featureCollection: FeatureCollection,
  strapiProjects: Map<string, IStrapiData<StrapiProject>>
): FeatureCollection => {
  // Add slug and portfolioHost to each feature's properties if we have Strapi data
  const mergedFeatureCollection = {
    ...featureCollection,
    features: featureCollection.features.map((feature) => {
      const fpmProjectId = feature.properties?.id;
      const strapiProject = fpmProjectId
        ? strapiProjects.get(fpmProjectId)
        : null;

      if (strapiProject) {
        feature.properties = {
          ...feature.properties,
          slug: strapiProject.attributes.slug || undefined,
          portfolioHost:
            strapiProject.attributes.portfolio?.data?.attributes.host ||
            undefined,
        };
      }

      return feature;
    }),
  };

  return mergedFeatureCollection;
};

export default mergeProjectData;

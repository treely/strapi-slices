import FPMProject from '../../models/fpm/FPMProject';
import fpmClient from '../fpmClient';

const getFpmProjectById = async (projectId: string): Promise<FPMProject> => {
  const fpmResponse = await fpmClient.get<FPMProject>(
    `/public/projects/${projectId}`
  );

  return fpmResponse.data;
};

export default getFpmProjectById;

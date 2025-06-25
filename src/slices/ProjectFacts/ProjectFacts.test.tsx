import React from 'react';
import { render, screen, waitFor } from '../../test/testUtils';
import ProjectFacts from '.';
import { ProjectFactsProps } from './ProjectFacts';
import portfolioProjectMock from '../../test/mocks/portfolioProjectMock';
import getFpmProjectById from '../../integrations/strapi/getFpmProjectById';

// Mock the getFpmProjectById function
jest.mock('../../integrations/strapi/getFpmProjectById');
const mockGetFpmProjectById = getFpmProjectById as jest.MockedFunction<
  typeof getFpmProjectById
>;

const defaultProps: ProjectFactsProps = {
  slice: {
    projectId: 'project-id-1',
  },
};

const setup = (props: Partial<ProjectFactsProps> = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectFacts {...combinedProps} />);
};

describe('The ProjectFacts slice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays error message if there is no project', () => {
    setup();

    expect(
      screen.getByText(
        'Invalid configuration, check if a project this id exists in the FPM'
      )
    ).toBeInTheDocument();
  });

  it('displays loading state when fetching project data', () => {
    // Mock a delayed response to test loading state
    mockGetFpmProjectById.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(portfolioProjectMock), 100)
        )
    );

    setup({ project: portfolioProjectMock });

    expect(screen.getByText('Loading project data...')).toBeInTheDocument();
  });

  it('displays the enhanced project info with averageSellableAmountPerYear from FPM data', async () => {
    // Create enhanced FPM data with different averageSellableAmountPerYear
    const enhancedFpmData = {
      ...portfolioProjectMock,
      averageSellableAmountPerYear: 1200000, // Value from FPM findOne project
    };

    mockGetFpmProjectById.mockResolvedValue(enhancedFpmData);

    setup({ project: portfolioProjectMock });

    await waitFor(() => {
      expect(mockGetFpmProjectById).toHaveBeenCalledWith(
        portfolioProjectMock.id
      );
    });

    await waitFor(() => {
      expect(mockGetFpmProjectById).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(
        screen.queryByText('Loading project data...')
      ).not.toBeInTheDocument();

      expect(screen.getByText('1,200 tCO₂/year')).toBeInTheDocument();
    });
  });
});

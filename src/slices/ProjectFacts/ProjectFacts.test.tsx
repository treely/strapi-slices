import { render, screen } from '@/test/testUtils';
import ProjectFacts from '.';
import { ProjectFactsProps } from './ProjectFacts';
import portfolioProjectMock from '@/test/mocks/portfolioProjectMock';

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
  it('displays nothing if there is no project', () => {
    setup();

    expect(
      screen.getByText(
        'Invalid configuration, check if a project this id exists in the FPM'
      )
    ).toBeInTheDocument();
  });

  it('displays the project info if there is a project', () => {
    setup({ project: portfolioProjectMock });

    expect(
      screen.getByText(portfolioProjectMock.location || '')
    ).toBeInTheDocument();
  });
});

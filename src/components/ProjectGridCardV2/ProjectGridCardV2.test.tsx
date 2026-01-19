import { render, screen } from '../../test/testUtils';
import { ProjectGridCardV2Props } from './ProjectGridCardV2';
import ProjectGridCardV2 from '.';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import messagesEnCertificationBadge from '../CertificationBadge/messages.en';
import messagesEnCreditsAvailableBadge from '../CreditsAvailableBadge/messages.en';

const defaultProps: ProjectGridCardV2Props = {
  project: {
    ...fpmProjectMock,
    slug: 'slug',
    thumbnail: { img: { data: strapiMediaMock }, alt: 'Alt Text', id: 1 },
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectGridCardV2 {...combinedProps} />);
};

describe('The ProjectGridCardV2 component', () => {
  it('displays the project title', () => {
    setup();

    expect(screen.getByText(fpmProjectMock.title)).toBeInTheDocument();
  });

  it('displays the project thumbnail', () => {
    setup();

    expect(screen.getByRole('img')).toHaveProperty('alt', 'Alt Text');
  });

  it('displays the project type badge', () => {
    setup();

    expect(screen.getByText('Project Type 1')).toBeInTheDocument();
  });

  it('displays the certification in progress badge when not certified', () => {
    setup({
      project: {
        ...defaultProps.project,
        certificationDate: undefined,
      },
    });

    expect(
      screen.getByText(
        messagesEnCertificationBadge[
          'components.certificationBadge.certificationInProgress'
        ]
      )
    ).toBeInTheDocument();
  });

  it('displays the certified badge when certified', () => {
    setup({
      project: {
        ...defaultProps.project,
        certificationDate: new Date('2020-01-01'),
      },
    });

    expect(screen.getByText('Certified, 2020')).toBeInTheDocument();
  });

  it('displays the credits available badge', () => {
    setup();

    expect(
      screen.getByText(
        messagesEnCreditsAvailableBadge[
          'components.creditsAvailableBadge.text.yes'
        ]
      )
    ).toBeInTheDocument();
  });

  it('displays the project location with country flag', () => {
    setup();

    expect(screen.getByText('Austria 🇦🇹')).toBeInTheDocument();
  });

  it('displays the project area', () => {
    setup();

    expect(screen.getByText('140 ha')).toBeInTheDocument();
  });
});

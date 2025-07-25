import React from 'react';
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '../../../test/testUtils';
import portfolioProjectMock from '../../../test/mocks/portfolioProjectMock';
import ProjectInfo from '.';
import { ProjectInfoProps } from './ProjectInfo';
import messagesEn from './messages.en';

const defaultProps: ProjectInfoProps = {
  project: portfolioProjectMock,
  subtitles: {
    areaSubtitle: 'Area subtitle',
    locationSubtitle: 'Location subtitle',
    startSubtitle: 'Start subtitle',
    timeSpanSubtitle: 'Time span subtitle',
    projectTypeSubtitle: 'Project type subtitle',
    projectDeveloperSubtitle: 'Project developer subtitle',
    verificationStandardSubtitle: 'Verification standard subtitle',
    averageSellableAmountPerYearSubtitle:
      'Average sellable amount per year subtitle',
    riskBufferSubtitle: 'Risk buffer subtitle',
    buyCreditsSubtitle: 'Buy credits subtitle',
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ProjectInfo {...combinedProps} />);
};

describe('The ProjectInfo component', () => {
  it('renders an existing slice without errors', () => {
    setup();

    expect(screen.getByText('Project Area')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Project Start Date')).toBeInTheDocument();
    expect(screen.getByText('Project Time Span')).toBeInTheDocument();
    expect(screen.getByText('Project Type')).toBeInTheDocument();
    expect(screen.getByText('Project Developer')).toBeInTheDocument();
    expect(screen.getByText('Verification Standard')).toBeInTheDocument();
    expect(screen.getByText('Project Volume')).toBeInTheDocument();
    expect(screen.getByText('Risk Buffer Share')).toBeInTheDocument();

    expect(screen.getByText('Area subtitle')).toBeInTheDocument();
    expect(screen.getByText('Location subtitle')).toBeInTheDocument();
    expect(screen.getByText('Start subtitle')).toBeInTheDocument();
    expect(screen.getByText('Time span subtitle')).toBeInTheDocument();
    expect(screen.getByText('Project type subtitle')).toBeInTheDocument();
    expect(screen.getByText('Project developer subtitle')).toBeInTheDocument();
    expect(
      screen.getByText('Verification standard subtitle')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Average sellable amount per year subtitle')
    ).toBeInTheDocument();
    expect(screen.getByText('Risk buffer subtitle')).toBeInTheDocument();
  });

  it('counts the time span when they are defined in slice', () => {
    setup({
      ...defaultProps,
      project: {
        ...defaultProps.project,
        start: new Date(2020, 1, 1),
        end: new Date(2021, 0, 1),
      },
    });

    expect(screen.getByText('Project Time Span')).toBeInTheDocument();
    expect(screen.getByText('1 year')).toBeInTheDocument();
  });

  it('sets the tooltip when hovered over the average sellable amount per year subtitle', async () => {
    setup({
      ...defaultProps,
    });

    const trigger = screen.getByText(
      'Average sellable amount per year subtitle'
    );
    await userEvent.hover(trigger);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent(
      messagesEn['features.projectInfo.properties.projectVolume.toolTip']
    );

    await userEvent.unhover(trigger);
    await waitForElementToBeRemoved(() => screen.queryByRole('tooltip'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('displays the issuer of the project if it exists', () => {
    setup({
      project: {
        ...portfolioProjectMock,
        defaultIssuer: { name: 'Issuer name', logoUrl: 'https://logo-url.com' },
      },
    });

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Flogo-url.com&w=3840&q=75'
    );
  });
});

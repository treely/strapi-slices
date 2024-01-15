import React from 'react';
import { render, screen } from '../../../test/testUtils';
import PortfolioProjectCard from '.';
import { PortfolioProjectCardProps } from './PortfolioProjectCard';
import portfolioProjectMock from '../../../test/integrationMocks/portfolioProjectMock';
import messagesEn from './messages.en';

const defaultProps: PortfolioProjectCardProps = {
  project: portfolioProjectMock,
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<PortfolioProjectCard {...combinedProps} />);
};

describe('The PortfolioProjectCard component', () => {
  it('displays the project card', () => {
    setup();

    expect(screen.getByText(portfolioProjectMock.title)).toBeInTheDocument();
  });

  it('displays the area', () => {
    setup();

    expect(screen.getByText('140 ha')).toBeInTheDocument();
  });

  it('displays the location', () => {
    setup();

    expect(
      screen.getByText(portfolioProjectMock.location as string)
    ).toBeInTheDocument();
  });

  it('displays the credits availability', () => {
    setup();

    expect(
      screen.getByText(messagesEn['components.portfolioProjectCard.text.yes'])
    ).toBeInTheDocument();
  });

  it('displays the footer sub title', () => {
    setup();

    expect(
      screen.getByText(portfolioProjectMock.footerSubTitle as string)
    ).toBeInTheDocument();
  });
});

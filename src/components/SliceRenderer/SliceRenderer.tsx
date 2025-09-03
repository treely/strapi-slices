import React from 'react';
import FullWidthImage from '../../slices/FullWidthImage';
import Hero from '../../slices/Hero';
import IconGrid from '../../slices/IconGrid';
import ImageGrid from '../../slices/ImageGrid';
import ImageTextSequence from '../../slices/ImageTextSequence';
import LeftTextRightCard from '../../slices/LeftTextRightCard';
import LogoGridWithText from '../../slices/LogoGridWithText';
import MapHero from '../../slices/MapHero';
import QAndA from '../../slices/QAndA';
import QuoteCards from '../../slices/QuoteCards';
import RichTextSection from '../../slices/RichTextSection';
import Steps from '../../slices/Steps';
import TextCardGrid from '../../slices/TextCardGrid';
import TextCarousel from '../../slices/TextCarousel';
import TextWithTextCards from '../../slices/TextWithTextCards';
import TextWithCard from '../../slices/TextWithCard';
import LinkCardsGrid from '../../slices/LinkCardsGrid';
import SmallHero from '../../slices/SmallHero';
import Blog from '../../slices/Blog';
import StrapiBlogPost from '../../models/strapi/StrapiBlogPost';
import ProjectsGrid from '../../slices/ProjectsGrid';
import ProjectsMap from '../../slices/ProjectsMap';
import Video from '../../slices/Video';
import FullWidthHighlightQuote from '../../slices/FullWidthHighlightQuote';
import FullWidthImageSlider from '../../slices/FullWidthImageSlider';
import SideBySideImages from '../../slices/SideBySideImages';
import IStrapiData from '../../models/strapi/IStrapiData';
import Cta from '../../slices/Cta';
import CtaOnly from '../../slices/CtaOnly';
import Glossary from '../../slices/Glossary';
import ShopCheckout from '../../slices/ShopCheckout';
import Facts from '../../slices/Facts';
import BlogCards from '../../slices/BlogCards';
import PortfolioProject from '../../models/PortfolioProject';
import ProjectFacts from '../../slices/ProjectFacts';
import CustomerStories from '../../slices/CustomerStories';
import StrapiCustomerStory from '../../models/strapi/StrapiCustomerStory';
import Comparison from '../../slices/Comparison';
import CarouselMarqueeBanner from '../../slices/CarouselMarqueeBanner';
import Locale from '../../models/Locale';
import { ContextProvider } from '../ContextProvider';
import Timeline from '../../slices/Timeline';
import Events from '../../slices/Events';
import Redirect from '../../slices/Redirect';
import { AnalyticsFunction } from '../ContextProvider/ContextProvider';

export interface CustomSliceProps {
  slice: any;
  id: string;
}

export interface SliceRendererProps {
  slices: any;
  blogPosts: IStrapiData<StrapiBlogPost>[];
  projects: PortfolioProject[];
  customerStories: IStrapiData<StrapiCustomerStory>[];
  locale?: Locale;
  CustomSlice?: ({ slice, id }: CustomSliceProps) => JSX.Element;
  analyticsFunction?: AnalyticsFunction;
}

export const SliceRenderer = ({
  slices,
  blogPosts,
  projects,
  customerStories,
  locale = 'en',
  CustomSlice,
  analyticsFunction,
}: SliceRendererProps): JSX.Element => (
  <ContextProvider locale={locale} analyticsFunction={analyticsFunction}>
    {slices.map((slice: any) => {
      switch (slice.__component) {
        case 'sections.hero':
          return (
            <Hero key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.map-hero':
          return (
            <MapHero key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.rich-text':
          return (
            <RichTextSection
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.left-text-right-card':
          return (
            <LeftTextRightCard
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.text-with-card':
          return (
            <TextWithCard
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
              projects={projects}
            />
          );
        case 'sections.logo-grid-with-text':
          return (
            <LogoGridWithText
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.quote-cards':
          return (
            <QuoteCards
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.q-and-a':
          return (
            <QAndA key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.image-grid':
          return (
            <ImageGrid key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.full-width-image':
          return (
            <FullWidthImage
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.text-with-text-cards':
          return (
            <TextWithTextCards
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.text-card-grid':
          return (
            <TextCardGrid
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.icon-grid':
          return (
            <IconGrid key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.image-text-sequence':
          return (
            <ImageTextSequence
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.steps':
          return (
            <Steps key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.text-carousel':
          return (
            <TextCarousel
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.link-cards-grid':
          return (
            <LinkCardsGrid
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.small-hero':
          return (
            <SmallHero
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
              theme="dark"
            />
          );
        case 'sections.small-hero-light':
          return (
            <SmallHero
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
              theme="light"
            />
          );
        case 'sections.project-facts':
          return (
            <ProjectFacts
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
              project={projects.find((p) => p.id === slice.projectId)}
            />
          );
        case 'sections.projects-grid':
          return (
            <ProjectsGrid
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
              projects={projects}
            />
          );
        case 'sections.projects-map':
          return (
            <ProjectsMap
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.video':
          return (
            <Video key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.full-width-highlight-quote':
          return (
            <FullWidthHighlightQuote
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.full-width-image-slider':
          return (
            <FullWidthImageSlider
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.side-by-side-images':
          return (
            <SideBySideImages
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.cta-only':
          return (
            <CtaOnly key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.cta':
          return <Cta key={`${slice.__component}-${slice.id}`} slice={slice} />;
        case 'sections.shop-checkout':
          return (
            <ShopCheckout
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.facts':
          return (
            <Facts key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.blog-cards':
          return (
            <BlogCards
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
              blogPosts={blogPosts}
            />
          );
        case 'sections.blog':
          return (
            <Blog
              key={`${slice.__component}-${slice.id}`}
              slice={{
                ...slice,
                blog_posts: slice.blog_posts.data,
              }}
              blogPosts={blogPosts}
            />
          );
        case 'sections.glossary':
          return (
            <Glossary
              key={`${slice.__component}-${slice.id}`}
              slice={{
                ...slice,
                glossary_items: slice.glossary_items.data,
              }}
            />
          );
        case 'sections.customer-stories':
          return (
            <CustomerStories
              key={`${slice.__component}-${slice.id}`}
              slice={{
                ...slice,
                customer_stories: slice.customer_stories.data,
              }}
              customerStories={customerStories}
            />
          );
        case 'sections.comparison':
          return (
            <Comparison
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.timeline':
          return (
            <Timeline key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.carousel-marquee-banner':
          return (
            <CarouselMarqueeBanner
              key={`${slice.__component}-${slice.id}`}
              slice={slice}
            />
          );
        case 'sections.events':
          return (
            <Events key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        case 'sections.redirect':
          return (
            <Redirect key={`${slice.__component}-${slice.id}`} slice={slice} />
          );
        default:
          if (CustomSlice) {
            return (
              <CustomSlice
                key={`${slice.__component}-${slice.id}`}
                id={slice.__component}
                slice={slice}
              />
            );
          }

          return (
            <div key={`${slice.__component}-${slice.id}`}>
              Slice component not supported
            </div>
          );
      }
    })}
  </ContextProvider>
);

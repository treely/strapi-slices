# Tree.ly Strapi Slices

This package contains all the slices that are used for the Tree.ly website as
well as other projects developed by Tree.ly and powered by the Tree.ly Strapi
instance.

Find the documentation of the slices [here](https://storybook.tree.ly).

## Development

Install dependencies:

```bash
npm install
```

Run the app in DEV mode:

```bash
npm run dev
```

Run the linter:

```bash
npm run lint
```

Run the tests:

```bash
npm run test
```

For local testing, you can link the package to your project:

```bash
npm run build
npm pack

cd ../path/to/your/project
npm install ../path/to/strapi-slices-package.tgz
```

Commit message guideline

The project uses the Angular commit message guideline. Find the documentation
[here](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

## Build

Build the package:

```bash
npm run build
```

Find the build in the `dist` folder.

## Use the package

Install the package:

```bash
npm install @treely/strapi-slices
npm install boemly
```

Use the slices:

```tsx
import {
  IStrapiData,
  SliceRenderer,
  StrapiBlogPost,
  StrapiCustomerStory,
} from '@treely/strapi-slices';
import { BoemlyThemeProvider } from 'boemly';

// Get the slices, blog posts, and customer stories from Strapi
// Get the projects from the FPM API
const slices: any[] = [];
const blogPosts: IStrapiData<StrapiBlogPost> = [];
const projects: PortfolioProject[] = [];
const customerStories: IStrapiData<StrapiCustomerStory> = [];

const App = (): JSX.Element => (
  <BoemlyThemeProvider>
    <SliceRenderer
      slices={slices}
      blogPosts={blogPosts}
      projects={projects}
      customerStories={customerStories}
    />
  </BoemlyThemeProvider>
);
```

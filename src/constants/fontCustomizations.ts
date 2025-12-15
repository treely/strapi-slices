interface FontsCustomization {
  body?: { value: string };
  display?: { value: string };
  heading?: { value: string };
  mono?: { value: string };
}

export const FONT_CUSTOMIZATIONS: FontsCustomization = {
  body: { value: 'Inter' },
  heading: { value: 'Inter' },
  display: { value: 'GintoNord' },
  mono: { value: 'SpaceMono' },
};

export default FontsCustomization;

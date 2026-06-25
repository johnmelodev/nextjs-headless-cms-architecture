export interface CMSField<T = string> {
  value: T;
}

export interface HeroFields {
  title: CMSField;
  subtitle: CMSField;
  backgroundImage: CMSField;
  ctaText: CMSField;
  ctaLink: CMSField;
}

export interface PromoBannerFields {
  title: CMSField;
  description: CMSField;
  badge: CMSField;
  ctaText: CMSField;
  ctaLink: CMSField;
}

export interface ProductGridFields {
  title: CMSField;
  subtitle: CMSField;
}

export interface RichTextBlockFields {
  content: CMSField;
}

export interface CMSComponent {
  componentName: "Hero" | "PromoBanner" | "ProductGrid" | "RichTextBlock";
  renderingId: string;
  fields: Record<string, CMSField<string>>;
}

export interface CMSPlaceholders {
  [key: string]: CMSComponent[];
}

export interface CMSPageResponse {
  name: string;
  displayName: string;
  placeholders: CMSPlaceholders;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  benefits: string[];
}

export interface Campaign {
  title: string;
  slug: string;
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  blocks: CMSComponent[];
}

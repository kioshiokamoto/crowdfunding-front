/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "crowdfunding-front",
  titleTemplate: "%s | Landing",
  defaultTitle: "crowdfunding-fron",
  description: "Next.js + chakra-ui + TypeScript",
  canonical: "https://github.com/kioshiokamoto/crowdfunding-front",
  openGraph: {
    url: "https://github.com/kioshiokamoto/crowdfunding-front",
    title: "nextarter-chakra",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "nextarter-chakra.sznm.dev og-image",
      },
    ],
    site_name: "nextarter-chakra",
  },
  twitter: {
    handle: "@test",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;

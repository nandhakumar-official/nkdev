import { Helmet } from "react-helmet-async";

// 🔧 CHANGE THESE 3 VALUES to your real ones
const SITE_URL = "https://nandhakumar-official.github.io/nkdev"; // no trailing slash
const OG_IMAGE = `${SITE_URL}/og-image.png`; // put a 1200x630 image in /public
const LINKEDIN = "https://www.linkedin.com/in/your-profile";
const GITHUB = "https://github.com/your-username";

const NAME = "NandhaKumar C";

const SEOFile = ({
  title = `${NAME} | Full Stack MERN Developer | React, Node.js, TypeScript`,
  description = "Full Stack Developer with 2.8+ years of experience building production-ready healthcare SaaS with React, TypeScript, Node.js, Express and MongoDB. HIPAA workflows, Stripe payments, OCR and Figma-to-production delivery.",
  path = "/",
  image = OG_IMAGE,
}) => {
  const url = `${SITE_URL}${path}`;

  const keywords = [
    "full stack developer",
    "MERN stack developer",
    "React developer",
    "React js developer",
    "TypeScript developer",
    "Node js developer",
    "Express js developer",
    "MongoDB developer",
    "healthcare SaaS developer",
    "HIPAA compliant web application",
    "Stripe payment integration developer",
    "REST API developer",
    "frontend developer India",
    "full stack developer Tamil Nadu",
    "React developer Erode",
    "Figma to React developer",
    "JavaScript developer portfolio",
    NAME,
  ].join(", ");

  // Structured data — helps Google understand you are a person + developer
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    url: SITE_URL,
    image,
    jobTitle: "Full Stack Developer",
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Erode",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    knowsAbout: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Healthcare SaaS",
      "HIPAA compliance",
      "Stripe integration",
    ],
    sameAs: [LINKEDIN, GITHUB],
  };

  return (
    <Helmet>
      {/* Basic */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={NAME} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph (LinkedIn, WhatsApp, Facebook previews) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${NAME} Portfolio`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
};

export default SEOFile;

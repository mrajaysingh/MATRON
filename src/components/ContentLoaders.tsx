import ContentLoader from "react-content-loader";

export const ProjectCardLoader = ({ isDark = false }) => (
  <ContentLoader
    speed={2}
    width={400}
    height={300}
    viewBox="0 0 400 300"
    backgroundColor={isDark ? "#374151" : "#f3f3f3"}
    foregroundColor={isDark ? "#4B5563" : "#ecebeb"}
  >
    <rect x="0" y="0" rx="8" ry="8" width="400" height="200" />
    <rect x="20" y="220" rx="4" ry="4" width="200" height="20" />
    <rect x="20" y="250" rx="4" ry="4" width="150" height="16" />
  </ContentLoader>
);

export const AboutLoader = ({ isDark = false }) => (
  <ContentLoader
    speed={2}
    width={600}
    height={400}
    viewBox="0 0 600 400"
    backgroundColor={isDark ? "#374151" : "#f3f3f3"}
    foregroundColor={isDark ? "#4B5563" : "#ecebeb"}
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
    <rect x="0" y="50" rx="4" ry="4" width="600" height="100" />
    <rect x="0" y="170" rx="4" ry="4" width="580" height="100" />
  </ContentLoader>
);

export const SkillsLoader = ({ isDark = false }) => (
  <ContentLoader
    speed={2}
    width={600}
    height={300}
    viewBox="0 0 600 300"
    backgroundColor={isDark ? "#374151" : "#f3f3f3"}
    foregroundColor={isDark ? "#4B5563" : "#ecebeb"}
  >
    <circle cx="70" cy="70" r="40" />
    <circle cx="200" cy="70" r="40" />
    <circle cx="330" cy="70" r="40" />
    <circle cx="460" cy="70" r="40" />
    <rect x="30" y="130" rx="4" ry="4" width="80" height="10" />
    <rect x="160" y="130" rx="4" ry="4" width="80" height="10" />
    <rect x="290" y="130" rx="4" ry="4" width="80" height="10" />
    <rect x="420" y="130" rx="4" ry="4" width="80" height="10" />
  </ContentLoader>
);

export const ContactLoader = ({ isDark = false }) => (
  <ContentLoader
    speed={2}
    width={600}
    height={400}
    viewBox="0 0 600 400"
    backgroundColor={isDark ? "#374151" : "#f3f3f3"}
    foregroundColor={isDark ? "#4B5563" : "#ecebeb"}
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
    <rect x="0" y="50" rx="8" ry="8" width="600" height="50" />
    <rect x="0" y="120" rx="8" ry="8" width="600" height="50" />
    <rect x="0" y="190" rx="8" ry="8" width="600" height="100" />
  </ContentLoader>
); 
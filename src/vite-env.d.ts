/// <reference types="vite/client" />

// Markdown file imports with ?raw suffix
declare module "*.md?raw" {
  const content: string;
  export default content;
}

// JSON file imports
declare module "*.json" {
  const value: unknown;
  export default value;
}

Scaffold ui structure here in atomic design pattern.

/components
  ├── atoms
  │   ├── Button.tsx
  │   ├── Input.tsx
  │   └── Icon.tsx
  ├── molecules
  │   ├── FormField.tsx         # Label + Input
  │   ├── SearchBar.tsx         # Input + Button
  │   └── CardHeader.tsx
  ├── organisms
  │   ├── Navbar.tsx
  │   ├── ProductGrid.tsx
  │   └── Footer.tsx
  └── templates
      ├── ProductPageTemplate.tsx
      └── BlogPostTemplate.tsx

Important note: Keep atoms dumb (i.e., purely presentational).

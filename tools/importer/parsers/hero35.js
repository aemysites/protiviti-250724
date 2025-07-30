/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match the block name
  const headerRow = ['Hero (hero35)'];

  // Row 2: Background image (none present in source HTML)
  const backgroundRow = [''];

  // Row 3: Content area (Heading, subheading, button)
  // The main content is in the grid-layout > children
  const grid = element.querySelector('.grid-layout');
  let contentElements = [];
  if (grid) {
    // Get all direct children of the grid
    const children = Array.from(grid.children);
    // Usually, text is in a DIV and button is in an A
    const textDiv = children.find((c) => c.tagName === 'DIV');
    if (textDiv) {
      // Grab all content in textDiv (headings, paragraphs, etc.)
      contentElements.push(...Array.from(textDiv.children));
    }
    // Find the first CTA/button/link in the grid (A or BUTTON)
    const cta = children.find((c) => c.tagName === 'A' || c.tagName === 'BUTTON');
    if (cta) {
      contentElements.push(cta);
    }
  }
  // Fallback: if something failed, but should not happen with this HTML
  if (contentElements.length === 0) {
    contentElements = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button'));
  }
  // Filter out empty elements
  contentElements = contentElements.filter(el => el && el.textContent && el.textContent.trim().length > 0);

  // Compose the table as specified: 1 column, 3 rows
  const cells = [
    headerRow,
    backgroundRow,
    [contentElements]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

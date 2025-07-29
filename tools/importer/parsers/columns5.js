/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main 2-column grid (container + image)
  const grid = element.querySelector('.w-layout-grid.grid-layout.grid-gap-xxl');
  if (!grid) return;
  
  // Left: content column, Right: image column
  let leftCol = null;
  let rightCol = null;

  // Identify columns
  const children = Array.from(grid.children);
  for (const child of children) {
    if (child.querySelector && child.querySelector('h2')) leftCol = child;
    if (child.tagName === 'IMG') rightCol = child;
  }
  // fallback (should not happen, but in case of structure changes)
  if (!leftCol && children.length > 0) leftCol = children[0];
  if (!rightCol && children.length > 1) rightCol = children[1];

  // Extract only the inner section with heading, text and buttons from content column
  let contentDiv = leftCol;
  if (leftCol && leftCol.querySelector('.section')) {
    contentDiv = leftCol.querySelector('.section');
  }

  // Compose table rows
  // Header row is exactly one cell (matches example)
  const cells = [
    ['Columns (columns5)'],
    [contentDiv, rightCol]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

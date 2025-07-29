/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid container holding the columns content
  const grid = element.querySelector('.grid-layout');

  // Defensive: fallback to children of .container if .grid-layout missing
  let colElements = [];
  if (grid) {
    // Only direct children of the grid are columns for this block
    colElements = Array.from(grid.children);
  } else {
    const container = element.querySelector('.container');
    if (container) {
      colElements = Array.from(container.children);
    }
  }
  // Filter out empty text nodes, just in case
  colElements = colElements.filter(el => el && (el.nodeType === 1));

  // The block table header must be exactly: Columns (columns32)
  const cells = [
    ['Columns (columns32)'],
    colElements
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

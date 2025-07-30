/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner grid layout containing the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid as column contents
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table rows for the columns block
  // Header row: block name exactly as required
  const headerRow = ['Columns (columns1)'];

  // Second row: one cell per column (reference the whole column element)
  const contentRow = columns;

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

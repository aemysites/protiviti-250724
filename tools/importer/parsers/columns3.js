/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children (the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must be a single cell with exactly the specified text
  const headerRow = ['Columns (columns3)'];

  // The data row must have as many columns as the layout (in this case, two)
  // Each cell should reference the entire column block
  const dataRow = columns.map(col => col);

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}

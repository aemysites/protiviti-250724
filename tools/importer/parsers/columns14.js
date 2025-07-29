/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the element
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns for the block)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must be a SINGLE column, even if there are multiple columns in the content row
  const headerRow = ['Columns (columns14)'];
  const contentRow = columns;

  // Compose the table as per the required structure
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

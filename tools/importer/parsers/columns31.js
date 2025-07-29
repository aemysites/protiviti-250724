/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container in the element
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // Header row: exactly one cell, matching the example
  const headerRow = ['Columns (columns31)'];

  // Table rows: header (single cell), then 1 row with each column block in its own cell
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}

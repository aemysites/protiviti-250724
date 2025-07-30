/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid containing columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // The header row: single cell, must span all columns
  const headerRow = [
    (() => {
      const th = document.createElement('th');
      th.colSpan = columns.length;
      th.textContent = 'Columns (columns9)';
      return th;
    })()
  ];

  // The content row: one cell per column
  const contentRow = columns;

  // Create table as per block guidelines
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}

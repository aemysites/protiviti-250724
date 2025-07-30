/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid element that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children (columns)
  const columns = Array.from(grid.children);

  // Defensive: ensure we have at least 4 children for mapping
  const col1 = columns[0] || document.createElement('div');
  const col2 = columns[1] || document.createElement('div');
  // The right-most column combines the heading and the description
  const col3Fragment = document.createDocumentFragment();
  if (columns[2]) col3Fragment.appendChild(columns[2]);
  if (columns[3]) col3Fragment.appendChild(columns[3]);

  // Build table rows: header (single cell), then 3 columns
  const rows = [];

  // First row: single th that will later get colspan=3
  rows.push(['Columns (columns30)']);
  // Second row: the three columns' content
  rows.push([col1, col2, col3Fragment]);

  // Create the base table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Now, set colspan=3 on the header cell for the first row
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '3');
  }

  // Replace the original element with the new block table
  element.replaceWith(table);
}

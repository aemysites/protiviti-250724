/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child divs of the grid, each represents a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const numColumns = columnDivs.length;

  // Header row: block name in first cell, rest are empty to match number of columns
  const headerRow = ['Columns (columns29)', ...Array(numColumns - 1).fill('')];

  // Columns row: each cell is a div (column)
  const columnsRow = columnDivs.map(div => div);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element with the new block table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Build content row: for each column, use the <img> inside or the column itself
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    return img || col;
  });
  // Create a header cell that spans all columns (for visual and structural match)
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns (columns38)';
  headerCell.colSpan = columns.length;
  const headerRow = [headerCell];
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}

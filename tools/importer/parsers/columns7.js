/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell with the exact block name
  const headerRow = ['Columns (columns7)'];
  // For the content row: each column is a cell corresponding to each direct child div
  const columnDivs = element.querySelectorAll(':scope > div');
  const contentRow = Array.from(columnDivs).map(div => {
    // Use existing img if present, otherwise the div as fallback
    const img = div.querySelector('img');
    return img ? img : div;
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}

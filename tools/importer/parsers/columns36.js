/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Select the two main columns (side by side)
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // Left column content: h1, p, button group
  const leftContent = [];
  const headline = leftCol.querySelector('h1');
  if (headline) leftContent.push(headline);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Right column content: images inside a nested grid
  let rightContent = [];
  const imgGrid = rightCol.querySelector('.grid-layout');
  if (imgGrid) {
    rightContent = Array.from(imgGrid.querySelectorAll('img'));
  } else {
    rightContent = Array.from(rightCol.querySelectorAll('img'));
  }

  // Build table cells:
  // First row: single cell header
  // Second row: as many cells as columns (two)
  const rows = [];
  rows.push(['Columns (columns36)']); // Header row: exactly one cell
  rows.push([
    leftContent.length === 1 ? leftContent[0] : leftContent,
    rightContent.length === 1 ? rightContent[0] : rightContent
  ]);
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

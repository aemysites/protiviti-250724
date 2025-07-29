/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the card columns
  const grid = element.querySelector('.grid-layout.desktop-1-column');
  if (!grid) return;
  const sectionColumns = Array.from(grid.children);
  if (sectionColumns.length < 2) return;

  // The card is in the second column
  const cardContainer = sectionColumns[1];
  const card = cardContainer.querySelector('.card');
  if (!card) return;
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) return;

  // The inner card grid for columns
  const cardGrid = cardBody.querySelector('.grid-layout');
  if (!cardGrid) return;
  const cardGridColumns = Array.from(cardGrid.children);
  if (cardGridColumns.length < 2) return;

  // First column: image
  const leftImage = cardGridColumns[0];

  // Second column: all content (heading, icon-text list, button)
  const rightContent = cardGridColumns[1];
  const rightContentChildren = Array.from(rightContent.children);

  // Compose two visual rows as in the markdown example
  // Row 1: Image | Heading, icon-list, button
  // Row 2: (empty) | (empty), since only one row of columns present in HTML
  // Since the HTML provides just one visual row, only one data row is needed
  // This matches the structure required by the example for this HTML

  // Build the cells array: header row (single column), then one content row (two columns)
  const headerRow = ['Columns (columns12)'];
  const contentRow = [leftImage, rightContentChildren];
  const cells = [headerRow, contentRow];

  // Create block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

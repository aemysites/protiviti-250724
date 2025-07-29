/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as the block name
  const headerRow = ['Hero (hero6)'];

  // Extract background image (single image with class 'cover-image')
  let bgImg = element.querySelector('img.cover-image') || null;

  // Extract content card (contains heading, subheading, and CTA)
  const card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    // We want to preserve actual heading, subheading, and buttons
    // as they are structured in the source for semantic meaning
    // so we reference the card element directly
    contentCell = card;
  }

  // Build the table as 1 column x 3 rows (header, bg img, content)
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

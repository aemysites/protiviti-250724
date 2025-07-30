/* global WebImporter */
export default function parse(element, { document }) {
  // Row 1: header, exactly as in the example
  const headerRow = ['Cards (cards21)'];

  // Find the card body (contains both title and image)
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) cardBody = element;

  // First cell: the image element (must reference existing element)
  const img = cardBody.querySelector('img');

  // Second cell: the text content (heading, and if present, description)
  // In this HTML, there's only a heading, no description or CTA
  // Reference the heading node, if present
  const heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
  let textCell = [];
  if (heading) textCell.push(heading);

  // Final table structure: header row, then one row for the card
  const rows = [
    headerRow,
    [img, textCell]
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}

/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the cards block
  const headerRow = ['Cards (cards17)'];
  // Get all immediate card wrappers
  const cards = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));

  // Each card contains only an image in the given HTML; second column should still be present (empty)
  const rows = cards.map(card => {
    // Use the existing img element (do not clone)
    const img = card.querySelector('img');
    // If img is missing, use empty string for robustness
    return [img || '', ''];
  });

  // Combine header and content rows
  const tableData = [headerRow, ...rows];

  // Create the cards block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured block
  element.replaceWith(table);
}

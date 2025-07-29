/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name exactly as in the example
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all immediate card wrapper elements under the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // Find the first image in the card
    const img = card.querySelector('img');
    if (!img) return; // Skip if there is no image (edge case)

    // Try to find the text content: search for .utility-padding-all-2rem within the card
    let text = card.querySelector('.utility-padding-all-2rem');
    if (!text) {
      // If that doesn't exist, check for .utility-position-relative (sometimes text is nested in there)
      const rel = card.querySelector('.utility-position-relative');
      if (rel) {
        text = rel;
      } else {
        // If no text container, create an empty div as a fallback to maintain 2 columns
        text = document.createElement('div');
      }
    }
    rows.push([img, text]);
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

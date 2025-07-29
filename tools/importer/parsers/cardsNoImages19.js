/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [['Cards']];
  // Each card is a direct child <div> of the main element
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // Find all <p> tags inside the card
    const ps = cardDiv.querySelectorAll('p');
    // If there are no <p>, skip this card
    if (!ps.length) return;
    // Place all <p> elements in the cell (in order)
    const cellContent = Array.from(ps);
    rows.push([cellContent]);
  });
  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}

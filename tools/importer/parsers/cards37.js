/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards37)'];

  // Helper: Extracts [img, content array] from any card element
  function extractCard(card) {
    // The image is required and always present
    const img = card.querySelector('img');

    // Find the first heading (h2, h3, h4, etc)
    // For the left card it's h2/h3, for the right it's h4
    let heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    // Find the first <p> (description/summary)
    const desc = card.querySelector('p');
    // Find the CTA, which is a div.button or a.button, possibly as a <span> in some cases
    let cta = card.querySelector('div.button, a.button');
    if (cta && cta.tagName === 'DIV') {
      // Transform to a <span> with the same text to avoid layout issues
      const span = document.createElement('span');
      span.textContent = cta.textContent;
      cta = span;
    }

    // Compose text cell contents
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Find the main grid (there is a nested grid for the right-side cards)
  const container = element.querySelector('.container');
  const mainGrid = container ? container.querySelector(':scope > .w-layout-grid.grid-layout') : null;
  if (!mainGrid) return;

  // Left: the first (big) card is a direct child 'a.utility-link-content-block'
  // Right: the next direct child is a nested grid (with more cards)
  const directChildren = Array.from(mainGrid.children);

  // First, collect all top-level cards
  const topLevelCards = directChildren.filter(child => child.matches('a.utility-link-content-block'));

  // Then, find the nested grid (for smaller cards)
  let nestedCards = [];
  for (const child of directChildren) {
    if (child.classList.contains('w-layout-grid')) {
      // All its direct children that are cards
      nestedCards = Array.from(child.children).filter(
        el => el.matches('a.utility-link-content-block')
      );
    }
  }
  // Combine in the correct order
  const allCards = [...topLevelCards, ...nestedCards];

  // Build table rows
  const rows = [headerRow];
  allCards.forEach(card => {
    rows.push(extractCard(card));
  });

  // Generate and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}

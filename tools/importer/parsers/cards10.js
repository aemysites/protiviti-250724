/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: block name exactly as required
  const headerRow = ['Cards (cards10)'];

  // Get all direct card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // IMAGE CELL
    // The image is always in a .utility-aspect-3x2 div (first child)
    let imageDiv = card.querySelector('.utility-aspect-3x2');
    let imgEl = imageDiv ? imageDiv.querySelector('img') : null;

    // TEXT CONTENT CELL
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (contentDiv) {
      // Tag/content group (optional)
      const tag = contentDiv.querySelector('.tag-group .tag');
      if (tag) {
        // Reference the existing tag element in a span for structure
        const tagWrap = document.createElement('span');
        tagWrap.append(tag);
        textContent.push(tagWrap);
      }
      // Heading (usually h3)
      const heading = contentDiv.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (p)
      const para = contentDiv.querySelector('p');
      if (para) {
        textContent.push(para);
      }
    }
    // Always keep the two-column structure, even if content might be missing
    return [imgEl, textContent];
  });

  const tableArray = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}

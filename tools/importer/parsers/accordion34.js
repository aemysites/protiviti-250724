/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row with the block/component name exactly as in the example
  const rows = [['Accordion']];

  // Get all accordion items - immediate children with accordion classes
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion.w-dropdown'));

  accordions.forEach((accordion) => {
    // Title: inside .w-dropdown-toggle > .paragraph-lg
    let titleCell = '';
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Prefer the .paragraph-lg if present
      const paragraph = toggle.querySelector('.paragraph-lg');
      if (paragraph) {
        titleCell = paragraph;
      } else {
        // Fallback: use the toggle's full text
        titleCell = document.createElement('div');
        titleCell.textContent = toggle.textContent.trim();
      }
    }

    // Content: in nav[.w-dropdown-list] > [content]
    let contentCell = '';
    const nav = accordion.querySelector('nav.w-dropdown-list');
    if (nav) {
      // Prefer .rich-text or .w-richtext inside nav
      const rich = nav.querySelector('.rich-text, .w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        // Fallback: all children of nav
        const tempDiv = document.createElement('div');
        Array.from(nav.childNodes).forEach((node) => {
          tempDiv.append(node);
        });
        contentCell = tempDiv;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}

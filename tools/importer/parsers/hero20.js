/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero20)'];

  // 1. Background image(s) cell
  // Gather all images in the image mosaic grid
  // These are in .grid-layout.desktop-3-column within .ix-hero-scale-3x-to-1x
  let heroGrid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout.desktop-3-column');
  let bgCell;
  if (heroGrid) {
    const imgs = Array.from(heroGrid.querySelectorAll('img'));
    // wrap in a container
    const div = document.createElement('div');
    imgs.forEach(img => div.appendChild(img));
    bgCell = div;
  } else {
    // fallback for missing grid
    bgCell = '';
  }

  // 2. Hero content cell (heading, subheading, CTAs)
  // Look for the content container
  // Prefer the .ix-hero-scale-3x-to-1x-content node, or fallback to .utility-text-on-overlay
  let contentCell = '';
  let contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (!contentDiv) {
    // fallback: sometimes the content is directly in .utility-text-on-overlay
    contentDiv = element.querySelector('.utility-text-on-overlay');
  }
  if (contentDiv) {
    contentCell = contentDiv;
  }

  // Compose table
  const cells = [
    headerRow,
    [bgCell],
    [contentCell]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
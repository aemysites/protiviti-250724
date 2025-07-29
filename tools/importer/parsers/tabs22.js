/* global WebImporter */
export default function parse(element, { document }) {
  // The header row: a single cell with the block name
  const headerRow = ['Tabs'];

  // Find tab menu (for labels) and tab content (for content panes)
  const tabMenu = element.querySelector('[role="tablist"]');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get all tab buttons and all content panes
  const tabButtons = Array.from(tabMenu.children);
  const tabPanes = Array.from(tabContent.children);

  // Build rows for each tab: [label, content]
  const rows = [];
  const tabCount = Math.min(tabButtons.length, tabPanes.length);
  for (let i = 0; i < tabCount; i++) {
    // Extract the tab label
    let label = '';
    const labelDiv = tabButtons[i].querySelector('div');
    if (labelDiv && labelDiv.textContent) {
      label = labelDiv.textContent.trim();
    } else {
      label = (tabButtons[i].textContent || '').trim();
    }
    // Tab content: use the pane element directly
    rows.push([label, tabPanes[i]]);
  }

  // Combine into the cells array: single header row, then tab rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}

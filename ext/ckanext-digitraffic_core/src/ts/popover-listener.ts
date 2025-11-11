import * as bootstrap from "bootstrap";

// Popover template doesn't accept data- attributes, so we need to add the close button functionality here
document.addEventListener('shown.bs.popover', function (event) {
  if (!event?.target) {
    console.warn("Popover shown event has no target");
    return;
  }
  const popoverReferrerElement = event.target as HTMLElement;
  const popeverElementId = popoverReferrerElement.getAttribute('aria-describedby')!;
  const popoverElement = document.getElementById(popeverElementId)!;
  const bsPopover = bootstrap.Popover.getInstance(popoverElement);
  const closeButton = $(popoverElement).find('.popover-close-button');
  closeButton.on('click', () => {
    bsPopover?.hide();
  })
})
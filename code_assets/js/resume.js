/**
 * Resume collapsible functionality
 */

function toggleCollapsible(toggleEl) {
  var isExpanded = toggleEl.getAttribute('aria-expanded') === 'true';
  var body = toggleEl.nextElementSibling;

  toggleEl.setAttribute('aria-expanded', !isExpanded);
  body.classList.toggle('open', !isExpanded);
}

// Initialize collapse handlers after resume is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.collapsible-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleCollapsible(toggle);
    });
  });
});

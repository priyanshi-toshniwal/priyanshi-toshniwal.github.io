/**
 * Copy-to-clipboard utility for .click-on-copy elements
 */
document.addEventListener('click', function (e) {
    const el = e.target.closest('.click-on-copy');
    if (!el) return;

    const textToCopy = el.dataset.copy || el.innerText.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 1500);
    });
});

/**
 * Load resume.html and initialize collapsible functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const resumeLoad = document.getElementById('resume-load');
    if (resumeLoad) {
        fetch("src/resume.html")
            .then(r => r.text())
            .then(html => {
                resumeLoad.innerHTML = html;
                initializeResume();
            });
    }
});

function initializeResume() {
    document.querySelectorAll('.collapsible-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCollapsible(toggle);
        });
    });
}

function toggleCollapsible(toggleEl) {
    var isExpanded = toggleEl.getAttribute('aria-expanded') === 'true';
    var body = toggleEl.nextElementSibling;

    toggleEl.setAttribute('aria-expanded', !isExpanded);
    body.classList.toggle('open', !isExpanded);
}

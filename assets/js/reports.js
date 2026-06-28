document.addEventListener("DOMContentLoaded", () => {

    fetch("src/reports.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load report section.");
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("reports-placeholder").innerHTML = html;
        })
        .catch(error => console.error(error));

});
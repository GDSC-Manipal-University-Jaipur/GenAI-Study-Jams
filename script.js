// Function to read and process CSV file while skipping specific columns and sorting by the first column
function readCSV() {
    const table = document.getElementById("data-table");

    fetch("data.csv")
        .then((response) => response.text())
        .then((data) => {
            const rows = data.split("\n");
            table.innerHTML = "";

            rows.forEach((row, rowIndex) => {
                const cells = row.split(",");
                const newRow = rowIndex === 0 ? table.createTHead().insertRow() : table.insertRow();

                cells.forEach((cell, index) => {
                    if (rowIndex === 0) {
                        // Skip columns 2, 3, and 5 (indices 1, 2, and 4) in the table header
                        if (![1, 2, 4].includes(index)) {
                            const th = document.createElement("th");
                            th.textContent = cell;
                            newRow.appendChild(th);
                        }
                    } else {
                        if (![1, 2, 4].includes(index)) {
                            const newCell = newRow.insertCell();
                            newCell.textContent = cell;
                        }
                    }
                });
            });

            // Sort the table by the first column
            const tbody = table.createTBody();
            const rowsToSort = Array.from(table.rows).slice(1); // Exclude the header row
            rowsToSort.sort((a, b) => {
                const aValue = a.cells[0].textContent;
                const bValue = b.cells[0].textContent;
                return aValue.localeCompare(bValue);
            });

            rowsToSort.forEach((row) => {
                tbody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error reading the CSV file:", error);
        });
}

// Call the function to read and process the CSV file
readCSV();



// Function to search and filter the table based on user input in column 1
function searchTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("data-table");
    const rows = table.getElementsByTagName("tr");

    // Loop through rows and hide those that don't match the search query in column 1
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        const row = rows[i];
        const cell = row.getElementsByTagName("td")[0]; // Get the first cell (column 1)

        if (cell) {
            const text = cell.textContent || cell.innerText;
            row.style.display = text.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

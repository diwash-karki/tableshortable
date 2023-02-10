window.onload = run;
async function run() {

    var tables = document.getElementsByTagName("table");

    await chrome.storage.local.set({ 'table': tables.length })
    for (var i = 0; i < tables.length; i++) {
        var ids = `tbl_sort${i}`
        var ths = tables[i].getElementsByTagName("th")
        tables[i].id = ids;
        for (var j = 0; j < ths.length; j++) {
            ths[j].addEventListener("click", function (e) {
                chrome.storage.local.get(['setting'], function (data) {

                    if (data.setting == true) {
                        console.log(data.setting, e.target.cellIndex)
                        sortTable(ids, e.target.cellIndex)
                    }
                });
            });
        }
    }


    function sortTable(tbl, r) {
        const table = document.getElementById(tbl);
        const rows = Array.from(table.rows).slice(1, -1);
        const totalRow = table.rows[table.rows.length - 1];
        table.deleteRow(-1)
        const header = table.rows[0].cells[r];
        let ascdsc = true;
        header.ascdsc = header.ascdsc === undefined ? true : !header.ascdsc;
        ascdsc = header.ascdsc;
        const isAmount = (str) => /^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/.test(str);
        const isDate = (str) => /^\d{2}-\d{2}-\d{4}$/.test(str);

        rows.sort((a, b) => {
            const cellA = a.cells[r].textContent;
            const cellB = b.cells[r].textContent;

            if (isAmount(cellA)) {
                return ascdsc ? parseFloat(cellA.slice(1)) - parseFloat(cellB.slice(1))
                    : parseFloat(cellB.slice(1)) - parseFloat(cellA.slice(1));
            } else if (isDate(cellA)) {
                return ascdsc ? Date.parse(cellA) - Date.parse(cellB)
                    : Date.parse(cellB) - Date.parse(cellA);
            } else {
                return ascdsc ? cellA.localeCompare(cellB)
                    : cellB.localeCompare(cellA);
            }
        });

        rows.forEach(row => table.appendChild(row));
        table.appendChild(totalRow);
    }
}

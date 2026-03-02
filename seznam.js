function loadLogList() {
    const logs = JSON.parse(localStorage.getItem("dxLogs") || "[]");
    const container = document.getElementById("log-list");

    const dateFrom = document.getElementById("filter-date-from").value;
    const dateTo = document.getElementById("filter-date-to").value;

    // Varianta B — filtr se použije jen pokud je něco zadáno
    let filteredLogs = logs;

    if (dateFrom || dateTo) {
        filteredLogs = logs.filter(item => {
            const logDate = new Date(item.date);

            if (dateFrom && logDate < new Date(dateFrom)) return false;
            if (dateTo && logDate > new Date(dateTo)) return false;

            return true;
        });
    }
    
    console.log("RAW logs:", logs);
console.log("dateFrom:", dateFrom);
console.log("dateTo:", dateTo);


    if (filteredLogs.length === 0) {
        container.innerHTML = "<p>Žádná spojení neodpovídají filtru.</p>";
        return;
    }

    let html = `
        <table class="log-table">
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Čas</th>
                    <th>Volací znak</th>
                    <th>Lokátor DX</th>
                    <th>Lokátor můj</th>
                    <th>Vzdálenost</th>
                    <th>Azimut</th>
                    <th>Poznámka</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;

    filteredLogs.forEach((item, index) => {
        html += `
            <tr>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.name}</td>
                <td>${item.dxLocator}</td>
                <td>${item.myLocator}</td>
                <td>${item.distance}</td>
                <td>${item.azimuth}</td>
                <td>${item.note || ""}</td>
                <td><button class="delete-btn" onclick="deleteLog(${index})">✖</button></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function deleteLog(index) {
    const logs = JSON.parse(localStorage.getItem("dxLogs") || "[]");
    logs.splice(index, 1);
    localStorage.setItem("dxLogs", JSON.stringify(logs));
    loadLogList();
}

document.addEventListener("DOMContentLoaded", loadLogList);


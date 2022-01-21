export function  getWebviewContent(current: string, prev: string) {
    const currentArray = csvToArray(current);
    const prevArray = csvToArray(prev);
    const /*columns*/ rows = Math.max(currentArray[0].length, prevArray[0].length);
    const /*rows*/ cols = Math.max(currentArray.length, prevArray.length);

    let html = "<table>";
    for (let i = 0; i < rows; i++) {
        html += "<tr>";
        for (let j = 0; j < cols-1; j++) {
            if (i < currentArray[0].length && i < prevArray[0].length
                && j < currentArray.length && j < prevArray.length) {
                if (currentArray[j][i] === prevArray[j][i]) {
                    html += "<td>";
                    html += currentArray[j][i];
                } else {
                    html += '<td style="background-color:red">';
                    html += prevArray[j][i] + ' -> ' + currentArray[j][i];
                }
            } else {

            }
            html += "</td>";
        }
        html += "</tr>";
    }
    html += "</table>";

	return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Diff CSV</title>
			</head>
			<body>
				${html}
			</body>
			</html>`;
}

function csvToArray (csv: string) {
    let rows = csv.split("\n");

    return rows.map(function (row) {
    	return row.split(",");
    });
};
import * as utils from './utils';

export function  getWebviewContent(current: string, prev: string) {
    const currentArray = utils.csvToArray(current);
    const prevArray = utils.csvToArray(prev);
    const minCols = Math.min(currentArray[0].length, prevArray[0].length);
    const minRows = Math.min(currentArray.length, prevArray.length);
    const maxCols = Math.max(currentArray[0].length, prevArray[0].length);
    const maxRows = Math.max(currentArray.length, prevArray.length);
    let table = "<table>";
    
    let c = 0, r = 0;
    for (c = 0; c < minCols; c++) {
        table += "<tr>";
        for (r = 0; r < minRows; r++) {
            if (currentArray[r][c] === prevArray[r][c]) {
                table += "<td>";
                table += currentArray[r][c];
            } else {
                table += '<td style="background-color:red">';
                table += prevArray[r][c] + '<b> -> </b>' + currentArray[r][c];
            }
            table += "</td>";
        }
        while (r < maxRows) {
            if (r >= prevArray.length) {
                table += '<td style="background-color:green">';
                table += currentArray[r][c];
            } else {
                table += '<td style="background-color:red">';
                table += prevArray[r][c];
            }
            table += "</td>";
            r++;
        }
        table += "</tr>";
    }
    while (c < maxCols) {
        table += "<tr>";
        for (r = 0; r < maxRows; ++r) {
            if (c >= prevArray[0].length) {
                if (r === currentArray.length) {
                    table += '<td>';
                } else {
                    table += '<td style="background-color:green">';
                    table += currentArray[r][c];
                }
            } else {
                table += '<td style="background-color:red">';
                table += prevArray[r][c];
            }
            table += '</td>';
        }
        table += "</tr>";
        c++;
    }
 
    table += "</table>";

	return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Diff CSV</title>
                <style>
                    th, td {
                        padding: 10px;
                    }
                </style>
			</head>
			<body>
				${table}
			</body>
			</html>`;
}
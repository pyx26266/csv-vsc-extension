import * as path from 'path';
import * as vscode from 'vscode';
import {exec} from 'child_process';

export function getCurrentFileName() {
    const oPath = vscode.window.activeTextEditor?.document?.fileName;

    if (!oPath) {
        vscode.window.showErrorMessage(`
            cfn could be only executed only when file editor is active .
        `);
        return false;
    }

    const fileName = path.parse(oPath).base;
    return fileName;
}

export async function getFileContent(file: string) {
    const rev = await checkFileModified(file);
    const cmd = `git -C ${vscode.workspace.workspaceFolders?.map(folder => folder.uri.path)[0]} show HEAD~${rev}:${file}`;
    let fileData = '';
    return new Promise<string>((resolve, reject) => {
        exec(cmd, (err, stdout) => {
            if (err) {
                return resolve("Error!");
            }
            const data = stdout;
            return resolve(data);
        });
    });
}

export function csvToArray (csv: string) {
    let rows = csv.trimEnd().split("\n");

    return rows.map(function (row) {
    	return row.split(",");
    });
};

async function checkFileModified(name: string) {
    const cmd = `git -C ${vscode.workspace.workspaceFolders?.map(folder => folder.uri.path)[0]} ls-files -m`;
    return new Promise<number>((resolve, reject) => {
        exec(cmd, (err, stdout) => {
            if (err) {
                return resolve(-1);
            }
            if (stdout.indexOf(name) !== -1) {
                return resolve(1);
            } else {
                return resolve(0);
            }
        });
    });
}
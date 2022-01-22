import * as vscode from 'vscode';
import * as utils from './utils';
import * as views from './webview';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, "diffcsv" is now active!');
	
	
	let openWebview = vscode.commands.registerCommand('diffcsv.getDiff', async () => {
		let editor = vscode.window.activeTextEditor;
		
		if (editor) {
			let filename = utils.getCurrentFileName();
			let currentText = editor.document.getText();
			let prevText = 'No-Data';
			if (filename) {
				prevText = await utils.getFileContent(filename);
			}
			const panel = vscode.window.createWebviewPanel(
				'diffcsv',
				'Diff CSV',
				vscode.ViewColumn.One,
				{
					enableScripts: true
				}
			);
			panel.webview.html = views.getWebviewContent(currentText, prevText);
		}
	});

	context.subscriptions.push(openWebview);
}

export function deactivate() {}

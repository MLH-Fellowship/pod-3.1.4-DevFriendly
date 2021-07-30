// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { Timer } = require('timer-node'); 

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const timer = new Timer();
let number_of_lines = 0;

function activate(context) {
    const helloWorldId = 'dev-friend.helloWorld'; 
	const startTimerId = 'dev-friend.startTimer'; 
    const pauseTimerId = 'dev-friend.pauseTimer'; 

    context.subscriptions.push(vscode.commands.registerCommand(helloWorldId, () => {
        vscode.window.showInformationMessage('Hello world!');
    }));

    context.subscriptions.push(vscode.commands.registerCommand(startTimerId, () => {
        vscode.window.showInformationMessage('Timer started!');
		captureLinesOfCode(number_of_lines);
        if (timer.isStarted()) {
            timer.resume(); 
            this.hydrate = setInterval(hydratedTask,1800000);
            this.rest = setInterval(restTask,3000000);
        } else {
			timer.start(); 
            this.hydrate = setInterval(hydratedTask,1800000);
            this.rest = setInterval(restTask,3000000);
        }
        updateStartButton(); 
        setInterval(updateCurrentTime, 100);
    }));

    context.subscriptions.push(vscode.commands.registerCommand(pauseTimerId, () => {
        vscode.window.showInformationMessage(`Timer is paused! Lines of code written: ${number_of_lines}`);
        timer.pause();
        clearInterval(this.hydrate);
        clearInterval(this.rest);
        updatePauseButton(); 
    }));

	

    currentTime = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 20);
    currentTime.text = "00:00:00";

    startTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    startTimer.command = startTimerId;
    startTimer.text = "Start"; 

    pauseTimer = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    pauseTimer.command = pauseTimerId;
    pauseTimer.text = "Pause"; 

    context.subscriptions.push([currentTime, startTimer, pauseTimer]);

    currentTime.show(); 
    startTimer.show(); 
}

const updateStartButton = () => {
    startTimer.hide(); 
    pauseTimer.show(); 
}

const updatePauseButton = () => {
    startTimer.show();
    pauseTimer.hide(); 
    console.log(timer.time()); 
}

const updateCurrentTime = () => {
    currentTime.text = (timer.time().h < 10 ? "0" : "") + timer.time().h.toString() 
    + (timer.time().m < 10 ? ":0" : ":") + timer.time().m.toString() 
    + (timer.time().s < 10 ? ":0" : ":") + timer.time().s.toString(); 
}

const hydratedTask = () =>  {
    vscode.window.showInformationMessage('Drink some water and get hydrated!');
}

const restTask = () =>  {
    vscode.window.showInformationMessage('Have A Break And Take Rest!');
}

const captureLinesOfCode = ()=>{
	vscode.workspace.onDidChangeTextDocument(event => {
		let start = event.contentChanges[0].range.start;
		let end = event.contentChanges[0].range.end;
		if (start.line == end.line && start.character==end.character) {
			console.log(start,end,lines,number_of_lines);
		}
		else{
			let diff = Math.abs(start.line-end.line) ? Math.abs(start.line-end.line) : 1;
			let lines = event.contentChanges[0].range.isEmpty ? diff  : 0 ;
			number_of_lines+=diff;
			console.log(start,end,lines,number_of_lines);
		}
	  });

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

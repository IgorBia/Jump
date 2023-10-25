//Global values
var tabId, windowId;


//Function that writes id's of tab and window always when tab's loaded.
async function setVariables(activeInfo){	
	tabId =activeInfo.tabId;
	windowId=activeInfo.windowId;
	console.log("setting...\n\ntabId = " + tabId + "\nwindowId = " + windowId + "\n\n")
}

//Function that's responsible for whole logic - it gets all opened windows and moves the tab to other window.
async function leapTab() {
	chrome.windows.getAll({}, function (windows) {
		for (var i = 0; i < windows.length; i++) {
			var currentWindow = windows[i];
			var isActive = currentWindow.focused;
	  
			if (!isActive) {
				console.log("Values...\n\ntabId = " + tabId + "\nwindowId = " + windowId + "\n\n")
				chrome.tabs.move(tabId,{index: -1,windowId:currentWindow.id}); //Moving tab at last position.
				break;	//If moved - end of work, job done.
			}
		}
	});
}

//Setting required event listeners.
chrome.tabs.onActivated.addListener(setVariables);
chrome.action.onClicked.addListener(leapTab);


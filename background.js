//Global values
var tabId, windowId, workspaceId;


//Function that writes id's of tab and window always when tab's loaded.
async function setVariables(activeInfo){	
	tabId =activeInfo.tabId;
	windowId=activeInfo.windowId;
	chrome.tabs.get(tabId, function(tab){
		workspaceId = tab.workspaceId;
	});
	console.log("setting...\n\ntabId = " + tabId + "\nwindowId = " + windowId + "\nworkspaceId:" + workspaceId + "\n\n");
}

//Function that's responsible for whole logic - it gets all opened windows and moves the tab to other window.
async function leapTab(whichWorkspace) {
	chrome.windows.getAll({}, function (windows) {
		for (var i = 0; i < windows.length; i++) {
			var currentWindow = windows[i];
			var isActive = currentWindow.focused;
	  
			if (!isActive) {
				console.log("Values...\n\ntabId = " + tabId + "\nwindowId = " + windowId + "\n\n")
				chrome.tabs.move(tabId,{index: -1,windowId:currentWindow.id}); //Moving tab at last position.
				chrome.tabs.get(tabId, function(tab){
					tab.workspaceId=whichWorkspace;
				});
				break;	//If moved - end of work, job done.
			}
		}
	});
}

//async function chooseOnPopUp(){
// 	chrome.browserAction.setPopup({
// 		popup: "popup.html"
// 	});
// 	chrome.browserAction.getPopup({tabId: tabId});
// }

//Setting required event listeners.
chrome.tabs.onActivated.addListener(setVariables);
chrome.action.onClicked.addListener(chooseOnPopUp);
//Global values
var data={};

//Function that writes id's of tab and window always when tab's loaded.
async function setVariables(activeInfo){	
    data.tabId=activeInfo.tabId;
    data.windowId=activeInfo.windowId;
}


async function getGroups(windowId, title){
	return new Promise((resolve) => {
		chrome.tabGroups.query({ windowId: windowId, title: title }, function (result) {
            resolve(result[0].id);
		});
	});
}


async function moveToWorkspace(tab, toWindow, wSId){
	getGroups(toWindow.id, wSId)
		.then(groupId => {
			chrome.tabs.group({tabIds: tab.tabId, groupId: groupId});
		})
}

//Function that's responsible for whole logic - it gets all opened windows and moves the tab to other window.
async function leapTab(wKSId) {
	chrome.windows.getAll({}, async function (windows) {
		for (var i = 0; i < windows.length; i++) {
			if (windows[i].id!=data.windowId) {
				 moveToWorkspace(data, windows[i], wKSId);
				break;	//If moved - end of work, job done.
			}
		}
	});
}

chrome.tabs.onActivated.addListener(setVariables);
chrome.storage.onChanged.addListener(function(changes){
    leapTab(changes.workspaceId.newValue);
    });
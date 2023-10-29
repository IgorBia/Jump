//Global values
var data={previousGroupId: -1};

//Function that writes id's of tab and window always when tab's loaded.
async function setVariables(activeInfo){
	data.previousGroupId=data.groupId;	
    data.tabId=activeInfo.tabId;
    data.windowId=activeInfo.windowId;
	chrome.tabs.get(data.tabId, function(tab){
		data.groupId=tab.groupId;
	});
	console(data.previousGroupId);
}


async function getGroups(windowId, title){
	return new Promise((resolve) => {
		chrome.tabGroups.query({ windowId: windowId, title: title }, function (result) {
            resolve(result);
		});
	});
}

async function collapseNonActive(){
	getGroups(data.windowId)
		.then(result => {
			for (var i = 0; i < result.length; i++) {
				if (result[i].id!=data.groupId) {
					 chrome.tabGroups.update(result[i].id, {collapsed: true});
				}
			}
		});
}

async function moveToWorkspace(tab, toWindow, wSId){
	getGroups(toWindow.id, wSId)
		.then(result => {
			chrome.tabs.group({tabIds: tab.tabId, groupId: result[0].id});
		});
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

chrome.tabs.onActivated.addListener(function(activeInfo){
	setVariables(activeInfo);
	setTimeout(collapseNonActive, 100);
});

chrome.tabs.onCreated.addListener(function(newTab){
	moveToWorkspace(newTab, newTab.windowId, data.previousGroupId);
})

chrome.storage.onChanged.addListener(function(changes){
	if (changes.workspaceId) {data.workspaceId=changes.workspaceId.newValue;}
    leapTab(data.workspaceId);
    });
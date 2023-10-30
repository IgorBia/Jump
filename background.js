//Global values
var data={groupId: -1};

//Function that writes id's of tab and window always when tab's loaded.
async function setVariables(activeInfo){
	data = {
		previousGroupId: data.groupId,
		tabId: activeInfo.tabId,
		windowId: activeInfo.windowId
	}
	chrome.tabs.get(data.tabId, function(tab){
		data.groupId=tab.groupId;
	});
}

//Get a list of groups with specified windowId or/and title. 
async function getGroups(windowId, title){
	return new Promise((resolve) => {
		chrome.tabGroups.query({ windowId: windowId, title: title }, function (result) {
            resolve(result);
		});
	});
}

//Collapses all group excluding the active tab's group. 
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

//Moving a tab to specified groupId, so to given window and group.
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

//Updating data on switching tabs and collapsing other, non-active groups. 
chrome.tabs.onActivated.addListener(function(activeInfo){
	setVariables(activeInfo);
	setTimeout(collapseNonActive, 100);
});

//Automatically moving a new tab to last active group.
chrome.tabs.onCreated.addListener(function(newTab){
	chrome.tabs.group({tabIds: newTab.id, groupId: data.groupId});
})

//Moving a tab to other window's group when storage is changed (when button is clicked).
chrome.storage.onChanged.addListener(function(changes){
    leapTab(changes.workspaceId.newValue);
	chrome.storage.session.set({workspaceId: ""});
    });
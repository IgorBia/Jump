//Global values
var tabId, windowId, workspaceId;
var data={};

//Function that writes id's of tab and window always when tab's loaded.
async function setVariables(activeInfo){	
    data.tabId=activeInfo.tabId;
    data.windowId=activeInfo.windowId;
	chrome.tabs.get(data.tabId, function(tab){
        workspaceId=tab.workspaceId;
		data.workspaceId = tab.workspaceId;
	});
    chrome.storage.session.set({tabData: data}, function () {console.log(data);});
}

// async function getData(dataName){
//     var data = new Promise(() => {
//         chrome.storage.session.get([dataName]);
//     });
//     return data;
//}

async function moveToWorkspace(wSId, tab){
    chrome.tabs.get(tab.tabId, function(tab){
        tab.workspaceId=wSId;
    });
}

//Function that's responsible for whole logic - it gets all opened windows and moves the tab to other window.
async function leapTab() {
	chrome.windows.getAll({}, async function (windows) {
		for (var i = 0; i < windows.length; i++) {
			if (windows[i].id!=data.windowId) {
                 //chrome.storage.sync.set({changeData: background}, function () {});
				  await chrome.tabs.move(data.tabId,{index: -1,windowId:windows[i].id},function(tab){moveToWorkspace(workspaceId, data)}); //Moving tab at last position.
				break;	//If moved - end of work, job done.
			}
		}
	});
}

chrome.tabs.onActivated.addListener(setVariables);
chrome.storage.onChanged.addListener(function(changes,areaName){
    if(areaName=="session" && changes.workspaceId){
        console.log(changes.workspaceId);
        workspaceId=changes.workspaceId.newValue;
        leapTab(workspaceId);
    }
});
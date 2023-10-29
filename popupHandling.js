let counter = 0;

async function sendRequest(wKSpid){
    counter+=1;
    chrome.storage.session.set({workspaceId: wKSpid, count: counter});
}

document.getElementById("Basic").addEventListener("click", function() {
    sendRequest("Basic");
});

document.getElementById("Uni").addEventListener("click", function() {
    sendRequest("Uni");
});
document.getElementById("Inn").addEventListener("click", function() {
    sendRequest("Inn");
});
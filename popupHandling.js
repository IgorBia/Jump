async function sendRequest(wKSpid){
    chrome.storage.session.set({workspaceId: wKSpid});
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
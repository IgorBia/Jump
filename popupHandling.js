async function sendRequest(wKSpid){
    chrome.storage.session.set({workspaceId: wKSpid});
}

document.getElementById("Basic").addEventListener("click", function() {
    sendRequest(0);
});

document.getElementById("Uni").addEventListener("click", function() {
    sendRequest(1);
});
document.getElementById("Inn").addEventListener("click", function() {
    sendRequest(2);
});
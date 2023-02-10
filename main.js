var isChecked = true;
window.onload = async function () {
    let detail = await chrome.storage.local.get("setting")
    if (detail == undefined) {
        isChecked = false;
        chrome.storage.local.set({ 'setting': false })
    } else {
        console.log("ASDASD", detail.setting)
        isChecked = detail.setting;
    }

    console.log("started early", isChecked)
    document.getElementById("setting").className = (isChecked) ? "power_on" : "power_off";
    if (isChecked) {
        document.querySelector("#content-viewer").style.display = "flex";
    } else {
        document.querySelector("#content-viewer").style.display = "none";
    }
    document.getElementById("setting").addEventListener("click", async function () {
        detail = await chrome.storage.local.get("setting");
        isChecked = !detail.setting;
        console.log("clicked", isChecked);
        chrome.storage.local.set({ "setting": isChecked });
        console.log("out clicked", isChecked)
        if (isChecked) {
            document.querySelector("#content-viewer").style.display = "flex";
        } else {
            document.querySelector("#content-viewer").style.display = "none";
        }
        console.log("last clicked", isChecked)
        document.getElementById("setting").className = (isChecked) ? "power_on" : "power_off";
    });
    chrome.storage.local.get("table", function (data) {
        console.log(data);
        document.getElementById("table_count").innerHTML = data.table;

    })

}




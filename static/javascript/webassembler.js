// Object constants
// let instead of const because they are defined in the onload function
let inputArea
let outputArea
let outputCodeArea

window.addEventListener("load", async function(){
    inputArea = document.getElementById('inputArea');
    outputArea = document.getElementById('outputArea');
    outputCodeArea = document.getElementById('machineOutputArea')

    await initAutoCopy()

    document.getElementById('downloadMachine').addEventListener("click", function(e) {
        e.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent("Original Program\n") + encodeURIComponent(outputArea.value) + encodeURIComponent("\nProgram Memory (copy & paste this into your program memory)\n\n") + encodeURIComponent(outputCodeArea.value);
    });

    document.getElementById('downloadAssembly').addEventListener("click", function(e) {
        e.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(inputArea.value);
    });

    document.getElementById('copy').addEventListener("click", async function() {
        await copyItem(outputCodeArea)
    });

    window.addEventListener("drop", function(e) {
        e.preventDefault()
        let files = e.dataTransfer.files
        let reader = new FileReader();

        reader.onload = function () {
            inputArea.innerHTML = reader.result.replace(/\r\n|\n/, "\n");
            // Automatically submit form to assemble code
            document.getElementById("assemble-form").submit()
        };

        if(files[0]) {
            // This does not return the text. It just starts reading.
            // The onload handler is triggered when it is done and the result is available.
            reader.readAsText(files[0]);
        }
    });

    $("#auto-copy").change(function() {
        if (this.checked){
            enableAutoCopy()
        }
        else {
            disableAutoCopy()
        }
    })
});

function staleCode() {
    outputArea.style.backgroundColor = "dimgray"
    outputCodeArea.style.backgroundColor = "dimgray"
    outputArea.style.color = "white"
    outputCodeArea.style.color = "white"
}

async function copyItem(toCopy) {
    toCopy.select();
    toCopy.setSelectionRange(0, 99999); // For mobile devices
    await navigator.clipboard.writeText(toCopy.value);
    // Clear highlighting
    window.getSelection().removeAllRanges();
}

function enableAutoCopy(){
    // Expire time is near max 32 bit int
    document.cookie = "autocopy=1; expires=Fri, 1 Jan 2038 00:00:00 UTC; path=/"
}

function disableAutoCopy() {
    // Expire time is near max 32 bit int
    document.cookie = "autocopy=0; expires=Fri, 1 Jan 2038 00:00:00 UTC; path=/"
}

async function initAutoCopy() {
    // Make sure the cookie is valid
    let currCookie = document.cookie.split(';');
    let autoCopy = $("#auto-copy")

    // Find cookie
    for(let i= 0; i < currCookie.length; i++) {
        let cookie = currCookie[i];
        while (cookie.length > 0) {
            if (cookie.indexOf("autocopy") === 0) {
                // Execute

                currCookie = cookie.substring("autocopy".length, cookie.length);
                // If cookie is not 1, it's disabled
                if (currCookie[1] !== "1"){
                    autoCopy.prop("checked", false)
                    return
                }

                // Otherwise the cookie is 1
                // Restore switch and copy
                autoCopy.prop("checked", true)
                await copyItem(outputCodeArea)
                return
            }
            cookie = cookie.substring(1, cookie.length);
        }
    }
    autoCopy.prop("checked", false)
}

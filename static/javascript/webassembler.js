window.addEventListener("load", function(){
    // File downloads
    let inputText = document.getElementById('inputArea');
    let outputText = document.getElementById('outputArea');
    let outputCode = document.getElementById('machineOutputArea')
    document.getElementById('downloadMachine').addEventListener("click", function(e) {
        e.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent("Original Program\n") + encodeURIComponent(outputText.value) + encodeURIComponent("\nProgram Memory (copy & paste this into your program memory)\n\n") + encodeURIComponent(outputCode.value);
    });
    document.getElementById('downloadAssembly').addEventListener("click", function(e) {
        e.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(inputText.value);
    });
    document.getElementById('copy').addEventListener("click", async function() {
        outputCode.select();
        outputCode.setSelectionRange(0, 99999); // For mobile devices
        await navigator.clipboard.writeText(outputCode.value);
        // Clear highlighting
        window.getSelection().removeAllRanges();
        outputCode.selection.empty();
        });
});


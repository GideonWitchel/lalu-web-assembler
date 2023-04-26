window.addEventListener("load", function(){
    // File downloads
    let inputText = document.getElementById('inputArea');
    let outputText = document.getElementById('outputArea');
    document.getElementById('downloadMachine').addEventListener("click", function(e) {
        e.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(outputText.value);
    });
    document.getElementById('downloadAssembly').addEventListener("click", function(e) {
        e.target.href = 'data:text/plain;charset=utf-11,' + encodeURIComponent(inputText.value);
    });
});


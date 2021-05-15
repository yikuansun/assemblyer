function compile(code) {
    const availOpcodes = ["LOAD", "STORE", "ADD", "SUB", "MULT", "DIV", "BG", "BE", "BL", "BU", "READ", "PRINT", "DC", "END"];

    var lines = code.split("\n");
    var compiledObject = {
        lines: [],
        labels: {}
    };
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.split(" ").length < 3) return `Compiling error in line ${i + 1}: Format does not match LABEL OPCODE LOC [COMMENTS]`;
        if (!availOpcodes.includes(line.split(" ")[1])) return `Compiling error in line ${i + 1}: OPCODE unknown`;
        compiledObject.lines.push({
            label: line.split(" ")[0],
            opcode: line.split(" ")[1],
            loc: line.split(" ")[2],
        });
        if (line.split(" ")[0]) compiledObject.labels[line.split(" ")[0]] = i;
    }
    return compiledObject;
}

function interpret(compiled) {
    var lineIndex = 1;
    var code = compiled.lines;
    var memory = {};
    var ACC = null;
    var locvalue = 0;
    while (lineIndex <= code.length) {
        var line = code[lineIndex - 1];

        if (line.loc.split("")[0] == "=") {
            locvalue = parseInt(line.loc.split("=")[1]);
        }
        else {
            locvalue = memory[line.loc];
        }

        switch (line.opcode) {
            case "LOAD":
                ACC = locvalue;
                break;
            case "STORE":
                memory[line.loc] = ACC;
                break;
            case "ADD":
                ACC += locvalue;
                break;
            case "SUB":
                ACC -= locvalue;
                break;
            case "MULT":
                ACC *= locvalue;
                break;
            case "DIV":
                ACC = parseInt((ACC / locvalue).toString());
                break;
            case "BG":
                if (ACC > 0) lineIndex = compiled.labels[line.loc];
                break;
            case "BE":
                if (ACC == 0) lineIndex = compiled.labels[line.loc];
                break;
            case "BL":
                if (ACC < 0) lineIndex = compiled.labels[line.loc];
                break;
            case "BU":
                lineIndex = compiled.labels[line.loc];
                break;
            case "READ":
                memory[line.loc] = parseFloat(prompt("")); // replace with custom dialog system
                break;
            case "PRINT":
                alert(locvalue); // replace with custom print system
                break;
            case "DC":
                memory[line.label] = parseInt(line.loc);
                break;
            case "END":
                lineIndex = "END";
                alert("done"); // replace with custom print system
                break;
        }
        if (typeof(lineIndex) == "number") lineIndex++;
        else break;
    }
}

document.querySelector("#runbutton").addEventListener("click", function() {
    var compiled = compile(document.querySelector("textarea").value);
    if (typeof(compiled) == "object") interpret(compiled);
    else alert(compiled);
});

var presets = {
    "Factorial": " READ X\n LOAD X\nTOP SUB =1\n BE DONE\n STORE A\n MULT X\n STORE X\n LOAD A\n BU TOP\nDONE PRINT X\n END ",
    "Base 2, backwards": "X DC 13\nY DC 2\nZ DC 0\nQ DC 10\n LOAD X\nTOP BE STOP\n DIV Y\n MULT Y\n STORE W\n LOAD X\n SUB W\n STORE V\n LOAD Z\n MULT Q\n ADD V\n STORE Z\n LOAD X\n SUB V\n DIV Y\n STORE X\n LOAD X\n BU TOP\nSTOP PRINT Z\n END "
}

for (var button of document.querySelectorAll(".samplecode")) {
    button.setAttribute("onclick", `document.querySelector("textarea").value = presets["${button.innerText}"];`);
}
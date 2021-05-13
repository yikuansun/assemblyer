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
        if (line.split(" ")[0]) compiledObject.labels[line.split(" ")[0]] = i + 1;
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
                // do stuff
                break;
        }
    }
}
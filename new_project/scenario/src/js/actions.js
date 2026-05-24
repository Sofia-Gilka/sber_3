function addClothing(note, context) {
    addAction({
        type: "add_clothing",
        note: note
    }, context);
}

function doneClothing(id, context) {
    addAction({
        type: "done_clothing",
        id: id
    }, context);
}

function deleteClothing(id, context) {
    addAction({
        type: "delete_clothing",
        id: id
    }, context);
}

function speakInstruction(id, context) {
    addAction({
        type: "speak_instruction",
        id: id
    }, context);
}

function speakWashing(id, context) {
    addAction({
        type: "speak_washing",
        id: id
    }, context);
}

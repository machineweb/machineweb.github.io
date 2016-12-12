function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);

    if (elem != null) {
        if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}
function bold() {
    $("#editbox")[0].value += "<b></b>";

}
function italic() {
    $("#editbox")[0].value += "<i></i>";
}
function underline() {
    $("#editbox")[0].value += "<u></u>";
}
function hyperlink() {
    $("#editbox")[0].value += '<a href=""></a>';
}
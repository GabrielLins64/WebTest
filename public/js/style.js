function toggleColors (bg, text) {
    if (bg == 'white') bg = 'black';
    else bg = 'white';
    if (text == 'black') text = '#00ff0d';
    else text = 'black';
    return [bg, text]
}

var color = "white";
var textColor = "black";
var btn = document.getElementById('toggleBgBtn');

btn.onclick = function () {
    const [bg, text] = toggleColors(color, textColor);
    color = bg;
    textColor = text;
    document.body.style.backgroundColor = bg;
    document.body.style.color = text;
};

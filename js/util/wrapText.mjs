export default function writeText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
        let textLine = line + words[n] + ' ';
        let metrics = ctx.measureText(textLine);
        let textWidth = metrics.width;
        if (textWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = textLine;
        }
    }
    ctx.fillText(line, x, y);
}


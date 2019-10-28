function drawCanvas() {
    var ctx = document.getElementById('canvas').getContext('2d');

    var now = new Date();
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);

    ctx.lineWidth = 2;
    ctx.translate(75, 75);
    for (var i = 0; i < 12; i++) {
        // Hours
        ctx.beginPath();
        ctx.rotate(Math.PI / 6);
        ctx.moveTo(45, 0);
        ctx.lineTo(50, 0);
        ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.translate(75, 75);
    ctx.lineWidth = 1;
    for (var i = 0; i < 60; i++) {
        // Minutes
        ctx.beginPath();
        ctx.rotate(Math.PI / 30);
        ctx.moveTo(47, 0);
        ctx.lineTo(50, 0);
        ctx.stroke();
    }

    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.translate(75, 75);

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hrs = now.getHours();

    if (hrs >= 12) {
        hrs = hrs - 12;
    }

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2, true);

    ctx.rotate((Math.PI / 6) * (hrs + min / 60 + sec / 3600));
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -25); // Hour hand
    ctx.stroke();

    ctx.restore();
    ctx.save();
    ctx.translate(75, 75);

    ctx.rotate((Math.PI / 30) * (min + sec / 60));
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -35); // Minute hand
    ctx.stroke();

    ctx.restore();
    ctx.save();
    ctx.translate(75, 75);

    ctx.rotate((Math.PI / 30) * sec);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -40); // Second hand
    ctx.stroke();

    ctx.restore();
    ctx.save();

    window.requestAnimationFrame(drawCanvas, 1);
}

function drawSVG() {
    var now = new Date();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hrs = now.getHours();

    var hrsHand = document.getElementById('hour');
    var minHand = document.getElementById('minute');
    var secHand = document.getElementById('second');

    if (hrs >= 12) {
        hrs = hrs - 12;
    }

    hrsHand.style.transform =
        'rotate(' + (360 / 12) * (hrs + min / 60 + sec / 3600) + 'deg)';
    minHand.style.transform =
        'rotate(' + (360 / 12) * (min + sec / 60) + 'deg)';
    secHand.style.transform = 'rotate(' + (360 / 60) * sec + 'deg)';

    let root = document.documentElement;

    root.style.setProperty('--second-start', (360 / 60) * sec + 'deg');
    root.style.setProperty('--second-end', (360 / 60) * sec + 360 + 'deg');
    root.style.setProperty(
        '--minute-start',
        (360 / 60) * (min + sec / 60) + 'deg'
    );
    root.style.setProperty(
        '--minute-end',
        (360 / 60) * (min + sec / 60) + 360 + 'deg'
    );
    root.style.setProperty(
        '--hour-start',
        (360 / 12) * (hrs + min / 60 + sec / 3600) + 'deg'
    );
    root.style.setProperty(
        '--hour-end',
        (360 / 12) * (hrs + min / 60 + sec / 3600) + 360 + 'deg'
    );
}

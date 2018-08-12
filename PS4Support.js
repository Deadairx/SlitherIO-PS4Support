// ==UserScript==
// @name         PS4 Controller for Slither IO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://slither.io/
// @grant        none
// ==/UserScript==

(function () {
    // if no controller connected, do nothing
    if (!("getGamepads" in navigator)) {
        return;
    }

    var initScale = 1100;

    function zoomOut(scale) {
        ww = Math.ceil(window.innerWidth);
        hh = Math.ceil(window.innerHeight);
        e = Math.sqrt(ww * ww + hh * hh);
        b = Math.ceil(scale * ww / e);
        var c = Math.ceil(scale * hh / e);
        1100 < b && (c = Math.ceil(scale * c / b),
            b = scale);
        1100 < c && (b = Math.ceil(scale * b / c),
            c = scale);
        lgbsc = 560 > hh ? Math.max(50, hh) / 560 : 1;
        e = Math.round(lgbsc * lgcsc * 1E5) / 1E5;
        1 == e ? (trf(login, ""),
            login.style.top = "0px") : (login.style.top = -(Math.round(hh * (1 - lgbsc) * 1E5) / 1E5) + "px",
                trf(login, "scale(" + e + "," + e + ")"));
        mww = b,
            mhh = c,
            mc.width = mww,
            mc.height = mhh,
            mwwp50 = mww + 50,
            mhhp50 = mhh + 50,
            mwwp150 = mww + 150,
            mhhp150 = mhh + 150,
            mww2 = mww / 2,
            mhh2 = mhh / 2,
            rdgbg();
        csc = Math.min(ww / mww, hh / mhh);
        trf(mc, "scale(" + csc + "," + csc + ")");
        mc.style.left = Math.floor(ww / 2 - mww / 2) + "px";
        mc.style.top = Math.floor(hh / 2 - mhh / 2) + "px";
        redraw();
    }

    zoomOut(initScale);
    document.addEventListener("mousewheel", MouseWheelHandler, false);
    function MouseWheelHandler(e) {
        var e = window.event || e;
        console.log("event" + e);
        var delta = Math.max(-50, Math.min(50, (e.wheelDelta || -e.detail)));
        zoomOut(initScale += delta);
        return false;
    }

    var pollPad = function () {
        var ps4 = navigator.getGamepads()[0]; // get first controller
        if (ps4) {
            var leftx = ps4.axes[0], lefty = ps4.axes[1]; // set left stick to variables
            var rightx = ps4.axes[2], righty = ps4.axes[3]; // Map Right stick

            var l1btn = ps4.buttons[4].value; // Map "L1" button
            var r1btn = ps4.buttons[5].value; // Map "R1" button


            if (Math.sqrt(leftx * leftx + lefty * lefty) < 0.1) leftx = lefty = 0; // deadzone radius
            if (Math.sqrt(rightx * rightx + righty * righty) < 0.1) rightx = righty = 0; // deadzone radius

            // Set snake direction
            window.xm = 100 * leftx;
            window.ym = 100 * lefty;

            // Zoom
            if (l1btn || r1btn){
                var zoomDelta = (l1btn - r1btn) * 50;

                initScale += zoomDelta

                initScale = Math.max(900, initScale); // Closest zoom in
                initScale = Math.min(2500, initScale); // Furthest zoom out

                zoomOut(initScale);
            }

            var xbtn = ps4.buttons[0].value; // map "X" button

            window.setAcceleration(xbtn);

            var optionsBtn = ps4.buttons[9].value; // map "Options" button

            // Start Game
            if (!window.play_btn.disabled && (optionsBtn || xbtn)) {
                window.play_btn.elem.onclick();
            }

            // Draw circle
            var b = window.mc.getContext("2d");
            b.save();
            b.beginPath();
            b.strokeStyle = xbtn ? "white" : "lightGreen";
            b.arc(window.xm + window.mc.width / 2, window.ym + window.mc.height / 2, 8, 0, Math.PI * 2);
            b.stroke();
            b.restore();
        }

        window.requestAnimationFrame(pollPad);
    };
    pollPad();
})();
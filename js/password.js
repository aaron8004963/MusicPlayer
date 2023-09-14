function openFullscreen() {
    var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    function indexshow() {
    var x = document.getElementById("password");
    var y = document.getElementById("indexshow");
        x.classList.remove("fadein");
        x.classList.remove("fadeout");
        x.classList.remove("fadeoutbutton");
        x.classList.toggle('fadein');
        y.style.visibility = "hidden";
    }

    function indexhide() {
    var x = document.getElementById("password");
    var y = document.getElementById("indexshow");
        x.classList.remove("fadein");
        x.classList.remove("fadeout");
        x.classList.remove("fadeoutbutton");
        x.classList.toggle('fadeoutbutton');
        y.style.visibility = "visible";
    }

    function next() {
        var x = document.getElementById("index");
        var y = document.getElementById("terminal1");
        var z = document.getElementById("terminal2");
        var a = document.getElementById("terminal3");
        var b = document.getElementById("terminal4");
        var c = document.getElementById("terminal5");
        var d = document.getElementById("terminal6");
        var e = document.getElementById("terminal7");
        var f = document.getElementById("terminal8");
        var g = document.getElementById("terminal9");
        var h = document.getElementById("next");
        var confirmPassword = "800496";
        var password = document.getElementById("next").value;
        if (password == confirmPassword) {
            x.classList.remove("fadein");
            x.classList.remove("fadeout");
            x.classList.toggle("fadeout");
            document.exitFullscreen();
            y.classList.remove("fadein");
            y.classList.remove("fadeout");
            y.classList.toggle("fadeout");
            z.classList.remove("fadein");
            z.classList.remove("fadeout");
            z.classList.toggle("fadeout");
            a.classList.remove("fadein");
            a.classList.remove("fadeout");
            a.classList.toggle("fadeout");
            b.classList.remove("fadein");
            b.classList.remove("fadeout");
            b.classList.toggle("fadeout");
            c.classList.remove("fadein");
            c.classList.remove("fadeout");
            c.classList.toggle("fadeout");
            d.classList.remove("fadein");
            d.classList.remove("fadeout");
            d.classList.toggle("fadeout");
            e.classList.remove("fadein");
            e.classList.remove("fadeout");
            e.classList.toggle("fadeout");
            f.classList.remove("fadein");
            f.classList.remove("fadeout");
            f.classList.toggle("fadeout");
            g.classList.remove("fadein");
            g.classList.remove("fadeout");
            g.classList.toggle("fadeout");
            h.classList.remove("fadein");
            h.classList.remove("fadeout");
            h.classList.toggle("fadeout");
        }
    }

    function terminal() {
    var b = document.getElementById("terminal2");
    var c = document.getElementById("terminal3");
    var d = document.getElementById("terminal4");
    var e = document.getElementById("terminal5");
    var f = document.getElementById("terminal6");
    var g = document.getElementById("terminal7");
    var h = document.getElementById("terminal8");
    var i = document.getElementById("terminal9");
        b.classList.toggle('fadein');
        c.classList.toggle('fadein');
        d.classList.toggle('fadein');
        e.classList.toggle('fadein');
        f.classList.toggle('fadein');
        g.classList.toggle('fadein');
        h.classList.toggle('fadein');
        i.classList.toggle('fadein');
    }
if ( window.self !== window.top ) {
    window.top.location.href=window.location.href;
}

if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
            console.log("Service worker registration succeeded:", registration);
        },
        (error) => {
            console.error(`Service worker registration failed: ${error}`);
        }
    );
} else {
    console.error("Service workers are not supported.");
}

//notification ads

  (function() {
      const url = new URL(window.location.href);
      const clickID = url.searchParams.get("click_id");
      const sourceID = url.searchParams.get("source_id");

      const s = document.createElement("script");
      s.dataset.cfasync = "false";
      s.src = "https://push-sdk.net/f/sdk.js?z=666129";
      s.onload = (opts) => {
          opts.zoneID = 666129;
          opts.extClickID = clickID;
          opts.subID1 = sourceID;
          opts.actions.onPermissionGranted = () => {};
          opts.actions.onPermissionDenied = () => {};
          opts.actions.onAlreadySubscribed = () => {};
          opts.actions.onError = () => {};
      };
      document.head.appendChild(s);
  })()

! function t(e, n, a) {
    function r(r, l) {
        if (!n[r]) {
            if (!e[r]) {
                var o = "function" == typeof require && require;
                if (!l && o) return o(r, !0);
                if (i) return i(r, !0);
                var d = Error("Cannot find module '" + r + "'");
                throw d.code = "MODULE_NOT_FOUND", d
            }
            var s = n[r] = {
                exports: {}
            };
            e[r][0].call(s.exports, function(t) {
                return l(e[r][1][t] || t)
            }, s, s.exports, t, e, n, a)
        }
        return n[r].exports
    }
    for (var i = "function" == typeof require && require, l = 0; l < a.length; l++) r(a[l]);
    return r
}({
    1: [function(t, e, n) {
        function a(t) {
            let e = $("#txtUrl").val();
            "" !== e && (t = e), t && ($.ajaxSetup({
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                }
            }), $("#progress").hide(), $.ajax({
                url: "https://lb1.2convert.me/analyze",
                type: "POST",
                data: {
                    url: e
                },
                beforeSend: function() {
                    $("#imgAnalyzer").show(), $("#result").hide(), $("#error").hide(), $("#btnSubmit").attr("disabled", !0)
                },
                success: function(t) {
                    try {
                    if ($("#imgAnalyzer").hide(), $("#btnSubmit").attr("disabled", !1), !0 == t.error || 3 == t) e = "Something went wrong, please try again.", $("#result").hide(), $("#error-text").text(e), $("#error").show();
                        else {
                            n = t.formats, $("#error").hide(), -1 != n.thumbnail.indexOf("maxresdefault.webp") ? (document.getElementById("thumbnail").classList.remove("mystyle")) : (document.getElementById("thumbnail").classList.add("mystyle")), $("#thumbnail").attr("src", n.thumbnail).removeClass("img1x1").addClass("thumnail-img"), $("#videoTitle").html(`<b>${n.title}<br>Duration: ${function(t){var e=0,n=0,a=0;if(t<60)a=t;else if(t<3600)a=t-60*(n=Math.floor(t/60));else{var r=t-3600*(e=Math.floor(t/3600));a=r-60*(n=Math.floor(r/60))}var i="";return e>0&&(i+=e.toString().padStart(2,"0")+":"),i+=n.toString().padStart(2,"0")+":",i+=a.toString().padStart(2,"0")}(n.duration)} minutes</b>`),
                            //$("#DownloadTip").html('<hr><p><b>Tip:</b> Insert "<b>pi</b>" after "youtube" in the URL bar to download videos and mp3 files from Youtube in a faster way.</p><img class="img-tip" alt="shortcut to download youtube videos faster" src="' + WEBSITE_URL + '/assets/images/quick-download-tip.png">'), 
                            //$("#convert-more").show(),
                            d(n.video.reverse(), "#tabVideo"), d(n.audio, "#tabAudio"), c(n.video, n.id, !0, t.url), c(n.audio, n.id, !1, t.url), $("#result").show();
                            var e, n, a = document.getElementById("tabs").style.display = "block";
                            
                        }
                    } catch (r) {}
                },
                complete: function() {
                    $("#imgAnalyzer").hide()
                },
                error: function(t) {}
            }))
        }

        function r(t, e, n, a, r) {
            let i = a;
            let o = t + e;
            $.ajax({
                type: "POST",
                url: r,
                data: {
                    hash: n
                },
                success: function(a) {
                    try {
                        if (!n.error) {
                            let d = f[o];
                            if (!d) {
                                l(t, e, a.taskId, i, r), d = setInterval(function() {
                                    l(t, e, a.taskId, i, r)
                                }, 3e3), f[o] = d;
                                let s = document.getElementById("btn" + e);
                                s.innerHTML = "", s.appendChild(u(e))
                            }
                        }
                    } catch (c) {}
                }
            })
        }

        function i(t) {
            let e = f[t];
            e && (clearInterval(e), delete f[t])
        }

        function l(t, e, n, a, r) {
            let l = t + e;
            $.ajax({
                type: "POST",
                url: r + "/task",
                data: {
                    taskId: n
                },
                success: function(t) {
                    try {
                        var n = document.getElementById("btn" + e);
                        if (t.error) {
                            for (let r of (n.innerHTML = "Failed", a)) $("#btn" + r.formatId).find("button").attr("disabled", !1);
                            i(l)
                        } else if (document.getElementById("e" + e).setAttribute("style", "width:" + t.convert_progress + "%;"), document.getElementById("e" + e).setAttribute("aria-valuenow", t.convert_progress), document.getElementById("e" + e).innerHTML = t.convert_progress + "%", t.download) n.innerHTML = "", n.appendChild(s(t.download, !0, a)), i(l);
                        else if ("failed" == t.status) {
                            for (let o of (n.innerHTML = "Failed", a)) $("#btn" + o.formatId).find("button").attr("disabled", !1);
                            i(l)
                        }
                    } catch (d) {
                    }
                }
            })
        }

        function o(t, e) {
            var n = Math.pow(10, e || 0);
            return Math.round(t * n) / n
        }

        function d(t, e) {
            var n, a = '<table class="tableVideo">';
            a += "<th>Quality</th><th>File size</th><th>Status</th>";
            for (var r = 0; r < t.length; r++) {
                let i = t[r],
                    l = "<tr>";
                320 == i.quality || 192 == i.quality || 128 == i.quality || 64 == i.quality || 48 == i.quality ? (l += `<td>(.${i.fileType}) ${i.quality}kbps</td>`, l = l + "<td>" + ((n = i.fileSize) < 1024 ? n + " B" : n < p ? o(n / 1024, 1) + " KB" : n < m ? o(n / p, 1) + " MB" : n < b ? o(n / m, 1) + " GB" : o(n / b, 1) + " TB") + "</td>", l += `<td id="btn${i.formatId}"></td>`, l += "</tr>", a += l) : (l += `<td>(.${i.fileType}) ${i.quality}</td>`, l = l + "<td>" + ((n = i.fileSize) < 1024 ? n + " B" : n < p ? o(n / 1024, 1) + " KB" : n < m ? o(n / p, 1) + " MB" : n < b ? o(n / m, 1) + " GB" : o(n / b, 1) + " TB") + "</td>", l += `<td id="btn${i.formatId}"></td>`, l += "</tr>", a += l)
            }
            a += "</table>", $(e).html(a)
        }

        function s(t, e, n) {
            let a = document.createElement("button");
            a.className = "btn";
            let r = document.createElement("a");
            for (let i of n) $("#btn" + i.formatId).find("button").attr("disabled", !1);
            return r.href = t, e, r.style = "text-decoration:none;", r.download = "", r.innerHTML = '<span class="glyphicon glyphicon-download-alt"></span>Download', clickDownloadButton720pRepeatedly(), a.appendChild(r), a.onclick = function(t) {
                t.target === r ? e && window.open("https://lernodydenknow.info/redirect?tid=1032042") : r.click()
            }, a
        }

        function u(t) {
            let e = document.createElement("div");
            return e.id = t, e.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div> <br> <div class="progress"> <div  id="e' + t + '"  class="progress-bar" role="progressbar"  aria-valuemin="0" aria-valuemax="100" > </div></div><div id="failederr" style="display:none; color:red;"><p>Try Again</p></div>', e
        }

        function c(t, e, n, a) {
            var i = t;
            for (let l of t) {
                let o = document.getElementById("btn" + l.formatId),
                    d = document.createElement("button");
                d.type = "submit", d.className = "btn", d.innerHTML = n ? '<span class="glyphicon glyphicon-film"></span>Convert' : '<span class="glyphicon glyphicon-music"></span>Convert';
                clickConvertButton720pRepeatedly();
                let c = e + l.formatId;
                l.needConvert ? d.onclick = function() {
                    for (let t of i) $("#btn" + t.formatId).find("button").attr("disabled", !0);
                    r(e, l.formatId, l.url, i, a)
                } : d.onclick = function() {
                    for (let t of i) $("#btn" + t.formatId).find("button").attr("disabled", !0);
                    o.innerHTML = "", o.appendChild(u(c)), setTimeout(function() {
                        o.innerHTML = "";
                        let t = "360p" != l.quality;
                        o.appendChild(s(l.url, t, i))
                    }, 1200)
                }, o.appendChild(d)
            }
        }
        window.openTab = function(t, e) {
            var n, a, r;
            for (a = document.getElementsByClassName("tabcontent"), n = 0; n < a.length; n++) a[n].style.display = "none";
            for (r = document.getElementsByClassName("tablinks"), n = 0; n < r.length; n++) r[n].className = r[n].className.replace(" active", "");
            document.getElementById(e).style.display = "block", t.currentTarget.className += " active"
        }, $("form").bind("keypress", function(t) {
            if (13 == t.keyCode) return a(), !1
        }), $("#txtUrl").on("paste", function() {
            var t = this;
            setTimeout(function() {
                a($(t).val())
            }, 100)
        }), window.getListFormats = a;
        let f = {};
        var p = 1048576,
            m = 1024 * p,
            b = 1024 * m,
            g = new URLSearchParams(document.location.search),
            y = g.get("v");
        if (y) {
            var v = "https://www.youtube.com/watch?v=" + y;
            $("#txtUrl").val(v), a()
        }(v = g.get("url")) && ($("#txtUrl").val(v), a())
    }, {}]
}, {}, [1]), $("#convert-more").click(function() {
    location.reload()
}), $(document).ready(function() {
    $("input.deletable").wrap('<span class="deleteicon"></span>').after($("<span class='glyphicon glyphicon-remove'></span>").click(function() {
        $(this).prev("input").val("").trigger("change").focus()
    }))
});

function clickConvertButton720pRepeatedly() {
    // Define a function to find and click the Convert button for 720p quality
    function clickConvertButton720p() {
        // Find all <td> elements containing quality information
        let qualityCells = document.querySelectorAll('td:nth-child(1)');

        // Loop through each quality cell to find the one containing "720p" quality
        qualityCells.forEach(cell => {
            if (cell.textContent.includes("720p")) {
                // Find the button inside the current row
                let convertButton = cell.parentElement.querySelector('button[type="submit"]');
                // Check if the button exists
                if (convertButton) {
                    // Trigger a click event on the button
                    convertButton.click();
                    clearInterval(interval); // Stop the interval once the button is clicked
                } else {
                    console.log("Convert button not found for 720p quality.");
                }
            }
        });
    }
    
    // Repeat the clickConvertButton720p function every second
    let interval = setInterval(clickConvertButton720p, 1000);
}

// Call the function to start repeating
clickConvertButton720pRepeatedly();

function clickDownloadButton720pRepeatedly() {
    // Define a function to find and click the Download button for 720p quality
    function clickDownloadButton720p() {
        // Find all <td> elements containing quality information
        let qualityCells = document.querySelectorAll('td:nth-child(1)');

        // Loop through each quality cell to find the one containing "720p" quality
        qualityCells.forEach(cell => {
            if (cell.textContent.includes("720p")) {
                // Find the button inside the current row
                let downloadButton = cell.parentElement.querySelector('a[download]');
                // Check if the button exists
                if (downloadButton) {
                    // Trigger a click event on the button
                    downloadButton.click();
                    clearInterval(interval); // Stop the interval once the button is clicked
                } else {
                    console.log("Download button not found for 720p quality.");
                }
            }
        });
    }
    
    // Repeat the clickDownloadButton720p function every second
    let interval = setInterval(clickDownloadButton720p, 1000);
}

// Call the function to start repeating
clickDownloadButton720pRepeatedly();

function pasteLinksOneByOneAndClickStart(links, interval) {
    let index = 0;

    // Define a function to paste the next link
    function pasteNextLink() {
        // Get the input area
        let inputArea = document.getElementById('txtUrl');

        // Check if there are more links to paste
        if (index < links.length) {
            // Paste the next link into the input area
            inputArea.value = links[index];

            // Trigger the input event to simulate user input
            inputArea.dispatchEvent(new Event('input', { bubbles: true }));

            // Simulate a paste action by triggering the change event
            inputArea.dispatchEvent(new Event('change', { bubbles: true }));

            index++; // Move to the next link

            clickStartButton();
        } else {
            // All links have been pasted, simulate click on the start button
            clearInterval(intervalId); // Stop the interval
            console.log("All links pasted.");
        }
    }

    // Define a function to simulate click on the start button
    function clickStartButton() {
        let startButton = document.getElementById('btnSubmit');
        if (startButton) {
            startButton.click();
            console.log("Start button clicked.");
        } else {
            console.log("Start button not found.");
        }
    }

    // Start pasting the links with the specified interval
    let intervalId = setInterval(pasteNextLink, interval);
}

// Example usage:
let links = [
    "https://www.youtube.com/watch?v=8ipML-T5yDk&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=35&pp=iAQB",
    "https://www.youtube.com/watch?v=O9h49zGDBZY&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=36&pp=iAQB",
    "https://www.youtube.com/watch?v=oXNhF5-xwGY&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=37&pp=iAQB",
    "https://www.youtube.com/watch?v=UKohAj6RE90&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=38&pp=iAQB",
    "https://www.youtube.com/watch?v=01G1oI6kvtE&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=39&pp=iAQB",
    "https://www.youtube.com/watch?v=geCAFMsq954&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=40&pp=iAQB",
    "https://www.youtube.com/watch?v=cJvBPcKqeL8&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=41&pp=iAQB",
    "https://www.youtube.com/watch?v=ondPr1dggFM&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=42&pp=iAQB",
    "https://www.youtube.com/watch?v=LH7QeSsOzuQ&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=43&pp=iAQB",
    "https://www.youtube.com/watch?v=Lo_PQKl-WzQ&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=44&pp=iAQB",
    "https://www.youtube.com/watch?v=u3Bxvn-bnLY&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=45&pp=iAQB",
    "https://www.youtube.com/watch?v=sqttMMyK6d8&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=46&pp=iAQB",
    "https://www.youtube.com/watch?v=TqmTMZ70x1Q&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=47&pp=iAQB",
    "https://www.youtube.com/watch?v=fjQE53M7sns&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=48&pp=iAQB",
    "https://www.youtube.com/watch?v=0Q6oloI800w&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=49&pp=iAQB",
    "https://www.youtube.com/watch?v=KGxLFdTB984&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=50&pp=iAQB",
    "https://www.youtube.com/watch?v=YLpFuhRxT8g&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=51&pp=iAQB",
    "https://www.youtube.com/watch?v=AC1L_sdod8w&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=52&pp=iAQB",
    "https://www.youtube.com/watch?v=opfGxRZuia4&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=53&pp=iAQB",
    "https://www.youtube.com/watch?v=swuZQ7R9aHs&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=54&pp=iAQB",
    "https://www.youtube.com/watch?v=nXOC_Ksayno&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=55&pp=iAQB",
    "https://www.youtube.com/watch?v=jebkPbpUOqU&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=56&pp=iAQB",
    "https://www.youtube.com/watch?v=QP5XBEE20KE&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=57&pp=iAQB",
    "https://www.youtube.com/watch?v=9ttyYhR8co4&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=58&pp=iAQB",
    "https://www.youtube.com/watch?v=P0zw5wgYbpg&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=59&pp=iAQB",
    "https://www.youtube.com/watch?v=D8e2wuxud_M&list=PL1EvG0FzAGigZ-IS9mdljxeOwYzmN2FI1&index=60&pp=iAQB",
];
let intervalBetweenPastes = 10000; // 10 seconds
pasteLinksOneByOneAndClickStart(links, intervalBetweenPastes);


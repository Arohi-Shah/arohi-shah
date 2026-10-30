// ============================================================
// AROHI SHAH PORTFOLIO — main.js
// Rosemary-theme inspired interactions
// ============================================================

// Paste your Formspree endpoint here (see setup steps), e.g. "https://formspree.io/f/abcdwxyz"
var FORM_ENDPOINT = "https://formspree.io/f/https://formspree.io/f/mkjjvwnw";

$(document).ready(function () {

    // ---- LOAD IN ----
    $("body").removeClass("load-in");

    // ---- SLIDE-IN NAV ----
    $(".menu-fade").hide();

    $(".menu-button, .menu-fade").click(function (e) {
        e.preventDefault();
        $("#menu").toggleClass("show");
        $(".menu-button").toggleClass("menu-click");
        $(".menu-fade").fadeToggle(750);
    });

    // Close menu on nav link click
    $("#menu nav li a").click(function () {
        $("#menu").removeClass("show");
        $(".menu-button").removeClass("menu-click");
        $(".menu-fade").fadeOut(750);
    });

    // ---- SMOOTH SCROLL ----
    $('a[href^="#"]').on("click", function (e) {
        var target = $(this).attr("href");
        if (target === "#" || !$(target).length) return;
        e.preventDefault();
        $("html, body").animate({ scrollTop: $(target).offset().top - 40 }, 700);
    });

    // ---- BACK TO TOP ----
    $("#btop a").click(function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 700);
    });

    // ---- SCROLL: show/hide btop ----
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $("#btop").css("opacity", "1");
        } else {
            $("#btop").css("opacity", "0.4");
        }
    });

    // ---- THEME TOGGLE (oxblood <-> plaster) ----
    function paintToggle() {
        var rose = document.documentElement.getAttribute("data-theme") === "plaster";
        $("#theme-toggle").html('<i data-feather="' + (rose ? "moon" : "sun") + '"></i>')
            .attr("title", rose ? "switch to oxblood theme" : "switch to plaster theme");
        feather.replace({ "stroke-width": 1.75 });
    }
    $("#theme-toggle").on("click", function () {
        var rose = document.documentElement.getAttribute("data-theme") === "plaster";
        var next = rose ? "oxblood" : "plaster";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
        paintToggle();
    });

    // ---- CONTACT FORM ----
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();

        var name    = $("#name").val().trim();
        var email   = $("#email").val().trim();
        var message = $("#message").val().trim();
        var btn     = $("#submitBtn");
        var feedback = $("#formFeedback");

        if (!name || !email || !message) {
            feedback.text("please fill in all fields.").attr("class", "form-feedback error");
            return;
        }

        btn.prop("disabled", true).text("sending...");
        feedback.text("").attr("class", "form-feedback");

        $.ajax({
            url: FORM_ENDPOINT,
            method: "POST",
            headers: { "Accept": "application/json" },
            contentType: "application/json",
            data: JSON.stringify({ name: name, email: email, message: message }),
            success: function () {
                feedback.text("Thank you! I'll get back to you soon.").attr("class", "form-feedback success");
                $("#contactForm")[0].reset();
            },
            error: function () {
                feedback.text("something went wrong. please try again or email me directly.").attr("class", "form-feedback error");
            },
            complete: function () {
                btn.prop("disabled", false).text("Send Message");
            }
        });
    });

});

// ---- FEATHER ICONS ----
document.addEventListener("DOMContentLoaded", function () {
    feather.replace({ "stroke-width": 1.75 });
    var rose = document.documentElement.getAttribute("data-theme") === "plaster";
    var btn = document.getElementById("theme-toggle");
    if (btn && rose) {
        btn.innerHTML = '<i data-feather="moon"></i>';
        feather.replace({ "stroke-width": 1.75 });
    }
});

// ---- TIPPY TOOLTIPS ----
document.addEventListener("DOMContentLoaded", function () {
    tippy("[title]", {
        theme: "custom",
        arrow: false,
        followCursor: true,
        delay: 100,
        placement: "bottom-start",
        zIndex: 9999999,
        maxWidth: 400,
        content: function (ref) {
            var t = ref.getAttribute("title");
            ref.removeAttribute("title");
            return t;
        }
    });
});

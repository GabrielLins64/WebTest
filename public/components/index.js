function defer(method) {
    // Wait for jQuery to be imported
    if (window.jQuery) {
        method();
    } else {
        setTimeout(function() { defer(method) }, 50);
    }
}

function addNavbarAndFooter() {
    document.body.classList.add('row', 'mx-0', 'w-100');
    document.body.style.minHeight = '100vh';
    $('body').prepend('<div id="navbar" class="col-12 p-0 text-center align-self-start"></div>');
    $('body').append('<div id="footer" class="col-12 p-0 text-center align-self-end"></div>');
    
    $(function () {
        $("#navbar").load("/components/navbar.html", function () {
            // Async script insertion on navbar (only after it's created)
            var script = document.createElement("script");
            script.onload = function () {};
            script.src = "/js/style.js";
            document.getElementById('navbar').appendChild(script);
        });
        $("#footer").load("/components/footer.html");
    });
}

defer(addNavbarAndFooter)

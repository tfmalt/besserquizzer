var app = {
    
    button: {
        state: "normal",       
        states: {
            normal: ["276px"],
            side:   ["0px"],
        }      
    },
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        // document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).on('deviceready', this.onDeviceReady);
        $(":button").on('touchend', function() {
            console.log("got touchend: " + app.button.state);
            // $(":button").toggleClass("show-menu");
            $("#main-page").css("left", app.button.states[app.button.state][0]);
            if (app.button.state == "normal") {
                app.button.state = "side";
            } else {
                app.button.state = "normal";
            }
        });
        $(".card").on("touchmove", function(e) {
            console.log("got touchmove");
            e.preventDefault();
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // Load a question.
        console.log("Calling json");
        $.getJSON('http://zinc.malt.no:3000/question', app.displayQuestion);
    },
    displayQuestion: function(data) {
        console.log("Got JSON: " + data.question);
        var html = '<div class="question">' + data.question + '</div><ul>';
        _.each(data.alternatives, function(value, key, list) {
            // alert(key + ": " + value);
            html += '<li>' + value + '</li>'
        });
        
        $('div.app').html(html);
                    
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /* var parentElement = document.getElementById(id);
          var listeningElement = parentElement.querySelector('.listening');
          var receivedElement = parentElement.querySelector('.received');

          listeningElement.setAttribute('style', 'display:none;');
          receivedElement.setAttribute('style', 'display:block;');
        */
        console.log('Received Event: ' + id);
    }
};

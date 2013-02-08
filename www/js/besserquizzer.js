/*jslint browser: true */
/*global angular,$,dd */

 /**
 * Lets try to add an angular controller here.
 */
angular.module('besserQuizzer', ['hmTouchevents', 'teTouchevents']).
    controller('CardsController', function ($scope) {
        "use strict";
        $scope.title = "Besser & Quizzer";
        $scope.menu = { state: "normal" };

        $scope.menuButtonTap = function ($e) {
            console.log("button: got tap: " + $e.type);
            var st = $scope.menu.state;
            $scope.menu.state = (st === "normal") ? "side" : "normal";
            console.log("  Switching state: " + st + " -> " + $scope.menu.state);
        };

        $scope.gotEvent = function ($event) {
            console.log("got event: " + $event.type);
            console.log(dd.inspect($event, 1));
        };
    });


/*
 *
 */
var app = {
    initialize: function () {
        "use strict";
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        "use strict";
        console.log("running app.initialize -> bindevents");
        document.addEventListener("deviceready", app.onDeviceReady, false);

        $(".card").on("touchmove", this.handleCardTouchmove);
        // $(".card").on("touchend",  this.handleCardTouchend);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function (e) {
        "use strict";
        console.log("running app.onDeviceReady");
        // var isdd = (typeof dd === 'undefined') ? "no" : "yes";
        // console.log("do i have dd: " + dd);
        angular.bootstrap(document, ['besserQuizzer']);

        // Load a question.
        // console.log("Calling json");
        // $.getJSON('http://zinc.malt.no:3000/question', app.displayQuestion);
    },

    handleCardTouchmove: function (e) {
        "use strict";
        // console.log("card: got touchmove: " + $(this).id);
        e.preventDefault();

        if (this.id === "main-page") {
            app.moveMainPage(e, $(this));
        }
    },

    handleCardTouchend: function (e) {
        "use strict";
        // console.log("card: got touchend: " + $(this).id);
        if ($(this).hasClass("notransition")) {
            $(this).removeClass("notransition");
        }
    }
    //
    /* displayQuestion: function(data) {
        console.log("Got JSON: " + data.question);
        app.currentQuestion = data;
        var html = '<div class="question">' + data.question + '</div><ul>';
        _.each(data.alternatives, function(value, key, list) {
            // alert(key + ": " + value);
            html += '<li id="a'+ key + '" class="answer"'
            html += 'data-alternative="'+key+'">' + value + '</li>'
        });
        $("#question-box").html(html);


        $(".answer").on('touchend', function(e) {
            var alt = $(this).attr("data-alternative");
            console.log("answer got pressed: " + this.id + ":" + alt);
            var isCorrect = (app.currentQuestion.answer == alt) ? true : false;
            console.log("  Got: " + app.currentQuestion.answer + ":" + alt + 
                ":" + isCorrect
            );
            
            var newClass = (isCorrect) ? "correct" : "wrong";

            $(this).removeClass("answered");
            $(this).addClass(newClass);

            // alert("got chosen");
        });


        $(".answer").on("touchstart", function(e) {
            // this.addClass("answered");
            $(this).addClass("answered");
            console.log("answer: got touchstart: " + this.id);
        });

        $("#question-box").css("left", "15px");

    }, */
    // Start of drag move for the main page.
    /* moveMainPage: function(evt, mp) {
        var e = evt.originalEvent;
        console.log("moveMainPage:");
         _.each(e, function(value, key, list) {
            console.log("  " + key + ": " + value);
            if (_.isObject(value)) {
                _.each(value, function(v2, k2, list2) {
                    console.log("    " + k2 + ": " + v2);
                });
            }
        }); 
    
        if (! mp.hasClass("notransition")) {
            mp.addClass("notransition");
        }
        mp.css("left", e.pageX+"px");
        //console.log("moveMainPage: " + e.pageX + ":" + e.pageY + 
        //    "   " + e.offsetX + ":" + e.offsetY);
    }, */
};

app.initialize();


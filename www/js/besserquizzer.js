/*jslint browser: true */
/*global angular,$,dd,FB,CDV,alert */

 /**
 * Lets try to add an angular controller here.
 */
angular.module('besserQuizzer', ['hmTouchevents', 'teTouchevents']).
    controller('CardsController', function ($scope) {
        "use strict";
        $scope.title = "Besser & Quizzer";
        $scope.menu = {
            state:    "normal",
            position: {},
            side:     265,
            normal:   -1
        };
        $scope.drag = {};
        $scope.lastwastap = false;

        $scope.handleButtonTap = function ($e, $who) {
            console.log("button: got tap: " + $e.type);
            var $el = angular.element(document.getElementById($who));
            var st  = $scope.menu.state;
            $scope.menu.state = (st === "normal") ? "side" : "normal";

            if ($el.hasClass("notransition")) {
                $el.removeClass("notransition");
            }

            $el.css("left", $scope.menu[$scope.menu.state] + "px");
            console.log("  Switching state: " + st + " -> " + $scope.menu.state);
            $scope.lastwastap = true;
        };

        $scope.handleDragstart = function ($e, $who) {
            var $el = angular.element(document.getElementById($who));
            $scope.menu.position.x = $el[0].offsetLeft;
            $scope.drag.main       = { position: $e.position };
            $scope.dragstart = {
                timestamp: $e.originalEvent.timeStamp,
                position: $e.position
            };

            console.log("handleDragstart: ", $e, $who);
        };

        $scope.handleDrag = function ($e, $who) {
            var $el   = document.getElementById($who);
            $el.classList.add("notransition");

            var pos   = { x: $el.offsetLeft };
            var delta = { x: $scope.drag.main.position.x - $e.position.x };

            $scope.drag.main.position = $e.position;
            $scope.menu.position.x = (pos.x - delta.x);
            if ($scope.menu.position.x <= $scope.menu.normal) {
                $scope.menu.position.x = $scope.menu.normal;
                return;
            }
            if ($scope.menu.position.x >= $scope.menu.side) {
                $scope.menu.position.x = $scope.menu.side;
                return;
            }

            $el.style.left = $scope.menu.position.x + "px";

            // console.log("handleDrag: " + $el.style.left + ":" + $left, $e);
        };

        $scope.handleTouchend = function ($e, $who) {
            console.log("handleTouchend: ", $e);

            // Sigh. Using a flag is a poor mans solution.
            // Flag this for maybe refactor later. I just need to keep
            // touchend from cancelling the tap switch menu state.
            if ($scope.lastwastap) {
                $scope.lastwastap = false;
                return;
            }

            var $el = angular.element(document.getElementById($who));

            if ($el.hasClass("notransition")) {
                $el.removeClass("notransition");
            }
            var sideThreshold = (screen.width/2)+10;
            var left = $el[0].offsetLeft;
            $scope.menu.state =  (left >= sideThreshold) ? "side" : "normal";
            $el.css('left', $scope.menu[$scope.menu.state] + "px");
        };

        $scope.handleSwipe = function ($e, $who) {
            var $el = angular.element(document.getElementById($who));
            if ($el.hasClass("notransition")) {
                $el.removeClass("notransition");
            }

            var $timestamp = $e.originalEvent.timeStamp;
            var $duration  = $timestamp - $scope.dragstart.timestamp;
            var $length;
            if ($e.direction === "right") {
                $length = $e.position.x - $scope.dragstart.position.x;
            } else {
                $length = $scope.dragstart.position.x - $e.position.x;
            }
            // var $styles = window.getComputedStyle($el[0]);
            // var originalDuration = $styles.webkitTransitionDuration;
            // $scope.originalTransitionDuration = originalDuration;

            // var $fraction = $scope.menu.side/$length;
            // var $newDuration = ($duration*$fraction)/1000;

            $scope.menu.state = ($e.direction === "right") ? "side" : "normal";
            var $newLeft = $scope.menu[$scope.menu.state] + "px";
            // $el.css('webkitTransitionDuration', $newDuration);
            $el.css('left', $newLeft);
            $scope.lastwastap = true;

            console.log("handleSwipe: state: " + $scope.menu.state, $e);
        };

        $scope.handleTouchmove = function ($e) {
            // console.log("Got call to handle touch move");
            $e.preventDefault();
        };

        $scope.gotEvent = function ($event) {
            console.log("got event: " + $event.type);
        };
    }).
    controller('LoginController', function ($scope) {
        "use strict";
        $scope.loginUser = function () {
            console.log("Got call to loginUser");
        };

        $scope.handleFacebookLogin = function () {
            console.log("Got call to handleFacebookLogin");
        };

        $scope.handleTouchmove = function ($e) {
            $e.preventDefault();
        };
    });


/**
 * Default object literal to execute for our app.
 */
var app = {
    initialize: function () {
        "use strict";
        document.addEventListener("deviceready", app.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        "use strict";
        console.log("running app.onDeviceReady");
        angular.bootstrap(document, ['besserQuizzer']);
        try {
            var res = FB.init({
                appId: "214673242010171",
                nativeInterface: CDV.FB,
                useCachedDialogs: false
            });
        } catch (err) {
            alert("init; " + err);
            console.log("Got FB.init error" + err);
        }
        /*
        try {
            FB.getLoginStatus(app.handleLoginStatus);
        } catch (error) {
            alert("loginstatus: " + error);
        }
        */
    },

    onFBStatusChange: function (response) {
        "use strict";
        console.log("Got status change: " + dd.inspect(response));
    },
    onFBLogin: function (response) {
        "use strict";
        console.log("Got login: " + dd.inspect(response));
    },
    doUnknownUserLogin: function () {
        "use strict";
        // Setting the correct elements visible:
        console.log("got call to doUnknownUserLogin");
        var $cards = angular.element(document.getElementById('cards-controller'));
        var $login = angular.element(document.getElementById('login-controller'));

        $cards.removeClass("visible").addClass("hidden");
        $login.removeClass("hidden").addClass("visible");


    },
    handleLoginStatus: function (response) {
        "use strict";
        console.log("Got loginstatus: " + dd.inspect(response, 4));
        // alert("login status");
        switch (response.status) {
            case 'unknown':
                app.doUnknownUserLogin();
                break;
            case 'connected':
                console.log("Got facebook handleLoginStatus: connected");
                break;
            case 'not_authorized':
                console.log("Got facebook authorisation state: not_authorized");
                break;
            default:
                console.log("WTF: unknown case in handling response.status");
        }
    }
};
app.initialize();

FB.Event.subscribe('auth.statusChange', app.onFBStatusChange);
FB.Event.subscribe('auth.login', app.onFBLogin);

// Load a question.
// console.log("Calling json");
// $.getJSON('http://zinc.malt.no:3000/question', app.displayQuestion);
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

(function () {
    'use strict';

    var mouse = {x: 0, y: 0};

    document.addEventListener('mousemove', function(e){
        mouse.x = e.clientX || e.pageX;
        mouse.y = e.clientY || e.pageY;
    }, false);

    var graphics = {
        /**
         * returns the direction of a point from another
         * @param ctx Canvas context
         * @param p1 Source point
         * @param p2 Destination point
         * @returns {number} Angle in Radians
         */
        getAngle: function (ctx, p1, p2) {
            return Math.atan2(p2.y - p1.y, p2.x - p1.x);
        },
        /**
         * calculates the direction from a point to the mouse pointer
         * @param ctx Canvas Context
         * @param p1 Source point
         * @returns {number} Angle in Radians
         */
        getAngleToMouse: function (ctx, p1) {
            var rect = ctx.canvas.getBoundingClientRect();
            var realPoint = {x: rect.left + p1.x, y: rect.top + p1.y};
            return this.getAngle(ctx, realPoint, mouse);
        },
        /**
         * registers a callback to the mouseMove event
         * @param callback Callback to register
         */
        onMouseMove: function (callback) {
            document.addEventListener('mousemove', callback, false);
        },
        /**
         * draws a bezier curve
         * @param ctx Canvas context
         * @param bezier A custom bezier, array of 4 points, p1, cp1, cp2, p2
         */
        bezier: function (ctx, bezier) {
            ctx.moveTo(bezier[0].x, bezier[0].y);
            ctx.bezierCurveTo(bezier[1].x, bezier[1].y, bezier[2].x, bezier[2].y, bezier[3].x, bezier[3].y);
        }
    };

    window.graphics = graphics;
} ());


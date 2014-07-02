(function (graphics, jsBezier) {
    'use strict';

    /**
     * Renders a catlike creature and manages it's animations
     * @param ctx Canvas context
     * @param {*} creature An object that describes the creature's properties
     * @constructor
     */
    var CreatureRenderer = function(ctx, creature) {
        var self = this;
        this.creature = creature;
        this.ctx = ctx;

        if (creature.behavior !== 'indifferent') {
            graphics.onMouseMove(function () {
                self.draw();
            });
        }

        this.ctx.canvas.addEventListener('click', function() {
            self.wiggleWhiskers();
            setTimeout(function () {
                self.wiggleEars();
            }, 100);
        }, false);

        var earsTimer = Math.random() * 20 + 5;
        setInterval(function () {
            self.wiggleEars();
        }, earsTimer * 1000);

        var whiskersTimer = Math.random() * 20 + 10;
        setInterval(function () {
            self.wiggleWhiskers();
        }, whiskersTimer * 1000);
    };

    /**
     * Main draw function
     */
    CreatureRenderer.prototype.draw = function () {
        this.ctx.lineWidth = 1.5;

        var headBeziers = this.drawHead();

        var rightEarPoint = this.drawEar(headBeziers[0], -1);
        var leftEarPoint = this.drawEar(headBeziers[1], 1);

        this.drawEye(rightEarPoint, -1);
        this.drawEye(leftEarPoint, 1);

        var mouthPoint = this.drawMouth(headBeziers[0][3]);

        this.drawWhiskers(mouthPoint, 1);
        this.drawWhiskers(mouthPoint, -1);
    };

    /**
     * Draws the head outline of the creature
     * @returns {*[]} array of beziers that were used to draw the head
     */
    CreatureRenderer.prototype.drawHead = function () {
        this.ctx.clearRect (0, 0, 150, 150);

        var bezier1 = [
            {x: 80,         y: 30       },
            {x: 80 + 70,    y: 30 - 5   },
            {x: 80 + 65,    y: 110 - 3  },
            {x: 80,         y: 110      }
        ];

        var bezier2 = [
            {x: 80,         y: 110      },
            {x: 80 - 70,    y: 110 + 2  },
            {x: 80 - 65,    y: 30 + 3   },
            {x: 80,         y: 30       }
        ];

        this.ctx.beginPath();
        graphics.bezier(this.ctx, bezier1);
        graphics.bezier(this.ctx, bezier2);
        this.ctx.stroke();

        return [bezier1, bezier2];
    };

    /**
     * Draws an ear
     * @param headBezier Bezier on which to draw the ear
     * @param {number} side specifies which ear (1 or -1)
     * @returns {*} Returns one of the ear's points
     */
    CreatureRenderer.prototype.drawEar = function (headBezier, side) {
        var startPoint,
            endPoint;

        if (side === 1) {
            startPoint = jsBezier.pointOnCurve(headBezier, 0.35);
            endPoint = jsBezier.pointOnCurve(headBezier, 0.08);
        } else {
            startPoint =  jsBezier.pointOnCurve(headBezier, 1 - 0.30);
            endPoint = jsBezier.pointOnCurve(headBezier, 1 - 0.07);
        }

        var midPoint = {
            x: (startPoint.x + endPoint.x) / 2 + this.creature.ears.offset,
            y: endPoint.y - (50 * this.creature.ears.size)
        };

        var bezier1 = [
            startPoint,
            startPoint,
            {x: midPoint.x - (4 * side), y: midPoint.y},
            midPoint
        ];

        var bezier2 = [
            midPoint,
            {x: midPoint.x + (3 * side), y: midPoint.y},
            endPoint,
            endPoint
        ];


        this.ctx.beginPath();

        graphics.bezier(this.ctx, bezier1);
        graphics.bezier(this.ctx, bezier2);
        this.ctx.stroke();

        return endPoint;
    };

    /**
     * Draws an eye
     * @param {*} earPoint A point to offet the eye from
     * @param side Which eye to draw (1 or -1)
     */
    CreatureRenderer.prototype.drawEye = function (earPoint, side) {
        var eyeCenter = {x: earPoint.x - (5 * side) , y: earPoint.y + 25},
            eyeRadius = this.creature.eyes.size;

        this.ctx.fillStyle = this.creature.eyes.color;

        this.ctx.beginPath();
        this.ctx.arc(eyeCenter.x, eyeCenter.y, eyeRadius, 0, 2 * Math.PI, false);
        this.ctx.stroke();

        var angle;
        if (this.creature.behavior.interested === 'following') {
            angle = graphics.getAngleToMouse(this.ctx, eyeCenter);
        } else if (this.creature.behavior.interested === 'ignoring') {
            angle = graphics.getAngleToMouse(this.ctx, eyeCenter) - 180;
        } else {
            angle = graphics.getAngle(this.ctx, eyeCenter, {x: 0, y: 0});
        }
        var eyeballRadius = eyeRadius / 2;
        var eyeball = {
            x: eyeCenter.x + eyeballRadius * Math.cos(angle),
            y: eyeCenter.y + eyeballRadius * Math.sin(angle)
        };

        this.ctx.beginPath();
        this.ctx.arc(eyeball.x, eyeball.y, eyeballRadius, 0, 2 * Math.PI, false);
        this.ctx.fill();

    };

    /**
     * Draws the creature's mouth
     * @param chin A point to offset the mouth from
     * @returns {*} Point of the middle of the mouth
     */
    CreatureRenderer.prototype.drawMouth = function (chin) {
        var midPoint = {x: chin.x, y: chin.y - 15};
        var startPoint = {x: midPoint.x - 10, y: midPoint.y};
        var endPoint = {x: midPoint.x + 10, y: midPoint.y};

        var bezier1 = [
            startPoint,
            {x: startPoint.x, y: startPoint.y + 3},
            {x: midPoint.x - 5, y: midPoint.y},
            midPoint
        ];

        var bezier2 = [
            midPoint,
            {x: midPoint.x + 5, y: midPoint.y},
            {x: endPoint.x, y: endPoint.y + 3},
            endPoint
        ];

        this.ctx.beginPath();
        graphics.bezier(this.ctx, bezier1);
        graphics.bezier(this.ctx, bezier2);
        this.ctx.stroke();

        return midPoint;
    };

    /**
     * Draws whiskers
     * @param mouthPoint Point to offset whiskers from
     * @param side Specifies which side to draw
     */
    CreatureRenderer.prototype.drawWhiskers = function (mouthPoint, side) {
        var whiskersCenter = {x: mouthPoint.x + (12 * side) , y: mouthPoint.y - 10};
        var bezier1 = [
            whiskersCenter,
            whiskersCenter,
            {x: whiskersCenter.x + (20 * side), y: whiskersCenter.y - 8},
            {
                x: whiskersCenter.x + (this.creature.whiskers.length * side),
                y: whiskersCenter.y - 8 + this.creature.whiskers.curve
            }
        ];

        whiskersCenter = {x: mouthPoint.x + (19 * side)  , y: mouthPoint.y - 15};
        var bezier2 = [
            whiskersCenter,
            whiskersCenter,
            {x: whiskersCenter.x + (20 * side), y: whiskersCenter.y - 8},
            {
                x: whiskersCenter.x + (this.creature.whiskers.length * side),
                y: whiskersCenter.y - 8 + this.creature.whiskers.curve
            }
        ];

        whiskersCenter = {x: mouthPoint.x + (19 * side) , y: mouthPoint.y - 6};
        var bezier3 = [
            whiskersCenter,
            whiskersCenter,
            {x: whiskersCenter.x + (20 * side), y: whiskersCenter.y - 8},
            {
                x: whiskersCenter.x + (this.creature.whiskers.length * side),
                y: whiskersCenter.y - 8 + this.creature.whiskers.curve
            }
        ];

        this.ctx.lineWidth = 0.6;
        this.ctx.beginPath();
        graphics.bezier(this.ctx, bezier1);
        graphics.bezier(this.ctx, bezier2);
        graphics.bezier(this.ctx, bezier3);
        this.ctx.stroke();

    };

    /**
     * Runs a whiskers wiggle animation
     */
    CreatureRenderer.prototype.wiggleWhiskers = function () {
        var self = this;
        var progress = 0;
        var interval = setInterval(function () {
            if (progress < 3) {
                self.creature.whiskers.curve += 3;
            } else if (progress < 8) {
                self.creature.whiskers.curve -= 2;
            } else if (progress < 12) {
                self.creature.whiskers.curve += 1;
            } else if (progress < 16) {
                self.creature.whiskers.curve -= 1;
            } else if (progress > 45 && progress < 48) {
                self.creature.whiskers.curve += 3;
            } else if (progress > 47 && progress < 52) {
                self.creature.whiskers.curve -= 1;
            } else {
                self.creature.whiskers.curve = 0;
                clearInterval(interval);
            }

            progress++;
            self.draw();
        }, 1000 / 100);
    };

    /**
     * runs an ear wiggle animation
     */
    CreatureRenderer.prototype.wiggleEars = function () {
        var self = this;
        var progress = 0;
        var interval = setInterval(function () {
            if (progress < 3) {
                self.creature.ears.offset += 2;
            } else if (progress < 8) {
                self.creature.ears.offset -= 2;
            } else if (progress < 12) {
                self.creature.ears.offset += 1;
            } else if (progress < 16) {
                self.creature.ears.offset -= 1;
            } else if (progress > 45 && progress < 48) {
                self.creature.ears.offset += 2;
            } else if (progress > 47 && progress < 52) {
                self.creature.ears.offset -= 1;
            } else {
                self.creature.ears.offset = 0;
                clearInterval(interval);
            }

            progress++;
            self.draw();
        }, 1000 / 60);
    };

    window.CreatureRenderer = CreatureRenderer;

} (window.graphics, window.jsBezier));


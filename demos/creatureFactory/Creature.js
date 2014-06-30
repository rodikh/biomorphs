(function (window, utils) {
    'use strict';

    var Creature = function (options) {
        if (!options) {
            options = {};
        }

        this.height = options.height || 10;
        this.width = options.width  || 10;
        this.color = options.color || 'red';
        this.shape = options.shape || 'round';
        this.opacity = options.opacity || 1;
    };

    Creature.prototype.mutate = function () {
        var gene = utils.probableFromArray(this.genes, 0.5);

        if (gene) {
            return gene.mutate(this);
        }

        return this;
    };

    Creature.prototype.reproduce = function () {
        var newCreature = new Creature(this);
        newCreature.mutate();
        return newCreature;
    };

    Creature.prototype.draw = function (element) {
        var creatureElement = document.createElement('div');
        creatureElement.className = 'creature';

        var div = document.createElement('div');
        div.style.height = this.height + 'px';
        div.style.width = this.width + 'px';
        div.style.backgroundColor = this.color;

        creatureElement.appendChild(div);

        if (element) {
            element.appendChild(creatureElement);
        }

        return creatureElement;
    };

    window.Creature = Creature;
} (window, window.utils));

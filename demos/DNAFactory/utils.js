(function (window) {
    'use strict';


    /**
     * Returns a random item from an array
     * @param {[*]} array
     * @returns {*} Random item
     */
    function randomFromArray(array) {
        var randomIndex = Math.floor(Math.random() * array.length);

        return array[randomIndex];
    }

    /**
     * returns an item from an array by probability
     * @param {[probability]} array An array of items that must have a probability property
     * @returns {*}
     */
    function probableFromArray(array) {
        var valid = true;
        var sumProbabilities = array.reduce(function (sum, item) {
            if (item.probability === undefined) {
                valid = false;
                return;
            }
            return sum + item.probability;
        }, 0);

        if (!valid) {
            return randomFromArray(array);
        }

        var rand = Math.random() * sumProbabilities,
            arrayLength = array.length,
            i,
            totalProbability = 0;

        for (i = 0; i < arrayLength; i++) {
            totalProbability += array[i].probability;
            if (rand <= totalProbability) {
                return array[i];
            }
        }

        return array[0];
    }

    window.utils = {
        randomFromArray: randomFromArray,
        probableFromArray: probableFromArray
    };

} (window));
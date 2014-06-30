(function (window) {
    'use strict';

    /**
     * I'm not very well versed in regex, this was taken from:
     * http://stackoverflow.com/questions/11920697/how-to-get-hash-value-in-a-url-in-js
     * @param key
     * @returns {*}
     */
    function getHashValue(key) {
        if (!location.hash) {
            return null;
        }

        return location.hash.match(new RegExp(key+'=([^&]*)'))[1];
    }


    /**
     *
     * @param creature
     */
    function createUrl(creature) {
        var json = JSON.stringify(creature);
        var encoded = btoa(json);
        window.location.href = '#creature=' + encoded;
    }

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
     * @param {number} [idleProbability] If defined, adds a probability of returning nothing
     * @returns {*}
     */
    function probableFromArray(array, idleProbability) {
        var valid = true;
        var sumProbabilities = array.reduce(function (sum, item) {
            if (item.probability === undefined) {
                valid = false;
                return;
            }
            return sum + item.probability;
        }, 0);

        if (idleProbability && typeof idleProbability === 'number') {
            sumProbabilities += idleProbability;
        }

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

        return null;
    }

    /**
     *
     * @param obj
     * @returns {*}
     */
    function clone(obj){
        if(obj === null || typeof(obj) !== 'object') {
            return obj;
        }

        var newObj = obj.constructor(),
            key;

        for(key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = clone(obj[key]);
            }
        }
        return newObj;
    }

    /**
     *
     */
    function log() {
        var line = '',
            argumentsLength = arguments.length,
            i;

        for (i = 0; i < argumentsLength; i++ ) {
            if (typeof arguments[i] === 'object') {
                line += JSON.stringify(arguments[i]);
            } else {
                line += arguments[i];
            }

            line += ' ';
        }
        document.querySelector('.console pre').innerHTML += line + '\n';
    }

    window.utils = {
        getHashValue: getHashValue,
        createUrl: createUrl,
        randomFromArray: randomFromArray,
        probableFromArray: probableFromArray,
        clone: clone,
        log: log
    };

} (window));

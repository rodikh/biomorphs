(function () {
    'use strict';

    window.genes = {
        eyeColor: {
            probability: 0.2,
            bases: ['red', 'blue', 'green', 'yellow', 'purple', 'pink'],
            mutateProp: 'eyeColor'
        },
        eyeSize: {
            probability: 0.2,
            bases: [10, 15, 20],
            mutateProp: 'eyeSize'
        },
        behavior: {
            probability: 0.2,
            bases: ['following', 'ignoring', 'indifferent'],
            mutateProp: 'behavior'
        },
        earSize: {
            probability: 0.2,
            bases: [0.1, 0.3, 0.5],
            mutateProp: 'earSize'
        },
        whiskersLength: {
            probability: 0.2,
            bases: [30, 40, 50],
            mutateProp: 'whiskersLength'
        }
    };

} ());

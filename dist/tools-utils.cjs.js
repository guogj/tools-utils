'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.random = random;

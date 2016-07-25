'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _METHODS; /**
               * @module
               * @prototype {Function} unregisterEvents
               */

var _smooth_scrollbar = require('../smooth_scrollbar');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTIONS = {
    REGIESTER: 0,
    UNREGIESTER: 1
};

var METHODS = (_METHODS = {}, (0, _defineProperty3.default)(_METHODS, ACTIONS.REGIESTER, 'addEventListener'), (0, _defineProperty3.default)(_METHODS, ACTIONS.UNREGIESTER, 'removeEventListener'), _METHODS);

function matchSomeRules(str, rules) {
    return !!rules.length && rules.some(function (regex) {
        return str.match(regex);
    });
};

function manageEvents() {
    var action = arguments.length <= 0 || arguments[0] === undefined ? ACTIONS.REGIESTER : arguments[0];

    var method = METHODS[action];

    return function () {
        for (var _len = arguments.length, rules = Array(_len), _key = 0; _key < _len; _key++) {
            rules[_key] = arguments[_key];
        }

        this.__handlers.forEach(function (handler) {
            var elem = handler.elem;
            var evt = handler.evt;
            var fn = handler.fn;
            var hasRegistered = handler.hasRegistered;


            if (hasRegistered && action === ACTIONS.REGIESTER || !hasRegistered && action === ACTIONS.UNREGIESTER) {
                return;
            }

            if (matchSomeRules(evt, rules)) {
                elem[method](evt, fn);
                handler.hasRegistered = !hasRegistered;
            }
        });
    };
};

_smooth_scrollbar.SmoothScrollbar.prototype.registerEvents = manageEvents(ACTIONS.REGIESTER);
_smooth_scrollbar.SmoothScrollbar.prototype.unregisterEvents = manageEvents(ACTIONS.UNREGIESTER);
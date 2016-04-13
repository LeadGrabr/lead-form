'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rebass = require('rebass');

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _joifulReactForms = require('joiful-react-forms');

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _reflexbox = require('reflexbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var LeadForm = (_class = (_temp2 = _class2 = function (_Component) {
    _inherits(LeadForm, _Component);

    function LeadForm() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, LeadForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LeadForm)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LeadForm, [{
        key: 'handleSubmit',
        value: function handleSubmit(error) {
            if (error) {
                return false;
            }

            return this.props.submit(this.state);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(event, formValues) {
            this.setState(formValues);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var status = _props.status;
            var theme = _props.theme;

            var props = _objectWithoutProperties(_props, ['status', 'theme']);

            var inputProps = { theme: theme };
            return _react2.default.createElement(
                _rebass.Base,
                props,
                _react2.default.createElement(
                    _joifulReactForms.JoifulForm,
                    {
                        onChange: this.handleChange,
                        onSubmit: this.handleSubmit,
                        schema: {
                            name: _joi2.default.string().required(),
                            email: _joi2.default.string().email().required(),
                            phone: _joi2.default.string().min(10).max(12),
                            message: _joi2.default.string().min(3)
                        },
                        values: this.state
                    },
                    _react2.default.createElement(_joifulReactForms.JoifulInput, _extends({}, inputProps, {
                        label: 'Name',
                        name: 'name'
                    })),
                    _react2.default.createElement(_joifulReactForms.JoifulInput, _extends({}, inputProps, {
                        label: 'Email',
                        name: 'email'
                    })),
                    _react2.default.createElement(_joifulReactForms.JoifulInput, _extends({}, inputProps, {
                        label: 'Phone',
                        name: 'phone'
                    })),
                    _react2.default.createElement(_joifulReactForms.JoifulInput, _extends({}, inputProps, {
                        is: 'textarea',
                        label: 'Message',
                        name: 'message'
                    })),
                    _react2.default.createElement(
                        _rebass.Button,
                        {
                            backgroundColor: 'primary',
                            disabled: status === 'pending',
                            onClick: this.handleSubmit,
                            style: { width: '100%' }
                        },
                        status === 'pending' ? _react2.default.createElement(
                            _reflexbox.Flex,
                            { justify: 'center' },
                            'Processing...'
                        ) : 'Submit'
                    )
                )
            );
        }
    }]);

    return LeadForm;
}(_react.Component), _class2.propTypes = {
    status: _react.PropTypes.bool.isRequired,
    submit: _react.PropTypes.func.isRequired,
    theme: _react.PropTypes.oneOf(['primary', 'secondary', 'default', 'info', 'success', 'warning', 'error'])
}, _class2.defaultProps = {
    theme: 'default'
}, _temp2), (_applyDecoratedDescriptor(_class.prototype, 'handleSubmit', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleSubmit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleChange', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleChange'), _class.prototype)), _class);
exports.default = LeadForm;
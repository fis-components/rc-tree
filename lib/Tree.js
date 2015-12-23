'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var Tree = (function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree(props) {
    var _this = this;

    _classCallCheck(this, Tree);

    _get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this, props);
    ['handleKeyDown', 'handleChecked', 'handleSelect'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(Tree, [{
    key: 'handleChecked',
    value: function handleChecked(isChk, c, e) {
      if (this.props.onChecked) {
        this.props.onChecked(isChk, c, e);
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(isSel, c, e) {
      if (this.props.onSelect) {
        this.props.onSelect(isSel, c, e);
      }
    }

    // all keyboard events callbacks run from here at first
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      console.log(_rcUtil.KeyCode);
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var domProps = {
        className: (0, _rcUtil.classSet)(props.className, props.prefixCls),
        onKeyDown: this.handleKeyDown,
        role: 'tree-node',
        'aria-activedescendant': '',
        'aria-labelledby': '',
        'aria-expanded': props.expanded ? 'true' : 'false',
        'aria-selected': props.selected ? 'true' : 'false',
        'aria-level': ''
      };
      if (props._isChildTree) {
        domProps.style = props.expanded ? { display: 'block' } : { display: 'none' };
      }
      this.childrenLength = _react2['default'].Children.count(props.children);
      this.newChildren = _react2['default'].Children.map(props.children, this.renderTreeNode, this);

      return _react2['default'].createElement(
        'ul',
        _extends({}, domProps, { ref: 'tree' }),
        this.newChildren
      );
    }
  }, {
    key: 'renderTreeNode',
    value: function renderTreeNode(child, index) {
      var props = this.props;
      var pos = (props._pos || 0) + '-' + index;
      var cloneProps = {
        ref: 'treeNode',
        _level: props._level || 0,
        _pos: pos,
        _isChildTree: props._isChildTree || false,
        _index: index,
        _len: this.childrenLength,
        _checked: props._checked,
        _checkPart: props._checkPart,
        prefixCls: props.prefixCls,
        showLine: props.showLine,
        expandAll: props.expandAll,
        checkable: props.checkable,
        onChecked: this.handleChecked,
        onSelect: this.handleSelect
      };
      return _react2['default'].cloneElement(child, cloneProps);
    }
  }], [{
    key: 'statics',
    value: function statics() {
      return {
        treeNodesState: {},
        trees: []
      };
    }
  }]);

  return Tree;
})(_react2['default'].Component);

Tree.propTypes = {
  prefixCls: _react2['default'].PropTypes.string,
  checkable: _react2['default'].PropTypes.bool,
  showLine: _react2['default'].PropTypes.bool,
  expandAll: _react2['default'].PropTypes.bool,
  onChecked: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func
};

Tree.defaultProps = {
  prefixCls: 'rc-tree',
  checkable: false,
  showLine: true,
  expandAll: false
};

exports['default'] = Tree;
module.exports = exports['default'];
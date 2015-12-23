'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var TreeNode = (function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    var _this = this;

    _classCallCheck(this, TreeNode);

    _get(Object.getPrototypeOf(TreeNode.prototype), 'constructor', this).call(this, props);
    ['handleExpanded', 'handleChecked'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(TreeNode, [{
    key: 'getPosition',
    value: function getPosition(pos) {
      var obj = {
        last: false,
        center: false
      };
      var siblings = Object.keys(this.props.root.treeNodesChkStates).filter(function (item) {
        var len = pos.length;
        return len === item.length && pos.substring(0, len - 2) === item.substring(0, len - 2);
      });
      var sLen = siblings.length;
      var posIndex = Number(pos.substr(-1, 1));
      if (sLen === 1 || posIndex === sLen - 1) {
        obj.last = true;
      } else {
        obj.center = true;
      }
      return obj;
    }
  }, {
    key: 'renderSwitcher',
    value: function renderSwitcher(props, expandedState) {
      var _switcherCls;

      var prefixCls = props.prefixCls;
      var switcherCls = (_switcherCls = {}, _defineProperty(_switcherCls, prefixCls + '-button', true), _defineProperty(_switcherCls, prefixCls + '-switcher', true), _switcherCls);
      if (props.disabled) {
        switcherCls[prefixCls + '-switcher-disabled'] = true;
        return _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(switcherCls) });
      }

      var posObj = this.getPosition(props.pos);

      if (!props.showLine) {
        switcherCls[prefixCls + '-noline_' + expandedState] = true;
      } else if (props.pos === '0-0') {
        switcherCls[prefixCls + '-roots_' + expandedState] = true;
      } else {
        switcherCls[prefixCls + '-center_' + expandedState] = posObj.center;
        switcherCls[prefixCls + '-bottom_' + expandedState] = posObj.last;
      }
      return _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(switcherCls), onClick: this.handleExpanded });
    }
  }, {
    key: 'renderCheckbox',
    value: function renderCheckbox(props) {
      var _checkboxCls;

      var prefixCls = props.prefixCls;
      var checkboxCls = (_checkboxCls = {}, _defineProperty(_checkboxCls, prefixCls + '-button', true), _defineProperty(_checkboxCls, prefixCls + '-checkbox', true), _checkboxCls);
      if (!props.checkable) {
        return null;
      }
      if (props.disabled) {
        checkboxCls[prefixCls + '-checkbox-disabled'] = true;
      }
      if (props.checkPart) {
        checkboxCls[prefixCls + '-checkbox-indeterminate'] = true;
      } else if (props.checked) {
        checkboxCls[prefixCls + '-checkbox-checked'] = true;
      }
      return _react2['default'].createElement('span', { ref: 'checkbox', className: (0, _rcUtil.classSet)(checkboxCls) });
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(props) {
      var newChildren = null;
      var children = props.children;
      if (children.type === TreeNode || Array.isArray(children) && children.every(function (item) {
        return item.type === TreeNode;
      })) {
        var style = props.expanded ? { display: 'block' } : { display: 'none' };
        var cls = {};
        cls[props.prefixCls + '-child-tree'] = true;
        if (props.showLine) {
          cls[props.prefixCls + '-line'] = this.getPosition(props.pos).center;
        }
        newChildren = this.newChildren = _react2['default'].createElement(
          'ul',
          { className: (0, _rcUtil.classSet)(cls), style: style },
          _react2['default'].Children.map(children, function (item, index) {
            return props.root.renderTreeNode(item, index, props.pos);
          }, props.root)
        );
      } else {
        newChildren = children;
      }
      return newChildren;
    }
  }, {
    key: 'render',
    value: function render() {
      var _iconEleCls,
          _this2 = this;

      var props = this.props;
      var prefixCls = props.prefixCls;
      // const expandedState = (props.defaultExpandAll || props.expanded) ? 'open' : 'close';
      var expandedState = props.expanded ? 'open' : 'close';

      var iconEleCls = (_iconEleCls = {}, _defineProperty(_iconEleCls, prefixCls + '-button', true), _defineProperty(_iconEleCls, prefixCls + '-iconEle', true), _defineProperty(_iconEleCls, prefixCls + '-icon__' + expandedState, true), _iconEleCls);

      var content = props.title;
      var newChildren = this.renderChildren(props);
      if (newChildren === props.children) {
        content = newChildren;
        newChildren = null;
      }

      var selectHandle = function selectHandle() {
        var icon = props.showIcon ? _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(iconEleCls) }) : null;
        var title = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-title' },
          content
        );
        var domProps = {};
        if (!props.disabled && props.checkable) {
          domProps.onClick = _this2.handleChecked;
        }
        return _react2['default'].createElement(
          'a',
          _extends({ ref: 'selectHandle', title: content }, domProps),
          _this2.renderCheckbox(props),
          icon,
          title
        );
      };

      return _react2['default'].createElement(
        'li',
        { className: (0, _rcUtil.joinClasses)(props.className, props.disabled ? prefixCls + '-treenode-disabled' : '') },
        this.renderSwitcher(props, expandedState),
        selectHandle(),
        newChildren
      );
    }
  }, {
    key: 'handleExpanded',
    value: function handleExpanded() {
      this.props.root.handleExpanded(this);
    }
  }, {
    key: 'handleChecked',
    value: function handleChecked() {
      this.props.root.handleChecked(this);
    }

    // keyboard event support
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      e.preventDefault();
    }
  }]);

  return TreeNode;
})(_react2['default'].Component);

TreeNode.propTypes = {
  prefixCls: _react2['default'].PropTypes.string,
  expanded: _react2['default'].PropTypes.bool,
  root: _react2['default'].PropTypes.object,
  onSelect: _react2['default'].PropTypes.func
};
TreeNode.defaultProps = {
  title: '---'
};

exports['default'] = TreeNode;
module.exports = exports['default'];
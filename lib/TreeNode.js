'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var defaultTitle = '---';

var TreeNode = (function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    var _this = this;

    _classCallCheck(this, TreeNode);

    _get(Object.getPrototypeOf(TreeNode.prototype), 'constructor', this).call(this, props);
    ['handleExpand', 'handleCheck', 'handleContextMenu'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
    this.state = {
      dataLoading: false
    };
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
    key: 'handleCheck',
    value: function handleCheck() {
      this.props.root.handleCheck(this);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect() {
      this.props.root.handleSelect(this);
    }
  }, {
    key: 'handleContextMenu',
    value: function handleContextMenu(e) {
      e.preventDefault();
      this.props.root.handleContextMenu(e, this);
    }
  }, {
    key: 'handleExpand',
    value: function handleExpand() {
      var _this2 = this;

      var callbackPromise = this.props.root.handleExpand(this);
      if (callbackPromise && typeof callbackPromise === 'object') {
        (function () {
          var setLoading = function setLoading(dataLoading) {
            _this2.setState({
              dataLoading: dataLoading
            });
          };
          setLoading(true);
          callbackPromise.then(function () {
            setLoading(false);
          }, function () {
            setLoading(false);
          });
        })();
      }
    }

    // keyboard event support
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      e.preventDefault();
    }
  }, {
    key: 'renderSwitcher',
    value: function renderSwitcher(props, expandedState) {
      var prefixCls = props.prefixCls;
      var switcherCls = _defineProperty({}, prefixCls + '-switcher', true);
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
      return _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(switcherCls), onClick: this.handleExpand });
    }
  }, {
    key: 'renderCheckbox',
    value: function renderCheckbox(props) {
      var prefixCls = props.prefixCls;
      var checkboxCls = _defineProperty({}, prefixCls + '-checkbox', true);
      if (props.checkPart) {
        checkboxCls[prefixCls + '-checkbox-indeterminate'] = true;
      } else if (props.checked) {
        checkboxCls[prefixCls + '-checkbox-checked'] = true;
      }
      var customEle = null;
      if (typeof props.checkable !== 'boolean') {
        customEle = props.checkable;
      }
      if (props.disabled) {
        checkboxCls[prefixCls + '-checkbox-disabled'] = true;
        return _react2['default'].createElement(
          'span',
          { ref: 'checkbox', className: (0, _rcUtil.classSet)(checkboxCls) },
          customEle
        );
      }
      return _react2['default'].createElement(
        'span',
        { ref: 'checkbox', className: (0, _rcUtil.classSet)(checkboxCls), onClick: this.handleCheck },
        customEle
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(props) {
      var renderFirst = this.renderFirst;
      this.renderFirst = 1;
      var transitionAppear = true;
      if (!renderFirst && props.expanded) {
        transitionAppear = false;
      }
      var children = props.children;
      var newChildren = children;
      if (!children) {
        return children;
      }
      if (children.type === TreeNode || Array.isArray(children) && children.every(function (item) {
        return item.type === TreeNode;
      })) {
        var _cls;

        var cls = (_cls = {}, _defineProperty(_cls, props.prefixCls + '-child-tree', true), _defineProperty(_cls, props.prefixCls + '-child-tree-open', props.expanded), _cls);
        if (props.showLine) {
          cls[props.prefixCls + '-line'] = this.getPosition(props.pos).center;
        }
        var animProps = {};
        if (props.openTransitionName) {
          animProps.transitionName = props.openTransitionName;
        } else if (typeof props.openAnimation === 'object') {
          animProps.animation = (0, _objectAssign2['default'])({}, props.openAnimation);
          if (!transitionAppear) {
            delete animProps.animation.appear;
          }
        }
        newChildren = this.newChildren = _react2['default'].createElement(
          _rcAnimate2['default'],
          _extends({}, animProps, {
            showProp: 'expanded',
            transitionAppear: transitionAppear,
            component: '' }),
          _react2['default'].createElement(
            'ul',
            { className: (0, _rcUtil.classSet)(cls), expanded: props.expanded },
            _react2['default'].Children.map(children, function (item, index) {
              return props.root.renderTreeNode(item, index, props.pos);
            }, props.root)
          )
        );
      }
      return newChildren;
    }
  }, {
    key: 'render',
    value: function render() {
      var _iconEleCls,
          _this3 = this;

      var props = this.props;
      var prefixCls = props.prefixCls;
      var expandedState = props.expanded ? 'open' : 'close';

      var iconEleCls = (_iconEleCls = {}, _defineProperty(_iconEleCls, prefixCls + '-iconEle', true), _defineProperty(_iconEleCls, prefixCls + '-icon_loading', this.state.dataLoading), _defineProperty(_iconEleCls, prefixCls + '-icon__' + expandedState, true), _iconEleCls);

      var canRenderSwitcher = true;
      var content = props.title;
      var newChildren = this.renderChildren(props);
      if (!newChildren || newChildren === props.children) {
        // content = newChildren;
        newChildren = null;
        if (!props.onDataLoaded) {
          canRenderSwitcher = false;
        }
      }

      var selectHandle = function selectHandle() {
        var icon = props.showIcon || props.onDataLoaded && _this3.state.dataLoading ? _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(iconEleCls) }) : null;
        var title = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-title' },
          content
        );
        var domProps = {};
        if (!props.disabled) {
          if (props.selected) {
            domProps.className = prefixCls + '-node-selected';
          }
          domProps.onClick = function () {
            _this3.handleSelect();
            if (props.checkable) {
              _this3.handleCheck();
            }
          };
          if (props.onRightClick) {
            domProps.onContextMenu = _this3.handleContextMenu;
          }
        }
        return _react2['default'].createElement(
          'a',
          _extends({ ref: 'selectHandle', title: content }, domProps),
          icon,
          title
        );
      };

      return _react2['default'].createElement(
        'li',
        { className: (0, _rcUtil.joinClasses)(props.className, props.disabled ? prefixCls + '-treenode-disabled' : '') },
        canRenderSwitcher ? this.renderSwitcher(props, expandedState) : _react2['default'].createElement('span', { className: prefixCls + '-switcher-noop' }),
        props.checkable ? this.renderCheckbox(props) : null,
        selectHandle(),
        newChildren
      );
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
  title: defaultTitle
};

exports['default'] = TreeNode;
module.exports = exports['default'];
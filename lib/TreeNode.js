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

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _rcAnimate = require('rc-animate');

var _rcAnimate2 = _interopRequireDefault(_rcAnimate);

var _util = require('./util');

var browserUa = (0, _util.browser)(window.navigator.userAgent || '');
var ieOrEdge = /.*(IE|Edge).+/.test(browserUa);
// const uaArray = browserUa.split(' ');
// const gtIE8 = uaArray.length !== 2 || uaArray[0].indexOf('IE') === -1 || Number(uaArray[1]) > 8;

var defaultTitle = '---';

var TreeNode = (function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    var _this = this;

    _classCallCheck(this, TreeNode);

    _get(Object.getPrototypeOf(TreeNode.prototype), 'constructor', this).call(this, props);
    ['onExpand', 'onCheck', 'onContextMenu', 'onMouseEnter', 'onMouseLeave', 'onDragStart', 'onDragEnter', 'onDragOver', 'onDragLeave', 'onDrop'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
    this.state = {
      dataLoading: false,
      dragNodeHighlight: false
    };
  }

  _createClass(TreeNode, [{
    key: 'onCheck',
    value: function onCheck() {
      this.props.root.onCheck(this);
    }
  }, {
    key: 'onSelect',
    value: function onSelect() {
      this.props.root.onSelect(this);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(e) {
      e.preventDefault();
      this.props.root.onMouseEnter(e, this);
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(e) {
      e.preventDefault();
      this.props.root.onMouseLeave(e, this);
    }
  }, {
    key: 'onContextMenu',
    value: function onContextMenu(e) {
      e.preventDefault();
      this.props.root.onContextMenu(e, this);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e) {
      // console.log('dragstart', this.props.eventKey, e);
      // e.preventDefault();
      e.stopPropagation();
      this.setState({
        dragNodeHighlight: true
      });
      this.props.root.onDragStart(e, this);
      try {
        // ie throw error
        e.dataTransfer.setData('text/plain', 'firefox-need-it');
      } finally {
        // empty
      }
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter(e) {
      // console.log('dragenter', this.props.eventKey, e);
      e.preventDefault();
      e.stopPropagation();
      this.props.root.onDragEnter(e, this);
    }
  }, {
    key: 'onDragOver',
    value: function onDragOver(e) {
      // console.log(this.props.eventKey, e);
      // todo disabled
      e.preventDefault();
      e.stopPropagation();
      this.props.root.onDragOver(e, this);
      return false;
    }
  }, {
    key: 'onDragLeave',
    value: function onDragLeave(e) {
      // console.log(this.props.eventKey, e);
      e.stopPropagation();
      this.props.root.onDragLeave(e, this);
    }
  }, {
    key: 'onDrop',
    value: function onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        dragNodeHighlight: false
      });
      this.props.root.onDrop(e, this);
    }
  }, {
    key: 'onExpand',
    value: function onExpand() {
      var _this2 = this;

      var callbackPromise = this.props.root.onExpand(this);
      if (callbackPromise && typeof callbackPromise === 'object') {
        (function () {
          var setLoading = function setLoading(dataLoading) {
            _this2.setState({ dataLoading: dataLoading });
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
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      e.preventDefault();
    }
  }, {
    key: 'renderSwitcher',
    value: function renderSwitcher(props, expandedState) {
      var prefixCls = props.prefixCls;
      var switcherCls = _defineProperty({}, prefixCls + '-switcher', true);
      if (!props.showLine) {
        switcherCls[prefixCls + '-noline_' + expandedState] = true;
      } else if (props.pos === '0-0') {
        switcherCls[prefixCls + '-roots_' + expandedState] = true;
      } else {
        switcherCls[prefixCls + '-center_' + expandedState] = !props.last;
        switcherCls[prefixCls + '-bottom_' + expandedState] = props.last;
      }
      if (props.disabled) {
        switcherCls[prefixCls + '-switcher-disabled'] = true;
        return _react2['default'].createElement('span', { className: (0, _classnames2['default'])(switcherCls) });
      }
      return _react2['default'].createElement('span', { className: (0, _classnames2['default'])(switcherCls), onClick: this.onExpand });
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
      if (props.disabled || props.disableCheckbox) {
        checkboxCls[prefixCls + '-checkbox-disabled'] = true;
        return _react2['default'].createElement(
          'span',
          { ref: 'checkbox', className: (0, _classnames2['default'])(checkboxCls) },
          customEle
        );
      }
      return _react2['default'].createElement(
        'span',
        { ref: 'checkbox', className: (0, _classnames2['default'])(checkboxCls), onClick: this.onCheck },
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
      var allTreeNode = undefined;
      if (Array.isArray(children)) {
        allTreeNode = children.every(function (item) {
          return item.type === TreeNode;
        });
      }
      if (children && (children.type === TreeNode || allTreeNode)) {
        var _cls;

        var cls = (_cls = {}, _defineProperty(_cls, props.prefixCls + '-child-tree', true), _defineProperty(_cls, props.prefixCls + '-child-tree-open', props.expanded), _cls);
        if (props.showLine) {
          cls[props.prefixCls + '-line'] = !props.last;
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
        newChildren = _react2['default'].createElement(
          _rcAnimate2['default'],
          _extends({}, animProps, {
            showProp: 'expanded',
            transitionAppear: transitionAppear,
            component: '' }),
          _react2['default'].createElement(
            'ul',
            { className: (0, _classnames2['default'])(cls), expanded: props.expanded },
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
        if (!props.loadData || props.isLeaf) {
          canRenderSwitcher = false;
        }
      }

      var selectHandle = function selectHandle() {
        var icon = props.showIcon || props.loadData && _this3.state.dataLoading ? _react2['default'].createElement('span', { className: (0, _classnames2['default'])(iconEleCls) }) : null;
        var title = _react2['default'].createElement(
          'span',
          { className: prefixCls + '-title' },
          content
        );
        var domProps = {};
        if (!props.disabled) {
          if (props.selected || _this3.state.dragNodeHighlight) {
            domProps.className = prefixCls + '-node-selected';
          }
          domProps.onClick = function (e) {
            e.preventDefault();
            if (props.selectable) {
              _this3.onSelect();
            }
            // not fire check event
            // if (props.checkable) {
            //   this.onCheck();
            // }
          };
          if (props.onRightClick) {
            domProps.onContextMenu = _this3.onContextMenu;
          }
          if (props.onMouseEnter) {
            domProps.onMouseEnter = _this3.onMouseEnter;
          }
          if (props.onMouseLeave) {
            domProps.onMouseLeave = _this3.onMouseLeave;
          }
          if (props.draggable) {
            if (ieOrEdge) {
              // ie bug!
              domProps.href = '#';
            }
            domProps.draggable = true;
            domProps['aria-grabbed'] = true;
            domProps.onDragStart = _this3.onDragStart;
          }
        }
        return _react2['default'].createElement(
          'a',
          _extends({ ref: 'selectHandle', title: typeof content === 'string' ? content : '' }, domProps),
          icon,
          title
        );
      };

      var liProps = {};
      if (props.draggable) {
        liProps.onDragEnter = this.onDragEnter;
        liProps.onDragOver = this.onDragOver;
        liProps.onDragLeave = this.onDragLeave;
        liProps.onDrop = this.onDrop;
      }

      var disabledCls = '';
      var dragOverCls = '';
      if (props.disabled) {
        disabledCls = prefixCls + '-treenode-disabled';
      } else if (props.dragOver) {
        dragOverCls = 'drag-over';
      } else if (props.dragOverGapTop) {
        dragOverCls = 'drag-over-gap-top';
      } else if (props.dragOverGapBottom) {
        dragOverCls = 'drag-over-gap-bottom';
      }

      var filterCls = props.filterTreeNode(this) ? 'filter-node' : '';

      var noopSwitcher = function noopSwitcher() {
        var _cls2;

        var cls = (_cls2 = {}, _defineProperty(_cls2, prefixCls + '-switcher', true), _defineProperty(_cls2, prefixCls + '-switcher-noop', true), _cls2);
        if (props.showLine) {
          cls[prefixCls + '-center_docu'] = !props.last;
          cls[prefixCls + '-bottom_docu'] = props.last;
        } else {
          cls[prefixCls + '-noline_docu'] = true;
        }
        return _react2['default'].createElement('span', { className: (0, _classnames2['default'])(cls) });
      };

      return _react2['default'].createElement(
        'li',
        _extends({}, liProps, { ref: 'li', className: (0, _classnames2['default'])(props.className, disabledCls, dragOverCls, filterCls) }),
        canRenderSwitcher ? this.renderSwitcher(props, expandedState) : noopSwitcher(),
        props.checkable ? this.renderCheckbox(props) : null,
        selectHandle(),
        newChildren
      );
    }
  }]);

  return TreeNode;
})(_react2['default'].Component);

TreeNode.isTreeNode = 1;

TreeNode.propTypes = {
  prefixCls: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  disableCheckbox: _react.PropTypes.bool,
  expanded: _react.PropTypes.bool,
  isLeaf: _react.PropTypes.bool,
  root: _react.PropTypes.object,
  onSelect: _react.PropTypes.func
};

TreeNode.defaultProps = {
  title: defaultTitle
};

exports['default'] = TreeNode;
module.exports = exports['default'];
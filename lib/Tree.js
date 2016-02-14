'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _util = require('./util');

function noop() {}

var Tree = (function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree(props) {
    var _this = this;

    _classCallCheck(this, Tree);

    _get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this, props);
    ['onKeyDown', 'onCheck'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
    this.contextmenuKeys = [];

    this.state = {
      expandedKeys: this.getDefaultExpandedKeys(props),
      checkedKeys: this.getDefaultCheckedKeys(props),
      selectedKeys: this.getDefaultSelectedKeys(props),
      dragNodesKeys: '',
      dragOverNodeKey: '',
      dropNodeKey: ''
    };
  }

  _createClass(Tree, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
      var checkedKeys = this.getDefaultCheckedKeys(nextProps, true);
      var selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
      var st = {};
      if (expandedKeys) {
        st.expandedKeys = expandedKeys;
      }
      if (checkedKeys) {
        st.checkedKeys = checkedKeys;
      }
      if (selectedKeys) {
        st.selectedKeys = selectedKeys;
      }
      this.setState(st);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e, treeNode) {
      this.dragNode = treeNode;
      this.dragNodesKeys = this.getDragNodes(treeNode);
      var st = {
        dragNodesKeys: this.dragNodesKeys
      };
      var expandedKeys = this.getExpandedKeys(treeNode, false);
      if (expandedKeys) {
        // Controlled expand, save and then reset
        this.getRawExpandedKeys();
        st.expandedKeys = expandedKeys;
      }
      this.setState(st);
      this.props.onDragStart({
        event: e,
        node: treeNode
      });
    }
  }, {
    key: 'onDragEnterGap',
    value: function onDragEnterGap(e, treeNode) {
      // console.log(e.pageY, getOffset(treeNode.refs.selectHandle), treeNode.props.eventKey);
      var offsetTop = (0, _util.getOffset)(treeNode.refs.selectHandle).top;
      var offsetHeight = treeNode.refs.selectHandle.offsetHeight;
      var pageY = e.pageY;
      var gapHeight = 2;
      if (pageY > offsetTop + offsetHeight - gapHeight) {
        this.dropPosition = 1;
        return 1;
      }
      if (pageY < offsetTop + gapHeight) {
        this.dropPosition = -1;
        return -1;
      }
      this.dropPosition = 0;
      return 0;
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter(e, treeNode) {
      var enterGap = this.onDragEnterGap(e, treeNode);
      if (this.dragNode.props.eventKey === treeNode.props.eventKey && enterGap === 0) {
        this.setState({
          dragOverNodeKey: ''
        });
        return;
      }
      var st = {
        dragOverNodeKey: treeNode.props.eventKey
      };
      var expandedKeys = this.getExpandedKeys(treeNode, true);
      if (expandedKeys) {
        this.getRawExpandedKeys();
        st.expandedKeys = expandedKeys;
      }
      this.setState(st);
      this.props.onDragEnter({
        event: e,
        node: treeNode,
        expandedKeys: expandedKeys && [].concat(_toConsumableArray(expandedKeys)) || [].concat(_toConsumableArray(this.state.expandedKeys))
      });
    }
  }, {
    key: 'onDragOver',
    value: function onDragOver(e, treeNode) {
      this.props.onDragOver({ event: e, node: treeNode });
    }
  }, {
    key: 'onDragLeave',
    value: function onDragLeave(e, treeNode) {
      this.props.onDragLeave({ event: e, node: treeNode });
    }
  }, {
    key: 'onDrop',
    value: function onDrop(e, treeNode) {
      var key = treeNode.props.eventKey;
      this.setState({
        dragOverNodeKey: '',
        dropNodeKey: key
      });
      if (this.dragNodesKeys.indexOf(key) > -1) {
        if (console.warn) {
          console.warn('can not drop to dragNode(include it\'s children node)');
        }
        return false;
      }

      var posArr = treeNode.props.pos.split('-');
      var res = {
        event: e,
        node: treeNode,
        dragNode: this.dragNode,
        dragNodesKeys: [].concat(_toConsumableArray(this.dragNodesKeys)),
        dropPosition: this.dropPosition + Number(posArr[posArr.length - 1])
      };
      if (this.dropPosition !== 0) {
        res.dropToGap = true;
      }
      if ('expandedKeys' in this.props) {
        res.rawExpandedKeys = [].concat(_toConsumableArray(this._rawExpandedKeys)) || [].concat(_toConsumableArray(this.state.expandedKeys));
      }
      this.props.onDrop(res);
    }
  }, {
    key: 'onExpand',
    value: function onExpand(treeNode) {
      var _this2 = this;

      var expand = !treeNode.props.expanded;
      var controlled = ('expandedKeys' in this.props);
      var expandedKeys = [].concat(_toConsumableArray(this.state.expandedKeys));
      var index = expandedKeys.indexOf(treeNode.props.eventKey);
      if (!controlled) {
        if (expand) {
          if (index === -1) {
            expandedKeys.push(treeNode.props.eventKey);
          }
        } else {
          expandedKeys.splice(index, 1);
        }
        this.setState({ expandedKeys: expandedKeys });
        // remember the return object, such as expandedKeys, must clone!!
        // so you can avoid outer code change it.
        this.props.onExpand(treeNode, expand, [].concat(_toConsumableArray(expandedKeys)));
      } else {
        this.props.onExpand(treeNode, !expand, [].concat(_toConsumableArray(expandedKeys)));
      }

      // after data loaded, need set new expandedKeys
      if (expand && this.props.loadData) {
        return this.props.loadData(treeNode).then(function () {
          if (!controlled) {
            _this2.setState({ expandedKeys: expandedKeys });
          }
        });
      }
    }
  }, {
    key: 'onCheck',
    value: function onCheck(treeNode) {
      var checked = !treeNode.props.checked;
      if (treeNode.props.checkPart) {
        checked = true;
      }
      var key = treeNode.key || treeNode.props.eventKey;
      var checkedKeys = [].concat(_toConsumableArray(this.state.checkedKeys));
      if (checked && checkedKeys.indexOf(key) === -1) {
        checkedKeys.push(key);
      }
      var checkKeys = (0, _util.getTreeNodesStates)(this.props.children, checkedKeys, checked, key);
      var newSt = {
        event: 'check',
        node: treeNode,
        checked: checked,
        checkedNodes: checkKeys.checkedNodes
      };
      checkedKeys = checkKeys.checkedKeys;
      if (!('checkedKeys' in this.props)) {
        this.setState({
          checkedKeys: checkedKeys
        });
      }
      this.props.onCheck(checkedKeys, newSt);
    }
  }, {
    key: 'onSelect',
    value: function onSelect(treeNode) {
      var props = this.props;
      var selectedKeys = [].concat(_toConsumableArray(this.state.selectedKeys));
      var eventKey = treeNode.props.eventKey;
      var index = selectedKeys.indexOf(eventKey);
      var selected = undefined;
      if (index !== -1) {
        selected = false;
        selectedKeys.splice(index, 1);
      } else {
        selected = true;
        if (!props.multiple) {
          selectedKeys.length = 0;
        }
        selectedKeys.push(eventKey);
      }
      var selectedNodes = [];
      if (selectedKeys.length) {
        (0, _util.loopAllChildren)(this.props.children, function (item) {
          if (selectedKeys.indexOf(item.key) !== -1) {
            selectedNodes.push(item);
          }
        });
      }
      var newSt = {
        event: 'select',
        node: treeNode,
        selected: selected,
        selectedNodes: selectedNodes
      };
      if (!('selectedKeys' in this.props)) {
        this.setState({
          selectedKeys: selectedKeys
        });
      }
      props.onSelect(selectedKeys, newSt);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter(e, treeNode) {
      this.props.onMouseEnter({ event: e, node: treeNode });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(e, treeNode) {
      this.props.onMouseLeave({ event: e, node: treeNode });
    }
  }, {
    key: 'onContextMenu',
    value: function onContextMenu(e, treeNode) {
      var selectedKeys = [].concat(_toConsumableArray(this.state.selectedKeys));
      var eventKey = treeNode.props.eventKey;
      if (this.contextmenuKeys.indexOf(eventKey) === -1) {
        this.contextmenuKeys.push(eventKey);
      }
      this.contextmenuKeys.forEach(function (key) {
        var index = selectedKeys.indexOf(key);
        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
      });
      if (selectedKeys.indexOf(eventKey) === -1) {
        selectedKeys.push(eventKey);
      }
      this.setState({
        selectedKeys: selectedKeys
      });
      this.props.onRightClick({ event: e, node: treeNode });
    }

    // all keyboard events callbacks run from here at first
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      e.preventDefault();
    }
  }, {
    key: 'getFilterExpandedKeys',
    value: function getFilterExpandedKeys(props) {
      var defaultExpandedKeys = props.defaultExpandedKeys;
      var expandedPositionArr = [];
      if (props.autoExpandParent) {
        (0, _util.loopAllChildren)(props.children, function (item, index, pos, newKey) {
          if (defaultExpandedKeys.indexOf(newKey) > -1) {
            expandedPositionArr.push(pos);
          }
        });
      }
      var filterExpandedKeys = [];
      (0, _util.loopAllChildren)(props.children, function (item, index, pos, newKey) {
        if (props.defaultExpandAll) {
          filterExpandedKeys.push(newKey);
        } else if (props.autoExpandParent) {
          expandedPositionArr.forEach(function (p) {
            if ((p.split('-').length > pos.split('-').length && (0, _util.isInclude)(pos.split('-'), p.split('-')) || pos === p) && filterExpandedKeys.indexOf(newKey) === -1) {
              filterExpandedKeys.push(newKey);
            }
          });
        }
      });
      return filterExpandedKeys.length ? filterExpandedKeys : defaultExpandedKeys;
    }
  }, {
    key: 'getDefaultExpandedKeys',
    value: function getDefaultExpandedKeys(props, willReceiveProps) {
      var expandedKeys = willReceiveProps ? undefined : this.getFilterExpandedKeys(props);
      if ('expandedKeys' in props) {
        expandedKeys = props.expandedKeys || [];
      }
      return expandedKeys;
    }
  }, {
    key: 'getDefaultCheckedKeys',
    value: function getDefaultCheckedKeys(props, willReceiveProps) {
      var checkedKeys = willReceiveProps ? undefined : props.defaultCheckedKeys;
      if ('checkedKeys' in props) {
        checkedKeys = props.checkedKeys || [];
      }
      return checkedKeys;
    }
  }, {
    key: 'getDefaultSelectedKeys',
    value: function getDefaultSelectedKeys(props, willReceiveProps) {
      var getKeys = function getKeys(keys) {
        if (props.multiple) {
          return [].concat(_toConsumableArray(keys));
        }
        if (keys.length) {
          return [keys[0]];
        }
        return keys;
      };
      var selectedKeys = willReceiveProps ? undefined : getKeys(props.defaultSelectedKeys);
      if ('selectedKeys' in props) {
        selectedKeys = getKeys(props.selectedKeys);
      }
      return selectedKeys;
    }
  }, {
    key: 'getRawExpandedKeys',
    value: function getRawExpandedKeys() {
      if (!this._rawExpandedKeys && 'expandedKeys' in this.props) {
        this._rawExpandedKeys = [].concat(_toConsumableArray(this.state.expandedKeys));
      }
    }
  }, {
    key: 'getOpenTransitionName',
    value: function getOpenTransitionName() {
      var props = this.props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;
      if (!transitionName && typeof animationName === 'string') {
        transitionName = props.prefixCls + '-open-' + animationName;
      }
      return transitionName;
    }
  }, {
    key: 'getDragNodes',
    value: function getDragNodes(treeNode) {
      var dragNodesKeys = [];
      var tPArr = treeNode.props.pos.split('-');
      (0, _util.loopAllChildren)(this.props.children, function (item, index, pos, newKey) {
        var pArr = pos.split('-');
        if (treeNode.props.pos === pos || tPArr.length < pArr.length && (0, _util.isInclude)(tPArr, pArr)) {
          dragNodesKeys.push(newKey);
        }
      });
      return dragNodesKeys;
    }
  }, {
    key: 'getExpandedKeys',
    value: function getExpandedKeys(treeNode, expand) {
      var key = treeNode.props.eventKey;
      var expandedKeys = this.state.expandedKeys;
      var expandedIndex = expandedKeys.indexOf(key);
      var exKeys = undefined;
      if (expandedIndex > -1 && !expand) {
        exKeys = [].concat(_toConsumableArray(expandedKeys));
        exKeys.splice(expandedIndex, 1);
        return exKeys;
      }
      if (expand && expandedKeys.indexOf(key) === -1) {
        return expandedKeys.concat([key]);
      }
    }
  }, {
    key: 'filterTreeNode',
    value: function filterTreeNode(treeNode) {
      var filterTreeNode = this.props.filterTreeNode;
      if (typeof filterTreeNode !== 'function' || treeNode.props.disabled) {
        return false;
      }
      return filterTreeNode.call(this, treeNode);
    }
  }, {
    key: 'renderTreeNode',
    value: function renderTreeNode(child, index) {
      var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      var pos = level + '-' + index;
      var key = child.key || pos;
      var state = this.state;
      var props = this.props;
      var cloneProps = {
        ref: 'treeNode-' + key,
        root: this,
        eventKey: key,
        pos: pos,
        selectable: props.selectable,
        loadData: props.loadData,
        onMouseEnter: props.onMouseEnter,
        onMouseLeave: props.onMouseLeave,
        onRightClick: props.onRightClick,
        prefixCls: props.prefixCls,
        showLine: props.showLine,
        showIcon: props.showIcon,
        checkable: props.checkable,
        draggable: props.draggable,
        dragOver: state.dragOverNodeKey === key && this.dropPosition === 0,
        dragOverGapTop: state.dragOverNodeKey === key && this.dropPosition === -1,
        dragOverGapBottom: state.dragOverNodeKey === key && this.dropPosition === 1,
        expanded: state.expandedKeys.indexOf(key) !== -1,
        selected: state.selectedKeys.indexOf(key) !== -1,
        checked: this.checkedKeys.indexOf(key) !== -1,
        checkPart: this.checkPartKeys.indexOf(key) !== -1,
        openTransitionName: this.getOpenTransitionName(),
        openAnimation: props.openAnimation,
        filterTreeNode: this.filterTreeNode.bind(this)
      };
      if (this.treeNodesStates[pos]) {
        (0, _objectAssign2['default'])(cloneProps, this.treeNodesStates[pos].siblingPosition);
      }
      return _react2['default'].cloneElement(child, cloneProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var domProps = {
        className: (0, _classnames2['default'])(props.className, props.prefixCls),
        role: 'tree-node'
      };
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }
      // console.log(this.state.expandedKeys, this._rawExpandedKeys, props.children);
      var checkKeys = (0, _util.getTreeNodesStates)(props.children, this.state.checkedKeys, true);
      this.checkPartKeys = checkKeys.checkPartKeys;
      this.checkedKeys = checkKeys.checkedKeys;
      this.treeNodesStates = checkKeys.treeNodesStates;

      return _react2['default'].createElement(
        'ul',
        _extends({}, domProps, { unselectable: true, ref: 'tree' }),
        _react2['default'].Children.map(props.children, this.renderTreeNode, this)
      );
    }
  }]);

  return Tree;
})(_react2['default'].Component);

Tree.propTypes = {
  prefixCls: _react.PropTypes.string,
  children: _react.PropTypes.any,
  checkable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.node]),
  multiple: _react.PropTypes.bool,
  showLine: _react.PropTypes.bool,
  showIcon: _react.PropTypes.bool,
  autoExpandParent: _react.PropTypes.bool,
  defaultExpandAll: _react.PropTypes.bool,
  expandedKeys: _react.PropTypes.arrayOf(_react.PropTypes.string),
  defaultExpandedKeys: _react.PropTypes.arrayOf(_react.PropTypes.string),
  checkedKeys: _react.PropTypes.arrayOf(_react.PropTypes.string),
  defaultCheckedKeys: _react.PropTypes.arrayOf(_react.PropTypes.string),
  selectedKeys: _react.PropTypes.arrayOf(_react.PropTypes.string),
  defaultSelectedKeys: _react.PropTypes.arrayOf(_react.PropTypes.string),
  onExpand: _react.PropTypes.func,
  onCheck: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  loadData: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onRightClick: _react.PropTypes.func,
  onDragStart: _react.PropTypes.func,
  onDragEnter: _react.PropTypes.func,
  onDragOver: _react.PropTypes.func,
  onDragLeave: _react.PropTypes.func,
  onDrop: _react.PropTypes.func,
  filterTreeNode: _react.PropTypes.func,
  openTransitionName: _react.PropTypes.string,
  openAnimation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object])
};

Tree.defaultProps = {
  prefixCls: 'rc-tree',
  multiple: false,
  checkable: false,
  draggable: false,
  showLine: false,
  showIcon: true,
  selectable: true,
  autoExpandParent: true,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  onExpand: noop,
  onCheck: noop,
  onSelect: noop,
  onDragStart: noop,
  onDragEnter: noop,
  onDragOver: noop,
  onDragLeave: noop,
  onDrop: noop
};

exports['default'] = Tree;
module.exports = exports['default'];
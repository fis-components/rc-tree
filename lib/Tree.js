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

var _rcUtil = require('rc-util');

// sorted array ['0-0','0-1', '0-0-1', '0-1-1'] => ['0-0', '0-1']
var filterMin = function filterMin(arr) {
  var a = [];
  arr.forEach(function (item) {
    var b = a.filter(function (i) {
      return item.indexOf(i) === 0;
    });
    if (!b.length) {
      a.push(item);
    }
  });
  return a;
};

var Tree = (function (_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree(props) {
    var _this = this;

    _classCallCheck(this, Tree);

    _get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this, props);
    ['handleKeyDown', 'handleCheck'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
    this.defaultExpandAll = props.defaultExpandAll;
    var expandedKeys = props.defaultExpandedKeys;
    var checkedKeys = props.defaultCheckedKeys;
    if ('checkedKeys' in props) {
      checkedKeys = props.checkedKeys || [];
    }
    var selectedKeys = props.multiple ? [].concat(_toConsumableArray(props.defaultSelectedKeys)) : [props.defaultSelectedKeys[0]];
    if ('selectedKeys' in props) {
      selectedKeys = props.multiple ? [].concat(_toConsumableArray(props.selectedKeys)) : [props.selectedKeys[0]];
    }
    this.state = {
      expandedKeys: expandedKeys,
      checkedKeys: checkedKeys,
      selectedKeys: selectedKeys
    };
    this.contextmenuKeys = [];
  }

  _createClass(Tree, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = {};
      if ('checkedKeys' in nextProps) {
        props.checkedKeys = nextProps.checkedKeys;
      }
      if ('selectedKeys' in nextProps) {
        props.selectedKeys = nextProps.multiple ? nextProps.selectedKeys : [nextProps.selectedKeys[0]];
      }
      this.setState(props);
    }
  }, {
    key: 'getCheckKeys',
    value: function getCheckKeys() {
      var _this2 = this;

      var checkPartKeys = [];
      var checkedKeys = [];
      Object.keys(this.treeNodesChkStates).forEach(function (item) {
        var itemObj = _this2.treeNodesChkStates[item];
        if (itemObj.checked) {
          checkedKeys.push(itemObj.key);
        } else if (itemObj.checkPart) {
          checkPartKeys.push(itemObj.key);
        }
      });
      return {
        checkPartKeys: checkPartKeys, checkedKeys: checkedKeys
      };
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
    key: 'loopAllChildren',
    value: function loopAllChildren(childs, callback) {
      var loop = function loop(children, level) {
        _react2['default'].Children.forEach(children, function (item, index) {
          var pos = level + '-' + index;
          var newChildren = item.props.children;
          if (newChildren) {
            if (!Array.isArray(newChildren)) {
              newChildren = [newChildren];
            }
            loop(newChildren, pos);
          }
          callback(item, index, pos);
        });
      };
      loop(childs, 0);
    }
  }, {
    key: 'handleCheckState',
    value: function handleCheckState(obj, checkedArr, unCheckEvent) {
      var evt = false;
      if (typeof unCheckEvent === 'boolean') {
        evt = true;
      }
      var splitPos = function splitPos(pos) {
        return pos.split('-');
      };
      // stripTail('x-xx-sss-xx')
      var stripTail = function stripTail(str) {
        var arr = str.match(/(.+)(-[^-]+)$/);
        var st = '';
        if (arr && arr.length === 3) {
          st = arr[1];
        }
        return st;
      };
      checkedArr.forEach(function (_pos) {
        Object.keys(obj).forEach(function (i) {
          if (splitPos(i).length > splitPos(_pos).length && i.indexOf(_pos) === 0) {
            obj[i].checkPart = false;
            if (evt) {
              if (unCheckEvent) {
                obj[i].checked = false;
              } else {
                obj[i].checked = true;
              }
            } else {
              obj[i].checked = true;
            }
          }
        });
        var loop = function loop(__pos) {
          var _posLen = splitPos(__pos).length;
          if (_posLen <= 2) {
            return;
          }
          var sibling = 0;
          var siblingChecked = 0;
          var parentPos = stripTail(__pos);
          Object.keys(obj).forEach(function (i) {
            if (splitPos(i).length === _posLen && i.indexOf(parentPos) === 0) {
              sibling++;
              if (obj[i].checked) {
                siblingChecked++;
              } else if (obj[i].checkPart) {
                siblingChecked += 0.5;
              }
            }
          });
          var parent = obj[parentPos];
          // sibling 不会等于0
          // 全不选 - 全选 - 半选
          if (siblingChecked === 0) {
            parent.checked = false;
            parent.checkPart = false;
          } else if (siblingChecked === sibling) {
            parent.checked = true;
            parent.checkPart = false;
          } else {
            parent.checkPart = true;
            parent.checked = false;
          }
          loop(parentPos);
        };
        loop(_pos);
      });
    }
  }, {
    key: 'handleCheck',
    value: function handleCheck(treeNode) {
      var _this3 = this;

      var tnProps = treeNode.props;
      var checked = !tnProps.checked;
      if (tnProps.checkPart) {
        checked = true;
      }
      var pos = undefined;
      Object.keys(this.treeNodesChkStates).forEach(function (item) {
        var itemObj = _this3.treeNodesChkStates[item];
        if (itemObj.key === (treeNode.key || tnProps.eventKey)) {
          pos = item;
          itemObj.checked = checked;
          itemObj.checkPart = false;
        }
      });
      this.handleCheckState(this.treeNodesChkStates, [pos], !checked);
      var checkKeys = this.getCheckKeys();
      this.checkPartKeys = checkKeys.checkPartKeys;
      var checkedKeys = checkKeys.checkedKeys;
      var newSt = {
        event: 'check',
        node: treeNode
      };
      if (!('checkedKeys' in this.props)) {
        this.setState({
          checkedKeys: checkedKeys
        });
        newSt.checked = checked;
      } else {
        checkedKeys = this.state.checkedKeys;
      }
      newSt.checkedKeys = checkedKeys;
      if (this.props.onCheck) {
        this.props.onCheck(newSt);
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(treeNode) {
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
      var newSt = {
        event: 'select',
        node: treeNode
      };
      if (!('selectedKeys' in this.props)) {
        this.setState({
          selectedKeys: selectedKeys
        });
        newSt.selected = selected;
      } else {
        selectedKeys = this.state.selectedKeys;
      }
      newSt.selectedKeys = selectedKeys;
      if (props.onSelect) {
        props.onSelect(newSt);
      }
    }
  }, {
    key: 'handleContextMenu',
    value: function handleContextMenu(e, treeNode) {
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
  }, {
    key: 'handleExpand',
    value: function handleExpand(treeNode) {
      var _this4 = this;

      var thisProps = this.props;
      var tnProps = treeNode.props;
      var expandedKeys = this.state.expandedKeys.concat([]);
      var expanded = !tnProps.expanded;
      if (this.defaultExpandAll) {
        this.loopAllChildren(thisProps.children, function (item, index, pos) {
          var key = item.key || pos;
          if (expandedKeys.indexOf(key) === -1) {
            expandedKeys.push(key);
          }
        });
        this.defaultExpandAll = false;
      }
      var index = expandedKeys.indexOf(tnProps.eventKey);
      if (expanded) {
        if (index === -1) {
          expandedKeys.push(tnProps.eventKey);
          if (thisProps.onDataLoaded) {
            return thisProps.onDataLoaded(treeNode).then(function () {
              _this4.setState({
                expandedKeys: expandedKeys
              });
            })['catch'](function () {
              // console.error('Something went wrong', reason);
            });
          }
        }
      } else {
          expandedKeys.splice(index, 1);
        }
      this.setState({
        expandedKeys: expandedKeys
      });
    }

    // all keyboard events callbacks run from here at first
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      e.preventDefault();
    }
  }, {
    key: 'renderTreeNode',
    value: function renderTreeNode(child, index) {
      var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      var key = child.key || level + '-' + index;
      var state = this.state;
      var props = this.props;
      var cloneProps = {
        ref: 'treeNode',
        root: this,
        eventKey: key,
        pos: level + '-' + index,
        onDataLoaded: props.onDataLoaded,
        onRightClick: props.onRightClick,
        prefixCls: props.prefixCls,
        showLine: props.showLine,
        showIcon: props.showIcon,
        checkable: props.checkable,
        expanded: this.defaultExpandAll || state.expandedKeys.indexOf(key) !== -1,
        selected: state.selectedKeys.indexOf(key) !== -1,
        checked: this.checkedKeys.indexOf(key) !== -1,
        checkPart: this.checkPartKeys.indexOf(key) !== -1,
        openTransitionName: this.getOpenTransitionName(),
        openAnimation: props.openAnimation
      };
      return _react2['default'].cloneElement(child, cloneProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var props = this.props;
      var domProps = {
        className: (0, _rcUtil.classSet)(props.className, props.prefixCls),
        role: 'tree-node'
      };
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.handleKeyDown;
      }
      var checkedKeys = this.state.checkedKeys;
      var checkedPos = [];
      this.treeNodesChkStates = {};
      this.loopAllChildren(props.children, function (item, index, pos) {
        var key = item.key || pos;
        var checked = false;
        if (checkedKeys.indexOf(key) !== -1) {
          checked = true;
          checkedPos.push(pos);
        }
        _this5.treeNodesChkStates[pos] = {
          key: key,
          checked: checked,
          checkPart: false
        };
      });
      this.handleCheckState(this.treeNodesChkStates, filterMin(checkedPos.sort()));
      var checkKeys = this.getCheckKeys();
      this.checkPartKeys = checkKeys.checkPartKeys;
      this.checkedKeys = checkKeys.checkedKeys;
      this.newChildren = _react2['default'].Children.map(props.children, this.renderTreeNode, this);
      return _react2['default'].createElement(
        'ul',
        _extends({}, domProps, { ref: 'tree' }),
        this.newChildren
      );
    }
  }]);

  return Tree;
})(_react2['default'].Component);

Tree.propTypes = {
  prefixCls: _react2['default'].PropTypes.string,
  checkable: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
  multiple: _react2['default'].PropTypes.bool,
  showLine: _react2['default'].PropTypes.bool,
  showIcon: _react2['default'].PropTypes.bool,
  defaultExpandAll: _react2['default'].PropTypes.bool,
  defaultExpandedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  checkedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  defaultCheckedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  selectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  onCheck: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func,
  onDataLoaded: _react2['default'].PropTypes.func,
  onRightClick: _react2['default'].PropTypes.func,
  openTransitionName: _react2['default'].PropTypes.string,
  openAnimation: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.object])
};

Tree.defaultProps = {
  prefixCls: 'rc-tree',
  multiple: false,
  checkable: false,
  showLine: false,
  showIcon: true,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: []
};

exports['default'] = Tree;
module.exports = exports['default'];
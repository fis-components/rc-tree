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

// import TreeNode from './TreeNode';

var id = 1;
function uuid() {
  return id++;
}

var rootTrees = {};

var Tree = (function (_React$Component) {
  _inherits(Tree, _React$Component);

  _createClass(Tree, null, [{
    key: 'statics',
    value: function statics() {
      return {
        rootTrees: rootTrees
      };
    }
  }]);

  function Tree(props) {
    var _this = this;

    _classCallCheck(this, Tree);

    _get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this, props);
    ['handleKeyDown', 'handleChecked', 'handleSelect'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });

    // get root tree, run one time
    if (!props._childTreeNode && !props._childTree) {
      // console.log('root tree', this);
      this._rootTreeId = uuid();
      var rootConfig = {
        prefixCls: props.prefixCls,
        showLine: props.showLine,
        showIcon: props.showIcon,
        expandAll: props.expandAll,
        checkable: props.checkable,
        defaultSelectedKeys: props.defaultSelectedKeys,
        selectedKeys: props.selectedKeys,
        onChecked: this.handleChecked,
        onSelect: this.handleSelect
      };
      rootTrees[this._rootTreeId] = {
        _rootTreeId: this._rootTreeId,
        rootConfig: rootConfig,
        treeNodesState: {},
        trees: [],
        selectedKeys: props.selectedKeys.length && props.selectedKeys || props.defaultSelectedKeys
      };
    }
    // if (props._childTree) {
    //   console.log('child tree', this);
    // }
  }

  _createClass(Tree, [{
    key: 'renderTreeNode',
    value: function renderTreeNode(child, index) {
      var props = this.props;
      var pos = (props._pos || 0) + '-' + index;
      var _rootTreeId = this._rootTreeId || props._rootTreeId;
      var cloneProps = {
        ref: 'treeNode',
        _rootTreeId: _rootTreeId,
        _key: child.key || pos,
        _pos: pos,
        _level: props._level || 0,
        _index: index,
        _len: this.childrenLength,
        checked: child.props.checked || props.checked,
        checkPart: props.checkPart
      };
      Object.keys(rootTrees[_rootTreeId].rootConfig).forEach(function (item) {
        cloneProps[item] = rootTrees[_rootTreeId].rootConfig[item];
      });

      if (rootTrees[_rootTreeId].selectedKeys.indexOf(child.key) > -1) {
        cloneProps.selected = true;
      }
      return _react2['default'].cloneElement(child, cloneProps);
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
      if (props._childTree) {
        domProps.style = props.expanded ? { display: 'block' } : { display: 'none' };
      }

      if (!props._childTreeNode && !props._childTree) {
        this._obj = {};
        this.handleChildren(props.children);
        // console.log(this._obj);
        this.handleObj(this._obj);
        // console.log(this._obj);
        rootTrees[this._rootTreeId].treeNodesState = this._obj;
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
    key: 'handleObj',
    value: function handleObj(obj, unCheckEvent, pos) {
      if (unCheckEvent) {
        Object.keys(obj).forEach(function (i) {
          if (i.indexOf(pos) === 0) {
            obj[i].checked = false;
            obj[i].checkPart = false;
          }
        });
        // return;
      } else if (pos) {
          Object.keys(obj).forEach(function (i) {
            if (i.indexOf(pos) === 0) {
              obj[i].checked = true;
              obj[i].checkPart = false;
            }
          });
        }
      var checkedArr = Object.keys(obj).filter(function (key) {
        return obj[key].checked;
      });
      // console.log(checkedArr);
      // todo 过滤掉checkedArr中的重复项
      checkedArr.forEach(function (key) {
        var keyLen = key.length;
        var loop = function loop(len) {
          if (len <= 3) {
            Object.keys(obj).forEach(function (i) {
              if (i.indexOf(key) === 0) {
                obj[i].checked = true;
                obj[i].checkPart = false;
              }
            });
            return;
          }
          var lenIndex = 0;
          var chkIndex = 0;
          Object.keys(obj).forEach(function (i) {
            if (i.length === len && i.substring(0, len - 2) === key.substring(0, len - 2)) {
              lenIndex++;
              if (obj[i].checked) {
                chkIndex++;
              }
            } else if (i.length > len && i.indexOf(key) === 0) {
              obj[i].checked = true;
            }
          });
          // 子项全选，向上递归
          var parent = obj[key.substring(0, len - 2)];
          if (chkIndex === lenIndex) {
            parent.checked = true;
            loop(len - 2);
          } else {
            parent.checkPart = true;
            loop(len - 2, true);
          }
        };
        loop(keyLen);
      });
    }
  }, {
    key: 'handleChildren',
    value: function handleChildren(children, level) {
      var _this2 = this;

      _react2['default'].Children.forEach(children, function (child, index) {
        var pos = (level || 0) + '-' + index;
        // console.log(child.props.checkbox);
        var props = child.props;
        if (child.props.checkbox) {
          props = child.props.checkbox.props;
        }
        _this2._obj[pos] = {
          checkPart: child.props.checkPart || false,
          checked: props.checked || props.defaultChecked || false
        };
        var childChildren = child.props.children;
        if (childChildren && typeof childChildren.type === 'function' && typeof childChildren.type.TreeNode === 'function') {
          childChildren = [childChildren];
        }
        if (Array.isArray(childChildren)) {
          return _this2.handleChildren(childChildren, pos);
        }
        return null;
      });
    }
  }, {
    key: 'handleChecked',
    value: function handleChecked(isChk, c) {
      if (this.props.onChecked) {
        this.props.onChecked(isChk, c);
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(isSel, c, selectedKeys) {
      if (this.props.onSelect) {
        this.props.onSelect(isSel, c, selectedKeys);
      }
    }

    // all keyboard events callbacks run from here at first
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      e.preventDefault();
    }
  }]);

  return Tree;
})(_react2['default'].Component);

Tree.propTypes = {
  prefixCls: _react2['default'].PropTypes.string,
  checkable: _react2['default'].PropTypes.bool,
  showLine: _react2['default'].PropTypes.bool,
  showIcon: _react2['default'].PropTypes.bool,
  expandAll: _react2['default'].PropTypes.bool,
  onChecked: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func,
  defaultSelectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string),
  selectedKeys: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string)
};

Tree.defaultProps = {
  prefixCls: 'rc-tree',
  checkable: false,
  showLine: true,
  showIcon: true,
  expandAll: false,
  defaultSelectedKeys: [],
  selectedKeys: []
};

exports['default'] = Tree;
module.exports = exports['default'];
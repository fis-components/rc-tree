'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _Tree2 = require('./Tree');

var _Tree3 = _interopRequireDefault(_Tree2);

var rootTrees = _Tree3['default'].statics().rootTrees;

var TreeNode = (function (_Tree) {
  _inherits(TreeNode, _Tree);

  function TreeNode(props) {
    var _this = this;

    _classCallCheck(this, TreeNode);

    _get(Object.getPrototypeOf(TreeNode.prototype), 'constructor', this).call(this, props);
    var tnState = this.getTreeNodesState();
    this.state = {
      expanded: props.expandAll || props.expanded || props.defaultExpanded,
      selected: props.selected || false,
      checkPart: tnState.checkPart || false,
      checked: tnState.checked || false
    };
    ['handleExpandedState'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(TreeNode, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      var tnState = this.getTreeNodesState();
      this.setState({
        checkPart: tnState.checkPart,
        checked: tnState.checked
      });
    }
  }, {
    key: 'getTreeNodesState',
    value: function getTreeNodesState() {
      return rootTrees[this.props._rootTreeId].treeNodesState[this.props._pos];
    }
  }, {
    key: 'renderSwitcher',
    value: function renderSwitcher(props, prefixCls, switchState) {
      var _switcherCls;

      var switcherCls = (_switcherCls = {}, _defineProperty(_switcherCls, prefixCls + '-button', true), _defineProperty(_switcherCls, prefixCls + '-switcher', true), _switcherCls);
      if (props.disabled) {
        switcherCls[prefixCls + '-switcher-disabled'] = true;
        return _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(switcherCls) });
      }

      if (!props.showLine) {
        switcherCls[prefixCls + '-noline_' + switchState] = true;
      } else if (props._isChildTree && props._index === 0) {
        if (props._len !== 1) {
          switcherCls[prefixCls + '-center_' + switchState] = true;
        } else {
          switcherCls[prefixCls + '-bottom_' + switchState] = true;
        }
      } else if (props._index === 0) {
        switcherCls[prefixCls + '-roots_' + switchState] = true;
      } else if (props._index === props._len - 1) {
        switcherCls[prefixCls + '-bottom_' + switchState] = true;
      } else {
        switcherCls[prefixCls + '-center_' + switchState] = true;
      }
      return _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(switcherCls), onClick: this.handleExpandedState });
    }
  }, {
    key: 'renderCheckbox',
    value: function renderCheckbox(props, prefixCls, state) {
      var _checkboxCls;

      var checkboxCls = (_checkboxCls = {}, _defineProperty(_checkboxCls, prefixCls + '-button', true), _defineProperty(_checkboxCls, prefixCls + '-chk', true), _checkboxCls);
      if (!props.checkable) {
        return null;
      }
      if (props.disabled) {
        checkboxCls[prefixCls + '-chk-disabled'] = true;
        return _react2['default'].createElement('span', { ref: 'checkbox', className: (0, _rcUtil.classSet)(checkboxCls) });
      }
      if (state.checkPart) {
        checkboxCls[prefixCls + '-checkbox_true_part'] = true;
      } else if (state.checked) {
        checkboxCls[prefixCls + '-checkbox_true_full'] = true;
      } else {
        checkboxCls[prefixCls + '-checkbox_false_full'] = true;
      }
      // console.log(props.checkbox.props);
      if (props.checkbox) {
        checkboxCls[prefixCls + '-checkbox-custom'] = true;
        _react2['default'].cloneElement(props.checkbox, {
          checked: state.checked
        });
        // props.checkbox.props.checked = state.checked;
      }
      // defaultChecked: state.checked,
      return _react2['default'].createElement(
        'span',
        { ref: 'checkbox', className: (0, _rcUtil.classSet)(checkboxCls), onClick: this.handleChecked },
        props.checkbox ? props.checkbox : null
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(props, children) {
      var newChildren = null;
      if (children.type === TreeNode || Array.isArray(children) && children.every(function (item) {
        return item.type === TreeNode;
      })) {
        var cls = {};
        cls[props.prefixCls + '-child-tree'] = true;
        if (props.showLine && props._index !== props._len - 1) {
          cls[props.prefixCls + '-line'] = true;
        }

        var treeProps = {
          _rootTreeId: props._rootTreeId,
          _pos: props._pos,
          _level: props._level + 1,
          _childTree: true,
          checked: this.state.checked,
          checkPart: this.state.checkPart,
          className: (0, _rcUtil.classSet)(cls),
          expanded: this.state.expanded
        };
        newChildren = this.newChildren = _react2['default'].createElement(
          _Tree3['default'],
          treeProps,
          children
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
      var state = this.state;
      var prefixCls = props.prefixCls;
      var switchState = state.expanded ? 'open' : 'close';

      var iconEleCls = (_iconEleCls = {}, _defineProperty(_iconEleCls, prefixCls + '-button', true), _defineProperty(_iconEleCls, prefixCls + '-iconEle', true), _defineProperty(_iconEleCls, prefixCls + '-icon__' + switchState, true), _iconEleCls);

      var content = props.title;
      var newChildren = this.renderChildren(props, props.children);
      if (newChildren === props.children) {
        content = newChildren;
        newChildren = null;
      }

      var selectHandle = function selectHandle() {
        var icon = props.showIcon ? _react2['default'].createElement('span', { className: (0, _rcUtil.classSet)(iconEleCls) }) : null;
        if (props.disabled) {
          return _react2['default'].createElement(
            'a',
            { ref: 'selectHandle', title: content },
            icon,
            _react2['default'].createElement(
              'span',
              { className: 'title' },
              content
            )
          );
        }
        return _react2['default'].createElement(
          'a',
          { ref: 'selectHandle', title: content,
            className: state.selected ? prefixCls + '-selected' : '',
            onClick: _this2.handleSelect },
          icon,
          _react2['default'].createElement(
            'span',
            { className: 'title' },
            content
          )
        );
      };

      return _react2['default'].createElement(
        'li',
        { className: (0, _rcUtil.joinClasses)(props.className, 'level-' + props._level, 'pos-' + props._pos, props.disabled ? prefixCls + '-treenode-disabled' : '') },
        this.renderSwitcher(props, prefixCls, switchState),
        this.renderCheckbox(props, prefixCls, state),
        selectHandle(),
        newChildren
      );
    }
  }, {
    key: 'handleExpandedState',
    value: function handleExpandedState() {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect() {
      var selected = !this.state.selected;
      var arr = rootTrees[this.props._rootTreeId].selectedKeys;
      var index = arr.indexOf(this.props._key);
      if (selected) {
        if (index < 0) {
          arr.push(this.props._key);
        }
      } else {
        if (index > -1) {
          arr.splice(index, 1);
        }
      }
      this.setState({
        selected: selected
      });
      if (this.props.onSelect) {
        this.props.onSelect(selected, this, arr);
      }
    }
  }, {
    key: 'handleChecked',
    value: function handleChecked() {
      var props = this.props;
      var checked = !this.state.checked;

      if (this.state.checkPart) {
        checked = true;
      }

      var nSt = {
        checkPart: false,
        checked: checked
      };

      rootTrees[props._rootTreeId].treeNodesState[props._pos] = nSt;
      _get(Object.getPrototypeOf(TreeNode.prototype), 'handleCheckState', this).call(this, rootTrees[props._rootTreeId].treeNodesState, [props._pos], !checked);
      // console.log(rootTrees[props._rootTreeId].treeNodesState);
      // this.setState(nSt);
      // 从rootTree更新
      rootTrees[props._rootTreeId]._rootTree.forceUpdate();

      if (props.onChecked) {
        props.onChecked(checked, this);
      }
    }

    // keyboard event support
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      e.preventDefault();
    }
  }]);

  return TreeNode;
})(_Tree3['default']);

TreeNode.propTypes = {
  _rootTreeId: _react2['default'].PropTypes.number,
  _pos: _react2['default'].PropTypes.string,
  _index: _react2['default'].PropTypes.number,
  _len: _react2['default'].PropTypes.number,
  _level: _react2['default'].PropTypes.number,
  _key: _react2['default'].PropTypes.string,
  prefixCls: _react2['default'].PropTypes.string,
  expanded: _react2['default'].PropTypes.bool,
  selected: _react2['default'].PropTypes.bool,
  onSelect: _react2['default'].PropTypes.func
};
TreeNode.defaultProps = {
  _childTreeNode: true,
  title: '---',
  defaultExpanded: false,
  expanded: false
};

exports['default'] = TreeNode;
module.exports = exports['default'];
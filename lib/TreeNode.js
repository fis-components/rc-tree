'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

_Tree2['default'].statics = _Tree2['default'].statics();

var TreeNode = (function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    var _this = this;

    _classCallCheck(this, TreeNode);

    _get(Object.getPrototypeOf(TreeNode.prototype), 'constructor', this).call(this, props);
    this.state = {
      expanded: props.expanded,
      selected: props.selected || false,
      checkPart: props._checkPart || false,
      checked: props._checked || false
    };
    ['handleExpandedState', 'handleSelect', 'handleChecked'].forEach(function (m) {
      _this[m] = _this[m].bind(_this);
    });
  }

  _createClass(TreeNode, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        //selected: nextProps.selected,
        checkPart: nextProps._checkPart,
        checked: nextProps._checked
      });
    }
  }, {
    key: 'switchExpandedState',
    value: function switchExpandedState(newState, onStateChangeComplete) {
      this.setState({
        expanded: newState
      }, onStateChangeComplete);
    }

    // keyboard event support
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      e.preventDefault();
    }
  }, {
    key: 'handleExpandedState',
    value: function handleExpandedState() {
      this.switchExpandedState(!this.state.expanded);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect() {
      this.setState({
        selected: !this.state.selected
      });
      if (this.props.onSelect) {
        this.props.onSelect(!this.state.selected, this);
      }
    }
  }, {
    key: 'handleChecked',
    value: function handleChecked() {
      var _pos = this.props._pos;
      var checked = !this.state.checked;

      if (this.state.checkPart) {
        // return;
        checked = false;
      }

      var nSt = {
        checkPart: false,
        checked: checked
      };

      this.setState(nSt);

      var sortedTree = _Tree2['default'].statics.trees.sort(function (a, b) {
        return b.props._pos.length - a.props._pos.length;
      });

      sortedTree.forEach(function (c) {
        var cPos = c.props._pos;
        if (_pos.indexOf(cPos) === 0 && _pos !== cPos) {
          var childArr = _rcUtil2['default'].Children.toArray(c.props.children),
              len = childArr.length;

          var checkedNumbers = 0;

          //先计算已经选中的节点数
          for (var i = 0; i < len; i++) {
            var checkSt = _Tree2['default'].statics.treeNodesState[cPos + '-' + i];
            if (checkSt.checked) {
              checkedNumbers++;
            } else if (checkSt.checkPart) {
              checkedNumbers += 0.5;
            }
          }

          //点击节点的 直接父级
          if (_pos.length - cPos.length <= 2) {
            //如果原来是半选
            if (_Tree2['default'].statics.treeNodesState[_pos].checkPart) {
              // checked ? checkedNumbers += 0.5 : checkedNumbers -= 0.5;
              if (checked) {
                checkedNumbers += 0.5;
              } else {
                checkedNumbers -= 0.5;
              }
            } else if (checked) {
              checkedNumbers++;
            } else {
              checkedNumbers--;
            }
          }

          var newSt;
          if (checkedNumbers <= 0) {
            //都不选
            newSt = {
              checkPart: false,
              checked: false
            };
          } else if (checkedNumbers === len) {
            //全选
            newSt = {
              checkPart: false,
              checked: true
            };
          } else {
            //部分选择
            newSt = {
              checkPart: true,
              checked: false
            };
          }
          c.setState(newSt);
          _Tree2['default'].statics.treeNodesState[cPos] = newSt;
        }
      });

      _Tree2['default'].statics.treeNodesState[_pos] = nSt;

      if (this.props.onChecked) {
        this.props.onChecked(checked, this);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.newChildren) {
        for (var i = 0; i < _Tree2['default'].statics.trees.length; i++) {
          var obj = _Tree2['default'].statics.trees[i];
          if (obj.props._pos === this.props._pos) {
            _Tree2['default'].statics.trees.splice(i--, 1);
          }
        }
        _Tree2['default'].statics.trees.push(this);
      }
      //add treeNodes checked state
      _Tree2['default'].statics.treeNodesState[this.props._pos] = {
        checked: this.state.checked,
        checkPart: this.state.checkPart
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var checkbox = this.refs.checkbox;
      if (checkbox) {
        var cls = checkbox.getDOMNode().className;
        var checkSt = _Tree2['default'].statics.treeNodesState[this.props._pos] || {};
        checkSt.checkPart = nextState.checkPart;
        checkSt.checked = nextState.checked;
        if (nextState.checkPart) {
          checkbox.getDOMNode().className = cls.indexOf('checkbox_true_part') > -1 ? cls : cls + ' checkbox_true_part';
          return false;
        } else {
          checkbox.getDOMNode().className = cls.replace(/checkbox_true_part/g, '');
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;

      var prefixCls = props.prefixCls;
      var switchState = state.expanded ? 'open' : 'close';

      var switcherCls = {};
      switcherCls.button = true;
      switcherCls[prefixCls + '-treenode-switcher'] = true;
      switcherCls[prefixCls + '-switcher__' + switchState] = true;
      if (props._isChildTree && props._index === 0) {
        if (props._len !== 1) {
          switcherCls['center_' + switchState] = true;
        } else {
          switcherCls['bottom_' + switchState] = true;
        }
      } else if (props._index === 0) {
        switcherCls['roots_' + switchState] = true;
      } else if (props._index === props._len - 1) {
        switcherCls['bottom_' + switchState] = true;
      } else {
        switcherCls['center_' + switchState] = true;
      }

      var checkbox = null;
      var checkboxCls = {};
      if (props.checkable) {
        checkboxCls.button = true;
        checkboxCls.chk = true;
        /* jshint ignore:start */
        if (state.checkPart) {
          checkboxCls.checkbox_true_part = true;
        } else if (state.checked) {
          checkboxCls.checkbox_true_full = true;
        } else {
          checkboxCls.checkbox_false_full = true;
        }
        /* jshint ignore:end */
        checkbox = _react2['default'].createElement('span', { ref: 'checkbox', className: (0, _rcUtil.classSet)(checkboxCls), onClick: this.handleChecked });
      }

      var iconEleCls = {};
      iconEleCls.button = true;
      iconEleCls[prefixCls + '-iconEle'] = true;
      iconEleCls[prefixCls + '-icon__' + switchState] = true;

      var userIconEle = null;
      if (props.iconEle && _react2['default'].isValidElement(props.iconEle)) {
        userIconEle = props.iconEle;
      }

      var content = props.title;
      var newChildren = this.renderChildren(props.children);
      if (newChildren === props.children) {
        content = newChildren;
        newChildren = null;
      }

      return _react2['default'].createElement(
        'li',
        { className: (0, _rcUtil.joinClasses)('level' + props._level, 'pos-' + props._pos) },
        _react2['default'].createElement('span', { className: (0, _rcUtil.joinClasses)(props.className, (0, _rcUtil.classSet)(switcherCls)),
          onClick: this.handleExpandedState }),
        checkbox,
        _react2['default'].createElement(
          'a',
          { ref: 'selectHandle', title: content,
            className: state.selected ? prefixCls + '-selected' : '',
            onClick: this.handleSelect },
          _react2['default'].createElement(
            'span',
            { className: (0, _rcUtil.classSet)(iconEleCls) },
            userIconEle
          ),
          _react2['default'].createElement(
            'span',
            null,
            content
          )
        ),
        newChildren
      );
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren(children) {
      var newChildren = null;
      if (children.type === TreeNode || Array.isArray(children) && children.every(function (item) {
        return item.type === TreeNode;
      })) {

        var cls = {};
        cls[this.props.prefixCls + '-child-tree'] = true;
        if (this.props.showLine && this.props._index !== this.props._len - 1) {
          cls.line = true;
        }

        var treeProps = {
          _level: this.props._level + 1,
          _pos: this.props._pos,
          _isChildTree: true,
          className: (0, _rcUtil.classSet)(cls),
          expanded: this.state.expanded,
          //selected: this.state.checked,
          _checked: this.state.checked,
          _checkPart: this.state.checkPart,
          checkable: this.props.checkable, //只是为了传递根节点上的checkable设置,是否有更好做法?
          onChecked: this.props.onChecked,
          onSelect: this.props.onSelect
        };
        newChildren = this.newChildren = _react2['default'].createElement(
          _Tree2['default'],
          treeProps,
          children
        );
      } else {
        newChildren = children;
      }

      return newChildren;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      //console.log( this.newChildren );
      //if (this.newChildren) {
      //  Tree.statics.trees.push(this);
      //}
    }
  }]);

  return TreeNode;
})(_react2['default'].Component);

TreeNode.propTypes = {
  selected: _react2['default'].PropTypes.bool,
  iconEle: _react2['default'].PropTypes.node,
  onSelect: _react2['default'].PropTypes.func
};
TreeNode.defaultProps = {
  title: '---',
  expanded: true
};

exports['default'] = TreeNode;
module.exports = exports['default'];
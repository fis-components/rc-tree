'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.browser = browser;
exports.getOffset = getOffset;
exports.loopAllChildren = loopAllChildren;
exports.filterMinPosition = filterMinPosition;
exports.isInclude = isInclude;
exports.getTreeNodesStates = getTreeNodesStates;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function browser(ua) {
  var tem = undefined;
  var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    if (tem) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tem = ua.match(/version\/(\d+)/i);
  if (tem) {
    M.splice(1, 1, tem[1]);
  }
  return M.join(' ');
}

// export function getOffset(el) {
//   const obj = el.getBoundingClientRect();
//   return {
//     left: obj.left + document.body.scrollLeft,
//     top: obj.top + document.body.scrollTop,
//     width: obj.width,
//     height: obj.height
//   };
// }

// // iscroll offset
// offset = function (el) {
//   var left = -el.offsetLeft,
//     top = -el.offsetTop;

//   // jshint -W084
//   while (el = el.offsetParent) {
//     left -= el.offsetLeft;
//     top -= el.offsetTop;
//   }
//   // jshint +W084

//   return {
//     left: left,
//     top: top
//   };
// }

function getOffset(ele) {
  var el = ele;
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

function getChildrenlength(children) {
  var len = 1;
  if (Array.isArray(children)) {
    len = children.length;
  }
  return len;
}

function getSiblingPosition(index, len, siblingPosition) {
  if (len === 1) {
    siblingPosition.first = true;
    siblingPosition.last = true;
  } else {
    siblingPosition.first = index === 0;
    siblingPosition.last = index === len - 1;
  }
  return siblingPosition;
}

function loopAllChildren(childs, callback) {
  var loop = function loop(children, level) {
    var len = getChildrenlength(children);
    _react2['default'].Children.forEach(children, function (item, index) {
      var pos = level + '-' + index;
      if (item.props.children && item.type && item.type.isTreeNode) {
        loop(item.props.children, pos);
      }
      callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}));
    });
  };
  loop(childs, 0);
}

function filterMinPosition(arr) {
  var a = [];
  arr.forEach(function (item) {
    var b = a.filter(function (i) {
      return item.indexOf(i) === 0 && (item[i.length] === '-' || !item[i.length]);
    });
    if (!b.length) {
      a.push(item);
    }
  });
  return a;
}

// console.log(filterMinPosition(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

function isInclude(smallArray, bigArray) {
  return smallArray.every(function (ii, i) {
    return ii === bigArray[i];
  });
}

// console.log(isInclude(['0', '1'], ['0', '10', '1']));

// TODO 效率差, 需要缓存优化
function handleCheckState(obj, checkedPositionArr, checkIt) {
  var stripTail = function stripTail(str) {
    var arr = str.match(/(.+)(-[^-]+)$/);
    var st = '';
    if (arr && arr.length === 3) {
      st = arr[1];
    }
    return st;
  };
  // console.log(stripTail('0-101-000'));
  var splitPosition = function splitPosition(pos) {
    return pos.split('-');
  };
  checkedPositionArr.forEach(function (_pos) {
    // 设置子节点，全选或全不选
    var _posArr = splitPosition(_pos);
    Object.keys(obj).forEach(function (i) {
      var iArr = splitPosition(i);
      if (iArr.length > _posArr.length && isInclude(_posArr, iArr)) {
        obj[i].checkPart = false;
        obj[i].checked = checkIt;
      }
    });
    // 循环设置父节点的 选中 或 半选状态
    var loop = function loop(__pos) {
      var _posLen = splitPosition(__pos).length;
      if (_posLen <= 2) {
        // e.g. '0-0', '0-1'
        return;
      }
      var sibling = 0;
      var siblingChecked = 0;
      var parentPosition = stripTail(__pos);
      Object.keys(obj).forEach(function (i) {
        var iArr = splitPosition(i);
        if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
          sibling++;
          if (obj[i].checked) {
            siblingChecked++;
          } else if (obj[i].checkPart) {
            siblingChecked += 0.5;
          }
        }
      });
      var parent = obj[parentPosition];
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
      loop(parentPosition);
    };
    loop(_pos);
  });
}

function getCheckKeys(treeNodesStates) {
  var checkPartKeys = [];
  var checkedKeys = [];
  var checkedNodes = [];
  var checkedNodesKeys = [];
  Object.keys(treeNodesStates).forEach(function (item) {
    var itemObj = treeNodesStates[item];
    if (itemObj.checked) {
      checkedKeys.push(itemObj.key);
      checkedNodes.push(itemObj.node);
      checkedNodesKeys.push({ key: itemObj.key, node: itemObj.node, pos: item });
    } else if (itemObj.checkPart) {
      checkPartKeys.push(itemObj.key);
    }
  });
  return {
    checkPartKeys: checkPartKeys, checkedKeys: checkedKeys, checkedNodes: checkedNodes, checkedNodesKeys: checkedNodesKeys, treeNodesStates: treeNodesStates
  };
}

function getTreeNodesStates(children, checkedKeys, checkIt, unCheckKey) {
  var checkedPosition = [];
  var treeNodesStates = {};
  loopAllChildren(children, function (item, index, pos, newKey, siblingPosition) {
    var checked = false;
    if (checkedKeys.indexOf(newKey) !== -1) {
      checked = true;
      checkedPosition.push(pos);
    }
    treeNodesStates[pos] = {
      node: item,
      key: newKey,
      checked: checked,
      checkPart: false,
      siblingPosition: siblingPosition
    };
  });

  // debugger
  handleCheckState(treeNodesStates, filterMinPosition(checkedPosition.sort()), true);

  if (!checkIt && unCheckKey) {
    var pos = undefined;
    Object.keys(treeNodesStates).forEach(function (item) {
      var itemObj = treeNodesStates[item];
      if (itemObj.key === unCheckKey) {
        pos = item;
        itemObj.checked = checkIt;
        itemObj.checkPart = false;
      }
    });
    handleCheckState(treeNodesStates, [pos], checkIt);
  }

  return getCheckKeys(treeNodesStates);
}
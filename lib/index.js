"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function childHidden() {
  return _react["default"].createElement("div", {
    className: "child_hidden"
  });
}

var Index =
/*#__PURE__*/
function (_Component) {
  _inherits(Index, _Component);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Index).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "click", function (path, data) {
      var obj = _this.state.data;
      path.slice(0, -1).forEach(function (v) {
        return obj = obj.child[v];
      });

      _this.props.click(data);

      if (_this.showAll) return;
      if (obj.showI === path[path.length - 1]) return;
      obj.showI = path[path.length - 1];

      _this.getTierLast();

      _this.setState({});
    });

    _defineProperty(_assertThisInitialized(_this), "getTierLast", function () {
      var data = _this.state.data;
      var tier = 1;

      var f = function f(obj, currentTier) {
        if (obj.hasOwnProperty('child') && Array.isArray(obj.child) && obj.child.length) {
          if (_this.props.showAll) obj.child.forEach(function (v) {
            return f(v, currentTier + 1);
          });else f(obj.child[obj.showI], currentTier + 1);
        } else {
          if (currentTier > tier) tier = currentTier;
        }
      };

      f(data, tier);

      _this.setState({
        tierLast: tier
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createBgc", function () {
      // console.log(this.props.rem)
      var top = 0,
          everyContainer = 180,
          everyBottom = 30,
          allHeight = top + (everyContainer + everyBottom) * (_this.state.tierLast - _this.state.tierFirst + 1),
          tier = 1,
          tierLast = _this.state.tierLast,
          percent = 0,
          bgcArr = ['F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF', 'F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF', 'F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF', 'F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF'],
          background = "linear-gradient(to bottom,#fff 0%,#fff ".concat(percent = top / allHeight * 100, "%");

      while (tier <= tierLast) {
        background += ",#".concat(bgcArr[tier - 1], " ").concat(percent += 0.01, "%,#").concat(bgcArr[tier - 1], " ").concat(percent += everyContainer / allHeight * 100, "%,#fff ").concat(percent += 0.01, "%,#fff ").concat(percent += everyBottom / allHeight * 100, "%");
        tier++;
      }

      background += ')';
      background = background.replace(/100\.\d*/, '100'); // 处理出现100.001的情况

      var size = +_this.props.size || 1;
      return {
        background: background,
        '--height': "".concat(4.5 * size, "rem"),
        '--shu_td_name_has_child_after_height': "".concat(1 * size, "rem")
      };
    });

    _this.state = {
      tier: 1,
      tierFirst: 1,
      tierLast: 1,
      data: _this.props.data
    };
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getTierLast();
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "shu_all_container"
      }, _react["default"].createElement("div", {
        className: "shu_table_all_container",
        style: this.createBgc()
      }, _react["default"].createElement("div", {
        className: "shu_table_all_container_to_scroll"
      }, _react["default"].createElement(Shu, {
        data: this.state.data,
        childLayout: this.props.childLayout,
        childHidden: this.props.childHidden || childHidden,
        click: this.click,
        jumpCapacity: this.jumpCapacity,
        path: [],
        tier: this.state.tier,
        tierFirst: this.state.tierFirst,
        showAll: this.props.showAll
      }))));
    }
  }]);

  return Index;
}(_react.Component);

exports["default"] = Index;

function Shu(props) {
  return _react["default"].createElement("table", {
    style: {
      'position': 'relative'
    }
  }, _react["default"].createElement("tbody", null, _react["default"].createElement("tr", {
    className: "tr"
  }, props.data && props.data.agntname && _react["default"].createElement("td", {
    className: "shu_td ".concat((props.trClassName || '').indexOf('shu_td_name_right') !== -1 ? 'shu_td_name_right' : '')
  }, " ", _react["default"].createElement("div", {
    className: "".concat(
    /* 类名样式下部 */
    props.tier === props.tierFirst
    /* tier是第几层 */
    ? 'shu_td_name_has_child' : (props.data.child || []).length ? props.showI === props.path[props.path.length - 1] ? 'shu_td_name_has_child' : props.showAll ? 'shu_td_name_has_child' : 'shu_td_name_has_child_but_not_show' : 'shu_td_name_no_child', " ").concat(props.trClassName && !~props.trClassName.indexOf('shu_td_name_right') // 如果是最右侧元素
    ? props.trClassName : '' || '')
  }, " ", props.data && props.data.show === false ? props.childHidden() : props.childLayout({
    path: props.path,
    data: props.data,
    tier: props.tier,
    click: props.click
  }), " "), _react["default"].createElement("div", {
    className: "shu_td_child",
    onClick: function onClick(e) {
      props.data && props.data.show === false && props.click(props.path);
      e.stopPropagation();
    }
  }, (props.data.child || []).map(function (v, i) {
    /* 如果还有child就继续渲染 */
    if (!props.showAll) if (props.tier >= 2 && props.showI !== props.path[props.path.length - 1]) return '';
    /* tier是第几层，showI控制显示下一级的第几个 */

    return _react["default"].createElement(Shu, _extends({}, props, {
      showI: props.data.showI,
      key: i,
      data: v,
      path: [].concat(_toConsumableArray(props.path), [i]),
      tier: props.tier + 1,
      trClassName: (props.data.child || []).length === 1 ? 'shu_td_name_one' // 只有一个子元素
      : i === 0 ? 'shu_td_name_left' // 最左边的子元素
      : i === (props.data.child || []).length - 1 ? 'shu_td_name_right' : 'shu_td_name_middle' // 中间的子元素(不是最左和最右)

    }));
  }))))));
}
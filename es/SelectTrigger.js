import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import Trigger from 'rc-trigger';
import classNames from 'classnames';

var getBuiltInPlacements = function getBuiltInPlacements(dropdownMatchSelectWidth) {
  // Enable horizontal overflow auto-adjustment when a custom dropdown width is provided
  var adjustX = typeof dropdownMatchSelectWidth !== 'number' ? 0 : 1;
  return {
    bottomLeft: {
      points: ['tl', 'bl'],
      offset: [0, 4],
      overflow: {
        adjustX: adjustX,
        adjustY: 1
      }
    },
    bottomRight: {
      points: ['tr', 'br'],
      offset: [0, 4],
      overflow: {
        adjustX: adjustX,
        adjustY: 1
      }
    },
    topLeft: {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: {
        adjustX: adjustX,
        adjustY: 1
      }
    },
    topRight: {
      points: ['br', 'tr'],
      offset: [0, -4],
      overflow: {
        adjustX: adjustX,
        adjustY: 1
      }
    }
  };
};

var SelectTrigger = function SelectTrigger(props, ref) {
  var prefixCls = props.prefixCls,
      disabled = props.disabled,
      visible = props.visible,
      children = props.children,
      popupElement = props.popupElement,
      containerWidth = props.containerWidth,
      animation = props.animation,
      transitionName = props.transitionName,
      dropdownStyle = props.dropdownStyle,
      dropdownClassName = props.dropdownClassName,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'ltr' : _props$direction,
      _props$dropdownMatchS = props.dropdownMatchSelectWidth,
      dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? true : _props$dropdownMatchS,
      dropdownRender = props.dropdownRender,
      dropdownAlign = props.dropdownAlign,
      getPopupContainer = props.getPopupContainer,
      empty = props.empty,
      getTriggerDOMNode = props.getTriggerDOMNode,
      restProps = _objectWithoutProperties(props, ["prefixCls", "disabled", "visible", "children", "popupElement", "containerWidth", "animation", "transitionName", "dropdownStyle", "dropdownClassName", "direction", "dropdownMatchSelectWidth", "dropdownRender", "dropdownAlign", "getPopupContainer", "empty", "getTriggerDOMNode"]);

  var dropdownPrefixCls = "".concat(prefixCls, "-dropdown");
  var popupNode = popupElement;

  if (dropdownRender) {
    popupNode = dropdownRender(popupElement);
  }

  var builtInPlacements = React.useMemo(function () {
    return getBuiltInPlacements(dropdownMatchSelectWidth);
  }, [dropdownMatchSelectWidth]); // ===================== Motion ======================

  var mergedTransitionName = animation ? "".concat(dropdownPrefixCls, "-").concat(animation) : transitionName; // ======================= Ref =======================

  var popupRef = React.useRef(null);
  React.useImperativeHandle(ref, function () {
    return {
      getPopupElement: function getPopupElement() {
        return popupRef.current;
      }
    };
  });
  var popupStyle = {
    minWidth: containerWidth
  };

  if (typeof dropdownMatchSelectWidth === 'number') {
    popupStyle.width = dropdownMatchSelectWidth;
  } else if (dropdownMatchSelectWidth) {
    popupStyle.width = containerWidth;
  }

  popupStyle = _objectSpread(_objectSpread({}, popupStyle), dropdownStyle);
  return /*#__PURE__*/React.createElement(Trigger, Object.assign({}, restProps, {
    showAction: [],
    hideAction: [],
    popupPlacement: direction === 'rtl' ? 'bottomRight' : 'bottomLeft',
    builtinPlacements: builtInPlacements,
    prefixCls: dropdownPrefixCls,
    popupTransitionName: mergedTransitionName,
    popup: /*#__PURE__*/React.createElement("div", {
      ref: popupRef
    }, popupNode),
    popupAlign: dropdownAlign,
    popupVisible: visible,
    getPopupContainer: getPopupContainer,
    popupClassName: classNames(dropdownClassName, _defineProperty({}, "".concat(dropdownPrefixCls, "-empty"), empty)),
    popupStyle: popupStyle,
    getTriggerDOMNode: getTriggerDOMNode
  }), children);
};

var RefSelectTrigger = /*#__PURE__*/React.forwardRef(SelectTrigger);
RefSelectTrigger.displayName = 'SelectTrigger';
export default RefSelectTrigger;
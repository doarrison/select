import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import pickAttrs from "rc-util/es/pickAttrs";
import Overflow from 'rc-overflow';
import TransBtn from '../TransBtn';
import Input from './Input';
import useLayoutEffect from '../hooks/useLayoutEffect';

var onPreventMouseDown = function onPreventMouseDown(event) {
  event.preventDefault();
  event.stopPropagation();
};

var SelectSelector = function SelectSelector(props) {
  var id = props.id,
      prefixCls = props.prefixCls,
      values = props.values,
      open = props.open,
      searchValue = props.searchValue,
      inputRef = props.inputRef,
      placeholder = props.placeholder,
      disabled = props.disabled,
      mode = props.mode,
      showSearch = props.showSearch,
      autoFocus = props.autoFocus,
      autoComplete = props.autoComplete,
      accessibilityIndex = props.accessibilityIndex,
      tabIndex = props.tabIndex,
      removeIcon = props.removeIcon,
      maxTagCount = props.maxTagCount,
      maxTagTextLength = props.maxTagTextLength,
      _props$maxTagPlacehol = props.maxTagPlaceholder,
      maxTagPlaceholder = _props$maxTagPlacehol === void 0 ? function (omittedValues) {
    return "+ ".concat(omittedValues.length, " ...");
  } : _props$maxTagPlacehol,
      tagRender = props.tagRender,
      onToggleOpen = props.onToggleOpen,
      onSelect = props.onSelect,
      onInputChange = props.onInputChange,
      onInputPaste = props.onInputPaste,
      onInputKeyDown = props.onInputKeyDown,
      onInputMouseDown = props.onInputMouseDown,
      onInputCompositionStart = props.onInputCompositionStart,
      onInputCompositionEnd = props.onInputCompositionEnd;
  var measureRef = React.useRef(null);

  var _useState = useState(0),
      _useState2 = _slicedToArray(_useState, 2),
      inputWidth = _useState2[0],
      setInputWidth = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      focused = _useState4[0],
      setFocused = _useState4[1];

  var selectionPrefixCls = "".concat(prefixCls, "-selection"); // ===================== Search ======================

  var inputValue = open || mode === 'tags' ? searchValue : '';
  var inputEditable = mode === 'tags' || showSearch && (open || focused); // We measure width and set to the input immediately

  useLayoutEffect(function () {
    setInputWidth(measureRef.current.scrollWidth);
  }, [inputValue]); // ===================== Render ======================
  // >>> Render Selector Node. Includes Item & Rest

  function defaultRenderSelector(content, itemDisabled, closable, onClose) {
    return /*#__PURE__*/React.createElement("span", {
      className: classNames("".concat(selectionPrefixCls, "-item"), _defineProperty({}, "".concat(selectionPrefixCls, "-item-disabled"), itemDisabled))
    }, /*#__PURE__*/React.createElement("span", {
      className: "".concat(selectionPrefixCls, "-item-content")
    }, content), closable && /*#__PURE__*/React.createElement(TransBtn, {
      className: "".concat(selectionPrefixCls, "-item-remove"),
      onMouseDown: onPreventMouseDown,
      onClick: onClose,
      customizeIcon: removeIcon
    }, "\xD7"));
  }

  function customizeRenderSelector(value, content, itemDisabled, closable, onClose) {
    var onMouseDown = function onMouseDown(e) {
      onPreventMouseDown(e);
      onToggleOpen(true);
    };

    return /*#__PURE__*/React.createElement("span", {
      onMouseDown: onMouseDown
    }, tagRender({
      label: content,
      value: value,
      disabled: itemDisabled,
      closable: closable,
      onClose: onClose
    }));
  }

  function renderItem(_ref) {
    var itemDisabled = _ref.disabled,
        label = _ref.label,
        value = _ref.value;
    var closable = !disabled && !itemDisabled;
    var displayLabel = label;

    if (typeof maxTagTextLength === 'number') {
      if (typeof label === 'string' || typeof label === 'number') {
        var strLabel = String(displayLabel);

        if (strLabel.length > maxTagTextLength) {
          displayLabel = "".concat(strLabel.slice(0, maxTagTextLength), "...");
        }
      }
    }

    var onClose = function onClose(event) {
      if (event) event.stopPropagation();
      onSelect(value, {
        selected: false
      });
    };

    return typeof tagRender === 'function' ? customizeRenderSelector(value, displayLabel, itemDisabled, closable, onClose) : defaultRenderSelector(displayLabel, itemDisabled, closable, onClose);
  }

  function renderRest(omittedValues) {
    var content = typeof maxTagPlaceholder === 'function' ? maxTagPlaceholder(omittedValues) : maxTagPlaceholder;
    return defaultRenderSelector(content, false);
  } // >>> Input Node


  var inputNode = /*#__PURE__*/React.createElement("div", {
    className: "".concat(selectionPrefixCls, "-search"),
    style: {
      width: inputWidth
    },
    onFocus: function onFocus() {
      setFocused(true);
    },
    onBlur: function onBlur() {
      setFocused(false);
    }
  }, /*#__PURE__*/React.createElement(Input, {
    ref: inputRef,
    open: open,
    prefixCls: prefixCls,
    id: id,
    inputElement: null,
    disabled: disabled,
    autoFocus: autoFocus,
    autoComplete: autoComplete,
    editable: inputEditable,
    accessibilityIndex: accessibilityIndex,
    value: inputValue,
    onKeyDown: onInputKeyDown,
    onMouseDown: onInputMouseDown,
    onChange: onInputChange,
    onPaste: onInputPaste,
    onCompositionStart: onInputCompositionStart,
    onCompositionEnd: onInputCompositionEnd,
    tabIndex: tabIndex,
    attrs: pickAttrs(props, true)
  }), /*#__PURE__*/React.createElement("span", {
    ref: measureRef,
    className: "".concat(selectionPrefixCls, "-search-mirror"),
    "aria-hidden": true
  }, inputValue, "\xA0")); // >>> Selections

  var selectionNode = /*#__PURE__*/React.createElement(Overflow, {
    prefixCls: "".concat(selectionPrefixCls, "-overflow"),
    data: values,
    renderItem: renderItem,
    renderRest: renderRest,
    suffix: inputNode,
    itemKey: "key",
    maxCount: maxTagCount
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, selectionNode, !values.length && !inputValue && /*#__PURE__*/React.createElement("span", {
    className: "".concat(selectionPrefixCls, "-placeholder")
  }, placeholder));
};

export default SelectSelector;
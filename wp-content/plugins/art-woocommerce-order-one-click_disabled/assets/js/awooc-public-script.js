/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

;// ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

;// ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

;// ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

;// ./node_modules/@babel/runtime/helpers/esm/createClass.js

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

;// ./src/js/public/components/EventBus.js


var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);
    this.events = {};
  }
  return _createClass(EventBus, [{
    key: "on",
    value: function on(event, callback) {
      var _this = this;
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
      var listener = function listener(e) {
        _this.events[event].forEach(function (cb) {
          return cb(e, e.detail);
        });
      };
      this.events[event].listener = listener;
      document.addEventListener(event, listener);
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      if (this.events[event]) {
        var _this$events$event;
        this.events[event] = this.events[event].filter(function (cb) {
          return cb !== callback;
        });
        if (!((_this$events$event = this.events[event]) !== null && _this$events$event !== void 0 && _this$events$event.length)) {
          document.removeEventListener(event, this.events[event].listener);
          delete this.events[event].listener;
        }
      }
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var customEvent = new CustomEvent(event, {
        detail: data
      });
      document.dispatchEvent(customEvent);
    }
  }]);
}();

;// ./src/js/public/config.js
/* global awooc_scripts_settings, awooc_scripts_ajax, awooc_scripts_translate */

/**
 * @typedef {Object} awooc_scripts_ajax - Общий объект с ссылкой на обработчик.
 * @property {string} url - Ссылка на AJAX обработчик.
 * @property {string} nonce - Одноразовое число.
 */

/**
 * @typedef {Object} awooc_scripts_translate - Объект с переводами строк.
 * @property {string} product_qty - Количество продукта.
 * @property {string} title - Название продукта.
 * @property {string} price - Цена продукта.
 * @property {string} sku - Артикул продукта.
 * @property {string} formatted_sum - Сумма заказа.
 * @property {string} attributes_list - Список атрибутов продукта.
 * @property {string} product_data_title - Заголовок информации о выбранном продукте.
 * @property {string} product_link - Ссылка на продукт.
 * @property {string} title_close - Текст для закрытия окна.
 */

/**
 * @typedef {Object} PopupCSS - Стили для всплывающего окна.
 * @property {string} width - Ширина окна.
 * @property {string} maxWidth - Максимальная ширина.
 * @property {string} maxHeight - Максимальная высота.
 * @property {string} top - Отступ сверху.
 * @property {string} left - Отступ слева.
 * @property {string} border - Ширина границы.
 * @property {string} borderRadius - Радиус скругления углов.
 * @property {string} cursor - Курсор.
 * @property {string} overflowY - Переполнение по вертикали.
 * @property {string} boxShadow - Тень окна.
 * @property {number} zIndex - Z-индекс окна.
 * @property {string} transform - Трансформация окна.
 * @property {string} overscroll-behavior - Поведение при скролле.
 */

/**
 * @typedef {Object} PopupOverlay - Стили оверлея.
 * @property {number} zIndex - Z-индекс оверлея.
 * @property {string} backgroundColor - Цвет фона оверлея.
 * @property {number} opacity - Прозрачность оверлея.
 * @property {string} cursor - Курсор при наведении.
 */

/**
 * @typedef {Object} PopupSettings - Настройки всплывающего окна.
 * @property {number} mailsent_timeout - Время ожидания после успешной отправки письма (в мс).
 * @property {number} invalid_timeout - Время ожидания при ошибке валидации (в мс).
 * @property {number} cf7_form_id - ID выбранной формы Contact Form 7.
 * @property {string} price_decimal_sep - Десятичный разделитель в цене.
 * @property {number} price_num_decimals - Количество знаков после запятой в цене.
 * @property {string} price_thousand_sep - Разделитель тысяч в цене.
 * @property {PopupCSS} css - Стили для всплывающего окна.
 * @property {PopupOverlay} overlay - Стили оверлея.
 * @property {number} fadeIn - Время анимации появления (в мс).
 * @property {number} fadeOut - Время анимации исчезновения (в мс).
 * @property {boolean} focusInput - Автоматический фокус на поле ввода.
 */

/**
 * @typedef {Object} awooc_scripts_settings - Основной объект настроек.
 * @property {string} mode - Режим работы плагина.
 * @property {string} template - Шаблон всплывающего окна.
 * @property {string} custom_label - Произвольная надпись на кнопке.
 * @property {PopupSettings} popup - Настройки всплывающего окна.
 */

/**
 * @module awooc_scripts
 * @exports settings
 * @exports ajax
 * @exports translate
 */

var settings = awooc_scripts_settings;
var ajax = awooc_scripts_ajax;
var translate = awooc_scripts_translate;
;// ./src/js/public/components/Popup.js



var Popup = /*#__PURE__*/function () {
  function Popup(app) {
    _classCallCheck(this, Popup);
    this.app = app;
    this.bindEvent();
  }
  return _createClass(Popup, [{
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;
      document.addEventListener('click', function (e) {
        _this.unBlock(e);
      });
    }
  }, {
    key: "showPopup",
    value: function showPopup(e) {
      var _this2 = this;
      jQuery.blockUI({
        message: settings.template,
        css: settings.popup.css,
        overlayCSS: settings.popup.overlay,
        fadeIn: settings.popup.fadeIn,
        fadeOut: settings.popup.fadeOut,
        focusInput: settings.popup.focusInput,
        bindEvents: false,
        timeout: 0,
        allowBodyStretch: true,
        centerX: true,
        centerY: true,
        blockMsgClass: 'blockMsg blockMsgAwooc',
        onBlock: function onBlock() {
          _this2.app.events.trigger('awooc_popup_open_trigger');
          _this2.app.request.sendRequest(e);
        },
        onUnblock: function onUnblock() {
          return _this2.app.events.trigger('awooc_popup_close_trigger');
        },
        onOverlayClick: function onOverlayClick() {
          return document.documentElement.style.overflow = 'initial';
        }
      });
    }
  }, {
    key: "unBlock",
    value: function unBlock(event) {
      if (event.target.classList.contains('awooc-close') || event.target.classList.contains('blockOverlay')) {
        jQuery.unblockUI();
      }
    }
  }]);
}();

;// ./src/js/public/components/Buttons.js




/*global wc_add_to_cart_variation_params */
var Buttons = /*#__PURE__*/function () {
  function Buttons(app) {
    _classCallCheck(this, Buttons);
    this.app = app;
    this.button = document.querySelectorAll('form.cart .awooc-button-js');
    this.addToCartElements = document.querySelectorAll('.woocommerce-variation-add-to-cart .quantity, .woocommerce-variation-add-to-cart .single_add_to_cart_button');
    this.disableClasses = ['disabled', 'wc-variation-selection-needed'];
    this.disableClassesOutStock = ['disabled', 'wc-variation-is-unavailable'];
  }
  return _createClass(Buttons, [{
    key: "init",
    value: function init() {
      var _this = this;
      document.addEventListener('click', function (e) {
        return _this.handleShowPopup(e);
      });
      jQuery(document.body).on('hide_variation', function () {
        return _this.toggleButtonClasses(_this.button, 'add', _this.disableClasses);
      }).on('show_variation', function (event, variation, purchasable) {
        return _this.updateButtonState(variation, purchasable);
      });
    }
  }, {
    key: "handleShowPopup",
    value: function handleShowPopup(e) {
      var button = e.target.closest('.awooc-button-js');
      if (!button) {
        return;
      }
      if (button.classList.contains('disabled')) {
        e.preventDefault();
        var message = button.classList.contains('wc-variation-is-unavailable') ? wc_add_to_cart_variation_params.i18n_unavailable_text : wc_add_to_cart_variation_params.i18n_make_a_selection_text;
        // eslint-disable-next-line no-alert
        window.alert(message);
        return false;
      }
      this.app.popup.showPopup(e);
    }
  }, {
    key: "updateButtonState",
    value: function updateButtonState(variation, purchasable) {
      var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var targetButton = button || this.button;
      switch (settings.mode) {
        case 'in_stock_add_to_card':
          // preload
          this.handlePreloadMode(variation, targetButton);
          break;
        case 'no_stock_no_price':
          // special
          this.handleSpecialMode(variation, targetButton);
          break;
        default:
          this.handleDefaultMode(purchasable, targetButton);
          break;
      }
    }
  }, {
    key: "handlePreloadMode",
    value: function handlePreloadMode(variation) {
      var button = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var targetButton = button || this.button;
      if (variation.backorders_allowed || !variation.is_in_stock) {
        this.hideAddToCartModule();
        this.toggleButtonClasses(targetButton, 'remove', this.disableClassesOutStock);
      } else {
        this.showAddToCartModule();
        this.toggleButtonClasses(targetButton, 'add', this.disableClasses);
      }
    }
  }, {
    key: "handleSpecialMode",
    value: function handleSpecialMode(variation) {
      var button = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var targetButton = button || this.button;
      if (variation.is_purchasable && !variation.is_in_stock) {
        this.hideAddToCartModule();
        this.toggleButtonClasses(targetButton, 'remove', this.disableClasses);
      } else if (variation.is_purchasable && variation.is_in_stock) {
        this.showAddToCartModule();
        this.toggleButtonClasses(targetButton, 'remove', this.disableClasses);
      } else {
        this.showAddToCartModule();
        this.toggleButtonClasses(targetButton, 'add', this.disableClasses);
      }
    }
  }, {
    key: "handleDefaultMode",
    value: function handleDefaultMode(purchasable) {
      var button = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var targetButton = button || this.button;
      this.toggleButtonClasses(targetButton, purchasable ? 'remove' : 'add', this.disableClassesOutStock);
    }
  }, {
    key: "toggleButtonClasses",
    value: function toggleButtonClasses(buttons, action, classes) {
      if (!buttons) {
        buttons = this.button;
      }
      if (buttons instanceof NodeList) {
        buttons = Array.from(buttons);
      }
      if (!Array.isArray(buttons)) {
        buttons = [buttons];
      }
      buttons.forEach(function (btn) {
        if (btn && btn.classList) {
          classes.forEach(function (cls) {
            if (typeof cls === 'string') {
              btn.classList[action](cls);
            }
          });
        }
      });
    }
  }, {
    key: "toggleModuleVisibility",
    value: function toggleModuleVisibility(action) {
      this.addToCartElements.forEach(function (el) {
        return el.classList[action]('awooc-hide');
      });
      this.button.forEach(function (btn) {
        return btn.classList[action]('no-margin');
      });
    }
  }, {
    key: "hideAddToCartModule",
    value: function hideAddToCartModule() {
      this.toggleModuleVisibility('add');
    }
  }, {
    key: "showAddToCartModule",
    value: function showAddToCartModule() {
      this.toggleModuleVisibility('remove');
    }
  }]);
}();

;// ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

;// ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

;// ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

;// ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

;// ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

;// ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

;// ./src/js/public/components/RequestProcessing/UpdateQuantity.js




var UpdateQuantity = /*#__PURE__*/function () {
  function UpdateQuantity(toMail, request, event) {
    _classCallCheck(this, UpdateQuantity);
    this.toMail = toMail;
    this.request = request;
    this.qtyVal = '';
    this.cache = request.cache;
    this.event = event;
  }
  return _createClass(UpdateQuantity, [{
    key: "bindEvent",
    value: function bindEvent() {
      var popupQtyContainer = document.querySelector('.awooc-popup-qty');
      if (!popupQtyContainer) {
        return;
      }
      var quantityInput = popupQtyContainer.querySelector('.awooc-popup-input-qty');
      if (quantityInput) {
        this.initializeQuantityInput(quantityInput);
      }
    }
  }, {
    key: "initializeQuantityInput",
    value: function initializeQuantityInput(quantityInput) {
      var _this = this;
      this.setMaxValueInput(quantityInput);
      this.updateAll();
      quantityInput.addEventListener('input', function (e) {
        return _this.handleInputEvent(e);
      });
      this.handlerPlusMinusButtonsEvent(quantityInput);
    }
  }, {
    key: "handlerPlusMinusButtonsEvent",
    value: function handlerPlusMinusButtonsEvent(quantityInput) {
      var _this2 = this;
      var minusButton = document.querySelector('.awooc-popup-input-qty--minus');
      var plusButton = document.querySelector('.awooc-popup-input-qty--plus');
      if (minusButton && plusButton) {
        minusButton.addEventListener('click', function () {
          return _this2.updateInputQuantity(quantityInput, 'decrease');
        });
        plusButton.addEventListener('click', function () {
          return _this2.updateInputQuantity(quantityInput, 'increase');
        });
      }
    }
  }, {
    key: "updateInputQuantity",
    value: function updateInputQuantity(inputElement, action) {
      var currentValue = parseFloat(inputElement.value);
      var step = this.getSafeValue(inputElement.step, 1);
      var minValue = this.getSafeValue(inputElement.min, -Infinity);
      var maxValue = this.getSafeValue(inputElement.max, Infinity);
      var newValue = currentValue + (action === 'decrease' ? -step : step);
      var decimalPlaces = Math.max(0, -Math.floor(Math.log10(step))); // Определяем количество знаков после запятой для step
      newValue = parseFloat(newValue.toFixed(decimalPlaces)); // Округляем до нужного количества знаков

      if (newValue >= minValue && newValue <= maxValue) {
        inputElement.value = newValue;
        inputElement.dispatchEvent(new Event('input', {
          bubbles: true
        }));
      }
    }
  }, {
    key: "handleInputEvent",
    value: function handleInputEvent(e) {
      var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!input) {
        input = e.target.closest('.awooc-popup-input-qty');
      }
      if (!input) {
        return;
      }
      this.setMaxValueInput(input);
      this.qtyVal = input.value;
      this.updateAll();
    }
  }, {
    key: "setMaxValueInput",
    value: function setMaxValueInput(input) {
      var minValue = this.getSafeValue(input.min, input.step);
      var maxValue = this.getSafeValue(input.max, input.value);
      input.value = Math.min(Math.max(parseFloat(String(input.value)) || minValue, minValue), maxValue);
      this.qtyVal = input.value;
    }
  }, {
    key: "updateAll",
    value: function updateAll() {
      this.updateMailQuantity();
      this.updateAmount();
      this.updateMailData();
      this.updateProductQuantity();
      this.updateAnalytics();
    }
  }, {
    key: "updateMailQuantity",
    value: function updateMailQuantity() {
      this.toMail.qty = "".concat(translate.product_qty).concat(this.qtyVal);
    }
  }, {
    key: "updateMailData",
    value: function updateMailData() {
      var hiddenDataField = document.querySelector('input[name="awooc-hidden-data"]');
      if (hiddenDataField) {
        hiddenDataField.value = this.request.fillDataToMail(this.toMail);
      }
    }
  }, {
    key: "updateAnalytics",
    value: function updateAnalytics() {
      this.request.app.analyticData.qty = this.qtyVal;
    }
  }, {
    key: "updateProductQuantity",
    value: function updateProductQuantity() {
      var productQtyField = document.querySelector('input[name="awooc_product_qty"]');
      if (productQtyField) {
        productQtyField.value = this.qtyVal;
      }
    }
  }, {
    key: "updateAmount",
    value: function updateAmount() {
      var priceValue = this.getPrice();
      if (!priceValue) {
        return;
      }
      var amount = this.displayPrice(this.parsePrice(priceValue) * this.qtyVal);
      this.updateDOMAmount(amount);
      this.updateMailAmount();
    }
  }, {
    key: "getPrice",
    value: function getPrice() {
      var _priceElement$textCon;
      var priceElement = document.querySelector('.awooc-popup-price .woocommerce-Price-currencyValue');
      return (priceElement === null || priceElement === void 0 || (_priceElement$textCon = priceElement.textContent) === null || _priceElement$textCon === void 0 ? void 0 : _priceElement$textCon.replace(/\s+/g, '')) || null;
    }
  }, {
    key: "getSafeValue",
    value: function getSafeValue(value, defaultValue) {
      return value !== '' && !Number.isNaN(parseFloat(value)) ? parseFloat(value) : defaultValue;
    }
  }, {
    key: "getPriceSettings",
    value: function getPriceSettings() {
      var _settings$popup = settings.popup,
        _settings$popup$price = _settings$popup.price_num_decimals,
        rawDecimalPlaces = _settings$popup$price === void 0 ? 0 : _settings$popup$price,
        _settings$popup$price2 = _settings$popup.price_decimal_sep,
        rawDecimalSeparator = _settings$popup$price2 === void 0 ? '.' : _settings$popup$price2,
        _settings$popup$price3 = _settings$popup.price_thousand_sep,
        rawThousandSeparator = _settings$popup$price3 === void 0 ? '' : _settings$popup$price3;
      var decimalSeparator = rawDecimalSeparator || '.';
      var thousandSeparator = rawThousandSeparator || '';
      var decimalPlaces = rawDecimalPlaces || 0;
      return {
        decimalPlaces: decimalPlaces,
        decimalSeparator: decimalSeparator,
        thousandSeparator: thousandSeparator
      };
    }
  }, {
    key: "displayPrice",
    value: function displayPrice(input) {
      var sanitizedInput = String(input).replace(/[^0-9.]/g, '');
      var number = parseFloat(sanitizedInput);
      if (isNaN(number)) {
        return 'Invalid number';
      }
      var _this$getPriceSetting = this.getPriceSettings(),
        decimalPlaces = _this$getPriceSetting.decimalPlaces,
        decimalSeparator = _this$getPriceSetting.decimalSeparator,
        thousandSeparator = _this$getPriceSetting.thousandSeparator;

      // Разделяем на целую и дробную части
      var _String$split = String(number.toFixed(decimalPlaces)).split('.'),
        _String$split2 = _slicedToArray(_String$split, 2),
        integerPart = _String$split2[0],
        decimalPart = _String$split2[1];

      // Форматируем целую часть с разделителями тысяч
      var formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

      // Форматируем дробную часть, если требуется
      var formattedDecimalPart = decimalPlaces > 0 ? decimalPart.padEnd(decimalPlaces, '0').slice(0, decimalPlaces) : '';
      return decimalPlaces > 0 && formattedDecimalPart ? "".concat(formattedIntegerPart).concat(decimalSeparator).concat(formattedDecimalPart) : formattedIntegerPart;
    }
  }, {
    key: "parsePrice",
    value: function parsePrice(number) {
      number = number !== null && number !== void 0 ? number : 0;
      var _this$getPriceSetting2 = this.getPriceSettings(),
        decimalPlaces = _this$getPriceSetting2.decimalPlaces,
        decimalSeparator = _this$getPriceSetting2.decimalSeparator,
        thousandSeparator = _this$getPriceSetting2.thousandSeparator;

      // Функция для экранирования символов в регулярных выражениях
      var escapeRegExp = function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      };
      if (typeof number !== 'number') {
        number = String(number);
        [thousandSeparator, ' ', '.', ','].filter(Boolean) // Игнорируем пустые значения
        .forEach(function (sep) {
          if (sep !== decimalSeparator) {
            // Исключаем десятичный разделитель
            number = number.replace(new RegExp(escapeRegExp(sep), 'g'), '');
          }
        });

        // Нормализуем десятичный разделитель к точке (.)
        if (decimalSeparator !== '.') {
          number = number.replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), '.');
        }

        // Удаляем лишние точки и все символы, кроме цифр, точки и минуса
        number = number.replace(/\.+(?![^.]+$)|[^0-9.-]/g, '');
      }
      number = parseFloat(number) || 0;
      if (decimalPlaces !== false) {
        var decimalsCount = String(decimalPlaces) === '' ? 2 : parseInt(decimalPlaces, 10); // По умолчанию 2 знака
        return number.toFixed(decimalsCount);
      }
      return number.toFixed(20);
    }
  }, {
    key: "updateDOMAmount",
    value: function updateDOMAmount(amount) {
      var sumElement = document.querySelector('.awooc-popup-sum .woocommerce-Price-currencyValue');
      if (sumElement) {
        sumElement.textContent = amount;
      }
    }
  }, {
    key: "updateMailAmount",
    value: function updateMailAmount() {
      var currentAmountElement = document.querySelector('.awooc-popup-sum bdi');
      if (currentAmountElement) {
        this.toMail.sum = "".concat(translate.formatted_sum).concat(currentAmountElement.textContent);
      } else {
        delete this.toMail.sum;
      }
    }
  }]);
}();

;// ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

;// ./src/js/public/components/RequestProcessing/DataCollector.js



function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

var DataCollector = /*#__PURE__*/function () {
  function DataCollector(request) {
    _classCallCheck(this, DataCollector);
    this.request = request;
    this.defaultAttributes = {};
  }
  return _createClass(DataCollector, [{
    key: "collectData",
    value: function collectData(event) {
      var data = this.getBaseData(event);
      this.setAttributesOnCatalog(event, data);
      this.serializeFormData(event, data);
      return data;
    }
  }, {
    key: "getBaseData",
    value: function getBaseData(event) {
      return {
        id: this.request.getProductID(event),
        action: 'awooc_ajax_product_form',
        nonce: ajax.nonce,
        attributes: _objectSpread({}, this.defaultAttributes)
      };
    }
  }, {
    key: "setAttributesOnCatalog",
    value: function setAttributesOnCatalog(event, data) {
      data.attributes = _objectSpread({}, this.defaultAttributes);
      var selectedVariant = event.target.dataset.selectedVariant;
      if (selectedVariant) {
        data.attributes = JSON.parse(selectedVariant);
      }
    }
  }, {
    key: "serializeFormData",
    value: function serializeFormData(event, data) {
      var form = event.target.closest('.cart');
      if (!form) {
        return;
      }
      data.attributes = _objectSpread({}, this.defaultAttributes);
      this.processFormData(new FormData(form), data);
    }
  }, {
    key: "processFormData",
    value: function processFormData(formData, data) {
      var _this = this;
      formData.forEach(function (value, name) {
        _this.updateDataField(data, name, value);
        if (name.startsWith('attribute_')) {
          _this.updateDataField(data.attributes, name, value);
        }
      });
      delete data['add-to-cart'];
    }
  }, {
    key: "updateDataField",
    value: function updateDataField(dataObject, name, value) {
      dataObject[name] = dataObject[name] ? [].concat(dataObject[name], value) : value;
    }
  }]);
}();

;// ./src/js/public/components/Request.js






var Request = /*#__PURE__*/function () {
  function Request(app) {
    _classCallCheck(this, Request);
    this.app = app;
    this.$ = this.app.$;
    this.dataCollector = new DataCollector(this);
  }
  return _createClass(Request, [{
    key: "sendRequest",
    value: function sendRequest(e) {
      var _this = this;
      var data = this.dataCollector.collectData(e);
      this.app.xhr = this.$.ajax({
        url: ajax.url,
        data: data,
        type: 'POST',
        dataType: 'json',
        success: function success(response) {
          return _this.handleSuccessResponse(response, e);
        },
        error: function error(response) {
          return _this.handleErrorResponse(response);
        }
      });
    }
  }, {
    key: "getProductID",
    value: function getProductID(e) {
      var _variationsForm$query;
      var variationsForm = e.target.closest('.variations_form');
      var variationId = variationsForm === null || variationsForm === void 0 || (_variationsForm$query = variationsForm.querySelector('input[name="variation_id"]')) === null || _variationsForm$query === void 0 ? void 0 : _variationsForm$query.value;
      return variationId !== null && variationId !== void 0 ? variationId : e.target.dataset.valueProductId;
    }
  }, {
    key: "handleSuccessResponse",
    value: function handleSuccessResponse(response, e) {
      this.removeSkeleton();
      var _response$data = response.data,
        toMail = _response$data.toMail,
        toPopup = _response$data.toPopup,
        toAnalytics = _response$data.toAnalytics;
      this.fillDataToPopup(toPopup);
      this.fillHiddenFormFields(toMail, e);
      new UpdateQuantity(toMail, this, e).bindEvent();
      this.app.analyticData = toAnalytics;
      this.initUI();
      this.closeMagnificPopup();
      this.app.events.trigger('awooc_popup_ajax_trigger', response);
    }
  }, {
    key: "handleErrorResponse",
    value: function handleErrorResponse(response) {
      if (response.responseJSON) {
        // eslint-disable-next-line no-console
        console.error(response.responseJSON.data);
      }
    }
  }, {
    key: "fillDataToMail",
    value: function fillDataToMail(data) {
      return "\n".concat(translate.product_data_title, "\n\u2014\u2014\u2014\n").concat(Object.values(data).join('\n'));
    }
  }, {
    key: "fillDataToPopup",
    value: function fillDataToPopup(data) {
      Object.entries(data).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
        var element = document.querySelector(".awooc-popup-".concat(key));
        if (element) {
          element.innerHTML = value;
        }
      });
    }
  }, {
    key: "fillHiddenFormFields",
    value: function fillHiddenFormFields(data, e) {
      this.updateField('awooc_product_id', this.getProductID(e));
      this.updateField('awooc_product_qty', this.getQty());
      this.updateField('awooc-hidden-data', this.fillDataToMail(data));
    }
  }, {
    key: "updateField",
    value: function updateField(name, value) {
      var field = document.querySelector("input[name=\"".concat(name, "\"]"));
      if (field) {
        field.value = value;
      }
    }
  }, {
    key: "initUI",
    value: function initUI() {
      this.app.form.initContactForm();
      this.app.form.initMask();
    }
  }, {
    key: "removeSkeleton",
    value: function removeSkeleton() {
      document.querySelectorAll('.awooc-popup-inner .awooc-popup-item').forEach(function (item) {
        item.classList.remove('skeleton-loader');
      });
    }
  }, {
    key: "closeMagnificPopup",
    value: function closeMagnificPopup() {
      var _this$$$magnificPopup;
      if ((_this$$$magnificPopup = this.$.magnificPopup) !== null && _this$$$magnificPopup !== void 0 && _this$$$magnificPopup.instance) {
        this.$.magnificPopup.close();
      }
    }
  }, {
    key: "getQty",
    value: function getQty() {
      var qty = document.querySelector('.quantity input[name="quantity"]');
      if (qty) {
        return qty.value;
      }
      return 1;
    }
  }]);
}();

;// ./src/js/public/components/Form.js




/*global wpcf7 */
var Form = /*#__PURE__*/function () {
  function Form(app) {
    _classCallCheck(this, Form);
    this.app = app;
    /* eslint-disable camelcase */
    var _settings$popup = settings.popup,
      cf7_form_id = _settings$popup.cf7_form_id,
      mailsent_timeout = _settings$popup.mailsent_timeout,
      invalid_timeout = _settings$popup.invalid_timeout;
    this.formId = Number(cf7_form_id);
    this.mailsentTimeout = mailsent_timeout;
    this.invalidTimeout = invalid_timeout;
    /* eslint-disable camelcase */
  }
  return _createClass(Form, [{
    key: "init",
    value: function init() {
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      document.addEventListener('wpcf7mailsent', function (event) {
        return _this.handleMailSent(event);
      });
      document.addEventListener('wpcf7invalid', function (event) {
        return _this.handleInvalid(event);
      });
      this.app.events.on('awooc_popup_ajax_trigger', function () {
        return _this.setupFormSubmitListener();
      });
    }
  }, {
    key: "setupFormSubmitListener",
    value: function setupFormSubmitListener() {
      var _this2 = this;
      var form = document.querySelector('form.wpcf7-form');
      if (form) {
        form.addEventListener('submit', function (event) {
          return _this2.handleFormSubmit(event);
        });
      }
    }
  }, {
    key: "handleMailSent",
    value: function handleMailSent(event) {
      var detail = event.detail;
      setTimeout(function () {
        return jQuery.unblockUI();
      }, this.mailsentTimeout);
      if (this.formId === detail.contactFormId) {
        this.app.events.trigger('awooc_mail_sent_trigger', {
          selectedProduct: this.app.analyticData,
          mailDetail: detail
        });
      }
    }
  }, {
    key: "handleInvalid",
    value: function handleInvalid(event) {
      var _this3 = this;
      var detail = event.detail;
      if (this.formId === detail.contactFormId) {
        this.app.events.trigger('awooc_mail_invalid_trigger');
      }
      setTimeout(function () {
        return _this3.clearFormErrors();
      }, this.invalidTimeout);
    }
  }, {
    key: "clearFormErrors",
    value: function clearFormErrors() {
      var formOutput = document.querySelector('.awooc-form-custom-order .wpcf7-response-output');
      var notValidTips = document.querySelectorAll('.awooc-form-custom-order .wpcf7-not-valid-tip');
      var submitButton = document.querySelector('.awooc-form-custom-order input[type="submit"]');
      if (formOutput) {
        formOutput.innerHTML = '';
      }
      if (submitButton) {
        submitButton.disabled = false;
      }
      notValidTips.forEach(function (tip) {
        return tip.remove();
      });
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(event) {
      var submitButton = event.currentTarget.querySelector('input[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
      }
    }
  }, {
    key: "initContactForm",
    value: function initContactForm() {
      var _this4 = this;
      document.querySelectorAll('.awooc-form-custom-order div.wpcf7 > form').forEach(function (form) {
        var versionInput = form.querySelector('input[name="_wpcf7_version"]');
        if (!versionInput) {
          return;
        }
        var isOldVersion = versionInput.value && versionInput.value <= '5.4';
        if (isOldVersion) {
          _this4.initOldWpcf7(form);
        } else {
          wpcf7.init(form);
        }
      });
    }
  }, {
    key: "initOldWpcf7",
    value: function initOldWpcf7(form) {
      wpcf7.initForm(form);
      if (wpcf7.cached) {
        wpcf7.refill(form);
      }
    }
  }, {
    key: "initMask",
    value: function initMask() {
      document.querySelectorAll('.awooc-form-custom-order .wpcf7-mask').forEach(function (field) {
        var dataMask = jQuery(field).data('mask');
        if (!dataMask) {
          return;
        }
        try {
          jQuery(field).mask(dataMask);
          if (!/[a*]/.test(dataMask)) {
            field.setAttribute('inputmode', 'numeric');
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Error ".concat(e.name, ": ").concat(e.message, "\n").concat(e.stack));
        }
      });
    }
  }]);
}();

;// ./src/js/public/components/Integrations/VariationSwatchesByCartFlows.js


var VariationSwatchesByCartFlows = /*#__PURE__*/function () {
  function VariationSwatchesByCartFlows(app) {
    _classCallCheck(this, VariationSwatchesByCartFlows);
    this.app = app;
    this.variationForms = document.querySelectorAll('.cfvsw_variations_form, form.variations_form');
    this.buttons = this.getButtons();
  }
  return _createClass(VariationSwatchesByCartFlows, [{
    key: "getButtons",
    value: function getButtons() {
      return Array.from(this.variationForms).map(function (form) {
        return form.closest('li');
      }).filter(function (li) {
        return li !== null;
      }).flatMap(function (li) {
        return Array.from(li.querySelectorAll('.awooc-button-js'));
      });
    }
  }, {
    key: "init",
    value: function init() {
      if (this.variationForms.length < 0) {
        return;
      }
      this.addedToButtonAttributes();
      this.disableButtons();
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      document.addEventListener('cfvswVariationLoad', function () {
        return _this.addedToButtonAttributes();
      });
      document.addEventListener('astraInfinitePaginationLoaded', function () {
        return _this.addedToButtonAttributes();
      });
      var swatchesOptions = document.querySelectorAll('.cfvsw-swatches-option');
      swatchesOptions.forEach(function (swatch) {
        swatch.addEventListener('click', function (e) {
          return _this.onClickSwatchesOption(e);
        });
      });
    }
  }, {
    key: "addedToButtonAttributes",
    value: function addedToButtonAttributes() {
      var _this2 = this;
      this.variationForms.forEach(function (form) {
        jQuery(form).wc_variation_form();
        if (form.dataset.cfvswCatalog) {
          return;
        }
        jQuery(form).on('found_variation', function () {
          return _this2.updateButtonData(form);
        });
      });
    }
  }, {
    key: "updateButtonData",
    value: function updateButtonData(variant) {
      var _variant$closest;
      var selectElements = variant.querySelectorAll('.variations select');
      var data = {};
      var button = (_variant$closest = variant.closest('li')) === null || _variant$closest === void 0 ? void 0 : _variant$closest.querySelector('.awooc-button-js');
      selectElements.forEach(function (selectElement) {
        var attributeName = selectElement.dataset.attributeName || selectElement.name;
        data[attributeName] = selectElement.value || '';
      });
      if (button) {
        button.disabled = false;
        button.classList.add('cfvsw_variation_found');
        button.dataset.selectedVariant = JSON.stringify(data);
      }
    }
  }, {
    key: "onClickSwatchesOption",
    value: function onClickSwatchesOption(e) {
      var swatch = e.target;
      if (this.isSwatchSelected(swatch)) {
        this.deselectSwatch(swatch);
        this.resetButtonData(swatch);
      } else {
        this.deselectAllSwatches(swatch);
        this.selectSwatch(swatch);
      }
      this.updateSelectOption(swatch);
    }
  }, {
    key: "resetButtonData",
    value: function resetButtonData(swatch) {
      var _swatch$closest;
      var button = (_swatch$closest = swatch.closest('li')) === null || _swatch$closest === void 0 ? void 0 : _swatch$closest.querySelector('.awooc-button-js');
      if (!button) {
        return;
      }
      button.disabled = true;
      button.classList.remove('cfvsw_variation_found');
      button.dataset.selectedVariant = '';
    }
  }, {
    key: "updateSelectOption",
    value: function updateSelectOption(swatch) {
      var value = this.getSwatchValue(swatch);
      var select = this.getSelectElement(swatch);
      if (select) {
        select.value = value;
        select.dispatchEvent(new Event('change'));
      }
    }
  }, {
    key: "isSwatchSelected",
    value: function isSwatchSelected(swatch) {
      return (!swatch.classList.contains('cfvsw-swatches-disabled') || !swatch.classList.contains('cfvsw-swatches-out-of-stock')) && swatch.classList.contains('cfvsw-selected-swatch');
    }
  }, {
    key: "deselectSwatch",
    value: function deselectSwatch(swatch) {
      swatch.classList.remove('cfvsw-selected-swatch');
    }
  }, {
    key: "deselectAllSwatches",
    value: function deselectAllSwatches(swatch) {
      swatch.parentElement.querySelectorAll('.cfvsw-swatches-option').forEach(function (option) {
        return option.classList.remove('cfvsw-selected-swatch');
      });
    }
  }, {
    key: "selectSwatch",
    value: function selectSwatch(swatch) {
      swatch.classList.add('cfvsw-selected-swatch');
    }
  }, {
    key: "getSwatchValue",
    value: function getSwatchValue(swatch) {
      return this.isSwatchSelected(swatch) ? swatch.dataset.slug : '';
    }
  }, {
    key: "getSelectElement",
    value: function getSelectElement(swatch) {
      var _swatch$closest2;
      return (_swatch$closest2 = swatch.closest('.cfvsw-swatches-container')) === null || _swatch$closest2 === void 0 || (_swatch$closest2 = _swatch$closest2.previousElementSibling) === null || _swatch$closest2 === void 0 ? void 0 : _swatch$closest2.querySelector('select');
    }
  }, {
    key: "disableButtons",
    value: function disableButtons() {
      this.buttons.forEach(function (button) {
        return button.disabled = true;
      });
    }
  }]);
}();

;// ./src/js/public/components/Integrations/Woodmart.js


var Woodmart = /*#__PURE__*/function () {
  function Woodmart(app) {
    _classCallCheck(this, Woodmart);
    this.app = app;
  }
  return _createClass(Woodmart, [{
    key: "init",
    value: function init() {
      var _this = this;
      jQuery(document.body).on('woodmart-quick-view-displayed', function () {
        var button = document.querySelector('.product.quick-shop-loaded form.cart .awooc-button-js');
        if (!button) {
          return;
        }
        var $product = jQuery('.product.quick-shop-loaded');
        $product.find('.variations_form').on('hide_variation', function () {
          return _this.app.buttons.toggleButtonClasses([button], 'add', _this.app.buttons.disableClasses);
        }).on('show_variation', function (event, variation, purchasable) {
          return _this.app.buttons.updateButtonState(variation, purchasable, [button]);
        });
      });
    }
  }]);
}();

;// ./src/js/public/AppCore.js









var AppCore = /*#__PURE__*/function () {
  function AppCore($) {
    _classCallCheck(this, AppCore);
    if (!this.validateGlobals()) {
      return;
    }
    this.$ = $;
    this.xhr = false;
    this.analyticData = {};
    this.events = new EventBus();
    this.popup = new Popup(this);
    this.buttons = new Buttons(this);
    this.request = new Request(this);
    this.form = new Form(this);
    this.variationSwatches = new VariationSwatchesByCartFlows(this);
    this.woodmart = new Woodmart(this);
    this.init();
  }
  return _createClass(AppCore, [{
    key: "init",
    value: function init() {
      this.buttons.init();
      this.form.init();
      this.variationSwatches.init();
      this.woodmart.init();
    }
  }, {
    key: "validateGlobals",
    value: function validateGlobals() {
      var globals = {
        awooc_scripts_ajax: 'awooc_scripts_ajax not found',
        awooc_scripts_translate: 'awooc_scripts_translate not found',
        awooc_scripts_settings: 'awooc_scripts_settings not found',
        wpcf7: 'На странице не существует объекта wpcf7. Что-то не так с темой...'
      };
      for (var key in globals) {
        if (typeof window[key] === 'undefined' || window[key] === null) {
          // eslint-disable-next-line no-console
          console.warn(globals[key]);
          return false;
        }
      }
      return true;
    }
  }]);
}();

;// ./src/js/public/helpers.js
/**
 * Выводим предупреждение об измении обработки события только в момент срабатывания события
 * @param {jQuery} $ - Объект jQuery.
 */
function setupAwoocEventHandling($) {
  var EVENT_PREFIX = 'awooc_';
  var originalOn = $.fn.on;
  var originalTrigger = $.fn.trigger;

  // Патчим $.fn.on
  $.fn.on = function (event, selector, data, handler) {
    // Нормализация аргументов
    if (typeof selector === 'function') {
      handler = selector;
      selector = undefined;
      data = undefined;
    } else if (typeof data === 'function') {
      handler = data;
      data = undefined;
    }

    // Если событие начинается с префикса "awooc_", добавляем обертку для обработчика
    if (typeof event === 'string' && event.startsWith(EVENT_PREFIX) && handler) {
      var wrappedHandler = function wrappedHandler(e) {
        // Выводим предупреждение, если обработчик ожидает второй аргумент (data)
        if (handler.length > 1) {
          // eslint-disable-next-line no-console
          console.warn("[WARNING] '".concat(event, "' \u043F\u0435\u0440\u0435\u0434\u0430\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0435 \u0447\u0435\u0440\u0435\u0437 event.detail, \u043D\u043E \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u043E\u0436\u0438\u0434\u0430\u0435\u0442 data. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 event.detail \u0432\u043C\u0435\u0441\u0442\u043E \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u0430."));
        }
        // Вызываем оригинальный обработчик
        handler.call(this, e, e.detail);
      };
      return originalOn.call(this, event, selector, data, wrappedHandler);
    }

    // Возвращаем оригинальный метод для других событий
    return originalOn.apply(this, arguments);
  };

  // Патчим $.fn.trigger
  $.fn.trigger = function (event, data) {
    // Если событие начинается с префикса "awooc_", используем CustomEvent
    if (typeof event === 'string' && event.startsWith(EVENT_PREFIX)) {
      var customEvent = new CustomEvent(event, {
        detail: data
      });
      document.dispatchEvent(customEvent);
      return this; // Сохраняем цепочку вызовов jQuery
    }

    // Возвращаем оригинальный метод для других событий
    return originalTrigger.apply(this, arguments);
  };

  // Подписываемся на все события с префиксом "awooc_"
  document.addEventListener(EVENT_PREFIX,
  // Используем префикс как тип события
  function (event) {
    // Проверяем, начинается ли тип события с префикса
    if (event.type.startsWith(EVENT_PREFIX)) {
      // Передаем событие в jQuery
      $(document).triggerHandler(event.type, event.detail);
    }
  }, true // Используем capture: true для перехвата событий на этапе захвата
  );
}
;// ./src/js/public/main.js


(function ($) {
  'use strict';

  setupAwoocEventHandling($);
  $(document).ready(function () {
    if (!window.AwoocAppCore) {
      window.AwoocAppCore = new AppCore($);
    }
  });
})(jQuery);
/******/ })()
;
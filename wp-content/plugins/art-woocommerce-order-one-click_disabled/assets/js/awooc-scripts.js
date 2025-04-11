/******/ (() => { // webpackBootstrap
/*global awooc_scripts_ajax */
/*global awooc_scripts_translate */
/*global awooc_scripts_settings */
/*global wc_add_to_cart_variation_params */
/*global wpcf7 */
jQuery(function ($) {
  'use strict';

  if (typeof awooc_scripts_ajax === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('awooc_scripts_ajax not found');
    return false;
  }
  if (typeof awooc_scripts_translate === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('awooc_scripts_translate not found');
    return false;
  }
  if (typeof awooc_scripts_settings === 'undefined') {
    // eslint-disable-next-line no-console
    console.warn('awooc_scripts_settings not found');
    return false;
  }
  if (typeof wpcf7 === 'undefined' || wpcf7 === null) {
    // eslint-disable-next-line no-console
    console.warn('На странице не существует объекта wpcf7. Что-то не так с темой...');
    return false;
  }
  var AWOOC = {
    xhr: false,
    $button: $('.awooc-button-js'),
    $cfvswVariationsForm: $('.cfvsw_variations_form:not(.variation-function-added'),
    $buttonProduct: $('.woocommerce-variation-add-to-cart .awooc-button-js'),
    formId: Number(awooc_scripts_settings.popup.cf7_form_id),
    analyticData: {},
    init: function init() {
      if (this.$cfvswVariationsForm !== undefined) {
        AWOOC.addedToButtonAttributes();
      }
      $(document.body).on('click', '.awooc-button-js', this.popup).on('awooc_popup_ajax_trigger', this.removeSkeleton).on('click', '.awooc-close, .blockOverlay', this.unBlock).on('hide_variation', this.disableButton).on('show_variation', this.enableButton).on('wpcf7mailsent', this.sendSuccess).on('wpcf7invalid', this.sendInvalid).on('cfvswVariationLoad', this.addedToButtonAttributes).on('astraInfinitePaginationLoaded', this.addedToButtonAttributes).on('cfvswVariationLoad', this.addedToButtonAttributes).on('click', '.cfvsw-swatches-option', function (e) {
        AWOOC.onClickSwatchesOption($(e.target));
      });
    },
    addedToButtonAttributes: function addedToButtonAttributes() {
      AWOOC.$cfvswVariationsForm.each(function () {
        var thisForm = $(this);
        thisForm.wc_variation_form();
        if (thisForm.attr('data-cfvsw-catalog')) {
          return;
        }
        thisForm.on('found_variation', function (e, variation) {
          AWOOC.updateButtonData(thisForm, variation);
        });
      });
    },
    updateButtonData: function updateButtonData(variant) {
      var select = variant.find('.variations select');
      var data = {};
      var button = variant.parents('li').find('.awooc-button-js');
      select.each(function () {
        var attributeName = $(this).data('attribute_name') || $(this).attr('name');
        data[attributeName] = $(this).val() || '';
      });
      button.addClass('cfvsw_variation_found');
      button.attr('data-selected_variant', JSON.stringify(data));
    },
    resetButtonData: function resetButtonData(variant) {
      var button = variant.parents('li').find('.awooc-button-js');
      button.html(button.data('select_options_text'));
      button.removeClass('cfvsw_variation_found');
      button.attr('data-selected_variant', '');
    },
    onClickSwatchesOption: function onClickSwatchesOption(swatch) {
      if (swatch.hasClass('cfvsw-selected-swatch')) {
        swatch.removeClass('cfvsw-selected-swatch');
        AWOOC.resetButtonData(swatch);
      } else {
        var parent = swatch.parent();
        parent.find('.cfvsw-swatches-option').each(function () {
          $(this).removeClass('cfvsw-selected-swatch');
        });
        swatch.addClass('cfvsw-selected-swatch');
      }
      AWOOC.updateSelectOption(swatch);
    },
    updateSelectOption: function updateSelectOption(swatch) {
      var value = swatch.hasClass('cfvsw-selected-swatch') ? swatch.data('slug') : '';
      var select = swatch.closest('.cfvsw-swatches-container').prev().find('select');
      select.val(value).change();
    },
    disableButton: function disableButton() {
      AWOOC.$button.addClass('disabled wc-variation-selection-needed');
    },
    enableButton: function enableButton(e, variation, purchasable) {
      if (!variation.is_in_stock) {
        AWOOC.$buttonProduct.addClass('disabled wc-variation-is-unavailable');
      } else {
        AWOOC.$buttonProduct.removeClass('disabled wc-variation-selection-needed');
      }
      if (awooc_scripts_settings.mode === 'dont_show_add_to_card') {
        AWOOC.$buttonProduct.removeClass('disabled wc-variation-selection-needed');
      }
      switch (awooc_scripts_settings.mode) {
        case 'dont_show_add_to_card':
          // catalog
          // eslint-disable-next-line no-console
          console.log(variation);
          break;
        case 'show_add_to_card':
          // normal
          // eslint-disable-next-line no-console
          console.log(variation);
          break;
        case 'in_stock_add_to_card':
          // preload
          if (variation.backorders_allowed || !variation.is_in_stock) {
            AWOOC.$button.removeClass('disabled wc-variation-selection-needed');
            AWOOC.hideAddToCartModule();
            AWOOC.showAwoocButton();
          } else {
            AWOOC.showAddToCartModule();
            AWOOC.hideAwoocButton();
          }
          break;
        case 'no_stock_no_price':
          // special
          if (!purchasable) {
            AWOOC.$button.removeClass('disabled wc-variation-selection-needed');
            AWOOC.hideAddToCartModule();
          } else {
            AWOOC.showAddToCartModule();
          }
          break;
      }
    },
    hideAddToCartModule: function hideAddToCartModule() {
      $('body.woocommerce').find('.woocommerce-variation-add-to-cart .quantity').addClass('awooc-hide');
      $('body.woocommerce').find('.woocommerce-variation-add-to-cart .single_add_to_cart_button').addClass('awooc-hide');
    },
    showAddToCartModule: function showAddToCartModule() {
      $('body.woocommerce').find('.woocommerce-variation-add-to-cart .quantity').removeClass('awooc-hide');
      $('body.woocommerce').find('.woocommerce-variation-add-to-cart .single_add_to_cart_button').removeClass('awooc-hide');
    },
    hideAwoocButton: function hideAwoocButton() {
      AWOOC.$button.addClass('awooc-hide');
    },
    showAwoocButton: function showAwoocButton() {
      AWOOC.$button.removeClass('awooc-hide');
    },
    getProductID: function getProductID(e) {
      var productVariantId = $('.variations_form').find('input[name="variation_id"]').val();
      var selectedProductId = $(e.target).attr('data-value-product-id');

      // Проверяем ID товара, для вариаций свой, для простых свой.
      if (0 !== productVariantId && typeof productVariantId !== 'undefined') {
        selectedProductId = productVariantId;
      }
      return selectedProductId;
    },
    getQty: function getQty() {
      return $('.quantity').find('input[name="quantity"]').val() || 1;
    },
    unBlock: function unBlock() {
      $.unblockUI();
    },
    removeSkeleton: function removeSkeleton() {
      $('.awooc-popup-inner').find('.awooc-popup-item').each(function (index, item) {
        $(item).removeClass('skeleton-loader');
      });
    },
    addedToMailData: function addedToMailData(toMail) {
      var keys = Object.keys(toMail);
      var dataToMail = '\n' + awooc_scripts_translate.product_data_title + '\n———\n';
      keys.forEach(function (key) {
        dataToMail += toMail[key] + '\n';
      });
      return dataToMail;
    },
    addedToPopupData: function addedToPopupData(toPopup) {
      var keys = Object.keys(toPopup);
      keys.forEach(function (key) {
        $('.awooc-popup-' + key).html(toPopup[key]);
      });
    },
    sendSuccess: function sendSuccess(event) {
      setTimeout(AWOOC.unBlock, awooc_scripts_settings.popup.mailsent_timeout);
      if (AWOOC.formId === event.detail.contactFormId) {
        $(document.body).trigger('awooc_mail_sent_trigger', {
          selectedProduct: AWOOC.analyticData,
          mailDetail: event.detail
        });
      }
    },
    sendInvalid: function sendInvalid(event, detail) {
      if (AWOOC.formId === event.detail.contactFormId) {
        $(document.body).trigger('awooc_mail_invalid_trigger', [event, detail]);
      }
      setTimeout(function () {
        $('.awooc-form-custom-order .wpcf7-response-output').empty();
        $('.awooc-form-custom-order .wpcf7-not-valid-tip').remove();
      }, awooc_scripts_settings.popup.invalid_timeout);
    },
    initMask: function initMask() {
      var maskFields = $('.awooc-form-custom-order .wpcf7-mask');
      if (!maskFields.length) {
        return;
      }
      maskFields.each(function (index, field) {
        var $this = $(field);
        var dataMask = $this.data('mask');
        if (!dataMask) {
          return;
        }
        try {
          $this.mask(dataMask);
          var hasAsterisk = dataMask.includes('*');
          var hasLetterA = dataMask.includes('a');
          if (!hasAsterisk && !hasLetterA) {
            $this.attr({
              inputmode: 'numeric'
            });
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Error: ".concat(e.name, ": ").concat(e.message, "\n").concat(e.stack));
        }
      });
    },
    updateAmount: function updateAmount(qtyVal, e, toMail) {
      var priceValue = $('.awooc-popup-price .woocommerce-Price-currencyValue').text();
      if (priceValue) {
        priceValue = priceValue.replace(awooc_scripts_settings.popup.price_decimal_sep, '.');
        priceValue = priceValue.replace(/\s+/g, '');
        var amount = parseFloat(priceValue.replace(awooc_scripts_settings.popup.price_decimal_sep, '.')) * qtyVal;
        amount = amount.toFixed(awooc_scripts_settings.popup.price_num_decimals).replace('.', awooc_scripts_settings.popup.price_decimal_sep);
        amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, awooc_scripts_settings.popup.price_thousand_sep);
        $(e.target).closest('.awooc-form-custom-order').find('.awooc-popup-sum .woocommerce-Price-currencyValue').text(amount);
        var currentAmountValue = $(e.target).closest('.awooc-form-custom-order').find('.awooc-popup-sum bdi').text();
        toMail.sum = awooc_scripts_translate.formatted_sum + currentAmountValue;
      } else {
        delete toMail.sum;
      }
    },
    updateQty: function updateQty(toMail) {
      $('.awooc-popup-qty').on('input', 'input.awooc-popup-input-qty', function (e) {
        var qtyVal = $(e.target).val();
        toMail.qty = awooc_scripts_translate.product_qty + qtyVal;
        AWOOC.analyticData.qty = qtyVal;
        AWOOC.updateAmount(qtyVal, e, toMail);
        $('input[name="awooc-hidden-data"]').val(AWOOC.addedToMailData(toMail));
        $('input[name="awooc_product_qty"]').val(qtyVal);
      });
    },
    request: function request(e) {
      var data = {
        id: AWOOC.getProductID(e),
        action: 'awooc_ajax_product_form',
        nonce: awooc_scripts_ajax.nonce
      };
      if ($(e.target).data('selected_variant') !== undefined) {
        data.attributes = $(e.target).data('selected_variant');
      }
      $(e.target).closest('.cart').serializeArray().forEach(function (_ref) {
        var name = _ref.name,
          value = _ref.value;
        if (data[name]) {
          if (!Array.isArray(data[name])) {
            data[name] = [data[name]];
          }
          data[name].push(value);
        } else {
          data[name] = value;
        }
      });
      delete data['add-to-cart'];
      AWOOC.xhr = $.ajax({
        url: awooc_scripts_ajax.url,
        data: data,
        type: 'POST',
        dataType: 'json',
        success: function success(response) {
          var toPopup = response.data.toPopup;
          var toMail = response.data.toMail;
          AWOOC.addedToPopupData(toPopup);
          AWOOC.analyticData = response.data.toAnalytics;
          AWOOC.updateQty(toMail);
          AWOOC.initContactForm();
          AWOOC.initMask();
          $('input[name="awooc_product_id"]').val(AWOOC.getProductID(e));
          $('input[name="awooc_product_qty"]').val(AWOOC.getQty(e));
          $('input[name="awooc-hidden-data"]').val(AWOOC.addedToMailData(toMail));
          if ($.magnificPopup !== undefined && $.magnificPopup.instance !== undefined) {
            $.magnificPopup.close();
          }
          $(document.body).trigger('awooc_popup_ajax_trigger', response);
        },
        error: function error(response) {
          if (response.responseJSON) {
            // eslint-disable-next-line no-console
            console.error(response.responseJSON.data);
          }
        }
      });
    },
    initContactForm: function initContactForm() {
      $('.awooc-form-custom-order div.wpcf7 > form').each(function () {
        var version = $(this).find('input[name="_wpcf7_version"]').val();
        var isOldVersion = version.value && version.value <= '5.4';
        if (isOldVersion) {
          var $form = $(this);
          wpcf7.initForm($form);
          if (wpcf7.cached) {
            wpcf7.refill($form);
          }
        } else {
          wpcf7.init(this);
        }
      });
    },
    popup: function popup(e) {
      if ($(this).is('.disabled')) {
        e.preventDefault();
        if ($(this).is('.wc-variation-is-unavailable')) {
          // eslint-disable-next-line no-alert
          window.alert(wc_add_to_cart_variation_params.i18n_unavailable_text);
        } else if ($(this).is('.wc-variation-selection-needed')) {
          // eslint-disable-next-line no-alert
          window.alert(wc_add_to_cart_variation_params.i18n_make_a_selection_text);
        }
        return false;
      }
      $.blockUI({
        message: awooc_scripts_settings.template,
        css: awooc_scripts_settings.popup.css,
        overlayCSS: awooc_scripts_settings.popup.overlay,
        fadeIn: awooc_scripts_settings.popup.fadeIn,
        fadeOut: awooc_scripts_settings.popup.fadeOut,
        focusInput: awooc_scripts_settings.popup.focusInput,
        bindEvents: false,
        timeout: 0,
        allowBodyStretch: true,
        centerX: true,
        centerY: true,
        blockMsgClass: 'blockMsg blockMsgAwooc',
        onBlock: function onBlock() {
          $(document.body).trigger('awooc_popup_open_trigger');
          AWOOC.request(e);
        },
        onUnblock: function onUnblock() {
          $(document.body).trigger('awooc_popup_close_trigger');
        },
        onOverlayClick: function onOverlayClick() {
          $('html').css({
            overflow: 'initial'
          });
        }
      });
    }
  };
  AWOOC.init();
  window.AWOOC = AWOOC;
});
/******/ })()
;
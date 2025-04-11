/******/ (() => { // webpackBootstrap
jQuery(function ($) {
  'use strict';

  /*global awooc_admin */
  var AWOOCADMIN = {
    xhr: false,
    $selectMode: $('#woocommerce_awooc_mode_catalog'),
    analyticData: {},
    init: function init() {
      var _this = this;
      this.getDescription(this.$selectMode, this.$selectMode.val());
      $(document).on('change', '#woocommerce_awooc_mode_catalog', function (event) {
        var selectedValue = $(event.target).val();
        _this.getDescription($(event.target), selectedValue);
      });
    },
    // eslint-disable-next-line camelcase
    getDescription: function getDescription($element, selectedValue) {
      var $description = $element.closest('.forminp-select').find('.description');
      $description.css({
        display: 'block',
        marginTop: '8px',
        maxWidth: '80%'
      });
      /* eslint-disable camelcase */
      var descriptions = {
        dont_show_add_to_card: awooc_admin.mode_catalog,
        show_add_to_card: awooc_admin.mode_normal,
        in_stock_add_to_card: awooc_admin.mode_in_stock,
        no_stock_no_price: awooc_admin.mode_special
      };
      /* eslint-enable camelcase */
      $description.text(descriptions[selectedValue] || '');
    }
  };
  AWOOCADMIN.init();
});
/******/ })()
;
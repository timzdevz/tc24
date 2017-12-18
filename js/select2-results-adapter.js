jQuery(document).ready(function($) {


    $.fn.select2.amd.define('select2/dropdown/selectOnClick', [
        'jquery'
    ], function ($) {
        function SelectOnClick(decorated, $element, options, dataAdapter) {
            decorated.call(this, $element, options, dataAdapter);
        }

        SelectOnClick.prototype.bind = function (decorated, container, $container) {
            var self = this;
            decorated.call(this, container, $container);

            // originally select2 uses mouseup event on dropdown selection
            this.$results.off('mouseup', '.select2-results__option[aria-selected]');

            this.$results.on('click', '.select2-results__option[aria-selected]', function (evt) {
                var $this = $(this);

                var data = $this.data('data');

                if ($this.attr('aria-selected') === 'true') {
                    if (self.options.get('multiple')) {
                        self.trigger('unselect', {
                            originalEvent: evt,
                            data: data
                        });
                    } else {
                        self.trigger('close', {});
                    }

                    return;
                }

                self.trigger('select', {
                    originalEvent: evt,
                    data: data
                });
            });
        };


        return SelectOnClick;
    });

    $.fn.select2.amd.require(
        ["select2/utils", "select2/results", "select2/dropdown/selectOnClick"],
        function (Utils, Results, SelectOnClick) {
            var CustomResultsAdapter = Utils.Decorate(Results, SelectOnClick);

            $('#role').select2({
                minimumResultsForSearch: -1,
                dropdownParent: $('main'),
                resultsAdapter: CustomResultsAdapter
            });
        });
});
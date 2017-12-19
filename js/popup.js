
window.Popup = {
    currentPopup: null,
    popupBg: jQuery('.bg-wrapper'),
    open: function(id) {
        window.event.preventDefault();
        this.currentPopup = jQuery(id);


        this.currentPopup.fadeIn('slow');
        this.popupBg.fadeIn('slow');
    },
    close: function() {
        if (window.isClosing || ! this.currentPopup) {
            return;
        }
        window.isClosing = true;
        this.currentPopup.fadeOut('slow');
        this.popupBg.fadeOut('slow', function() {
            window.isClosing = false;
        });
        this.currentPopup = null;

    },
    __init: function() {
        var that = this;

        $('body').on('click', '.' + this.popupBg[0].className, function(e) {

            if (that.currentPopup != undefined && e.target != that.currentPopup[0] && $(e.target).closest(that.currentPopup[0]).length == 0 ) {
                that.close();
                return false;
            }
        });


        $('body').on('click', '.close-form', function () {
            that.close();
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 27) {
                that.close();
            } // esc
        });
    }
};
Popup.__init();

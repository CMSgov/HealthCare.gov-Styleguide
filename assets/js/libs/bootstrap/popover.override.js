/**
 * The popovers for help text throughout the application need to behave
 * a little differently than the standard Bootstrap popover.
 *
 * We need them to show on hover but not dismiss immediately on mouseout because
 * we want people to be able to click links inside of these hover elements.
 * This is because we want help text to be short and clear but still link to
 * external resources for longer explanations.
 *
 * We're overriding Bootstrap's .leave and .show functions from popover.js to
 * accomplish this. This also means tapping can show/hide on mobile.
 *
 * When you mouseover or click on desktop, the popover shows. You can then:
 * — Mouse out, and the popover will disappear after X ms
 * — Mouse over to the popover, and the popover will stay open (for clicking on links)
 * — Mouse over the popover, read the text for a while, mouse out from the popover, and it will disappear after X ms
 * — Click the highlighted link again and the popover will dismiss (or clicking anywhere outside the popover for that matter)
 *
 * On mobile:
 * — Tapping on the highlighted link will show the popover, tapping it again will dismiss
 *
 * This is based on this example: http://jsfiddle.net/HugeHugh/pN26d/
 */

// make popover stay when hovered
$.fn.popover.originalLeave = $.fn.popover.Constructor.prototype.leave;
$.fn.popover.Constructor.prototype.leave = function(obj){
  var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);

  $.fn.popover.originalLeave.call(this, obj);

  if (obj.currentTarget) {
    var container = $(obj.currentTarget).next('.popover');
    container.one('mouseenter.tooltip.extra', function() {
      self.hoverState = 'in';
      // mouse entered the popover, so cancel the current timer
      clearTimeout(self.timeout);
      // attach events to popover content instead
      container.one('mouseleave.tooltip.extra', function() {
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    })
  }
};

// we often have multiple help popovers on a page, so hide other popovers on show
$.fn.popover.originalShow = $.fn.popover.Constructor.prototype.show;
$.fn.popover.Constructor.prototype.show = function() {
  var thisTip = this.tip();

  $('.popover').not(thisTip).popover('hide');

  if (!thisTip.is(':visible')) {
    $.fn.popover.originalShow.call(this);
  }
}

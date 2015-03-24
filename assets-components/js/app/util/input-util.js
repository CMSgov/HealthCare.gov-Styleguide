define([],
  function() {
    var InputUtil = {
      resetHtml5: function(){
        // Using a more limited definition to reduce the need to
        // test cross-device compatability with html5 inputs
        // if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (!/Android|iPhone|iPad|iPod|BlackBerry/i.test(
            navigator.userAgent)) {
          $('input[type=email]').prop('type', 'text');
          $('input[type=number]').prop('type', 'text');
          $('input[type=tel]').prop('type', 'text');
          $('input[type=url]').prop('type', 'text');
        } else {
          // Number doesn't respect maxlength on iOS so use js.
          $('input[type=number]').on('keydown', function(e){
            var maxlength = $(this).prop('maxlength');
            if (this.value.length >= maxlength) {
              var key = e.charCode || e.keyCode;
              if (key <= 57 && key >= 48){
                e.preventDefault();
              }
            }
          });
        }
      },
      // Takes a formatted number like '$15,000.00' and turns it into a number
      // Useful for saving things to and from inputs so it's moved here
      readFormattedNumber: function(formatted) {
        var parsedValue = formatted.match(/\d*\.?\d+/g);
        return parsedValue ? Number(parsedValue.join('')) : '';
      }
    };
    return InputUtil;
  }
);

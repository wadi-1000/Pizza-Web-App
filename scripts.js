$(document).ready(function() {
  $(".topnav").toggleClass("nav-toggle")
  $('select').change(function() {
    $('#delivery:selected').each(function() {
      $('#deliveryOptions').css('display', 'block');
    });
    $('#pickup:selected').each(function() {
      $('#deliveryOptions').css('display', 'none');
    });
  });

  $('form').on('submit', function(event) {

    event.preventDefault();

    var amount = $('input[name=amount]:checked').val();
    amount = parseFloat(amount);

    var size = $('input[name=size]:checked').val();
    size = parseFloat(size);

    var crust = $('input[name=crust]:checked').val();
    crust = parseFloat(crust);

    var subtotal = size + crust + amount;

    var total = size + crust + amount;

    toppingsOptions = $('input:not(#tip):checkbox:checked').map(function() {
      return this.value;
    }).get();

    var toppingsOptionsTotal = toppingsOptions.reduce(function(a, b) {
      return parseFloat(a) + parseFloat(b);
    }, 0);

    toppingsOptionsTotal = parseFloat(toppingsOptionsTotal);

    subtotal += toppingsOptionsTotal;

    total += toppingsOptionsTotal;

    if ($('#delivery:selected').val()) {
      var delivery = $('#delivery:selected').val();
      delivery = parseFloat(delivery);

      $('#deliveryResult').text('delivery: $' + delivery);

      total += delivery;
    }

    var tax = 0.08;

    var tip = 0;

    if ($('#tip:checked').val()) {
      tip = $('#tip:checked').val();
      tip = parseFloat(tip);
      tip *= total;
      $('#tipResult').text('tip: $' + tip.toFixed(2));
    }

    total += tip;

    tax *= total;

    total += tax;

    console.log('subtotal: ' + subtotal);

    $('#subtotal').text('subtotal: ksh' + subtotal);
    $('#tax').text('tax: ksh' + tax.toFixed(2));
    $('#total').text('total: ksh' + total.toFixed(2));
    $('#streetResult').text($('#street').val());
    $('#cityResult').text($('#city').val());
    $('#zipResult').text($('#zip').val());
    $('#messageResult').text($('#message').val());
    $('#telResult').text($('#tel').val());
    $('#emailResult').text($('#email').val());

    console.log('tip: ' + tip.toFixed(2));

    console.log('tax: ' + tax.toFixed(2));

    console.log('total: ' + total.toFixed(2));

    $('#results').css('display', 'block');

    console.log($('input:checked').parent('label').text());

    $('#order').append($('input:checked').parent('label').text());

  });



});

function myFunction(e){var t=document.getElementById("item-display");t.src=e.src,t.parentElement.style.display="block"}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var cart = [];
        $(function () {
            if (localStorage.cart)
            {
                cart = JSON.parse(localStorage.cart);
                showCart();
            }
        });

        function addToCart(pprice,pname,pqty,pid,pvat,pshipping) {
            var price = pprice.replace(/<strong>/gi, "");
			var price = price.replace(/<b>/gi, "");
            var price = price.replace(/,/gi, "");
            var vat = pvat;
		   var shipping = pshipping;
			var vat = parseFloat(vat);
           var shipping = parseFloat(shipping);
		   var price = parseFloat(price);
            var name = pname;
			var proid = pid;
            var qty = pqty.replace(/\D/g, '');
			

            // update qty if product is already present
            for (var i in cart) {
                if(cart[i].ProID == proid)
                {
                    cart[i].Qty = qty;
                    showCart();
                    saveCart();
                    return;
                }
            }
            // create JavaScript Object
            var item = {ProID: proid,  Vat: vat, Shipping: shipping, Product: name,  Price: price, Qty: qty }; 
            cart.push(item);
            saveCart();
            showCart();
			
        }

        function deleteItem(index){
            cart.splice(index,1); // delete item at index
            showCart();
            saveCart();
          
        }

        function saveCart() {
            if ( window.localStorage)
            {
                localStorage.cart = JSON.stringify(cart);
				
              
            }
        }

        function showCart() {
            $(".cartBody").empty();
          $(".cart_pinfo").empty();
		  var subTotal = 0;
          var grandTotal = 0;
		  var grandVat = 0;
		  var grandShipping = 0;
          var pi = 1;
          var ci = 0;
		  var vi = 0;
            for (var i in cart) {
                var item = cart[i];
				var str = item.Price;
								
if (str == Math.floor(str)) {
var utotal = item.Qty * item.Price;
var utext = utotal+ ".00";
var stext = item.Price+ ".00";
} else {
var utotal = item.Qty * item.Price;
var utext = utotal;
var stext = item.Price;
}
if($('.enablevat').val() == 1){
var vatinv = item.Vat;
var vatin = item.Vat * item.Qty;
var row = "<tr><td class='p-2'><div class='media align-items-center'><div class='media-body'><a href='#' class='d-block text-dark'><b>" + item.Product + "</b></a></div></div></td><td class='text-left font-weight-semibold align-middle p-2'>" + $('.csymbol').html() + numberWithCommas(item.Price.toFixed(2)) + "</td><td class='align-middle p-2'>" + $('.csymbol').html() + numberWithCommas(vatin) + "</td><td class='align-middle p-2'>" + item.Qty + "</td><td class='text-right font-weight-semibold align-middle p-2'>" + $('.csymbol').html() + numberWithCommas(utotal.toFixed(2)) + "</td><td class='text-center align-middle px-0'><a href='#remove' class='shop-tooltip close float-none text-primary' onclick='deleteItem(" + i + ")'>×</a></td></tr>";
}else{
var vatin = parseFloat("0.00");
var vatinv = parseFloat("0.00");
var row = "<tr><td class='p-2'><div class='media align-items-center'><div class='media-body'><a href='#' class='d-block text-dark'><b>" + item.Product + "</b></a></div></div></td><td class='text-left font-weight-semibold align-middle p-2'>" + $('.csymbol').html() + numberWithCommas(item.Price.toFixed(2)) + "</td><td class='align-middle p-2'>" + item.Qty + "</td><td class='text-right font-weight-semibold align-middle p-2'>" + $('.csymbol').html() + numberWithCommas(utotal.toFixed(2)) + "</td><td class='text-center align-middle px-0'><a href='#remove' class='shop-tooltip close float-none text-primary' onclick='deleteItem(" + i + ")'>×</a></td></tr>";
}
if(vi == 0){
	vi = "";
	}else{
	 vi++;
	}
              var paypal = "<input name='tax_"+ pi +"' type='hidden' value='" + numberWithCommas(vatinv) + "'><input type='hidden' name='item_name_"+ pi +"' value='" + item.Product + "'><input type='hidden' name='amount_" + pi + "' value='" + stext + "'><input type='hidden' name='unit_sum_amount_" + pi + "' value='" + utext + "'><input type='hidden' name='quantity_"+ pi +"' value='" + item.Qty + "'>";
			  var carttoserver = "<input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "Vat"+ "]" +"'  value='" + vatin + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "Shipping"+ "]" +"' value='" + item.Shipping * item.Qty + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "item_name"+ "]" +"'  value='" + item.Product + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "amount"+ "]" +"' value='" + stext + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "samount"+ "]" +"' value='" + utext + "'><input type='hidden' name='col" + "[" + pi  + "]" +  "[" + "quantity"+ "]" +"' value='" + item.Qty + "'>";
                $(".cartBody").append(row);
              $(".cart_pinfo").append(paypal);
			  $(".cart_server").append(carttoserver);
              subTotal += item.Qty * item.Price;
			  grandVat += item.Vat * item.Qty;
			  grandShipping += item.Shipping * item.Qty;
              pi++;
              ci++
            }
			if($('.smax').val() !== "0.00" && grandShipping > $('.smax').val()){
			grandShipping = $('.smax').val();
			$('.paypal_shipping').val($('.smax').val());
			}else{
            grandShipping = grandShipping;
			$('.paypal_shipping').val(grandShipping);
			}
			if($('.sfmax').val() !== "0.00" && subTotal > $('.sfmax').val()){
			grandShipping = 0.00;
			$('.paypal_shipping').val(grandShipping);
			}else{
            grandShipping = grandShipping;
			$('.paypal_shipping').val(grandShipping);
			}
			if($('.enablshipping').val() == 2){
			grandShipping = 0.00;
			$('.paypal_shipping').val(grandShipping);	
			}
			if($('.taxu').val() == 1){grandTotal = subTotal + grandVat;}else{grandTotal = subTotal};
          $(".tp").html(numberWithCommas(subTotal.toFixed(2)));
		  $(".vp").html(numberWithCommas(grandVat.toFixed(2)));
		  $(".sp").html(numberWithCommas(grandShipping.toFixed(2)));
		  $(".gtp").html(numberWithCommas(grandTotal.toFixed(2)));
		  $(".ctotal").val(grandTotal.toFixed(2));
          $(".scount").html(ci);
          
        }
$(".add-to-cart").click(function(){
var pprice = $(this).closest(".cart_item").find(".product_price").html();
var pname = $(this).closest(".cart_item").find(".product_name").html();
var pqty = $(this).closest(".cart_item").find(".iqty").val();
var pid = $(this).closest(".cart_item").find(".product_id").html();
var pvat = $(this).closest(".cart_item").find(".product_vat").html();
var pshipping = $(this).closest(".cart_item").find(".product_shipping").html();
addToCart(pprice,pname,pqty,pid,pvat,pshipping);
}); 
    
    
    $(document).ready(function() {
		$('.add-to-cart').click(function(event){
$('#mycartModal').modal('show');
setTimeout(function(){
  $('#mycartModal').modal('hide')
}, 2000);
});
            $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
            $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');
			});
        });
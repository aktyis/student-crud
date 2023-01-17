// $("#category-id").change(function () {
//     var id1 = $(this).val();
//     $.ajax({
//         type: 'GET',
//         url: "api/category-products/" + id1,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         success: function (data) {
//             $("#product-id").empty();
//             var row = `<option value=0 disabled selected>Select a product</option>`;
//             $.each(data , function (i, item) {
//                 row += `<option value="${item.id}"> ${item.name} </option>`;
//
//                 // debugger;
//             });
//             $("#product-id").append(row);
//         },
//         error: function () {
//             alert("error");
//         }
//     });
// });
console.log("hello from wishlist");

$("#depId").change(function () {
    var id1 = $(this).val();
    $.ajax({
        type: 'GET',
        url: "/rest/category-products/" + id1,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        beforeSend: function(){
            $("#loader").show();
        },
        complete: function(){
            $('#loader').hide();
        },
        success: function (data) {
            $("#productId").empty();
            var row = `<option value="" disabled selected>Select a product</option>`;
            $.each(data , function (i, item) {
                row += `<option value="${item.id}"> ${item.name} </option>`;

            });

            $("#productId").append(row);


        },
        error: function () {
            alert("error");
        }
    });
});


$("#productId").change(function () {
    var id1 = $(this).val();
    $.ajax({
        type: 'GET',
        url: "/rest/product/" + id1,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        beforeSend: function(){
            $("#tbody").empty();
            $("#loader1").show();
        },
        complete: function(){
            $('#loader1').hide();
        },
        success: function (data) {
            $("#tbody").empty();

            var row = `<tr> <td>${data.name}</td>
                        <td>${data.price}</td>
                        <td>${data.quantity_per_carton}</td>
                        `;




            var row1='';
            console.log(data.name)
            $.each(data.imagePaths , function (i, item) {
                // console.log(item)
                 row1= row1+ '<td><img src="' + item + '"  style="width: 40px"/></td>'



            });
            console.log(row1)
            var row2 = row+row1+'</tr>';
            $("#tbody").empty();
            $("#qty").empty();
            $("#tbody").append(row2);
            var input= " <div class=\"form-group\">\n" +
                "                <label for=\"inStock\">number of carton</label>\n" +
                "                <input type=\"number\" class=\"form-control\" id=\"inStock\"  name='inStock'  placeholder=\"Number of carton\">\n" +
                "            </div>"
            $("#qty").append(input);

        },
        error: function () {
            alert("error");
        }
    });
});


$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
// $(document).ready(function () {
//
//     $.ajax({
//         url: '/students/getAll',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         success: function (resp) {
//
//             $.each(resp, function (i, item) {
//                 var row = `<tr>
//                             <td>${item.stuId}</td>
//                                  <td>${item.studentName}</td>
//                                  <td>${item.depName}</td>
//                                  <td>${item.batchName}</td>
//                                  <td>
//                                  <button type="submit"class="btn btn-success" data-dismiss="modal"onclick="editStudent(${item.stuId})">Edit Info</button>
//                                  <button type="submit"class="btn btn-danger" data-dismiss="modal"onclick="deleteStudent(${item.stuId})">Delete</button>
//                                   </td>
//                         </tr>`;
//                 $(".table-body").append(row);
//             });
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// })
var userId;
function editStudent(id) {

    $.ajax({
        url: '/department/getOne/'+id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (resp) {
            $("#id").val(resp.id);
            $("#departmentName").val(resp.name);
            $("#editModel").modal('show');

        },
        error: function (err) {
            console.log(err);
        }
    });
}

$(document).ready(function() {

    $.ajax({
        url: '/department/getAll',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (resp) {

            $.each(resp, function (i, item) {
                var row = `<tr>+

                                 <td>${item.id}</td>
                                 <td>${item.name}</td>
                                 <td>
                           <button type="submit"class="btn btn-success" data-dismiss="modal"onclick="editStudent(${item.id})">Edit Info</button>
                                 <button type="submit"class="btn btn-danger" data-dismiss="modal"onclick="deleteStudent(${item.id})">Delete</button>
                       </td>

                        </tr>`;
                $(".table-body").append(row);
            });
        },
        error: function (err) {
            console.log(err);
        }
    });

    $(".form").on('submit', function(e) {
        e.preventDefault();
        var data = JSON.stringify($(this).serializeObject());
        var url = '/department/ajax/save';

        $.ajax({
            data: data,
            url: url,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function(resp) {
                console.log(resp);
                var row = `<tr>
                            <td>${resp.id}</td>
                            <td>${resp.name}</td>
                             <td>
                           <button type="submit"class="btn btn-success" data-dismiss="modal"onclick="editStudent(${item.id})">Edit Info</button>
                                 <button type="submit"class="btn btn-danger" data-dismiss="modal"onclick="deleteStudent(${item.id})">Delete</button>
                       </td>
                            
                        </tr>`;

                $(".table-body").append(row);
                $("input").val("");
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $(".form1").on('submit', function (e) {


        e.preventDefault();
        var data = JSON.stringify($(this).serializeObject());
        var url = '/department/update';

        $.ajax({
            data: data,
            url: url,
            method: 'POST' ,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (resp) {

                $("#editModel").modal('hide');
                $(".table-body tr").remove();
                $.each(resp, function (i, item) {
                    var row = `<tr>

                                 <td>${item.id}</td>
                                 <td>${item.name}</td>
                                 <td>
                           <button type="submit"class="btn btn-success" data-dismiss="modal"onclick="editStudent(${item.id})">Edit Info</button>
                                 <button type="submit"class="btn btn-danger" data-dismiss="modal"onclick="deleteStudent(${item.id})">Delete</button>
                       </td>

                        </tr>`;
                    $(".table-body").append(row);
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    });


    function deleteStudent(id){
        userId = id;
        $("#deleteModal").modal('show');
    }

     /*-----------en of update work-----*/
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
});
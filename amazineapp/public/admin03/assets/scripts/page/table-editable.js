var TableEditable = function () {

    return {

        //main function to initiate the module
        init: function (db,url,index) {

            var oTable = $('#sample_editable_1').dataTable({
                "aLengthMenu": [
                    [5, 15, 20, -1],
                    [5, 15, 20, "All"] // change per page values here
                ],
                // set the initial value
                "iDisplayLength": 15,
                "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                    "sLengthMenu": "_MENU_ 选择几列表示",
                    "sSearch": "検索:",
                    "sInfo": "_TOTAL_ 件中 _START_ 件目 〜 _END_ 件目",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
                },
                "aoColumnDefs": [{
                    'bSortable': false,
                    'aTargets': [index]
                }
                ]
            });
            $('#sample_editable_1 a.edit').live('click', function (e) {
                e.preventDefault();
 					 var nRow = $(this).parents('tr')[0];
					 var aData = oTable.fnGetData(nRow);
					 
                    window.location = url + "?id=" + aData[0];
             });


            $('#sample_editable_1 a.delete').live('click', function (e) {
                e.preventDefault();

                if (confirm("Are you sure to delete this row ?") == false) {
                    return;
                }

				var nRow = $(this).parents('tr')[0];
				var aData = oTable.fnGetData(nRow);

                //  alert(nRow[0].cells[0].innerText);
                var cclass = AV.Object.extend(db);
                var query = new AV.Query(cclass);
                query.get(aData[0], {
                    success: function (obj) {
                        obj.destroy({
                            success: function (obj) {
                                oTable.fnDeleteRow(nRow);
                            },error: function (obj, error) {
								alert("Error: " + error.code + " " + error.message);
                            }
                        });
                    },error: function (object, error) {
						alert("Error: " + error.code + " " + error.message);
                    }
                });
            });
        }
    };

}();


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;

    });
    return vars;
}

console.log("JS resource page was succefully loaded");
var parknum = getUrlVars()["parknum"];

$.ajax({
    url: "api/parkname",
    data : {parknum : parknum},
    type: "POST",
    success: function(data) {
        console.log("Park number looked up is: " + parknum);
        console.log("result recieved from server is : ");
        console.log(data);
        $(".parkname").text(data.currname);
        return parknum;

    },
    error : function(xhr, status, error) {
        alert("An AJAX error occured " + status + " Error " + error);
    }

});


//submit report to the database
$('#create-report-form').submit(function(e){
    e.preventDefault();
    var a = $(this).serializeArray();
    a.push({ name: "parknum", value: parknum});
    //console.log(a);
    a = a.filter(function(item){return item.value != '';});

    $.ajax({
        url: 'api/createreport',
        type: 'POST',
        data: a,
        success: function() {
            $('input[type="text"],textarea').val('');
            $('input[type="checkbox"]').prop('checked', false);
            $(document).ready(function() {
                new $.Zebra_Dialog("The report is successfully submitted!");
            });
        },
        error: function(xhr, status, error) {
            alert("Status test24: " + status + "\nError: " + error);
        }
    });
});
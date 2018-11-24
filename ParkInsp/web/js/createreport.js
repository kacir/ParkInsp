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
    },
    error : function(xhr, status, error) {
        alert("An AJAX error occured " + status + " Error " + error);
    }
});
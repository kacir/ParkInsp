function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

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

//activate the accordion ui feature through jquery UI module
$( function() {
    $( "#accordion" ).accordion();
} );

//fake data for use with d3
var data = [{inspector : "Robert Kacir" , inspDate : "8/5/2018" ,  note1 : "Its windy in this park" , conversion : false , public_acc : true , dataCorr : true , maint : false},
    {inspector : "John Smith" , inspDate : "8/5/2015" ,  note1 : "Its cold in this park" , conversion : true , public_acc : true , dataCorr : false , maint : false}
];

var accordionElement = d3.select("#accordion");

data.forEach(function(report){
    accordionElement.append("h3")
        .text(report.inspDate);

    var sectionDIV = accordionElement.append("div")
        .attr("class" , "past-report-content");

    sectionDIV.append("p")
        .text("Inspector Name :")
        .append("span")
        .text(report.inspector);

    var conversionCheck = sectionDIV.append("p")
        .text("Possible conversion: " )
        .append("input")
        .attr("type" , "checkbox")
        .attr("disabled" , "true");

    if (report.conversion){
        conversionCheck.attr("checked" , "true");
    }

    var dataCorrCheck = sectionDIV.append("p")
        .text("Data Correction: ")
        .append("input")
        .attr("type" , "checkbox")
        .attr("disabled" , "true");

    if (report.dataCorr) {
        dataCorrCheck.attr("checked" , "true");
    }

    var maintCheck = sectionDIV.append("p")
        .text("Maintenance Issue: ")
        .append("input")
        .attr("type" , "checkbox")
        .attr("disabled" , "true");

    if (report.maint) {
        maintCheck.attr("checked" , "true")
    }

    var public_accCheck = sectionDIV.append("p")
        .text("Public Access Issue: ")
        .append("input")
        .attr("type" , "checkbox")
        .attr("disabled" , "true")
        .attr("checked" , report.public_acc);

    if (report.public_acc) {
        public_accCheck.attr('checked' , "true");
    }


    sectionDIV.append("p")
        .text("Notes: ")
        .append("span")
        .text(report.note1);

});
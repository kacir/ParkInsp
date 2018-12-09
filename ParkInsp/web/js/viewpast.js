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
        //console.log("Park number looked up is: " + parknum);
        //console.log("result recieved from server is : ");
        $(".parkname").text(data.currname);
    },
    error : function(xhr, status, error) {
        alert("An AJAX error occured " + status + " Error " + error);
    }
});


// query reports
$(document).ready(function(){
    //setTimeout(function(){
    $.ajax({
        url: 'api/viewpast',
        data : {parknum : parknum},
        type: "POST",
        success: function (reports) {
            successCallback(reports)
        },
        error: function (xhr, status, error) {
            alert("Status: " + status + "\nError: " + error);
        }
    });
    //},1000); // milliseconds
});

function successCallback(reports) {
    //activate the accordion ui feature through jquery UI module
    $( function() {
        $( "#accordion" ).accordion();
    } );
    var accordionElement = d3.select("#accordion");


    reports = JSON.parse(reports);
    console.log(reports);

    if (reports.length >= 1) {
        reports.forEach(function (report) {
            accordionElement.append("h3")
                .text(report.inspdate);

            var sectionDIV = accordionElement.append("div")
                .attr("class", "past-report-content");

            sectionDIV.append("p")
                .style("font-weight","bold")
                .text("Inspector Name: ")
                .append("span")
                .style("font-weight","normal")
                .text(report.inspector);

            var conversionCheck = sectionDIV.append("p")
                .style("font-weight","bold")
                .text("Possible Conversion: ")
                .append("input")
                .attr("type", "checkbox")
                .attr("disabled", "true");

            if (report.conversion) {
                conversionCheck.attr("checked", "true");
            }

            var dataCorrCheck = sectionDIV.append("p")
                .style("font-weight","bold")
                .text("Data Correction: ")
                .append("input")
                .attr("type", "checkbox")
                .attr("disabled", "true");

            if (report.datacorr) {
                dataCorrCheck.attr("checked", "true");
            }

            var maintCheck = sectionDIV.append("p")
                .style("font-weight","bold")
                .text("Maintenance Issue: ")
                .append("input")
                .attr("type", "checkbox")
                .attr("disabled", "true");

            if (report.maint) {
                maintCheck.attr("checked", "true")
            }

            var public_accCheck = sectionDIV.append("p")
                .style("font-weight","bold")
                .text("Public Access Issue: ")
                .append("input")
                .attr("type", "checkbox")
                .attr("disabled", "true")
                .attr("checked", report.public_acc);

            if (report.public_acc) {
                public_accCheck.attr('checked', "true");
            }

            sectionDIV.append("p")
                .style("font-weight","bold")
                .text("Notes: ")
                .append("span")
                .style("font-weight","normal")
                .text(report.note1);

        });
    } else if (reports.length < 1){
        $(document).ready(function() {
            new $.Zebra_Dialog('No prior inspections exist for this park.');
            setTimeout(function(){
                window.location.href = 'index.html'
            },3000); // milliseconds
        });
    }
}
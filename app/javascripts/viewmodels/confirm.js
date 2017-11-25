
var currPoint = 20000;
var amount = 0;
function Dashboad() {
    var self = this;

    self.To = ko.observable();
    self.Amount = ko.observable();
    self.isLoading = ko.observable(false);

    self.Submit = function () {
        if (!Validate())
            return;
        swal({
            title: "Are you sure?",
            text: "Want buy this product!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "Yes, buy it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    swal("Done!", "We'll give your product in 3 days.", "success");
					
					window.location.href = 'dashboad.html';
                } 
            });
    }
}

var modelView = new Dashboad();

ko.applyBindings(modelView, $('.page-content')[0]);

function Validate() {
    if (currPoint < amount) {
        swal("Failed!", "Amount point must be <= " + currPoint + "!", "error");
        return false;
    }

    return true;
}

$(document).ready(function () {
    $("#productName").text($.urlParam("name"));
    $("#price").text($.urlParam("price"));
    amount = $.urlParam("price");

    web3.eth.getBalance("0xf0da26fd490d42cd39e13c36e459b7ee3cd2bd11", function(error, result){
        currPoint = web3.fromWei(result.toString());        
    });    
});
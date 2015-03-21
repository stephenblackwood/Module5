function MenuSelect()

{
    if (document.getElementById("menu").value == "Display Customer List")
    {
        document.getElementById("sectiontop").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Display Order History")
    {
        document.getElementById("sectiontop").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
	document.getElementById("section3").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "Display List of Cusomer Orders")
    {
        document.getElementById("sectiontop").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "visible";
    }

    else
    {
        document.getElementById("sectiontop").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
	document.getElementById("section3").style.visibility = "hidden";
    }
}

//---------------------------------------------------------------------------------------

function GetCustList()

{ 
    var objRequest = new XMLHttpRequest();  //Create AJAX request object

    //Create URL

    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getALLCustomers";
    
    //  url += document.getElementById("custid").value;

    //Checks that the object has returned data

    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        { 
            var output = JSON.parse(objRequest.responseText);
            GenCustList(output);
        }
    }
    
    //Initiate the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

// Display of Data

function GenCustList(result)
{
    var count = 0; 
    // var dispCustList = "";
    var CustListTable = "";
     
    // add table structure to function
    CustListTable += "<table cellpadding = '10' border = '2'>";
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
        // dispCustList += result.GetAllCustomersResult[count].CustomerID + ", " + result.GetAllCustomersResult[count].CompanyName + "," + result.GetAllCustomersResult[count].City +"<br>";
    CustListTable += "<tr>";    
        CustListTable += "<td width= '80'>"+result.GetAllCustomersResult[count].CustomerID+"</td>";
        CustListTable += "<td width='100'>"+result.GetAllCustomersResult[count].CompanyName+"</td>";
        CustListTable += "<td width= '100'>"+result.GetAllCustomersResult[count].City+"</td>";
    CustListTable += "</tr>";
    }
    
    CustListTable += "</table>";
    
    document.getElementById("CustListTable").innerHTML = CustListTable;
}

//---------------------------------------------------------------------------------------


function GetOrderHistory()

{ 
    var objRequest = new XMLHttpRequest();  //Create AJAX request object

    //Create URL and Query string

    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += document.getElementById("custid").value;

    //Checks that the object has returned data

    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        { 
            var output = JSON.parse(objRequest.responseText);
            GenerateOrderHistory(output);
        }
    }
    
    //Initiate the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

// Display of Data

function GenerateOrderHistory(result)
{
    var row = 0; 
    var dispOrderHistory = "";
    
    dispOrderHistory += "<table cellpadding = '10' border = '2'>";
     
    //Loop to extract data from the response object   
    for (row = 0; row < result.length; row ++)
    {
     dispOrderHistory += "<tr>"   
        dispOrderHistory += "<td width='100'>"+result[row].ProductName+"</td>";
        dispOrderHistory += "<td width='100'>"+result[row].Total + "</td>";
    dispOrderHistory += "</tr>";
    }
    
    dispOrderHistory += "</table>";
    
    document.getElementById("OrderHistTable").innerHTML = dispOrderHistory;
}


// ----------------------------------------------------------------------------

function GetFullOrders()

{ 
    var objRequest = new XMLHttpRequest();  //Create AJAX request object

    //Create URL and Query string

    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += document.getElementById("custid").value;

    //Checks that the object has returned data

    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        { 
            var output = JSON.parse(objRequest.responseText);
            GenerateFullShip(output);
        }
    }
    
    //Initiate the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
}

//  Display of Data

function GenerateFullShip(result)
{
    var count = 0; 
    var fullShipOrders = "";
    
    fullShipOrders += "<table cellpadding = '10' border = '2'>";
     
    //Loop to extract data from the response object
    
    for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
    {
     fullShipOrders += "<tr>";   
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].OrderDate + "</td>";
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].OrderID + "</td>";
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td>";
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td>";
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].ShipName + "</td>";
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].ShipPostcode + "</td>";
        fullShipOrders += "<td width='100'>" + result.GetOrdersForCustomerResult[count].ShippedDate + "</td>"; 
     fullShipOrders += "</tr>"; 
    }
    
    fullShipOrders += "</table>";
    
    document.getElementById("fullShipOrdersTable").innerHTML = fullShipOrders;
} 

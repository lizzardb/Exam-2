function GoDark() {
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("section3").style.visibility = "hidden";
    document.getElementById("section4").style.visibility = "hidden";
    document.getElementById("section5").style.visibility = "hidden";
    document.getElementById("section6").style.visibility = "hidden";
}

function OptionsChange()
{
    if (document.getElementById("options").value == "Display the Category List")
    {
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
        document.getElementById("section6").style.visibility = "hidden";
    }
    else if (document.getElementById("options").value == "Add a Product Category")
    {
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
        document.getElementById("section6").style.visibility = "hidden";
    }
    else if (document.getElementById("options").value == "Update a Category Description")
    {
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
        document.getElementById("section6").style.visibility = "hidden";
    }
    else if (document.getElementById("options").value == "Delete a Product Category")
    {
       document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
        document.getElementById("section6").style.visibility = "hidden";
    }
    else if (document.getElementById("options").value == "About Me")
    {
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
        document.getElementById("section6").style.visibility = "visible";
    }
    else
    {
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
        document.getElementById("section6").style.visibility = "hidden";   
    }
}

function DisplayList()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
           var result = JSON.parse(objRequest.responseText);
           OperationResult(result);
        }
    };
    
    objRequest.open("POST",url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    
}

function OperationResult(output)
{
    var count = 0;
    var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
    
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
        displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr><br>";
    }
    
    displaytext += "</table>";
    document.getElementById("result0").innerHTML = displaytext;
}


function AddCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    var cdesc = document.getElementById("catdescript").value;
    var cname = document.getElementById("catname").value;
    
    var newcategory = '{"CName":"' + cname + '","CDescription":"' + cdesc + '"}';
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult1(result);
        }
    };
    
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function OperationResult1(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("resultA").innerHTML = "The operation was successful.";
    }
    else
    {
        document.activeElement("resultA").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function UpdateCategory() {
   var objRequest = new XMLHttpRequest();
   var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
   
   var catid = document.getElementById("catid").value;
   var catdesc = document.getElementById("catdescript2").value;
   
   var parameter = '{"CID":"' + catid + '","CDescription":"' + catdesc +'"}';
   
   objRequest.onreadystatechange = function()
   {
    if (objRequest.readyState == 4 && objRequest.status == 200)
    {
        var result = JSON.parse(objRequest.responseText);
        OperationResult2(result);
    }
   };
   objRequest.open("POST", url, true);
   objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   objRequest.send(parameter);
}

function OperationResult2(output) {
    if (output.WasSuccessful == 1)
    {
        document.getElementById("resultB").innerHTML = "The operation was successful.";
    }
    else
    {
        document.getElementById("resultB").innerHTML - "The operation was not successful" + "<br>" + output.Exception;
    }
}

function DeleteCategory()
{
    var r = confirm("Are you sure you want to delete this category?");
    if (r == true)
    {
        var objRequest = new XMLHttpRequest();
        var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory"
        
        url += document.getElementById("catid").value;
        
       
        
        objRequest.onreadystatechange = function ()
        {
            if (objRequest.readyState == 4 && objRequest.status == 200)
            {
                var result = JSON.parse(objRequest.responseText);
                OperationResult3(result);
            }
        };
        
        objRequest.open("GET", url, true);
        objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objRequest.send();
    }
    
}

function OperationResult3(result)
{
    if (result.DeleteCategoryResult.WasSuccessful == 1)
    {
       document.getElementById("resultC").innerHTML = "The operation was successful.";
    }
    else
    {
        document.getElementById("resultC").innerHTML = "The operation was not a success." + "<br>" + output.Exception;
    }
}
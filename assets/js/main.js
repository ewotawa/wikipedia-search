var endpoint = "https://en.wikipedia.org/w/api.php";
var action = "?action=query";
var list = "&list=search";
var srsearch = "";
var srwhat = "&srwhat=text";
var prop = "&prop=info&prop=extracts";
var format = "&format=json";
var origin = "&origin=*";
var remoteUrlWithOrigin = "";
var queryData = "";
var html = "";

function searchURL() {
    var searchString = $("#searchText").val();
    if (searchString == "") {
        alert("Please enter a search term.");
    } else {
        /* determine URL for request */
        var searchStringArr = searchString.split(" ");
        srsearch = "&srsearch=" + searchStringArr.join("%20");    
        remoteUrlWithOrigin = endpoint + action + list + srsearch + srwhat + prop + format + origin;
        console.log(remoteUrlWithOrigin);                    
    } /*close else*/
} /*close function */

function callAjax() {
    html = "";
    $.ajax( {
        url: remoteUrlWithOrigin,
        data: queryData,
        dataType: 'json',
        type: 'POST',
        headers: { 'Api-User-Agent': 'Example/1.0' },
        success: function(data) {
            console.log(data);
            var resultArr = data.query.search;
            console.log(resultArr);
            
            
          
            for (i = 0; i < resultArr.length; i++) {
                var resTitle = resultArr[i].title;
                var resDesc = resultArr[i].snippet;
                var resTitleArr = resTitle.split(" ");
                var resTitlePath = resTitleArr.join("_");
                var resLink = "https://en.wikipedia.org/wiki/" + resTitlePath;
                /*console.log(resTitle + ", " + resDesc);*/
                html = html + "<div><h3>" + resTitle + "</h3> <p>" + resDesc + " ...</p> <a href=" + resLink + " target=" + "\"" + "_blank" + "\"" + ">Keep Reading</a> <br>";
                console.log(html);
            }; /*close for loop */

            $("#result").html(html);
        } /* close success */
    }); /*close ajax */
}

function searchWiki() {
    searchURL();
    callAjax();
}

function tableInputKeyPress(e) {
    e=e||window.event;
    var key = e.keyCode;
    if (key == 13) {
        searchWiki();
        return false;
    }
}





$(document).ready(function() {

    $("#search").click(function() {
        searchWiki();
    });

    $(".reset").bind("click", function() {
        $("input[type=text], textarea").val("");
        html = "";
        $("#result").html(html);
    });
  
    $("#random").click(function() {
      var win = window.open('https://en.wikipedia.org/wiki/Special:Random');
      if (win) {
        //Browser has allowed it to be opened
        win.focus();
      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    });

});




/* http://lupecamacho.com/wikipedia-viewer-wikipedia-api-cross-origin-request-issues/ */
/* https://forums.asp.net/t/1911202.aspx?How+to+prevent+form+refresh+from+press+enter+key+in+a+textbox+ */
/* https://stackoverflow.com/questions/19851782/how-to-open-a-url-in-a-new-tab-using-javascript-or-jquery */
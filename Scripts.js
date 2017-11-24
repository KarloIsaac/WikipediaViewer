function openRandomArticleLink() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}


function retrieveJsonQueryResult(searchTerm) {
    var requestUrl = ("https://en.wikipedia.org/w/api.php?action=query" +
            "&list=search&format=json&srlimit=500&origin=*&srsearch=");
    requestUrl += encodeURIComponent(searchTerm);
    var jsonResponse = requestUrl;
    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange  = function() {
        if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
            jsonResponse = JSON.parse(xmlHttpRequest.responseText);
            console.log(jsonResponse);
            processResults(jsonResponse.query.search)
        }
    }
    xmlHttpRequest.open("GET", requestUrl, true);
    xmlHttpRequest.send();
}


function processResults(resultsArray) {
    for(i = 0 ; i < resultsArray.length ; i++) {
        pageInformation = resultsArray[i];
        console.log(pageInformation.pageid);
    }
}

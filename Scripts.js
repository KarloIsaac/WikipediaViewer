function openRandomArticleLink() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}


function retrieveJsonQueryResult(searchTerm) {
    var requestUrl = ("https://en.wikipedia.org/w/api.php?action=query" +
            "&list=search&format=json&srlimit=5&origin=*&srsearch=");
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
    var body = document.getElementsByTagName("body")[0];
    for(i = 0 ; i < resultsArray.length ; i++) {
        pageInformation = resultsArray[i];
        resultFrame = buildResultFrame(pageInformation);
        body.appendChild(resultFrame);
    }
}


function buildResultFrame(pageInformation) {
    var pageLink = "https://en.wikipedia.org/?curid=" + pageInformation.pageid;

    var titleSection = document.createElement("h2");
    titleSection.innerHTML = pageInformation.title;

    var informationSection = document.createElement("p");
    informationSection.class = "information-section";
    informationSection.innerHTML = pageInformation.snippet;

    var resultFrame = document.createElement("div");
    resultFrame.appendChild(titleSection);
    resultFrame.appendChild(informationSection);
    resultFrame.class = "result-frame";
    return resultFrame;
}

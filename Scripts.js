function openRandomArticleLink() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}


function requestSearch() {
    var searchTerm = document.getElementById("search-input").value;
    if (searchTerm === "") {
        alert("You must write some term to look for");
        return;
    }
    retrieveJsonQueryResult(searchTerm);
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
            processResults(jsonResponse.query.search)
        }
    }
    xmlHttpRequest.open("GET", requestUrl, true);
    xmlHttpRequest.send();
}


function processResults(resultsArray) {
    var resultsBrowser = document.getElementById("results-browser");
    resultsBrowser.innerHTML = "";
    for(i = 0 ; i < resultsArray.length ; i++) {
        pageInformation = resultsArray[i];
        resultFrame = buildResultFrame(pageInformation);
        resultsBrowser.appendChild(resultFrame);
    }
}


function buildResultFrame(pageInformation) {
    var titleSection = document.createElement("h3");
    titleSection.innerHTML = pageInformation.title + "&nbsp";
    titleSection.appendChild(buildAnchorElement(pageInformation.pageid));

    var informationSection = document.createElement("p");
    informationSection.class = "information-section";
    informationSection.innerHTML = pageInformation.snippet;

    var resultFrame = document.createElement("div");
    resultFrame.appendChild(titleSection);
    resultFrame.appendChild(informationSection);
    resultFrame.class = "result-frame";
    return resultFrame;
}


function buildAnchorElement(pageId) {
    var pageLink = "https://en.wikipedia.org/?curid=" + pageId;

    var image = document.createElement("img");
    image.src = "https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/share2-16.png";
    image.alt = "go"
    image.title = "open link";

    var anchor = document.createElement("a");
    anchor.href = pageLink;
    anchor.target = "_blank";
    anchor.appendChild(image);
    return anchor;
}

"use strict";

// Format: https://api.github.com/repos/{owner}/{repo}/issues/
var GITHUB_ISSUES_LINK = "https://api.github.com/repos/landmrk/mrkr-db/issues/";
var PATH_SEGMENTS_TO_SKIP = 0;
var HOST = "mrkr.me"; // Ping collection endpoint here

var referral = document.referrer;
var headers = new Headers();
headers.append("Content-Type", "application/json");
var body = {
  "name": "Princess Leia"
};
var options = {
  method: "POST",
  headers: headers,
  mode: "cors",
  body: JSON.stringify(body)
};
fetch("https://enokmjxolgpq.x.pipedream.net/", options);
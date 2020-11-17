"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function isUrl(url) {
  // Regex from https://stackoverflow.com/a/3809435
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
}

(function () {
  var _redirect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var location, issueNumber, referral, headers, body, options, homepage, response, payload, message, title, url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            location = window.location;
            issueNumber = location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP + 1]; // Ping collection endpoint here

            referral = document.referrer;
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            body = {
              "name": "Princess Leia"
            };
            options = {
              method: "POST",
              headers: headers,
              mode: "cors",
              body: JSON.stringify(body)
            };
            fetch("https://enokmjxolgpq.x.pipedream.net/", options);
            homepage = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/" + location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP];
            _context.prev = 9;
            _context.next = 12;
            return fetch(GITHUB_ISSUES_LINK + issueNumber);

          case 12:
            response = _context.sent;

            if (!(response.status !== 200)) {
              _context.next = 16;
              break;
            }

            location.replace(homepage);
            return _context.abrupt("return");

          case 16:
            _context.next = 18;
            return response.json();

          case 18:
            payload = _context.sent;
            message = payload.message, title = payload.title;

            if (message === "Not Found") {
              // issueNumber does not exist in gh issues
              location.replace(homepage);
            } else if (!title || !isUrl(title)) {
              location.replace(homepage);
            } else {
              url = new URL(title);

              if (url.protocol !== "https:" && url.protocol !== "http:" || url.host === HOST) {
                // Prevent recursive redirects and XSS
                location.replace(homepage);
              } else {
                location.replace(title);
              }
            }

            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](9);
            location.replace(homepage);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 23]]);
  }));

  function redirect() {
    return _redirect.apply(this, arguments);
  }

  return redirect;
})()();
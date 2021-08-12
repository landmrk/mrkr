"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function isUrl(url) {
  // Regex from https://stackoverflow.com/a/3809435
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
}

(function () {
  var _redirect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var location, refer, issueNumber, homepage, response, payload, message, title, url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            location = window.location;
            refer = document.referrer;
//             fetch("https://enokmjxolgpq.x.pipedream.net/?refer=".concat(refer));
            issueNumber = location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP + 1];
            homepage = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + "/" + location.pathname.split("/")[PATH_SEGMENTS_TO_SKIP];
            _context.prev = 5;
            _context.next = 8;
            return fetch(GITHUB_ISSUES_LINK + issueNumber);

          case 8:
            response = _context.sent;

            if (!(response.status !== 200)) {
              _context.next = 12;
              break;
            }

            location.replace(homepage);
            return _context.abrupt("return");

          case 12:
            _context.next = 14;
            return response.json();

          case 14:
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

            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](5);
            location.replace(homepage);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 19]]);
  }));

  function redirect() {
    return _redirect.apply(this, arguments);
  }

  return redirect;
})()();

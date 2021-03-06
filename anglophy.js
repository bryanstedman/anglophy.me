/*!
 * Anglophy.js v1.0.0
 * http://anglophy.me
 *
 * Copyright 2015 Bryan Stedman
 * http://bryanstedman.com, @bryanstedman
 * Released under the MIT license
 *
 * Date: 2015-02-18
 */

var queryString = function queryString() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
    return query_string;
} ();

window.onload = function () {
  if (queryString.en == "uk") {
    $.getJSON('http://anglophy.me/phrases.json', function(data) {
      function htmlreplace(a, element) {
        if (!element) element = document.body;
        var nodes = element.childNodes;
        for (var n=0; n<nodes.length; n++) {
          if (nodes[n].nodeType == Node.TEXT_NODE) {
            for (var key in a) {
              var r = new RegExp('\\b'+key+'\\b', 'g');
              nodes[n].textContent = nodes[n].textContent.replace(r, a[key]);
            }
          } else {
            htmlreplace(a, nodes[n]);
          }
        }
      }
      htmlreplace(data);
    });
  }
  if (queryString.en == "us" || queryString.en == "simplified") {
    $.getJSON('http://anglophy.me/phrases.json', function(data) {
      function htmlreplace(a, element) {
        if (!element) element = document.body;
        var nodes = element.childNodes;
        for (var n=0; n<nodes.length; n++) {
          if (nodes[n].nodeType == Node.TEXT_NODE) {
            for (var key in a) {
              var r = new RegExp('\\b'+a[key]+'\\b', 'g');
              nodes[n].textContent = nodes[n].textContent.replace(r, key);
            }
          } else {
            htmlreplace(a, nodes[n]);
          }
        }
      }
      htmlreplace(data);
    });
  }
};

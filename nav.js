/*
  Shared site nav. Each page has a `<div id="nav" data-current="...">` where
  the nav used to be hardcoded. This script infers its own path depth from
  the <script src> that loaded it, so the same file works from the root and
  from any one-level-deep section folder.

  Publishing bots never touch this — they only ever write list/body content
  above the "NEW-WRITEUP-HERE" markers in each section's index.html.
*/
(function () {
  var target = document.getElementById('nav');
  if (!target) return;

  var script = document.currentScript;
  var src = script.getAttribute('src') || '';
  var prefix = src.slice(0, src.lastIndexOf('nav.js'));
  var current = target.getAttribute('data-current') || '';

  var sections = [
    ['writeups', 'Writeups'],
    ['portfolio', 'Portfolio'],
    ['blog', 'Blog'],
    ['videos', 'Videos']
  ];

  var html = sections.map(function (s) {
    var key = s[0], label = s[1];
    if (key === current) {
      return '<a href="index.html" class="current">' + label + '</a>';
    }
    return '<a href="' + prefix + key + '/">' + label + '</a>';
  }).join('');

  target.outerHTML = '<nav class="site-nav">' + html + '</nav>';
})();

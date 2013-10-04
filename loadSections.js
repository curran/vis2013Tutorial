// This script loads and parses Markdown files
// in the `md` directory based on the listing
// in `sections.json`, then injects the content
// into the div with id "sections".

function loadSection (name, callback) {
  var spacer = '<div class="spacer"></div>';
  $.get('md/' + name + '.md', function (data) {
    callback(null, spacer + marked(data));
  });
}

function loadSections (names) {
  async.map(names, loadSection, function (err, results) {
    $('#sections').html(results.join(''));
  });
}

$.getJSON('sections.json', loadSections);

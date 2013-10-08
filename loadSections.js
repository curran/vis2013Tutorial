// This script loads and parses Markdown files
// in the `md` directory based on the listing
// in `sections.json`, then injects the content
// into the div with id "sections".

(function () {
  var spacer = '<div class="spacer"></div>';

  function loadExample (name, callback) {
    $.get('examples/' + name + '.html', function (data) {
      callback(null, data);
    });
  }

  function loadSection (section, callback) {
    $.get('md/' + section + '.md', function (data) {
      callback(null, spacer + marked(data));
    });
  }

  function loadSections (sections) {
    async.map(sections, loadSection, function (err, results) {
      $('#sections').html(results.join(''));
    });
  }

  $.getJSON('sections.json', loadSections);
}());

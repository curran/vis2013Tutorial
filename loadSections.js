// This script loads and parses Markdown files
// in the `md` directory based on the listing
// in `sections.json`, then injects the content
// into the div with id "sections".

(function () {
  var spacer = '<div class="spacer"></div>';

//  function ide (html) {
//    return [
//      '<iframe class="ide" src="ide.html#',
//      encodeURIComponent(html),
//      '"></iframe>'
//    ].join('');
//  }

  function loadExample (name, callback) {
    $.get('examples/' + name + '.html', function (data) {
      callback(null, data);
    });
  }

  function loadSection (section, callback) {
    $.get('md/' + section.name + '.md', function (data) {
      var html = spacer + marked(data);
//      if (section.examples) {
//        async.map(section.examples, loadExample, function (err, results) {
//          callback(null, html + results.map(ide));
//        });
//      } else {
      callback(null, html);
//      }
    });
  }

  function loadSections (sections) {
    async.map(sections, loadSection, function (err, results) {
      $('#sections').html(results.join(''));
    });
  }

  $.getJSON('sections.json', loadSections);
}());

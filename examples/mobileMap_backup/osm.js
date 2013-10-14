/**
 * This script provides a high-level API for querying OpenStreetMap.
 * The Overpass API is used, and the resulting XML is
 * simplified to a JSON structure containing only the
 * useful essence of the data: an array of objects
 * each having the properties:
 *
 *  * lat - latitude
 *  * lng - longitude
 *  * tags - an array of objects each having the properties:
 *    * k - the key of the OSM tag
 *    * v - the value of the OSM tag
 *
 * Curran 10/13/2013
 *
 */
var osm = (function(){
  var apiURL = 'http://overpass-api.de/api/interpreter';

  /* These functions distill the XML structure. */
  function isTag(child) {
    return child.nodeName === 'tag';
  }
  function isTagged(entry) {
    return _.some(entry.children, isTag);
  }
  function isNode(entry) {
    return entry.nodeName === 'node';
  }
  function extractTaggedNodes(entries) {
    return _.filter(entries, function (entry) {
      return isNode(entry) && isTagged(entry);
    });
  }
  
  /* These functions transform the useful XML data
     into a simpler JavaScript object structure. */
  function filterTags(children) {
    return _.filter(children, isTag);
  }
  function extractTags(children) {
    var tags = filterTags(children);
    return _.map(tags, function (tag) {
      return {
        k: tag.getAttribute('k'),
        v: tag.getAttribute('v')
      };
    });
  }
  function extractTaggedNode(node) {
    return {
      lat: node.getAttribute('lat'),
      lng: node.getAttribute('lon'),
      tags: extractTags(node.children)
    };
  }
  function extractUsefulData (taggedNodes) {
    return _.map(taggedNodes, extractTaggedNode);
  }
  
  /* This function ties all the above together. */
  function transformResults (xml) {
    var entries = xml.childNodes[0].childNodes,
        taggedNodes = extractTaggedNodes(entries);
    return extractUsefulData(taggedNodes);
  }

  /**
   * Generates the OSM query string from the given
   * geographic bounds. See http://wiki.openstreetmap.org/wiki/Overpass_API
   */
  function genQuery(minLat, minLng, maxLat, maxLng) {
    var bbox = [minLat, minLng, maxLat, maxLng].join(',');
    return '(node(' + bbox + ');<;);out;';
  }

  return {
    query: function (minLat, minLng, maxLat, maxLng, callback) {
      var query = genQuery(minLat, minLng, maxLat, maxLng);
      $.post(apiURL, query, function (xml) {
        callback(transformResults(xml));
      });  
    }
  };
}());

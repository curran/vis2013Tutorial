# My work at Rapid7

 * In production inside [UserInsight](http://www.rapid7.com/products/user-insight/)
 * Build using D3 and Leaflet (see [report](https://github.com/curran/portfolio/blob/gh-pages/2013/UserInsightIngressDashboard.pdf?raw=true))

<img id="r7"/>
<script>
(function () {
  var img = document.getElementById('r7'), i = 1;
  setInterval(function () {
    img.setAttribute('src', 'images/mapDocs' + i + '.png');
    console.log(i);
    i = (i % 10) + 1;
    i = i === 2 ? 3 : i; // skip 2
  }, 3000);
}());
</script>

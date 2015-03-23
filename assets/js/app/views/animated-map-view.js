define([
  'topojson',
  'common/constants'
], function(
  topojson,
  Constants
) {
  /**
   * Renders the D3 map of US states that zooms in on state selection. Based on
   * http://bl.ocks.org/mbostock/2206590
   *
   * This expects d3 to be loaded into global scope.
   */
  var AnimatedMapView = Backbone.View.extend({
    initialize: function(options) {
      // A map of state code to a D3 datum.
      this.stateDatumMap = {};

      this.svg = null;
      this.svgGroup = null;
      this.centered = null;
      this.path = null;

      this.listenTo(this.model, 'change:coverageState', this._onStateChange);
    },

    render: function() {
      // See http://bost.ocks.org/mike/map/ for a fantastic tutorial of how all
      // this D3 map-drawing works.

      var self = this;
      var width = this.$el.width();
      var height = this.$el.height();

      // Use the Albers USA geographic projection that includes Alaska and
      // Hawaii. See github.com/mbostock/d3/wiki/Geo-Projections#wiki-albersUsa
      var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

      this.path = d3.geo.path().projection(projection);

      this.svg = d3.select(this.el).append('svg')
        .attr('width', '100%')
        .attr('height', '100%');

      this.svgGroup = this.svg.append('g');

      // Fetch data of US state geometries encoded in TopoJSON, which is
      // a compressed format for geographic shapes and borders.
      d3.json(Constants.STATIC_ROOT + 'data/us-states-topo.json',
          function(error, us) {
        // Draw the fills of each state.
        self.svgGroup.append('g')
          .attr('class', 'states')
          .selectAll('path')
            .data(topojson.object(us, us.objects['us-states']).geometries)
          .enter().append('path')
          .attr('d', self.path)
          .each(function(stateDatum) {
            self.stateDatumMap[stateDatum.properties.name] = stateDatum;
          });

        // Draw just the interior borders of states -- borders shared by
        // two states, as opposed to coastlines.
        // See github.com/mbostock/topojson/wiki/API-Reference#wiki-mesh
        self.svgGroup.append('path')
          .datum(topojson.mesh(us, us.objects['us-states'], function(a, b) {
            return a !== b;
          }))
          .attr('class', 'state-borders')
          .attr('d', self.path);

        self._onStateChange(
            self.model, self.model.get('coverageState'),
            {skipAnimation: true});
        self.$el.addClass('animated');
      });

    },

    _zoomToState: function(stateDatum, opt_skipAnimation) {
      this.centered = stateDatum;
      var centroid = this.path.centroid(stateDatum);
      this._zoomToPoint(
          centroid[0], centroid[1], /* scale: */ 4, opt_skipAnimation);
    },

    _zoomOut: function() {
      this.centered = null;
      var width = this.$el.width();
      var height = this.$el.height();
      this._zoomToPoint(width / 2, height / 2, /* scale: */ 1);
    },

    _zoomToPoint: function(x, y, scale, opt_skipAnimation) {
      var width = this.$el.width();
      var height = this.$el.height();
      var self = this;

      this.svgGroup.selectAll('path')
        .classed('active', function(d) { return d === self.centered; });

      var translate1 = 'translate(' + (width / 2) + ',' + (height / 2) + ')';
      var scale1 = 'scale(' + scale + ')';
      var translate2 = 'translate(' + -x + ',' + -y + ')';

      var duration = !!opt_skipAnimation ? 0 : 750;
      this.svgGroup.transition()
        .duration(duration)
        .attr('transform', translate1 + scale1 + translate2)
        .style('stroke-width', (1.5 / scale) + 'px');
    },

    _onStateChange: function(model, state, options) {
      var stateDatum = this.stateDatumMap[state];

      _.delay(_.bind(function() {
        if (stateDatum) {
          this._zoomToState(stateDatum, !!options.skipAnimation);
        } else {
          this._zoomOut();
        }

        this.$el.toggleClass('zoomed', !!stateDatum);
      }, this));
    }
  });

  return AnimatedMapView;

});

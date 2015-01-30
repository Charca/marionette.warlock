var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

Marionette.Warlock = (function(Backbone, Marionette, $, _) {
  var Warlock = Marionette.Object.extend({
    currentStep: 0,

    initialize: function(options) {
      this.layout = new this.layout({
        form: this
      });

      if(options.step) {
        this.currentStep = options.step - 1;
      }

      this.on('form:next', _.bind(this.next, this));
      this.on('form:prev', _.bind(this.prev, this));

      this.layout.on('show', _.bind(this.onShow, this));
    },

    onShow: function() {
      this.showStep();
    },

    showStep: function() {
      var stepView = this.steps[this.currentStep];
      this.layout.getRegion('content').show(new stepView());
    },

    next: function() {
      this.currentStep += 1;
      this.showStep();
    },

    prev: function() {
      this.currentStep -= 1;
      this.showStep();
    }
  });

  return Warlock;
})(Backbone, Marionette, $, _);

module.exports = Marionette.Warlock;

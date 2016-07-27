
  var app = app || {};

  // Item Model
  // ----------
  // Our basic **Item** model has `title` and `price` attributes.

  app.Item = Backbone.Model.extend({

    // Default attributes ensure that each item created has `title` and `price` keys.
    defaults: {
      title: 'Product',
      price: 0,
      bought: false
    },

// Toggle the `bought` state of this item.
    toggle: function() {
      this.save({
        bought: !this.get('bought')
      });
    }

  });

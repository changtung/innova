// js/collections/items.js

  var app = app || {};

  // Item Collection
  // ---------------

  // The collection of items is backed by *localStorage* instead of a remote
  // server.
  var ItemList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.Item,

    // Save all of the item items under the `"items-backbone"` namespace.
    localStorage: new Backbone.LocalStorage('items-backbone'),

    // Filter down the list of all item items that are bought.
    bought: function() {
      return this.filter(function( item ) {
        return item.get('bought');
      });
    },

    // Filter down the list to only todo items that are still not bought.
    remaining: function() {
      return this.without.apply( this, this.bought() );
    },

    // We keep the Items in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // Items are sorted by their original insertion order.
    comparator: function( item ) {
      return item.get('order');
    }
  });

  // Create our global collection of **Todos**.
  app.Items = new ItemList();


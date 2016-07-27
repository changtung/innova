 var app = app || {};

  // Item View
  // --------------

  // The DOM element for a item...
  app.ItemView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template( $('#item-template').html() ),

   // template-basket: _.template( $('#item-basket-template').html() ),

    // The DOM events specific to an item.
    events: {
      'click .buy': 'buyItem'
    },

    // The ItemView listens for changes to its model, re-rendering. Since theres
    // a one-to-one correspondence between a **Item** and a **ItemView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-renders the titles and price of the item.
    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      return this;
    },
	buyItem: function(){
		this.model.toggle();
	}
  });

 // The DOM element for a item...
  app.ItemBasketView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template( $('#item-basket-template').html() ),

   // template-basket: _.template( $('#item-basket-template').html() ),

    // The DOM events specific to an item.
    events: {
      'click .remove': 'removeItem'
    },

    // The ItemView listens for changes to its model, re-rendering. Since theres
    // a one-to-one correspondence between a **Item** and a **ItemView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    // Re-renders the titles and price of the item.
    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      return this;
    },
	removeItem: function(){
		app.Items.remove(this.model.id);
	}
  });

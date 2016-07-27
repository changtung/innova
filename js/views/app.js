var app = app || {};

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#itemapp',

    // Our template for the line of statistics at the bottom of the app.
    sumTemplate: _.template( $('#sum-template').html() ),

    // Delegated events for creating new items
    events: {
      'click #add-item': 'createOnEnter'
    },

    // At initialization we bind to the relevant events on the `Items`
    // collection, when items are added or changed.
    initialize: function() {
      this.$inputtitle = this.$('#new-item-title');
      this.$inputprice = this.$('#new-item-price');

      this.$basketstats = this.$('#basketstats');
      this.$main = this.$('#main');
      this.$second = this.$('#second');

      this.listenTo(app.Items, 'add', this.addOne);
	  this.listenTo(app.Items, 'change', this.addOneBasket);
	  this.listenTo(app.Items, 'remove reset', this.renderEmpty);
	  this.listenTo(app.Items, 'remove', this.addAllBasket);
    },
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var bought = app.Items.bought().length;
      var remaining = app.Items.remaining().length;

        this.$main.show();
        this.$second.show();
        this.$basketstats.show();

        this.$basketstats.html(this.sumTemplate({
          sum: this.sumBasket(),
		  count: bought
        }));
    },
	sumBasket: function(){
	var sum = parseFloat(0);
app.Items.each(function(item){ 
	if ( JSON.parse(JSON.stringify(item)).bought == true )
sum += parseFloat(JSON.parse(JSON.stringify(item)).price)});
	return sum;
},
    // Add a single item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( item ) {
	var bought = JSON.parse(JSON.stringify(item)).bought;
	  if ( bought == false ) {
      		var view = new app.ItemView({ model: item });
      		$('#item-list').append( view.render().el );
		}
       },

   addOneBasket: function( item ) {
	var bought = JSON.parse(JSON.stringify(item)).bought;
	  if ( bought == true ) {
      		var view = new app.ItemBasketView({ model: item });
      		$('#item-list-basket').append( view.render().el );
			//app.Items.remove(item.id);
			this.addAll();
			this.render();
		}
    },
    // Add all items in the **Items** collection at once.
    addAll: function() {
      this.$('#item-list').html('');
      app.Items.each(this.addOne, this);
    },
    renderEmpty: function(){
	  this.render();
},
	addAllBasket: function() {
      this.$('#item-list-basket').html('');
      app.Items.each(this.addOneBasket, this);
    },
    // Generate the attributes for a new item.
    newAttributes: function() {
      return {
        title: this.$inputtitle.val().trim(),
        price: this.$inputprice.val().trim(),
        order: app.Items.nextOrder(),
        bought: false
      };
    },
    // If you hit return in the main input field, create new Item model,
    // persisting it to localStorage.
    createOnEnter: function( event ) {
      app.Items.create( this.newAttributes() );
    }
  });

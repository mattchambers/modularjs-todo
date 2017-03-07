
	var tasks = {
	tasks: ['Walk the dog', 'Clean garage'],
	init: function() {
		this.cacheDom();
		this.bindEvents();
		this.render();
	},
	cacheDom: function(){
		this.$el = $('#taskModule');
		/*the reason why this is $el and not el is to show
		 that its jQuery select

		 with the $el object, I'm selecting the id, taskModule
		 and giving myself the ability to select everything
		 inside this element. As seen below.

		 By caching all these dom elements in this manner where
		 I select the parent and select the children with el and
		 use el to find specific elements in el, I follow the Modular
		 rule of not reapeating myself(DRY [dont repeat yourself]code)
		 */
		this.$button = this.$el.find('button');
		this.$input = this. $el.find('input');
		this.$ul = this.$el.find('ul');
		this.template = this.$el.find('#task-template').html();
		/*template has no $ because its just an HTML string,
		not using jQuery selectors*/ 
	},

	bindEvents: function(){

		this.$button.on('click', this.addTask.bind(this));
		/*We could have written the addTask function
		in the above statement but its best practice to call
		rather than state in an event listener

		In Modular JS when working with event listeners like 
		above, we have to bind this to the function we want to
		call on the event because this in a event listener refers
		to the event action which is click in this case rather 
		when this should be the moodule itself*/

		this.$ul.delegate('.del', 'click', this.deleteTask.bind(this))
	},

	render: function(){
		/*
		the render function is responsible for taking
		the current state of the Module which in this case
		is tasks and commit to HTML dom that is calling it*/

		var data = {
			tasks: this.tasks,
		};

		this.$ul.html(Mustache.render(this.template, data));
	},
	addTask: function(){
		/*this adds tasks by binding to input 
		then, rendering the value to the data array
		then, empties the input field when done*/
		this.tasks.push(this.$input.val());
		this.render();
		this.$input.val('');
	},
	deleteTask: function(event){
		var $remove = $(event.target).closest('li');
		var i = this.$ul.find('li').index($remove);

		this.tasks.splice(i, 1);
		this.render();
	}
};

	tasks.init();


 
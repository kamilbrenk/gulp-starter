import './plugins';
import Backbone from 'backbone';
import template from './body.hbs';

var Person = Backbone.Model.extend({
    defaults: {
        'action': 'Say hello!'
    },

    initialize: function(){
        this.on('change:name', this.onChange, this);
    },

    onChange: function(model) {
        Backbone.$(document.body).html(template(model.toJSON()));
    }
});

var person = new Person();
person.set('name', 'Kamil');

setTimeout(function() {
    person.set('name', 'master');
}, 2000);
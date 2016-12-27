var app = new Vue({
    el : '#app',
    data : {
        message : 'hello Vue!'
    }
})
var app2 = new Vue({
    el : '#app2',
    data : {
        message : 'You loaded this page on ' + new Date()
    }
})
var app3 = new Vue({
    el : '#app3',
    data : {
        seen : true
    }
})
var app4 = new Vue({
    el : '#app4',
    data : {
        todos : [
            {text : 'first'},
            {text : 'second'},
            {text : 'third'}
        ]
    }
})
var app5 = new Vue({
    el : '#app5',
    data : {
        message : '123456789'
    },
    methods : {
        reverseMessage : function(){
            this.message = this.message.split('').reverse().join('')
        }
    }
})
var app6 =new Vue({
    el : '#app6',
    data : {
        message : 'hello world'
    }
})
Vue.component('todo-item',{
    props : ['todo'],
    template : '<li>{{todo.text}}</li>'
})
var app7 = new Vue({
    el : '#app7',
    data : {
        groceryList : [
            {text : 'Vegetables'},
            {text : 'Cheese'},
            {text : 'banana'}
        ]
    }
})
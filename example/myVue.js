// 单选、判断题模型
Vue.component('single-answer',{
    props: ['todo'],
    template : 
    '<div v-bind:id="todo.questionId" v-bind:class="todo.class">'+
        '<div class="weui-cells__title">{{todo.title}}</div>'+
        '<div class="weui-cells weui-cells_radio">'+
            '<label class="weui-cell weui-check__label" v-for="(item, index) in todo.option">'+
                '<div class="weui-cell__bd" v-on:click="chang(index)">'+
                    '<p>{{item.value}}</p>'+
                '</div>'+
                '<div class="weui-cell__ft">'+
                    '<input type="radio" class="weui-check" v-bind:name="todo.questionId" v-bind:checked="item.check">'+
                    '<span class="weui-icon-checked"></span>'+
                '</div>'+
            '</label>'+
        '</div>'+
    '</div>',
    methods : {
        chang : function(index){
            this.$emit('chang',index,'radio');
        }
    }
})
// 单选、判断题模型结束
// 多选题模型
Vue.component('muti-choice',{
    props:['todo'],
    template :
    '<div v-bind:id="todo.questionId" v-bind:class="todo.class">'+
        '<div class="weui-cells__title">{{todo.title}}</div>'+
        '<div class="weui-cells weui-cells_checkbox">'+
            '<label class="weui-cell weui-check__label" v-for="(item, index) in todo.option">'+
                '<div class="weui-cell__hd" v-on:click="chang(index)">'+
                    '<input type="checkbox" class="weui-check" v-bind:name="todo.questionId" v-bind:checked="item.check">'+
                    '<i class="weui-icon-checked"></i>'+
                '</div>'+
                '<div class="weui-cell__bd">'+
                    '<p>{{item.value}}</p>'+
                '</div>'+
            '</label>'+
        '</div>'+
    '</div>',
    methods : {
        chang : function(index){
            this.$emit('chang',index,'checkbox');
        }
    }
})
// 多选题模型结束
// 填空、简答题模型
Vue.component('fill-blanks',{
    props:['todo'],
    template :
    '<div v-bind:id="todo.questionId" v-bind:class="todo.class">'+
        '<div class="weui-cells__title">{{todo.title}}</div>'+
        '<div class="weui-cells weui-cells_form" v-for="(item, index) in todo.option">'+
            '<div class="weui-cell">'+
                '<div class="weui-cell__bd">'+
                    '<textarea class="weui-textarea" placeholder="请输入答案" rows="3" v-on:input="chang(index,$event.target.value)">{{item.value}}</textarea>'+
                    '<div class="weui-textarea-counter"><span>({{index+1}})</span></div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>',
    methods : {
        chang : function(index,value){
            this.$emit('chang',index,'textarea',value);
        }
    }
})
// 填空、简答题模型结束

/*
{
    单选 : single,
    判断 : true-false,
    多选 : muti,
    填空 : fill,
    简答 : short-answer
}
*/
var app = new Vue({
    el : '#question',
    data : {
        items : [
                    {
                        type : 'single',
                        title : '你幸福吗',
                        questionId : 'question_1',
                        class : '',
                        option : [
                            {value : '1',check : '',optionId : 1},
                            {value : '2',check : '',optionId : 2},
                            {value : '3',check : '',optionId : 3},
                            {value : '4',check : '',optionId : 4},
                        ]
                    },
                    {
                        type : 'muti',
                        title : '请填写几个省会城市名',
                        questionId : 'question_3',
                        class : 'question-un-active',
                        option : [
                            {value : '辽宁',check : '',optionId : 9},
                            {value : '吉林',check : '',optionId : 10},
                            {value : '黑龙江',check : '',optionId : 11},
                            {value : '河北',check : '',optionId : 12},
                        ]
                    },
                    {
                        type : 'fill',
                        title : '请填写几个省会城市名',
                        questionId : 'question_3',
                        class : 'question-un-active',
                        style : {display:'none'},
                        option : [
                            {value : '',optionId : 9},
                            {value : '',optionId : 10},
                            {value : '',optionId : 11},
                            {value : '',optionId : 12},
                        ]
                    }
                ],
        active : 0,
        all : 0,
        questionType : ''
    },
    methods : {
        prev : function(event){
            if(this.active>0){
                this.items[this.active].class = 'question-un-active';
                this.items[this.active-1].class = '';
                this.active--;
                this.changQuestionType();
            }
            else{
                console.log('已经是第一题了');
            }
        },
        next : function(event){
            if(this.active < this.items.length - 1){
                this.items[this.active].class = 'question-un-active';
                this.items[this.active+1].class = '';
                this.active++;
                this.changQuestionType();
            }
            else{
                console.log('已经最后一题了');
            }
        },
        changUp : function(index,type,value){
            if(type === 'radio'){
                for (var i = 0; i < this.items[this.active].option.length; i++) {
                    this.items[this.active].option[i].check = '';
                }
                this.items[this.active].option[index].check = 'checked';
            }
            else if(type === 'checkbox'){
                if(this.items[this.active].option[index].check == 'checked'){
                    this.items[this.active].option[index].check = '';
                }
                else{
                    this.items[this.active].option[index].check = 'checked';
                }
            }
            else{
                this.items[this.active].option[index].value = value;
            }
        },
        changQuestionType : function(){
            switch(this.items[this.active].type){
                case 'single':
                    this.questionType = '单选题';
                    break;

                case 'true-false':
                    this.questionType = '判断题';
                    break;

                case 'muti':
                    this.questionType = '多选题';
                    break;

                case 'fill':
                    this.questionType = '填空题';
                    break;

                case 'short-answer':
                    this.questionType = '简答题';
                    break;

                default :
                    this.questionType = '未知';
            }
        },
        sheet : function(){
            $('#answerSheet').toggle();
        },
        getClass : function(index){
            var temp;
            if(this.items[index].type == 'short-answer' || this.items[index].type == 'fill'){
                temp = '1';
                for (var i = 0; i < this.items[index].option.length; i++) {
                    if(this.items[index].option[i].value == ''){
                        temp = '';
                        break;
                    }
                }
            }
            else{
                temp = '';
                for (var i = 0; i < this.items[index].option.length; i++) {
                    temp += this.items[index].option[i].check;
                }
            }
            if(temp == ''){
                return ' weui-btn_default';
            }
            else{
                return 'weui-btn_primary';
            }
            
        },
        jumpQuestion : function(index){
            this.active = index;
            this.sheet();
        }
    },
    mounted : function(){
        this.all = this.items.length;
        this.changQuestionType();
    }
})
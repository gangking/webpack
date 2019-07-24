import _ from 'lodash';
import './style.css';
import './a.scss';
import axios from 'axios';

function createDomElement() {
  var dom = document.createElement('div');
  dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  //   dom.className = 'hello';
  dom.classList.add('box');
  return dom;
}

console.log('npm run dev + watch');

document.body.appendChild(createDomElement());

// 发送ajax请求
var api = 'https://www.easy-mock.com/mock/5cac669516fea85e587f8deb/luodiye';
axios.post(api + '/appserver/task/queryLatest', {}).then(res => {
  console.log(res);
}, req => {
  alert('请求失败！');
});

// es6语法
class Temp {
  show() {
    console.log('this.Age :', this.Age);
  }

  get Age() {
    return this._age;
  }

  set Age(val) {
    this._age = val + 1;
  }
}

const t = new Temp();
t.Age = 19;

t.show();

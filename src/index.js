import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactTree from './component/index.js'; // 引入组件
// import ReactTree from './../lib'
import 假数据 from './假数据'

// 每一个子节点的结构和样式
function childLayout (props) {
  // bgcArr是每一层的图标颜色(就是demo的小圆圈的颜色)
  let bgcArr = ['#0DC0AF', '#FD71AA', '#41A3FC', '#D086EB', '#F8B551']
  return <div>
    <span>
      <div style={{
        '--background_color': bgcArr[props.tier % bgcArr.length] || '#fff',
      }}>
        <div className='shu_show_name' onClick={e => {
        props.click(props.path, props.data)
      }} style={{backgroundColor: 'var(--background_color)'}}>
        {props.data.agtype}
      </div>
      <div className="shu_show_all_name">
        <div>{props.data.agntname}</div>
      </div>
      </div>
    </span>
  </div>
}


class App extends React.Component {
  click = (obj) => {
    console.log(obj)
  }
  render () {
    /* 
      必传   1.data是一个json数据
      必传   2.childLayout是react的函数组件,返回的dom元素是每个子节点,大小决定树状图的大小, 接受一个对象props(Object类型)
      props.data 是 每个子节点的数据 Object类型
      props.tier 是 第几层级 Number类型
      props.path 是 属于父节点子集的下标
      props.click 是 function,接受2个参数，第1个参数把props.path传入,第2个参数把props.data传入
      childLayout具体参考下面的childLayout函数

      非必传 3.click一个函数，接受一个参数，参数是点击每个子节点数据(是当前点击的节点的所有属性)
      非必传 4.showAll是一个Boolean类型(不是非要布尔类型,js会隐式转换),如果是true,把数据全部显示，如果是false或者不传，就会默认显示数据最左边一列, 只要点击就能切换节点显示
      非必传 5.size是一个Number,如果觉得每一层dom元素拥挤，可以传入数字进行调节每一层的间距
    */
    return <ReactTree data={假数据} showAll={false} click={this.click} childLayout={childLayout} size={3} />
    // return <div>123123213</div>
  }
}

ReactDOM.render(
  <div className="app">
    <App />
  </div>
, document.getElementById('root'))

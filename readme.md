一个react的树状图插件   效果图在最后

把项目克隆下来先npm i，再npm run k就跑起来了


安装 npm install react_tree_j

引入 import ReactTree from 'react_tree_j';

src文件夹下有着未编译的源码和demo(src/index.js是demo,src/component里面是未编译的源码),  复制到react项目中就能跑

```
代码
code demo
import React from 'react';
import ReactTree from './react_tree_j';
function childLayout (props) {
  return <div onClick={ () => { props.click(props.path, props.data) } }>
    {props.data.agntname} // 或者随便写什么 {props.data.name} 或者直接写123，都行
  </div>
}
class App extends React.Component {
  click = (obj) => {
    console.log(obj)
  }
  render () {
    return <ReactTree data={json数据} showAll={false} click={this.click} childLayout={childLayout} size={1} />
  }
}
```

```
/* 说明(description)
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
```

```
<!-- childLayout具体参考这里(先看上面的说明) -->
// 每一个子节点的结构和样式(最简洁的)
function childLayout (props) {
  // 非常重要！非常重要！非常重要！这里的onClick给dom绑定点击事件,复制黏贴就行了，不能改更，只能写成onClick={() => {props.click(props.path, props.data)
  return <div onClick={ () => { props.click(props.path, props.data) } }>
    {props.data.agntname} // 或者随便写什么 {props.data.name} 或者直接写123，都行
  </div>
}

// 每一个子节点的结构和样式(src中demo.js的说明)
function childLayout (props) {
  console.log(props)
  // bgcArr是每一层的图标颜色(就是demo的小圆圈的颜色) props.tier就是为了这里每层使用不同颜色，没有其他用处
  let bgcArr = ['#0DC0AF', '#FD71AA', '#41A3FC', '#D086EB', '#F8B551']
  return <div>
    <span>
      // 这里style就是为了设置背景色，不重要
      <div style={{'--background_color': bgcArr[props.tier % bgcArr.length] || '#fff'}}>
        // 非常重要！非常重要！非常重要！这里的onClick给dom绑定点击事件,复制黏贴就行了，不能改更，只能写成onClick={() => {props.click(props.path, props.data)
        <div className='shu_show_name' onClick={() => {
        props.click(props.path, props.data)
      }} style={{backgroundColor: 'var(--background_color)'}}>
        {props.data.agtype}
      </div>
      <div className="shu_show_all_name">
        <div>{props.data.agntname}</div>
      </div>
      </div>
​    </span>
  </div>
}

```

本插件 从react_tree_j@1.0.2开始可以正常使用

最后附上2张效果图

![1](https://raw.githubusercontent.com/jiangji1/react_tree_j/master/imgs/1.png)

![2](https://raw.githubusercontent.com/jiangji1/react_tree_j/master/imgs/2.png)

=== 附上json数据的格式
```
{
  "agntname": "agntname",
  "agtype": "agtype",
  "child": [
    {
      "agntname": "陆某某",
      "agtype": "HD",
      "child": [
        {
          "agntname": "崔某某",
          "agtype": "UM",
          "child": [
            {
              "agntname": "陆某某",
              "agtype": "HD",
              "child": [
                {
                  "agntname": "陆某某",
                  "agtype": "HD",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "侯某某",
                  "agtype": "AS"
                },
                {
                  "agntname": "贾某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                }
              ]
            },
            {
              "agntname": "崔某某",
              "agtype": "SS",
              "child": [
                {
                  "agntname": "陆某某",
                  "agtype": "HD",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "侯某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "贾某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                }
              ]
            },
            {
              "agntname": "杜某某",
              "agtype": "SS",
              "child": [
                {
                  "agntname": "陆某某",
                  "agtype": "HD",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "侯某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "贾某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "agntname": "段某某",
          "agtype": "UM",
          "child": [
            {
              "agntname": "陆某某",
              "agtype": "HD",
              "child": [
                {
                  "agntname": "陆某某",
                  "agtype": "HD",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "侯某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "贾某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                }
              ]
            },
            {
              "agntname": "崔某某",
              "agtype": "SS",
              "child": [
                {
                  "agntname": "陆某某",
                  "agtype": "HD",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "侯某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "贾某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                }
              ]
            },
            {
              "agntname": "杜某某",
              "agtype": "SS",
              "child": [
                {
                  "agntname": "陆某某",
                  "agtype": "HD",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "侯某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                },
                {
                  "agntname": "贾某某",
                  "agtype": "AS",
                  "child": [
                    {
                      "agntname": "陆某某",
                      "agtype": "HD"
                    },
                    {
                      "agntname": "郑钰",
                      "agtype": "SD"
                    },
                    {
                      "agntname": "周珊珊",
                      "agtype": "SE"
                    },
                    {
                      "agntname": "周睿",
                      "agtype": "TA"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
import React, { Component } from 'react'
import './index.css'

function childHidden () {
  return <div className="child_hidden"></div>
}

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tier: 1,
      tierFirst: 1,
      tierLast: 1,
      data: null,
      style: {}
    }
  }
  
  componentDidMount () {
    let data = this.props.data
    if (!this.props.showAll) {
      f(data)
      data.showI = 0
      function f (obj) {
        if (Object.prototype.toString.call(obj) !== '[object Object]') return
        if (Object.prototype.toString.call(obj.child) !== '[object Array]') return
        obj.child.forEach(v => {
          v.showI = 0
          f(v)
        })
      }
    }
    this.setState({ data })
    setTimeout(() => {
      this.getTierLast()
    }, 0)
  }
  
  click = (path, data) => {
    let obj = this.state.data
    path.slice(0, -1).forEach(v => obj = obj.child[v])
    this.props.click(data)
    if (this.showAll) return
    if (obj.showI === path[path.length - 1]) return
    obj.showI = path[path.length - 1] || 0
    this.getTierLast()
  }

  // 获取显示结构有几层
  getTierLast = () => {
    let data = this.state.data
    if (!data) return
    let tier = 1
    let f = (obj, currentTier) => {
      if (obj && obj.hasOwnProperty('child') && Array.isArray(obj.child) && obj.child.length) {
        if (this.props.showAll) obj.child.forEach(v => f(v, currentTier + 1))
        else f(obj.child[obj.showI], currentTier + 1)
      } else {
        if (currentTier > tier) tier = currentTier
      }
    }
    f(data, tier)
    this.setState({ tierLast: tier })
  }

  // 创建背景色
  createBgc = () => {
    console.log(this.state.data)
    if (!this.state.data) return
    let top = 0
    , everyContainer = 180
    , everyBottom = 30
    , allHeight = top + (everyContainer + everyBottom) * (this.state.tierLast - this.state.tierFirst + 1)
    , tier = 1
    , tierLast = this.state.tierLast
    , percent = 0
    , bgcArr = ['F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF', 'F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF','F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF','F4FAE5', 'FCF3EE', 'F4FCFE', 'FDFBEF']
    , background = `linear-gradient(to bottom,#fff 0%,#fff ${percent = top / allHeight * 100}%`
    while (tier <= tierLast) {
      background += `,#${bgcArr[tier - 1]} ${percent += 0.01}%,#${bgcArr[tier - 1]} ${percent += everyContainer / allHeight * 100}%,#fff ${percent += 0.01}%,#fff ${percent += everyBottom / allHeight * 100}%`
      tier++
    }
    background += ')'
    background = background.replace(/100\.\d*/, '100') // 处理出现100.001的情况
    let size = +this.props.size || 1
    return {
      background,
      '--height': `${4.5 * size}rem`,
      '--shu_td_name_has_child_after_height': `${1 * size}rem`,
    }
  }

  render() {
    return (
      <div className="shu_all_container">
        <div className={`shu_table_all_container`} style={this.createBgc()}>
          <div className="shu_table_all_container_to_scroll">
            {
              this.state.data &&
              <Shu 
              data={this.state.data}
              childLayout={this.props.childLayout}
              childHidden={this.props.childHidden || childHidden}
              click={this.click}
              path={[]}
              tier={this.state.tier}
              tierFirst={this.state.tierFirst}
              showAll={this.props.showAll} />
            }
          </div>
        </div>
      </div>
    )
  }
}

function Shu (props) {
  return (
    <table style={{'position': 'relative'}}>
      <tbody>
        <tr className="tr">
          {props.data && <td className={`shu_td ${
            (props.trClassName || '').indexOf('shu_td_name_right') !== -1? 'shu_td_name_right': ''
          }`}> {/* 如果有数据，渲染 */}
            <div className={`${ /* 类名样式下部 */
              props.tier === props.tierFirst /* tier是第几层 */
                ? 'shu_td_name_has_child'
                : (props.data.child || []).length
                  ? props.showI === props.path[props.path.length - 1]
                    ? 'shu_td_name_has_child'
                    : props.showAll
                      ? 'shu_td_name_has_child'
                      : 'shu_td_name_has_child_but_not_show'
                  : 'shu_td_name_no_child'
            } ${
              props.trClassName &&
              !~props.trClassName.indexOf('shu_td_name_right') // 如果是最右侧元素
                ? props.trClassName 
                : '' 
              || ''
            }`}> {/* props.trClassName是类名样式上部 */}
              {
                props.data && props.data.show === false
                  ? props.childHidden()
                  : props.childLayout({
                    path: props.path,
                    data: props.data,
                    tier: props.tier,
                    click: props.click,
                  })
              } {/* 自定义子节点 */}
            </div> 
            <div className="shu_td_child"
            onClick={e => {
              props.data && props.data.show === false && props.click(props.path)
              e.stopPropagation()
            }}>
              {( props.data.child || []).map((v, i) => { /* 如果还有child就继续渲染 */
                if (!props.showAll) if (props.tier >= 2 && props.showI !== props.path[props.path.length - 1]) return '' /* tier是第几层，showI控制显示下一级的第几个 */
                return <Shu {...props} showI={props.data.showI} key={i} data={v} path={[...props.path, i]} tier={props.tier + 1} 
                  trClassName={
                    (props.data.child || []).length === 1
                      ? 'shu_td_name_one' // 只有一个子元素
                      : i === 0
                        ? 'shu_td_name_left' // 最左边的子元素
                        : i === (props.data.child || []).length - 1
                          ? 'shu_td_name_right'
                          : 'shu_td_name_middle' // 中间的子元素(不是最左和最右)
                  }
                />
              }
             )}
            </div>
          </td>}
        </tr>
      </tbody>
    </table>
  )
}

import React from 'react'

import { AvoidRepeatBaseComponent } from '../../../modules/base_component/src/index'

export class AvoidRepeat extends AvoidRepeatBaseComponent {
  justOnce = false
  handleRepeat = async () => {
    try {
      const { post } = this
      const res = await post({ api: 'bb' })
      console.log('res:', res)
    } catch (err) {}
  }
  render () {
    return <div>
      <div onClick={this.handleRepeat}>AvoidRepeat Component</div>
      <Btn1 />
      <Btn2 />
    </div>
  }
}

export class Btn1 extends AvoidRepeatBaseComponent {
  justOnce = false
  handleRepeat = async () => {
    try {
      const { post } = this
      const res = await post({ api: 'btn1' })
      console.log('btn1:', res)
    } catch (err) {}
  }
  render () {
    return <div onClick={this.handleRepeat}>Btn1</div>
  }
}

export class Btn2 extends AvoidRepeatBaseComponent {
  justOnce = true
  handleRepeat = async () => {
    try {
      const { post } = this
      const res = await post({ api: 'btn2' })
      console.log('btn2:', res)
    } catch (err) {}
  }
  render () {
    return <div onClick={this.handleRepeat}>Btn2</div>
  }
}
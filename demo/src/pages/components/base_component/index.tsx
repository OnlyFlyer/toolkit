import React from 'react'

import { AvoidRepeatBaseComponent } from '../../../modules/base_component/src/index'

export class AvoidRepeat extends AvoidRepeatBaseComponent {
  justOnce = true
  render () {
    console.log('外部 this:', this)
    return <div>AvoidRepeat Component</div>
  }
}
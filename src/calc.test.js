import calc from './calc'
import {expect} from 'chai'

describe('加法测试',function(){
  it('1 + 1 = 2才对',function(){
    expect(calc(1,1)).to.be.equal(2)
  })
})
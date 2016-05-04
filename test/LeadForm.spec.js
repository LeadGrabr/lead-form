import { default as React } from 'react'
import { default as TestUtils } from 'react-addons-test-utils'
import { default as expect } from 'expect'
import { default as LeadForm } from '../src'
import { Base } from 'rebass'

const renderer = TestUtils.createRenderer()

describe('LeadForm', () => {
    let tree

    beforeEach(() => {
        renderer.render(<LeadForm submit={() => null}/>)
        tree = renderer.getRenderOutput()
    })

    it('should render', () => {
        expect(tree.type).toEqual(Base)
    })
})

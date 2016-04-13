import React, { Component, PropTypes } from 'react'
import { Base, Button } from 'rebass'
import autobind from 'autobind-decorator'
import { JoifulForm, JoifulInput } from 'joiful-react-forms'
import Joi from 'joi'
import { Flex } from 'reflexbox'

export default class LeadForm extends Component {

    static propTypes = {
        status: PropTypes.oneOf([
            'pending',
            'success',
            'failure'
        ]),
        submit: PropTypes.func.isRequired,
        theme: PropTypes.oneOf([
            'primary',
            'secondary',
            'default',
            'info',
            'success',
            'warning',
            'error'
        ])
    };

    static defaultProps = {
        theme: 'default'
    };

    state = {}

    @autobind
    handleSubmit(error) {
        if (error) {
            return false
        }

        return this.props.submit(this.state)
    }

    @autobind
    handleChange(event, formValues) {
        this.setState(formValues)
    }

    render() {
        const { status, theme, ...props } = this.props
        const inputProps = { theme }
        return (
            <Base {...props}>
                <JoifulForm
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    schema={{
                        name: Joi.string().required(),
                        email: Joi.string().email().required(),
                        phone: Joi.string().min(10).max(12),
                        message: Joi.string().min(3)
                    }}
                    values={this.state}
                >
                    <JoifulInput
                        {...inputProps}
                        label="Name"
                        name="name"
                    />
                    <JoifulInput
                        {...inputProps}
                        label="Email"
                        name="email"
                    />
                    <JoifulInput
                        {...inputProps}
                        label="Phone"
                        name="phone"
                    />
                    <JoifulInput
                        {...inputProps}
                        is="textarea"
                        label="Message"
                        name="message"
                    />
                    <Button
                        backgroundColor="primary"
                        disabled={status === 'pending'}
                        onClick={this.handleSubmit}
                        style={{ width: '100%' }}
                    >
                        <If condition={status === 'pending'}>
                            <Flex justify="center">
                                Processing...
                            </Flex>
                        <Else/>
                            Submit
                        </If>
                    </Button>
                </JoifulForm>
            </Base>
        )
    }

}

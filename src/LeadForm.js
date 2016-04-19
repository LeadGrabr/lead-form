import { default as React, Component, PropTypes } from 'react'
import { Base, Button } from 'rebass'
import { JoifulForm, JoifulInput } from 'joiful-react-forms'
import { default as Joi } from 'joi'
import { Flex } from 'reflexbox'
import { default as isEqual } from 'lodash.isequal'

const phoneNumberPattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gi // eslint-disable-line max-len

const phone = Joi.string().regex(phoneNumberPattern).options({
    language: {
        string: {
            regex: {
                base: 'entry "{{!value}}" doesn\'t look like a valid US phone number, such as: (242) 333-5555' // eslint-disable-line max-len
            }
        }
    }
})

export default class LeadForm extends Component {

    static propTypes = {
        buttonProps: PropTypes.object,
        emailProps: PropTypes.object,
        messageProps: PropTypes.object,
        nameProps: PropTypes.object,
        phoneProps: PropTypes.object,
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

    handleSubmit(error) {
        if (error) {
            return false
        }

        const { formValues } = this.state

        this.setState({
            submittedValues: formValues
        })

        return this.props.submit(formValues)
    }

    handleChange(event, formValues) {
        this.setState({ formValues })
    }

    render() {
        const {
            buttonProps,
            emailProps,
            messageProps,
            nameProps,
            phoneProps,
            status,
            theme,
            ...props
          } = this.props

        const {
            formValues,
            submittedValues
          } = this.state

        const sharedProps = { theme }

        return (
            <Base {...props}>
                <JoifulForm
                    onChange={::this.handleChange}
                    onSubmit={::this.handleSubmit}
                    schema={{
                        name: Joi.string().required(),
                        email: Joi.string().email().required(),
                        phone: phone.min(10).max(12),
                        message: Joi.string().min(3)
                    }}
                    values={this.state.formValues}
                >
                    <JoifulInput
                        label="Name"
                        name="name"
                        {...sharedProps}
                        {...nameProps}
                    />
                    <JoifulInput
                        label="Email"
                        name="email"
                        {...sharedProps}
                        {...emailProps}
                    />
                    <JoifulInput
                        label="Phone"
                        name="phone"
                        {...sharedProps}
                        {...phoneProps}
                    />
                    <JoifulInput
                        is="textarea"
                        label="Message"
                        name="message"
                        {...sharedProps}
                        {...messageProps}
                    />
                    <Button
                        disabled={
                            status === 'pending'
                            || status === 'success' && isEqual(formValues, submittedValues)
                        }
                        onClick={this.handleSubmit}
                        style={{ width: '100%' }}
                        {...sharedProps}
                        {...buttonProps}
                    >
                        <If condition={status === 'pending'}>
                            <Flex justify="center">
                                Processing...
                            </Flex>
                        <Else/>
                            <If condition={status === 'success'}>
                                Thanks!
                            <Else/>
                                Submit
                            </If>
                        </If>
                    </Button>
                </JoifulForm>
            </Base>
        )
    }

}

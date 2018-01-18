import React from 'react'
import Router from 'next/router'
import { Row, Col, Form, Input, Label, Button } from 'reactstrap'
import Session from '../models/session'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      session: this.props.session
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    
  }
  
  handleEmailChange(event) {
    this.setState({
      email: event.target.value.trim(),
      session: this.state.session
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    Session.signin(this.state.email)
    .then(() => {
      Router.push('/auth/check-email')
    })
    .catch(err => {
      // @FIXME Handle error
      console.log(err)
    })
  }
  
  render() {
    if (this.props.session.user) {
      return(<div/>)
    } else {
      return (
        <React.Fragment>
          <p className="text-center" style={{marginTop: 10, marginBottom: 30}}>If you don't have an account, one will be created when you sign in.</p>
          <Row>
            <Col xs={12} md={6}>
              <p><a className="btn btn-outline-dark btn-block btn-facebook" href="/auth/oauth/facebook">Sign in with Facebook</a></p>
              <p><a className="btn btn-outline-dark btn-block btn-google" href="/auth/oauth/google">Sign in with Google</a></p>
              <p><a className="btn btn-outline-dark btn-block btn-twitter" href="/auth/oauth/twitter">Sign in with Twitter</a></p>
            </Col>
            <Col xs={12} md={6}>
              <Form id="signin" method="post" action="/auth/email/signin" onSubmit={this.handleSubmit}>
                <Input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
                <p>
                  <Label htmlFor="email">Email address</Label><br/>
                  <Input name="email" type="text" placeholder="j.smith@example.com" id="email" className="form-control" value={this.state.email} onChange={this.handleEmailChange}/>
                </p>
                <p className="text-right">
                  <Button id="submitButton" outline color="dark" type="submit">Sign in with email</Button>
                </p>
              </Form>
            </Col>
          </Row>
        </React.Fragment>
      )
    }
  }
}
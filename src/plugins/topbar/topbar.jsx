import React, { PropTypes } from "react"

import Switcher from "./switcher.jsx"
//import "./topbar.less"
import Logo from "./logo_small.png"

export default class Topbar extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = { url: props.specSelectors.url(), urls: props.specSelectors.urls() }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.specSelectors.url() })
  }

  onUrlChange =(e)=> {
    let {target: {newValue}} = e
    this.setState({url: newValue}, () => this.downloadUrl(e))
  }

  downloadUrl = (e) => {
    this.props.specActions.updateUrl(this.state.url)
    this.props.specActions.download(this.state.url)
    e.preventDefault()
  }

  render() {
    let { getComponent, specSelectors } = this.props
    const Button = getComponent("Button")
    const Link = getComponent("Link")

    let isLoading = specSelectors.loadingStatus() === "loading"
    let isFailed = specSelectors.loadingStatus() === "failed"

    let inputStyle = {}
    if(isFailed) inputStyle.color = "red"
    if(isLoading) inputStyle.color = "#aaa"
    return (
        <div className="topbar">
          <div className="wrapper">
            <div className="topbar-wrapper">
              <Link href="#" title="Swagger UX">
                <img height="30" width="30" src={ Logo } alt="Swagger UX"/>
                <span>swagger</span>
              </Link>
              <form className="download-url-wrapper" onSubmit={this.downloadUrl}>
                <Switcher className="download-url-input" options={this.state.urls} onChange={ this.onUrlChange } />
              </form>
              <form className="download-url-wrapper" onSubmit={this.downloadUrl}>
                <input className="download-url-input" type="text" onChange={ this.onUrlChange } value={this.state.url} disabled={isLoading} style={inputStyle} />
                <Button className="download-url-button" onClick={ this.downloadUrl }>Explore</Button>
              </form>
            </div>
          </div>
        </div>

    )
  }
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired
}

import React, { Component } from "react";

class AMPShadowDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentFetchError: false,
      documentLoading: false
    };
  }
  render() {
    return <div />;
  }

  getAmpDocument = url => {
    // Fetch AMP document
  };

  hideDomElements = () => {
    // Hide unwanted DOM elemements from AMP document e.g. Navigation
  };

  attachAmpShadowDocument = () => {
    // Attach AMP document to shadow DOM
  };

  closeAmpShadowDocument = () => {
    // Close shadow document by cleaning up internal state
  };

  handleNavigationEvents = () => {
    // Handle click events for the same origin
    // Use react-router-V4
  };
}

export default AMPShadowDocument;

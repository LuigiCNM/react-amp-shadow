import React, { Component } from "react";
import axios from "axios";

class AMPShadowDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentFetchError: false,
      documentLoading: false
    };

    this.xhr_ = null;

    this.ampDocumentContainer = null;

    this.ampShadoDocument = null;

    this.ampShadowDocumentRoot = null;

    this.ampIsReady = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve);
    });
  }

  componentDidMount() {
    this.getAmpDocument(this.props.src);
  }

  componentWillReceiveProps(nextProps) {
    this.getAmpDocument(nextProps.src);
  }

  render() {
    const { documentFetchError, documentLoading } = this.state;

    if (documentFetchError) {
      return (
        <div>
          <h2>Error fetching AMP document</h2>
          <h4>{documentFetchError}</h4>
        </div>
      );
    }

    return (
      <div
        className="amp-container"
        ref={ref => (this.ampDocumentContainer = ref)}
      >
        {documentLoading && <h2>Loading......</h2>}
      </div>
    );
  }

  getAmpDocument(url) {
    this.setState({ documentLoading: true });

    axios({
      method: "get",
      url: url,
      responseType: "document"
    })
      .then(({ data }) => this.attachAmpShadowDocument(data, url))
      .catch(error => this.setState({ documentFetchError: error }));
  }

  attachAmpShadowDocument(data, url) {
    return this.ampIsReady
      .then(amp => {
        // Replace the old shadow root with a new div element.
        const oldShadowRoot = this.ampShadowDocumentRoot;
        this.ampShadowDocumentRoot = document.createElement("div");

        if (oldShadowRoot) {
          this.ampDocumentContainer.replaceChild(
            this.ampShadowDocumentRoot,
            oldShadowRoot
          );
        } else {
          this.ampDocumentContainer.appendChild(this.ampShadowDocumentRoot);
        }

        this.ampShadoDocument = amp.attachShadowDoc(
          this.ampShadowDocumentRoot,
          data,
          url
        );

        this.setState({ documentLoading: false });
      })
      .catch(error => console.error(error));
  }

  hideDomElements() {
    // Hide unwanted DOM elemements from AMP document e.g. Navigation
  }

  closeAmpShadowDocument() {
    // Close shadow document by cleaning up internal state
  }

  handleNavigationEvents() {
    // Handle click events for the same origin
    // Use react-router-V4
  }
}

export default AMPShadowDocument;

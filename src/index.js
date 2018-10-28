import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class AMPShadowDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentFetchError: false,
      documentLoading: false
    };

    this.ampDocumentContainer = null;

    this.ampShadoDocument = null;

    this.ampShadowDocumentRoot = null;

    this.ampIsReady = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve);
    });

    this.boundHandleNavigationEvents = this.handleNavigationEvents.bind(this);
  }

  componentDidMount() {
    this.getAmpDocument(this.props);
    this.ampDocumentContainer.addEventListener(
      "click",
      this.boundHandleNavigationEvents
    );
  }

  componentWillReceiveProps(nextProps) {
    this.getAmpDocument(nextProps);
  }

  componentWillUnmount() {
    this.closeAmpShadowDocument();
  }

  render() {
    const { documentFetchError, documentLoading } = this.state;

    if (documentFetchError) {
      return (
        <div>
          <h2>Error fetching AMP document</h2>
        </div>
      );
    }

    return (
      <div
        className="amp-container"
        ref={ref => (this.ampDocumentContainer = ref)}
      >
        {documentLoading && <h2>Loading....</h2>}
      </div>
    );
  }

  getAmpDocument(props) {
    const { src, removeElements = [] } = props;
    this.setState({ documentLoading: true });
    axios({
      method: "get",
      url: src,
      responseType: "document"
    })
      .then(({ data }) =>
        this.attachAmpShadowDocument(data, src, removeElements)
      )
      .catch(error =>
        this.setState({ documentFetchError: error, documentLoading: false })
      );
  }

  attachAmpShadowDocument(data, src, removeElements) {
    return this.ampIsReady
      .then(amp => {
        this.hideDomElements(data, removeElements);

        // Replace the old shadow root with a new div element.
        const oldAmpShadowDocumentRoot = this.ampShadowDocumentRoot;
        this.ampShadowDocumentRoot = document.createElement("div");

        if (oldAmpShadowDocumentRoot) {
          this.ampDocumentContainer.replaceChild(
            this.ampShadowDocumentRoot,
            oldAmpShadowDocumentRoot
          );
        } else {
          this.ampDocumentContainer.appendChild(this.ampShadowDocumentRoot);
        }

        this.ampShadoDocument = amp.attachShadowDoc(
          this.ampShadowDocumentRoot,
          data,
          src
        );

        this.setState({ documentLoading: false });
      })
      .catch(error => {
        this.setState({ documentFetchError: error, documentLoading: false });
      });
  }

  hideDomElements(document, removeElements) {
    if (removeElements.length < 1) {
      return;
    }

    const elementsToRemove = removeElements.join();
    document
      .querySelectorAll(elementsToRemove)
      .forEach(element => element.parentNode.removeChild(element));
  }

  closeAmpShadowDocument() {
    if (typeof this.ampShadoDocument.close === "function") {
      this.ampShadoDocument.close();
    }
  }

  handleNavigationEvents(event) {
    let anchorTag = null;

    if (event.path) {
      const eventPath = event.path;
      eventPath.map((element, index) => {
        const node = eventPath[index];

        if (node.tagName === "A") {
          anchorTag = node;
          return;
        }
      });
    } else {
      let node = event.target;
      while (node && node.tagName !== "A") {
        node = node.parentNode;
      }
      anchorTag = node;
    }

    if (anchorTag && anchorTag.href) {
      const url = new URL(a.href);
      if (url.origin === window.location.origin) {
        event.preventDefault();
        this.closeAmpShadowDocument();
        this.props.history.push(url.pathname);

        return false;
      }
    }

    return true;
  }
}

export default withRouter(AMPShadowDocument);

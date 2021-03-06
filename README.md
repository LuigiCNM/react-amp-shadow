![](./assets/react-amp-shadow_banner.png)

# Description

React-AMP-Shadow is a lightweight react component that can fetch and render pre-existing AMP Documents from any source. React-AMP-Shadow uses AMP Shadow Dom. This is especially useful for shell style PWA's (Progressive Webapps) and SPA's (Single Page Applications)

# Getting Started

## Installation

```
npm install react-amp-shadow
```

or

```
yarn add react-amp-shadow
```

## User Guide

#### Include link to AMP Shadow Script in the document head

```
<script async src="https://cdn.ampproject.org/shadow-v0.js" />
```

#### Pass AMP url and elements to remove to the react-amp-shadow component

```
import React from 'react'
import AMPShadowDocument from 'react-amp-shadow';

const elementsToRemove = [
  'div.navBar',
  'div.sideBar',
  'div.footer',
  '[role="banner"]',
];

const AMPDocument = () => {
  return (
    <AMPShadowDocument
      src='https://www.bbc.co.uk/news/amp/uk-45861683'
      removeElements={elementsToRemove}
    />
  )
}

export default AMPDocument;
```

# ToDo

- [x] Handle navigation with react-router-dom
- [x] Ability to remove page element from AMP document e.g. navigation and footer
- [ ] Tests

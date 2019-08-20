import React from 'react';

export const ClickCapture = React.createClass({

  componentWillMount () {
    this.clickWasCaptured = Boolean(this.props.mountedByClick);
    window.addEventListener('click', this.handleOuterClick, false);
  },

  componentWillUnmount () {
    window.removeEventListener('click', this.handleOuterClick);
  },

  handleOuterClick (e) {
    if(this.clickWasCaptured) {
      this.clickWasCaptured = false;
      return;
    }

    return this.props.onClickOutside ? this.props.onClickOutside(e) : null;
  },

  onClickCapture () {
    this.clickWasCaptured = true;
  },

  cloneChild (child, index) {
    return React.cloneElement(child, {
      onClickCapture: child.props.onClickCapture ? e => {
        this.onClickCapture();
        child.props.onClickCapture(e);
      } : this.onClickCapture,
      key: typeof index !== 'undefined' ? 'capture_child_' + index : undefined
    });
  },

  render () {
    if(!this.props.children) {
      return null;
    }

    return Array.isArray(this.props.children) ?
      this.props.children.map(this.cloneChild) :
      this.cloneChild(this.props.children);
  }

});

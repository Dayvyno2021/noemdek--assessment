import React from 'react';
import ReactDOM from 'react-dom';
const modalRootEl = document.getElementById('modal-root');

class Modal extends React.Component {
  el: HTMLDivElement;
  constructor(props: any) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRootEl!.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRootEl!.removeChild(this.el);
  }
  
  render() {
    return ReactDOM.createPortal(
      (this.props as any).children,
      this.el,
    );
  }
}

export default Modal;

// import { Component } from 'react';
import React, { useEffect} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
// import { GrClose } from 'react-icons/gr';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose,children}) =>{
  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    return()=> {
      window.removeEventListener('keydown', handleKeyDown)
    };
  });

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

const handleKeyDown = e => {
    if (e.code === 'Escape') {
    onClose();
    }
  };

const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
    onClose();
    }
  };

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalStyled>{children}</ModalStyled>
      </Overlay>,
      modalRoot
    );
}

Modal.propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };


// export class Modal extends Component {
//   static propTypes = {
//     onClick: PropTypes.func,
//     onClose: PropTypes.func,
//     children: PropTypes.node.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalStyled>{this.props.children}</ModalStyled>
//         {/* <button type="button" onClick={this.props.onClose}>
//           <GrClose style={{ width: 30, height: 30 }} />
//         </button> */}
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
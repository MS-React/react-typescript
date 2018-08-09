import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface MsModalProps {
  body: any;
  cancelCallback: (() => void);
  cancelButtonLabel: string;
  isOpen: boolean;
  modalTitle: string;
  okButtonLabel: string;
  okCallback: (() => void);
}

class MsModal extends React.PureComponent<MsModalProps, {}> {

  render() {
    const {
      body, 
      cancelButtonLabel,
      cancelCallback, 
      isOpen,
      modalTitle, 
      okButtonLabel, 
      okCallback
    } = this.props;
    
    return (
      <Modal isOpen={isOpen} toggle={cancelCallback}>
        <ModalHeader toggle={cancelCallback}>{modalTitle}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={okCallback}>{okButtonLabel}</Button>{' '}
          <Button color="secondary" onClick={cancelCallback}>{cancelButtonLabel}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MsModal;

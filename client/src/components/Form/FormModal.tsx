import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Form } from "components/Form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const FormModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Form onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;

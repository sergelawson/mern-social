import React, { useEffect, memo } from "react";
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
  postId: string | undefined;
}

const FormModal: React.FC<ModalProps> = ({ isOpen, postId, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={4}>
          <Form postId={postId} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;

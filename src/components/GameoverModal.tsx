import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  status: Status;
  score: number;
  onRestart: () => void;
};

export const GameoverModal = ({ status, score, onRestart }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent alignItems='center' fontSize='2xl'>
        <ModalHeader fontSize='3xl'>
          {status === 'win' ? 'You win!' : 'Game Over!'}
        </ModalHeader>
        <ModalBody>
          <Text>Your final score is {score}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onRestart}>Restart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Settings } from '@styled-icons/feather';
import { ModalSettings } from '@/modals';
import { Container } from './styles';

export function SettingsButton() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <>
      <Container>
        <Settings onClick={() => setIsSettingsModalOpen(true)} />
      </Container>

      {isSettingsModalOpen &&
        createPortal(
          <ModalSettings onClose={() => setIsSettingsModalOpen(false)} />,
          document.body
        )
      }
    </>
  );
}


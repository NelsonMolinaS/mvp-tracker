import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';

import { useClickOutside, useKey, useScrollBlock } from '@/hooks';
import { useMvpsContext } from '@/contexts/MvpsContext';

import { ModalBase } from '../ModalBase';
import { Map } from '../../components/Map';
import { NaviCommand } from '../../components/NaviCommand';

import { ModalPrimaryButton } from '@/ui/ModalPrimaryButton';
import { Modal, Name, Warning, TombToggleButton, TimeSection, TimeLabel, TimeInput } from './styles';

import mvp_tomb from '@/assets/mob_tomb_front1.png';

interface MvpMapModalProps {
  mvp: IMvp;
  close: () => void;
}

export function ModalMvpMap({ mvp, close }: MvpMapModalProps) {
  useScrollBlock(true);
  useKey('Escape', close);
  const modalRef = useClickOutside(close);
  const { updateMvpPosition, resetMvpTimer } = useMvpsContext();

  const [placingTomb, setPlacingTomb] = useState(false);
  const [optionalTime, setOptionalTime] = useState<string>('');

  function handleMapClick(coords: IMapMark) {
    updateMvpPosition(mvp.id, mvp.deathMap, coords);
    setPlacingTomb(false);
  }

  function handleClose() {
    if (optionalTime) {
      const [hours, minutes] = optionalTime.split(':').map(Number);
      const newTime = dayjs().hour(hours).minute(minutes).second(0).toDate();
      resetMvpTimer(mvp, newTime);
    }
    close();
  }

  return (
    <ModalBase>
      <Modal ref={modalRef}>
        <Name>{mvp.deathMap}</Name>

        <Map
          mapName={mvp.deathMap!}
          coordinates={mvp.deathPosition}
          onChange={placingTomb ? handleMapClick : undefined}
        />

        <TombToggleButton
          active={placingTomb}
          onClick={() => setPlacingTomb((v) => !v)}
          title={placingTomb ? 'Cancelar — haz click en el mapa' : 'Marcar posición de la tumba'}
        >
          <img src={mvp_tomb} alt='tomb' style={{ width: 18, height: 18 }} />
          {placingTomb ? 'Haz click en el mapa…' : 'Marcar tumba'}
        </TombToggleButton>

        <NaviCommand mapName={mvp.deathMap} />

        <Warning>
          <FormattedMessage id='nav_command_warning' />
        </Warning>

        <TimeSection>
          <TimeLabel>⏰ Hora de muerte (opcional)</TimeLabel>
          <TimeInput
            type='time'
            value={optionalTime}
            onChange={(e) => setOptionalTime(e.target.value)}
            placeholder='--:--'
          />
        </TimeSection>

        <ModalPrimaryButton onClick={handleClose}>
          <FormattedMessage id='close' />
        </ModalPrimaryButton>
      </Modal>
    </ModalBase>
  );
}

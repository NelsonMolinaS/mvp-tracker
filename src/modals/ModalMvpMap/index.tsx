import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useClickOutside, useKey, useScrollBlock } from '@/hooks';
import { useMvpsContext } from '@/contexts/MvpsContext';

import { ModalBase } from '../ModalBase';
import { Map } from '../../components/Map';
import { NaviCommand } from '../../components/NaviCommand';

import { ModalPrimaryButton } from '@/ui/ModalPrimaryButton';
import { Modal, Name, Warning, TombToggleButton } from './styles';

import mvp_tomb from '@/assets/mob_tomb_front1.png';

interface MvpMapModalProps {
  mvp: IMvp;
  close: () => void;
}

export function ModalMvpMap({ mvp, close }: MvpMapModalProps) {
  useScrollBlock(true);
  useKey('Escape', close);
  const modalRef = useClickOutside(close);
  const { updateMvpPosition } = useMvpsContext();

  const [placingTomb, setPlacingTomb] = useState(false);

  function handleMapClick(coords: IMapMark) {
    updateMvpPosition(mvp.id, mvp.deathMap, coords);
    setPlacingTomb(false);
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

        <ModalPrimaryButton onClick={close}>
          <FormattedMessage id='close' />
        </ModalPrimaryButton>
      </Modal>
    </ModalBase>
  );
}

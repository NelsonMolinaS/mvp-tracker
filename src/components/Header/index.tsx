import { LogOut } from '@styled-icons/feather';
import { HeaderTimer } from '../HeaderTimer';
import { ServerButton } from '../ServerButton';
import { SettingsButton } from '../SettingsButton';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';

import mvpImg from '@/assets/mvp.png';

import { Container, Customization, Logo, LogoContainer, Title, LogoutButton } from './styles';

export function Header() {
  const { use24HourFormat } = useSettings();
  const { logout } = useAuth();

  return (
    <Container>
      <LogoContainer>
        <Logo src={mvpImg} alt='mvp' />
        <Title>Ragnarok MVP Tracker</Title>
      </LogoContainer>

      <HeaderTimer use24HourFormat={use24HourFormat} />

      <Customization>
        <ServerButton />
        <SettingsButton />
        <LogoutButton onClick={logout} title='Logout'>
          <LogOut size={18} />
        </LogoutButton>
      </Customization>
    </Container>
  );
}



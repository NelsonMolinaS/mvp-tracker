import { FormattedMessage } from 'react-intl';
import dayjs, { type Dayjs } from 'dayjs';
import type { Duration } from 'dayjs/plugin/duration';

import { useCountdown } from '@/hooks';
import { RESPAWN_TIMER_SOON_THRESHOLD_MS } from '@/constants';
import { respawnAt } from '@/utils';

import { Container, RespawnTimeText } from './styles';

interface MvpCardCountdownProps {
  nextRespawn: Dayjs;
  respawnAsCountdown?: boolean;
  onTriggerNotification?: () => void;
  cooldownMs?: number;
}

function getTimeString(
  nextRespawn: Dayjs,
  duration: Duration,
  respawnAsCountdown?: boolean,
  missedRespawn?: boolean,
  cooldownMs?: number
) {
  if (respawnAsCountdown && duration) {
    const isMoreThan24Hours = dayjs().diff(nextRespawn, 'h') >= 24;

    if (isMoreThan24Hours) return duration.humanize(true);

    return duration
      .format('HH:mm:ss')
      .split(':')
      .map((time) => time.replace('-', '').padStart(2, '0'))
      .join(':');
  }

  if (missedRespawn) return duration.humanize(true);

  return respawnAt(nextRespawn, cooldownMs);
}

export function MvpCardCountdown({
  nextRespawn,
  respawnAsCountdown,
  onTriggerNotification,
  cooldownMs,
}: MvpCardCountdownProps) {
  const { duration } = useCountdown(nextRespawn);

  const windowMs =
    cooldownMs !== undefined ? cooldownMs : RESPAWN_TIMER_SOON_THRESHOLD_MS;

  const durationWithRespawnDelay = duration.add(windowMs, 'ms');
  const durationAsMs = durationWithRespawnDelay.asMilliseconds();
  const respawningSoon =
    windowMs > 0 && durationAsMs >= 0 && durationAsMs <= windowMs;
  const missedRespawn = durationAsMs < 0;

  const formattedTimeString = getTimeString(
    nextRespawn,
    respawningSoon || missedRespawn ? durationWithRespawnDelay : duration,
    respawnAsCountdown,
    missedRespawn,
    cooldownMs
  );

  const shouldTriggerNotification =
    windowMs > 0 &&
    Math.trunc(durationWithRespawnDelay.asSeconds()) === windowMs / 1000;

  if (onTriggerNotification && shouldTriggerNotification) {
    onTriggerNotification();
  }

  return (
    <Container>
      <FormattedMessage
        id={
          respawningSoon
            ? 'respawning'
            : missedRespawn
            ? 'already_respawned'
            : respawnAsCountdown
            ? 'respawn_in'
            : 'respawn_at'
        }
      />

      <RespawnTimeText
        respawningSoon={respawningSoon}
        missedRespawn={missedRespawn}
        title={nextRespawn.format('HH:mm:ss')}
      >
        {formattedTimeString || '-- : -- : --'} {'\n'}
      </RespawnTimeText>
    </Container>
  );
}

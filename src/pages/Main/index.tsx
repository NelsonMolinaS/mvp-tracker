import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';

import { MvpCard } from '@/components/MvpCard';
import { useMvpsContext } from '@/contexts/MvpsContext';
import { MvpsContainerFilter } from '@/components/MvpsContainerFilter';
import { MvpCardSkeleton } from '@/components/Skeletons/MvpCardSkeleton';
import { ModalEditMvp } from '@/modals';

import { sortBy } from '@/utils/sort';
import { getMvpRespawnTime } from '@/utils';

import {
  Container,
  Section,
  SectionTitle,
  MvpsContainer,
  StatusLegendBar,
  StatusLegendItem,
  StatusDot,
} from './styles';

export function Main() {
  const { activeMvps, allMvps, editingMvp, isLoading } = useMvpsContext();
  const [searchQuery, setSearchQuery] = useState<string>(
    sessionStorage.getItem('search') || ''
  );
  const [currentSort, setCurrentSort] = useState<string>(() => {
    const saved = sessionStorage.getItem('sort');
    // 'id' was the old default — migrate it to 'name'
    if (!saved || saved === 'id') return 'name';
    return saved;
  });
  const [reverseSort, setReverseSort] = useState<boolean>(
    sessionStorage.getItem('reverse') === 'true'
  );

  const allMvpsFilteredAndSorted = (
    searchQuery
      ? allMvps.filter((i) =>
          `${i.id}-${i.name}`
            .toLocaleLowerCase()
            .includes(searchQuery.toLocaleLowerCase())
        )
      : allMvps
  ).sort(sortBy(currentSort));

  const displayAllMvps = reverseSort
    ? allMvpsFilteredAndSorted.reverse()
    : allMvpsFilteredAndSorted;

  const sortedActiveMvps = [...activeMvps].sort((a, b) => {
    const respawnA = getMvpRespawnTime(a);
    const respawnB = getMvpRespawnTime(b);
    if (!a.deathTime || !respawnA) return 1;
    if (!b.deathTime || !respawnB) return -1;
    const timeA = dayjs(a.deathTime).add(respawnA, 'ms').valueOf();
    const timeB = dayjs(b.deathTime).add(respawnB, 'ms').valueOf();
    return timeA - timeB;
  });

  return (
    <>
      <Container>
        {activeMvps.length > 0 && (
          <Section>
            <SectionTitle>
              <FormattedMessage id='active' />
            </SectionTitle>

            <StatusLegendBar>
              <StatusLegendItem>
                <StatusDot type='normal' />
                <span>
                  <strong>
                    <FormattedMessage id='respawn_in' />:
                  </strong>{' '}
                  <FormattedMessage id='legend_respawn_in' />
                </span>
              </StatusLegendItem>

              <StatusLegendItem>
                <StatusDot type='respawning' />
                <span>
                  <strong>
                    <FormattedMessage id='respawning' />:
                  </strong>{' '}
                  <FormattedMessage id='legend_respawning' />
                </span>
              </StatusLegendItem>

              <StatusLegendItem>
                <StatusDot type='passed' />
                <span>
                  <strong>
                    <FormattedMessage id='already_respawned' />:
                  </strong>{' '}
                  <FormattedMessage id='legend_already_respawned' />
                </span>
              </StatusLegendItem>
            </StatusLegendBar>

            <MvpsContainer>
              {sortedActiveMvps.map((mvp: IMvp) => (
                <MvpCard key={`${mvp.id}-${mvp.deathMap}`} mvp={mvp} />
              ))}
            </MvpsContainer>
          </Section>
        )}

        <Section>
          <SectionTitle>
            <FormattedMessage id='all' />
          </SectionTitle>

          <MvpsContainerFilter
            searchQuery={searchQuery}
            onChangeQuery={setSearchQuery}
            currentSort={currentSort}
            onSelectSort={setCurrentSort}
            isReverse={reverseSort}
            onReverse={() => setReverseSort((s) => !s)}
          />

          {isLoading && (
            <MvpsContainer>
              {[...Array(64)].map((_, index) => (
                <MvpCardSkeleton key={`skeleton-${index}`} />
              ))}
            </MvpsContainer>
          )}

          {displayAllMvps.length > 0 && (
            <MvpsContainer>
              {displayAllMvps.map((mvp: IMvp) => (
                <MvpCard key={`${mvp.id}-${mvp.name}`} mvp={mvp} />
              ))}
            </MvpsContainer>
          )}
        </Section>
      </Container>

      {!!editingMvp && <ModalEditMvp />}
    </>
  );
}

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Player from '.';
import { displayHeight, displayWeight } from '../../utils/helpers';
import { match, player1 } from '../../utils/mockData';

describe('Test Player', () => {
    describe('Test rendering player without matches', () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Player player={player1} matches={[]} />
                </MemoryRouter>
            );
        });
        it('renders pictures', () => {
            expect(screen.getAllByAltText('player picture')).toBeTruthy();
            expect(screen.getAllByAltText('flag')).toBeTruthy();
        });
        it('renders stats', () => {
            const statsList = within(
                screen.getByRole('list', {
                    name: /stats/i,
                })
            );
            const statsListItem = statsList.getAllByRole('listitem');
            expect(statsListItem.length).toBe(5);

            expect(
                within(statsListItem[0]).getByText(`Age: ${player1.stats.age}`)
            ).toBeInTheDocument();
            expect(
                within(statsListItem[1]).getByText(
                    `Rank: ${player1.stats.rank}`
                )
            ).toBeInTheDocument();
            expect(
                within(statsListItem[2]).getByText(
                    `Points: ${player1.stats.points}`
                )
            ).toBeInTheDocument();
            expect(
                within(statsListItem[3]).getByText(
                    `Weight: ${displayWeight(player1.stats.weight)}`
                )
            ).toBeInTheDocument();
            expect(
                within(statsListItem[4]).getByText(
                    `Height: ${displayHeight(player1.stats.height)}`
                )
            ).toBeInTheDocument();
        });
        it('renders empty matches ', () => {
            const matchesList = within(
                screen.getByRole('list', {
                    name: /matches/i,
                })
            );
            expect(matchesList.getAllByRole('listitem').length).toBe(2);
        });
    });
    describe('Test rendering player with matches', () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Player player={player1} matches={[match]} />
                </MemoryRouter>
            );
        });
        it('renders matches total ', () => {
            expect(
                screen.getByRole('heading', {
                    name: 'Total of played matches: 1',
                })
            ).toBeInTheDocument();
        });
        it('renders matches ', () => {
            const matchesList = within(
                screen.getByRole('list', {
                    name: /matches/i,
                })
            );
            const matchesListItem = matchesList.getAllByRole('listitem');
            expect(matchesList.getAllByRole('listitem').length).toBe(2);
            expect(
                within(matchesListItem[0]).getByText(`Wins 🙌: 1`)
            ).toBeInTheDocument();
            expect(
                within(matchesListItem[1]).getByText(`Loses 😭: 0`)
            ).toBeInTheDocument();
        });
    });
});

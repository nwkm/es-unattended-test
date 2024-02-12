import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Player from '.';
import { displayHeight, displayWeight } from '../../utils/helpers';

const player1: TPlayer = {
    id: 'p-1',
    firstname: 'Gael',
    lastname: 'Monfils',
    sex: 'MAN',
    shortname: 'G.Monfils',
    picture: {
        url: 'pic1',
    },
    country: {
        picture: {
            url: 'country1',
        },
        code: 'FRA',
    },
    stats: {
        rank: 21,
        points: 1784,
        weight: 81000,
        height: 183,
        age: 35,
    },
};

const player2: TPlayer = {
    id: 'p-2',
    firstname: 'Novak',
    lastname: 'Djokovic',
    sex: 'MAN',
    shortname: 'N.Djokovic',
    picture: {
        url: 'pic2',
    },
    country: {
        picture: {
            url: 'country2',
        },
        code: 'SEB',
    },
    stats: {
        rank: 2,
        points: 3784,
        weight: 80000,
        height: 185,
        age: 35,
    },
};

const match: TMatch = {
    players: [player1, player2],
    winner: player1,
    startTime: '2023-02-10T10:00.000Z',
    endTime: '2023-02-10T16:00.000Z',
};

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

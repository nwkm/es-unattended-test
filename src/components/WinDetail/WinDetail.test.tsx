import { render, screen, within } from '@testing-library/react';
import WinDetail from '.';
import dayjs from 'dayjs';
import { match, player1, player2 } from '../../utils/mockData';

const dateFormat = 'ddd DD/MM/YYYY HH:mm';

describe('Test WinDetail', () => {
    describe('Test rendering match without players', () => {
        beforeEach(() => {
            render(<WinDetail match={match} players={[]} />);
        });
        it('renders paragraphs', () => {
            expect(screen.getByText('Competition')).toBeInTheDocument();
            expect(
                screen.getByText(
                    `Start time: ${dayjs(match.startTime).format(dateFormat)}`
                )
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    `End time: ${dayjs(match.endTime).format(dateFormat)}`
                )
            ).toBeInTheDocument();
            expect(screen.getByText('Players:')).toBeInTheDocument();
        });
        it('renders empty players', () => {
            const playersList = within(
                screen.getByRole('list', {
                    name: /player/i,
                })
            );
            const playersListItem = playersList.getAllByRole('listitem');
            expect(playersListItem.length).toBe(2);

            expect(
                within(playersListItem[0]).getByText('')
            ).toBeInTheDocument();
            expect(
                within(playersListItem[1]).getByText('')
            ).toBeInTheDocument();
        });
    });
    describe('Test rendering match with players', () => {
        beforeEach(() => {
            render(<WinDetail match={match} players={[player1, player2]} />);
        });
        it('renders players', () => {
            const playersList = within(
                screen.getByRole('list', {
                    name: /player/i,
                })
            );
            const playersListItem = playersList.getAllByRole('listitem');
            expect(playersListItem.length).toBe(2);

            expect(
                within(playersListItem[0]).getByText(
                    `${player1.firstname} ${player1.lastname}`
                )
            ).toBeInTheDocument();
            expect(
                within(playersListItem[1]).getByText(
                    `${player2.firstname} ${player2.lastname}`
                )
            ).toBeInTheDocument();
        });
    });
});

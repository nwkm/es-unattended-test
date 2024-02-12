import { cleanup, waitFor } from '@testing-library/react';
import PlayerList from '.';
import { renderWithProviders } from '../../utils/test-utils';
import { MemoryRouter } from 'react-router-dom';

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Test PlayerList', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders PlayerList', async () => {
        const { getByText, getByTestId } = renderWithProviders(
            <MemoryRouter>
                <PlayerList />
            </MemoryRouter>
        );

        await sleep(500);

        await waitFor(() => {
            expect(getByText('Unattended Test')).toBeInTheDocument();
            const container = getByTestId('player-list-container');
            expect(container).not.toBeEmptyDOMElement();
        });
    });
});

import { cleanup, waitFor } from '@testing-library/react';
import WinDetailList from '.';
import { renderWithProviders } from '../../utils/test-utils';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Test WinDetailList', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders WinDetailList', async () => {
        const { getByText, getByTestId } = renderWithProviders(
            <Router initialEntries={['/players/player-1']}>
                <Routes>
                    <Route path="/players/:id" element={<WinDetailList />} />
                </Routes>
            </Router>
        );

        await sleep(500);

        await waitFor(() => {
            expect(
                getByText('Details of winning matches:')
            ).toBeInTheDocument();
            const container = getByTestId('windetail-list-container');
            expect(container).not.toBeEmptyDOMElement();
        });
    });
});

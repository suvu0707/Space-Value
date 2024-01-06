import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from '../App';
import Dashboard from '../Dashboard';
import fetchMock from 'jest-fetch-mock';




describe("SpaceValue Form", () => {
    test('Check whether Dashboard Page rendered or not', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        const dashboard = screen.getByTestId(/dashboard/i);
        expect(dashboard).toBeInTheDocument();
    });

    test('Check whether "SpaceVue Dashboard"  rendered or not', () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );
        const dashboard = screen.getByText(/SpaceVue Dashboard/i);
        expect(dashboard).toBeInTheDocument();
    });

    test('Check whether AgGrid  rendered or not', () => {
        render(
            <MemoryRouter>
                <Dashboard isLoggedIn={true} />
            </MemoryRouter>
        );
        const aggrid = screen.getAllByRole(/presentation/i);
        expect(aggrid[0]).toBeInTheDocument();
    });

    test('Check whether PieChart  rendered or not', () => {
        render(
            <MemoryRouter>
                <Dashboard isLoggedIn={true} />
            </MemoryRouter>
        );
        const PieChart = screen.getByRole(/region/i);
        expect(PieChart).toBeInTheDocument();
    });

    
});

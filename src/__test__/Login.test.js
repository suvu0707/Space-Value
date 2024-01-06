import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Login from '../Login';
import App from '../App';

describe("SpaceValue Form", () => {
    test('Check whether Login Page rendered or not', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const loginPage = screen.getByTestId(/login-page/i);
        expect(loginPage).toBeInTheDocument();
    });

    test('Check whether username text rendered or not', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const username = screen.getByLabelText(/Username:/i);
        expect(username).toBeInTheDocument();
    });

    test('Check whether password text rendered or not', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const password = screen.getByLabelText(/Password:/i);
        expect(password).toBeInTheDocument();
    });
    
    test('Check whether username input field rendered or not and also chk onchange event', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
        const usernameInput = screen.getByTestId(/username-input/i);
        expect(usernameInput).toBeInTheDocument();
        fireEvent.change(usernameInput, { target: { value: 'suvu' } });
        expect(usernameInput.value).toBe('suvu');

    });

    test('Check whether password input field rendered or not and also chk onchange event', () => {
        render(
            <App/>
        );
        const passwordInput = screen.getByTestId(/password-input/i);
        expect(passwordInput).toBeInTheDocument();
        fireEvent.change(passwordInput, { target: { value: 'ghghgh' } });
        expect(passwordInput.value).toBe('ghghgh');

    });

    test('Check whether button rendered and chk while clicking login button it rediret us to dashboard page or not', () => {

        render(
            <App/>
        );
        const loginButton = screen.getByRole(/button/i,{ name: /Login/i });
        expect(loginButton).toBeInTheDocument();

        const usernameInput = screen.getByTestId(/username-input/i);
        expect(usernameInput).toBeInTheDocument();
        fireEvent.change(usernameInput, { target: { value: 'demo' } });

        const passwordInput = screen.getByTestId(/password-input/i);
        expect(passwordInput).toBeInTheDocument();
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        expect(usernameInput.value).toBe('demo');
        expect(passwordInput.value).toBe('password');

        fireEvent.click(loginButton);

        expect(screen.getByTestId(/dashboard/i)).toBeInTheDocument();

    });
});

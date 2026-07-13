import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { AppDataProvider } from '../context/AppDataContext';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </MemoryRouter>,
  );
}

describe('UT Parking Portal', () => {
  it('renders the top nav and Home once data loads', async () => {
    renderApp('/');
    // Home renders its status hero and the nav's "Permits & Passes" pill.
    await waitFor(() =>
      expect(screen.getByText('You\'re set to park')).toBeInTheDocument(),
    );
    expect(
      screen.getByRole('link', { name: 'Permits & Passes' }),
    ).toBeInTheDocument();
  });

  it('gates the purchase flow: Continue → Agree & Continue', async () => {
    const user = userEvent.setup();
    renderApp('/permits/new');

    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Continue' }),
      ).toBeInTheDocument(),
    );

    // Step 1: Continue is disabled until an option is chosen.
    const continueBtn = screen.getByRole('button', { name: 'Continue' });
    expect(continueBtn).toBeDisabled();

    // Switch to Passes and select the option card.
    await user.click(screen.getByRole('tab', { name: 'Passes' }));
    await user.click(screen.getByRole('radio', { name: /Parking Perks Pass/ }));
    expect(continueBtn).toBeEnabled();

    // Advance to the agreement step.
    await user.click(continueBtn);
    const agreeBtn = screen.getByRole('button', { name: 'Agree & Continue' });
    expect(agreeBtn).toBeDisabled();

    // Checking the agreement enables the primary button.
    await user.click(
      screen.getByText(
        'I have read and agree to the Agreement for Permits and Passes.',
      ),
    );
    expect(agreeBtn).toBeEnabled();

    // Step 2 → 3: review shows the saved payment method + Place Order.
    await user.click(agreeBtn);
    expect(screen.getByText(/Visa ···· 4242/)).toBeInTheDocument();
    const placeOrderBtn = screen.getByRole('button', { name: 'Place Order' });

    // Step 3 → confirmation: order placed with an order number.
    await user.click(placeOrderBtn);
    await waitFor(() =>
      expect(screen.getByText('Order placed')).toBeInTheDocument(),
    );
    expect(
      screen.getByRole('button', { name: 'View in Permits' }),
    ).toBeInTheDocument();
  });

  it('shows a citation and its pending appeal', async () => {
    renderApp('/citations');
    await waitFor(() =>
      expect(screen.getByText('100234567')).toBeInTheDocument(),
    );
    expect(screen.getByText('$75.00')).toBeInTheDocument();
    expect(screen.getByText('Appeal pending')).toBeInTheDocument();
    // Appeals stat tile reflects the number of appeals on the account.
    const appealsTile = screen.getByText('Appeals').parentElement!;
    expect(within(appealsTile).getByText('2')).toBeInTheDocument();
  });
});

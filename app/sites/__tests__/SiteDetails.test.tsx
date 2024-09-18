import { render, screen, waitFor } from '@testing-library/react';
import SiteDetails from '@/app/sites/[id]/page';
import { fetchClientById, fetchSiteById } from '@/lib/api';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

// Mocking the fetchClientById and fetchSiteById API functions
jest.mock('@/lib/api', () => ({
  fetchClientById: jest.fn(),
  fetchSiteById: jest.fn(),
}));

describe('SiteDetails Page', () => {
  it('renders the site details correctly', async () => {
    const mockSite = {
      id: '1',
      title: 'Test Site',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        zipCode: '12345',
      },
      images: ['https://example.com/image.jpg'],
      contacts: {
        main: {
          id: 'contact1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '123-456-7890',
          jobTitle: 'Manager',
          address: {
            street: '456 Main St',
            city: 'Contact City',
            state: 'Contact State',
            country: 'Contact Country',
            zipCode: '67890',
          },
        },
      },
      clientId: '1',
      createdAt: '2023-09-18T12:00:00Z',
      updatedAt: '2023-09-18T12:00:00Z',
      tags: ['Test', 'Example'],
    };

    const mockClient = {
      id: '1',
      givenName: 'Test Client',
      logo: 'https://example.com/logo.jpg',
      tags: ['VIP', 'Corporate'],
    };

    (fetchSiteById as jest.MockedFunction<typeof fetchSiteById>).mockResolvedValue(mockSite);
    (fetchClientById as jest.MockedFunction<typeof fetchClientById>).mockResolvedValue(mockClient);

    render(<SiteDetails params={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.getByText('Test Site')).toBeInTheDocument();
      expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });
  });
});

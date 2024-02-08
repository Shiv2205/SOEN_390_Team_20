import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('SignUp component', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<SignUp />);
    expect(getByText('Create an Account')).toBeInTheDocument();
    expect(getByLabelText('Full Name:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Already have an account?')).toBeInTheDocument();
  });

  it('displays error message if form validation fails', () => {
    const { getByLabelText, getByText } = render(<SignUp />);
    const passwordInput = getByLabelText('Password:');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.submit(getByText('Sign Up'));
    expect(getByText('The fix the following to continue:')).toBeInTheDocument();
    expect(getByText('1. Passwords must match')).toBeInTheDocument();
  });

  it('calls setView with LOGIN when "Log in" link is clicked', () => {
    const setViewMock = jest.fn();
    const { getByText } = render(<SignUp views={{ LOGIN: 'login-view' }} setView={setViewMock} />);
    const logInLink = getByText('Log in');
    fireEvent.click(logInLink);
    expect(setViewMock).toHaveBeenCalledWith('login-view');
  });
});

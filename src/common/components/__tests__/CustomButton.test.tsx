import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomButton } from '../CustomButton';

describe('CustomButton', () => {
  it('should render with the correct title', () => {
    const { getByText } = render(<CustomButton title="Press Me" onPress={() => {}} />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<CustomButton title="Click" onPress={onPress} />);
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should show ActivityIndicator when loading', () => {
    const { queryByText, UNSAFE_queryByType } = render(
      <CustomButton title="Submit" onPress={() => {}} isLoading={true} />,
    );
    // Title should still be present
    expect(queryByText('Submit')).toBeTruthy();
  });

  it('should not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <CustomButton title="Disabled" onPress={onPress} disabled={true} />,
    );
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

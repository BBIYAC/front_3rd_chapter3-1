import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Notification } from '../../components/Notification';

describe('Notification 컴포넌트 테스트', () => {
  const setNotifications = vi.fn();

  const defaultProps = {
    index: 0,
    notification: {
      id: '1',
      message: 'This is a test notification!',
    },
    setNotifications,
  };
  const renderNotification = (props = defaultProps) => {
    return {
      ...render(
        <ChakraProvider>
          <Notification {...props} />
        </ChakraProvider>
      ),
    };
  };

  it('Notification이 제대로 렌더링 되어야 한다', () => {
    renderNotification();

    expect(screen.getByText('This is a test notification!')).toBeInTheDocument();
  });

  it('Close 버튼 클릭 시 setNotifications이 호출되어야 한다', () => {
    renderNotification();

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(setNotifications).toHaveBeenCalledWith(expect.any(Function));
  });
});

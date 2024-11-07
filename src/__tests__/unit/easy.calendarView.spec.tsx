import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { CalendarView, ICalendarView } from '../../components/CalendarView';

describe('CalendarView 컴포넌트 테스트', () => {
  const mockNavigate = vi.fn();
  const mockSetView = vi.fn();

  const defaultProps: ICalendarView = {
    currentDate: new Date(),
    holidays: {},
    filteredEvents: [],
    notifiedEvents: [],
    navigate: mockNavigate,
    view: 'week',
    setView: mockSetView,
  };

  const renderEditView = () => {
    return {
      ...render(
        <ChakraProvider>
          <CalendarView props={defaultProps} />
        </ChakraProvider>
      ),
    };
  };

  it('컴포넌트가 렌더링되어야 한다', () => {
    renderEditView();

    expect(screen.getByText('일정 보기')).toBeInTheDocument();
  });

  it('기본적으로 "week" 뷰가 표시되어야 한다', () => {
    renderEditView();

    expect(screen.getByText('Week')).toBeInTheDocument();
  });

  it('"Next" 버튼을 클릭하면 navigate 함수가 "next" 방향으로 호출되어야 한다', () => {
    renderEditView();

    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(mockNavigate).toHaveBeenCalledWith('next');
  });

  it('"Previous" 버튼을 클릭하면 navigate 함수가 "prev" 방향으로 호출되어야 한다', () => {
    renderEditView();

    const prevButton = screen.getByLabelText('Previous');
    fireEvent.click(prevButton);
    expect(mockNavigate).toHaveBeenCalledWith('prev');
  });

  it('Select 메뉴에서 "month" 뷰를 선택하면 setView 함수가 호출되어야 한다', () => {
    renderEditView();

    const selectMenu = screen.getByLabelText('view');
    fireEvent.change(selectMenu, { target: { value: 'month' } });
    expect(mockSetView).toHaveBeenCalledWith('month');
  });
});

import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditView } from '../../components/EditView';

const mockSaveEvent = vi.fn();
const mockSetOverlappingEvents = vi.fn();
const mockSetIsOverlapDialogOpen = vi.fn();

const renderEditView = () => {
  render(
    <ChakraProvider>
      <EditView
        props={{
          events: [],
          setOverlappingEvents: mockSetOverlappingEvents,
          setIsOverlapDialogOpen: mockSetIsOverlapDialogOpen,
          saveEvent: mockSaveEvent,
        }}
      />
    </ChakraProvider>
  );
};

describe('EditView 컴포넌트', () => {
  it('일정 추가 시 필수 항목이 비어 있으면 에러 메시지가 표시된다.', async () => {
    renderEditView();

    const submitButton = screen.getByTestId('event-submit-button');

    await userEvent.click(submitButton);

    const toastError = await screen.findByText('필수 정보를 모두 입력해주세요.');
    expect(toastError).toBeInTheDocument();
  });

  it('반복 일정 설정이 있을 경우, 반복 옵션들이 정상적으로 표시된다.', async () => {
    renderEditView();

    const repeatCheckbox = screen.getByLabelText('반복 일정');
    await userEvent.click(repeatCheckbox);

    const repeatTypeSelect = screen.getByLabelText('반복 유형');
    expect(repeatTypeSelect).toBeInTheDocument();

    const repeatIntervalInput = screen.getByLabelText('반복 간격');
    expect(repeatIntervalInput).toBeInTheDocument();

    const repeatEndDateInput = screen.getByLabelText('반복 종료일');
    expect(repeatEndDateInput).toBeInTheDocument();
  });
});

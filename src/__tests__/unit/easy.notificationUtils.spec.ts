import { mockEvents } from '../../__mocks__/mockEvents';
import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const now = new Date('2024-09-01 09:30');
    const notifiedEvents: string[] = [];
    const events = [...mockEvents];
    const upcomingEvents: Event[] = getUpcomingEvents(events, now, notifiedEvents);

    expect(upcomingEvents).toEqual([
      {
        id: '1',
        title: '회의',
        date: '2024-09-01',
        startTime: '10:00',
        endTime: '11:00',
        description: '팀 미팅',
        location: '회의실',
        category: '업무',
        repeat: {
          type: 'none',
          interval: 0,
        },
        notificationTime: 30,
      },
    ]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const now = new Date('2024-10-01 10:00');
    const notifiedEvents: string[] = ['1'];
    const events = [...mockEvents];
    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-10-01 10:00');
    const notifiedEvents: string[] = [];
    const events = [...mockEvents];
    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const now = new Date('2024-10-01 10:10');
    const notifiedEvents: string[] = [];
    const events = [...mockEvents];
    const result = getUpcomingEvents(events, now, notifiedEvents);

    expect(result).toEqual([]);
  });
});

describe('createNotificationMessage', () => {
  it('이벤트에 맞는 올바른 알림 메시지를 생성해야 한다', () => {
    const [mockEvent] = [...mockEvents];
    const message = createNotificationMessage(mockEvent);

    expect(message).toBe('30분 후 회의 일정이 시작됩니다.');
  });
});

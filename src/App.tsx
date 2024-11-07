import { Box, Flex, VStack } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { CalendarView, ICalendarView } from './components/CalendarView.tsx';
import { EditView, IEditView } from './components/EditView.tsx';
import { Notification } from './components/Notification.tsx';
import { OverlapDialog } from './components/OverlapDialog.tsx';
import { ISearchView, SearchView } from './components/SearchView.tsx';
import { useCalendarView } from './hooks/useCalendarView.ts';
import { useEventOperations } from './hooks/useEventOperations.ts';
import { useNotifications } from './hooks/useNotifications.ts';
import { useSearch } from './hooks/useSearch.ts';
import { useEventForm } from './store/store.ts';
import { Event } from './types';

function App() {
  const { editingEvent, setEditingEvent, editEvent } = useEventForm();

  const { events, saveEvent, deleteEvent } = useEventOperations(Boolean(editingEvent), () =>
    setEditingEvent(null)
  );

  const { notifications, notifiedEvents, setNotifications } = useNotifications(events);
  const { view, setView, currentDate, holidays, navigate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);

  const [isOverlapDialogOpen, setIsOverlapDialogOpen] = useState(false);
  const [overlappingEvents, setOverlappingEvents] = useState<Event[]>([]);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const editViewProps: IEditView = {
    events,
    setOverlappingEvents,
    setIsOverlapDialogOpen,
    saveEvent,
  };

  const calendarViewProps: ICalendarView = {
    currentDate,
    holidays,
    filteredEvents,
    notifiedEvents,
    navigate,
    view,
    setView,
  };

  const searchViewProps: ISearchView = {
    filteredEvents,
    notifiedEvents,
    searchTerm,
    setSearchTerm,
    editEvent,
    deleteEvent,
  };

  const overlapDialogProps = {
    isOverlapDialogOpen,
    cancelRef,
    setIsOverlapDialogOpen,
    overlappingEvents,
    saveEvent,
  };

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EditView props={editViewProps} />

        <CalendarView props={calendarViewProps} />

        <SearchView props={searchViewProps} />
      </Flex>

      <OverlapDialog props={overlapDialogProps} />

      {notifications.length > 0 && (
        <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
          {notifications.map((notification, index) => (
            <Notification
              index={index}
              notification={notification}
              setNotifications={setNotifications}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default App;

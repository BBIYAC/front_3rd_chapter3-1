import { atom, useAtom } from 'jotai';
import { ChangeEvent, useCallback, useEffect } from 'react';

import { Event, RepeatType } from '../types';
import { getTimeErrorMessage } from '../utils/timeValidation';

type TimeErrorRecord = Record<'startTimeError' | 'endTimeError', string | null>;

const titleAtom = atom('');
const dateAtom = atom('');
const startTimeAtom = atom('');
const endTimeAtom = atom('');
const descriptionAtom = atom('');
const locationAtom = atom('');
const categoryAtom = atom('');
const isRepeatingAtom = atom(false);
const repeatTypeAtom = atom<RepeatType>('none');
const repeatIntervalAtom = atom(1);
const repeatEndDateAtom = atom('');
const notificationTimeAtom = atom(10);
const editingEventAtom = atom<Event | null>(null);
const timeErrorAtom = atom<TimeErrorRecord>({
  startTimeError: null,
  endTimeError: null,
});

export const useEventForm = (initialEvent?: Event) => {
  const [title, setTitle] = useAtom(titleAtom);
  const [date, setDate] = useAtom(dateAtom);
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [endTime, setEndTime] = useAtom(endTimeAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const [category, setCategory] = useAtom(categoryAtom);
  const [isRepeating, setIsRepeating] = useAtom(isRepeatingAtom);
  const [repeatType, setRepeatType] = useAtom(repeatTypeAtom);
  const [repeatInterval, setRepeatInterval] = useAtom(repeatIntervalAtom);
  const [repeatEndDate, setRepeatEndDate] = useAtom(repeatEndDateAtom);
  const [notificationTime, setNotificationTime] = useAtom(notificationTimeAtom);

  const [editingEvent, setEditingEvent] = useAtom(editingEventAtom);
  const [{ startTimeError, endTimeError }, setTimeError] = useAtom(timeErrorAtom);

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title);
      setDate(initialEvent.date);
      setStartTime(initialEvent.startTime);
      setEndTime(initialEvent.endTime);
      setDescription(initialEvent.description);
      setLocation(initialEvent.location);
      setCategory(initialEvent.category);
      setIsRepeating(initialEvent.repeat.type !== 'none');
      setRepeatType(initialEvent.repeat.type);
      setRepeatInterval(initialEvent.repeat.interval);
      setRepeatEndDate(initialEvent.repeat.endDate || '');
      setNotificationTime(initialEvent.notificationTime);
    }
  }, [
    initialEvent,
    setTitle,
    setDate,
    setStartTime,
    setEndTime,
    setDescription,
    setLocation,
    setCategory,
    setIsRepeating,
    setRepeatType,
    setRepeatInterval,
    setRepeatEndDate,
    setNotificationTime,
  ]);

  const handleStartTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newStartTime = e.target.value;
      setStartTime(newStartTime);
      setTimeError(getTimeErrorMessage(newStartTime, endTime));
    },
    [setStartTime, setTimeError, endTime]
  );

  const handleEndTimeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newEndTime = e.target.value;
      setEndTime(newEndTime);
      setTimeError(getTimeErrorMessage(startTime, newEndTime));
    },
    [setEndTime, setTimeError, startTime]
  );

  const resetForm = useCallback(() => {
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setDescription('');
    setLocation('');
    setCategory('');
    setIsRepeating(false);
    setRepeatType('none');
    setRepeatInterval(1);
    setRepeatEndDate('');
    setNotificationTime(10);
  }, [
    setTitle,
    setDate,
    setStartTime,
    setEndTime,
    setDescription,
    setLocation,
    setCategory,
    setIsRepeating,
    setRepeatType,
    setRepeatInterval,
    setRepeatEndDate,
    setNotificationTime,
  ]);

  const editEvent = useCallback(
    (event: Event) => {
      setEditingEvent(event);
      setTitle(event.title);
      setDate(event.date);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description);
      setLocation(event.location);
      setCategory(event.category);
      setIsRepeating(event.repeat.type !== 'none');
      setRepeatType(event.repeat.type);
      setRepeatInterval(event.repeat.interval);
      setRepeatEndDate(event.repeat.endDate || '');
      setNotificationTime(event.notificationTime);
    },
    [
      setCategory,
      setDate,
      setDescription,
      setEditingEvent,
      setEndTime,
      setIsRepeating,
      setLocation,
      setRepeatEndDate,
      setRepeatInterval,
      setRepeatType,
      setStartTime,
      setTitle,
      setNotificationTime,
    ]
  );

  return {
    title,
    setTitle,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    description,
    setDescription,
    location,
    setLocation,
    category,
    setCategory,
    isRepeating,
    setIsRepeating,
    repeatType,
    setRepeatType,
    repeatInterval,
    setRepeatInterval,
    repeatEndDate,
    setRepeatEndDate,
    notificationTime,
    setNotificationTime,
    startTimeError,
    endTimeError,
    editingEvent,
    setEditingEvent,
    handleStartTimeChange,
    handleEndTimeChange,
    resetForm,
    editEvent,
  };
};

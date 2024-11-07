import { Alert, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
import React from 'react';

interface INotification {
  id: string;
  message: string;
}

interface INotificationProps {
  index: number;
  notification: INotification;
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

export function Notification({ index, notification, setNotifications }: INotificationProps) {
  return (
    <Alert key={index} status="info" variant="solid" width="auto">
      <AlertIcon />
      <Box flex="1">
        <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
      </Box>
      <CloseButton
        onClick={() =>
          setNotifications((prev: { id: string; message: string }[]) =>
            prev.filter((_, i) => i !== index)
          )
        }
      />
    </Alert>
  );
}

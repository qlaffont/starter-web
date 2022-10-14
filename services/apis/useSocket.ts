import { getAccessToken } from 'next-protected-auth';
import { useEffect, useState } from 'react';
import { Manager, Socket } from 'socket.io-client';

const base = process.env.NEXT_PUBLIC_API_URL as string;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const [manager, setManager] = useState<Manager>();

  useEffect(() => {
    const manager = new Manager(base, {
      reconnectionDelayMax: 500,
      reconnectionDelay: 500,
      transports: ['websocket'],
    });

    const newSocket = manager.socket('/', {
      auth: {
        token: getAccessToken() || undefined,
      },
    });

    setManager(manager);

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return { socket: socket as Socket, manager };
};

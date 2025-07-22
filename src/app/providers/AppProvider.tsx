import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

interface AppProviderProps {
    children: ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}

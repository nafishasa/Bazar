'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const getToday = () =>
    new Date().toLocaleDateString('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

const TodayDate = () => {
    const today = useSyncExternalStore(subscribe, getToday, () => '');

    return (
        <span >
            {today || '\u00A0'}
        </span>
    );
};

export default TodayDate;
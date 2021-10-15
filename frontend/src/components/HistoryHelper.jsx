import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const HistoryHelper = ({historyHelper, setHistoryHelper}) => {
    const history = useHistory();

    useEffect(() => {
        if(historyHelper) {
            history.push('/');
            setHistoryHelper(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historyHelper]);

    return (
        <>
        </>
    )
}

export default HistoryHelper;

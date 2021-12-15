import axios from 'axios';


export const getMemoByUid = async id => {
  const response = await axios.get(`/get/${id}`);
  return response.data;
};

export const createMemo = Data => {
    const raw = JSON.stringify(Data);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body: raw
    };

    fetch(`/save`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log("error");
        });
};

export const editMemo = Data => {
    const raw = JSON.stringify(Data);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body: raw
    };

    fetch(`/edit`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log("error");
        });
};

export const deletetMemo = async Data => {
    const raw = JSON.stringify(Data);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body: raw
    };

    const response = await fetch(`/delete`, requestOptions);
    const data = await response.json();

};

export const moveMemo = Data => {
    const raw = JSON.stringify(Data);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        body: raw
    };

    fetch(`/move`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log("error");
        });
};
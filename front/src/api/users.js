import axios from 'axios';


export const getMemoByUid = async id => {
  const response = await axios.get(`/get/${id}`);
  console.log(response);
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
}

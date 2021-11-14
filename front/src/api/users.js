import axios from 'axios';


export const getMemoByUid = async id => {
  const response = await axios.get(`http://52.79.173.249:8080/get/${id}`);
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

    fetch(`http://52.79.173.249:8080/save`, requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log("error");
        });
}

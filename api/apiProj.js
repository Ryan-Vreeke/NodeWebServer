document.getElementById('submit').onclick = () => {
    let pName = document.getElementById('pName');
    let des = document.getElementById('des');

    alert(pName.value + " created!");

    function sendData(){

        const data = {
            name: pName.value,
            des: des.value
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response= fetch('/projects', options);
    };

    console.log(sendData());
    pName.value = '';
    des.value = '';
};
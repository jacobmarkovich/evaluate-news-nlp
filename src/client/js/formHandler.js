import { isURL } from "./isURL";
function handleSubmit(event) {
    event.preventDefault();
    const inputURL = document.getElementById("url").value;  //grabs the URL the user input
    const getURL = "http://localhost:3030/apiData";

    const getSummary = async () => {
        if (!isURL(inputURL)) {
            alert("Please enter a valid URL"); //has a page alert when the input is not a URL
            return;
        }
        const res = await fetch(getURL, { //sends the user's URL to the server for the API to use
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: inputURL}),
        })
        .then(res => res.json()) //retrieves the api data back from the server
        .then((res) => {  //posts the retrieved data to the webpage
            console.log('2', res.confidence)  //log to help TS the flow of data
            document.getElementById('sub').innerHTML = res.subjectivity.toLowerCase();
            document.getElementById('obj').innerHTML = res.confidence +'%';
        })
        .catch((error) => {
            console.log("error", error);
        })
    };
    //runs the function
    getSummary();
}

export { handleSubmit };

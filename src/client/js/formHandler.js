import { isURL } from "./isURL";
function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    const url = document.getElementById("url").value;
    const apiKey = process.env.API_KEY;
    const baseURL = `https://api.meaningcloud.com/summarization-1.0?key=${apiKey}&url=${url}&sentences=5`;
    const postURL = "http://localhost:3030/";
    const getURL = "http://localhost:3030/all";

    const getSummary = async () => {
        if (!isURL(url)) {
            alert("Please enter a valid URL"); //has a page alert when the input is not a URL
            return;
        }
        const res = await fetch(`${baseURL}`);
        try {
            const apiData = await res.json();
            console.log(apiData.summary);
            const data = apiData.summary;
            await postData(postURL, { summary: data });
            await updateUI();
            return data;
        } catch (error) {
            console.log("error", error);
        }
    };

    const postData = async (path, data = {}) => {
        const response = await fetch(path, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    };
    const updateUI = async () => {
        //updates the html to add the summary of the input webpage article
        const response = await fetch(getURL);
        const jsonResponse = await response.json();
        document.getElementById("summary").innerHTML = jsonResponse.summary;
    };
    getSummary();
}

export { handleSubmit };

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const url = document.getElementById('url').value
    // Client.checkForName(url)
    const apiKey = '94097ff154d56ff5ee96f535c837e300'
    const baseURL = `https://api.meaningcloud.com/summarization-1.0?key=${apiKey}&url=${url}&sentences=5`
    //const endURL = '&sentences=5'
    const postURL = 'http://localhost:3030/'
    const getURL = 'http://localhost:3030/all'

    // console.log("::: Form Submitted :::")

    const getSummary = async () => {
        const res = await fetch(`${baseURL}`)
        try {
            const apiData = await res.json()
            console.log(apiData.summary)
            const data = apiData.summary
        await postData(postURL, data)
        updateUI()
        return data
    } catch (error) {
        alert("Invalid URL")
        console.log('error', error)
    }} 

    const postData = async (path, data = {}) => {
        const response = await fetch(path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(data),
        })
    }
    const updateUI = async () => {
        const response = await fetch(getURL)
        const jsonResponse = await response.json()
        document.getElementById('summary').innerHTML = jsonResponse.summary
    }
    // fetch('//localhost:3030/sentiment-analysis', {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ url })
    // })
    // .then(res => res.json())
    // .then(data => {
    //     document.getElementById('nlp-text').innerHTML = data.text;
    //     document.getElementById('polarity').innerHTML = data.polarity;
    //     document.getElementById('polarity_confidence').innerHTML = data.polarity_confidence;
    //     document.getElementById('subjectivity').innerHTML = data.subjectivity;
    //     document.getElementById('subjectivity_confidence').innerHTML = data.subjectivity_confidence;
    // })
    getSummary()
}

export { handleSubmit }

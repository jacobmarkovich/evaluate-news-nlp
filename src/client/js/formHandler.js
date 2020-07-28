function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const url = document.getElementById('url').value
    Client.checkForName(url)

    console.log("::: Form Submitted :::")
    fetch('//localhost:8081/sentiment-analysis', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ test: url })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('nlp-text').innerHTML = data.text;
        document.getElementById('polarity').innerHTML = data.polarity;
        document.getElementById('polarity_confidence').innerHTML = data.polarity_confidence;
        document.getElementById('subjectivity').innerHTML = data.subjectivity;
        document.getElementById('subjectivity_confidence').innerHTML = data.subjectivity_confidence;
    })
}

export { handleSubmit }

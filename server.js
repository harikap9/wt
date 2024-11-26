const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

// Middleware
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib route handler with styled response
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { adjective1, noun1, verb1, adverb1, noun2 } = req.body;
    
    // Check if all fields are filled
    if (!adjective1 || !noun1 || !verb1 || !adverb1 || !noun2) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Case Interruption</title>
                <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Courier Prime', monospace;
                        background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://ideogram.ai/assets/image/lossless/response/1_YQf_RN2ST-M7lBmAcfVjg');
                        background-size: cover;
                        background-position: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        color: #f9fafb;
                    }
                    .error-container {
                        background: rgba(31,41,55,0.9);
                        border: 2px solid #dc2626;
                        border-radius: 5px;
                        padding: 2rem;
                        max-width: 500px;
                        text-align: center;
                    }
                    h1 { color: #dc2626; }
                    a {
                        display: inline-block;
                        background-color: #1f2937;
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 3px;
                        margin-top: 1rem;
                        transition: background-color 0.3s ease;
                    }
                    a:hover {
                        background-color: #dc2626;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>Case File Incomplete 🚨</h1>
                    <p>All case details must be filled to proceed with the investigation.</p>
                    <a href="/ITC505/lab-7/index.html">Return to Briefing</a>
                </div>
            </body>
            </html>
        `);
        return;
    }
    
    // Create the styled mad lib story response
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Classified Case Report</title>
            <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Courier Prime', monospace;
                    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://ideogram.ai/assets/image/lossless/response/1_YQf_RN2ST-M7lBmAcfVjg');
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 1rem;
                    color: #f9fafb;
                }
                .story-container {
                    background: rgba(31,41,55,0.9);
                    border: 2px solid #dc2626;
                    border-radius: 5px;
                    padding: 2rem;
                    max-width: 600px;
                    text-align: center;
                }
                h1 {
                    color: #dc2626;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .story-text {
                    line-height: 1.6;
                    color: #f3f4f6;
                    font-size: 1rem;
                }
                .highlighted {
                    color: #dc2626;
                    font-weight: bold;
                }
                .action-link {
                    display: inline-block;
                    background-color: #1f2937;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 3px;
                    margin-top: 1rem;
                    transition: background-color 0.3s ease;
                }
                .action-link:hover {
                    background-color: #dc2626;
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>Confidential Case File</h1>
                <div class="story-text">
                    <p>
                        In the dark underbelly of the city, a 
                        <span class="highlighted">${adjective1}</span> 
                        <span class="highlighted">${noun1}</span> 
                        was determined to <span class="highlighted">${verb1}</span>. 
                        Moving <span class="highlighted">${adverb1}</span> 
                        through the shadows, they stumbled upon a crucial 
                        <span class="highlighted">${noun2}</span>. 
                        Little did they know, this discovery would unravel a conspiracy that would shake the city to its core.
                    </p>
                </div>
                <a href="/ITC505/lab-7/index.html" class="action-link">Open New Case 🕵️</a>
            </div>
        </body>
        </html>
    `);
});

const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

let port = 80
if (process.argv[2] === 'local') {
    port = 8080
}

server.listen(port, () => console.log('Ready on localhost!'))
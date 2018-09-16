// get all HYF repos and display in a drop-down menu
// https://api.github.com/orgs/HackYourFuture/repos?per_page=100
// when repo selected, display repo details
// for EACH repo, GET and display contributors (contributors_url)



const root = document.getElementById("root")
const contributorsDiv = document.createElement("div")
//const contributorsDiv = document.createElement("div")

// 4 methods on xhr - open, onload, onerror, send

let repoDetails = [] // name, cont. url { name: 'sss', cont.url: "sss"}


function getRepos() {

    const fetchJSON = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

    const request = new XMLHttpRequest();
    request.open("GET", fetchJSON);
    request.onload = function () {
        if (request.status === 200) {
            const repoData = JSON.parse(request.response)

            repoDetails = repoData.map(repo => {
                return { name: repo.name, contributorsURL: repo.contributors_url }
            })

            const div = document.createElement("div")
            const select = document.createElement("select")
            const defaultOption = `<option value="" selected disabled hidden>Choose repo</option>`
            const repoOptions = repoDetails.map((repo, i) => `<option value=${i}>${repo.name}</option>`)
            select.innerHTML = defaultOption + repoOptions
            select.onchange = event => getContributors(event.target.value)
            div.appendChild(select)
            root.appendChild(div)
        }
    }
    request.onerror = function () {
        console.error(request.statusText)
    }

    request.send()
}



function getContributors(index) {
    contributorsDiv.innerHTML = ""
    const contributorsURL = repoDetails[index].contributorsURL
    const div = document.createElement("div")

    const request = new XMLHttpRequest()

    request.open("GET", contributorsURL)

    request.onload = function () {
        if (request.status === 200) {
            const constributorsData = JSON.parse(request.response)

            console.log(constributorsData)

            const contributors = constributorsData.map(contributor => {
                return `
                    <p>${contributor.login}</p>
                    <img src=${contributor.avatar_url}>`
            })

            div.innerHTML = contributors
            contributorsDiv.appendChild(div)

            root.appendChild(contributorsDiv)
        }
    }
    request.onerror = function () {
        console.error(request.statusText)
    }
    request.send()
}

getRepos()
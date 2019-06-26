import {sleep} from './util'

const PROFILES_KEY = 'profiles';

function getProfiles() {
    return new Promise((resolve, reject) => {
        let storage = JSON.parse(localStorage.getItem(PROFILES_KEY));

        if (localStorage.getItem(PROFILES_KEY) === null) {
            storage = {profiles: []};
            localStorage.setItem(PROFILES_KEY, JSON.stringify(storage))
        }

        sleep(1000).then(() => {
            resolve(new Map(storage.profiles))
        })
    })
}

function update(data) {
    const stringified = JSON.stringify({PROFILES_KEY: Array.from(data)})
    localStorage.setItem(PROFILES_KEY, stringified)

    return data
}

export {
    getProfiles
}
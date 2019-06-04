import {sleep} from './util'

function getProfiles() {
    const PROFILES_KEY = 'profiles'

    return new Promise((resolve, reject) => {
        let storage = JSON.parse(localStorage.getItem(PROFILES_KEY))

        if (localStorage.getItem(PROFILES_KEY) === null) {
            storage = {profiles: []}
            localStorage.setItem(PROFILES_KEY, JSON.stringify(storage))
        }

        sleep(1000).then(() => {
            resolve(new Map(storage.profiles))
        })
    })
}

export {
    getProfiles
}
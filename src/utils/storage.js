import {sleep} from './util'

const PROFILE_KEY = 'profile';

function getProfile() {
    return new Promise((resolve, reject) => {
        let storage = JSON.parse(localStorage.getItem(PROFILE_KEY));

        if (localStorage.getItem(PROFILE_KEY) === null) {
            storage = {currentStep: 0};
            localStorage.setItem(PROFILE_KEY, JSON.stringify(storage))
        }

        sleep(1000).then(() => {
            resolve(storage.currentStep)
        })
    })
}

function update(data) {
    const stringified = JSON.stringify({'currentStep': data})
    localStorage.setItem(PROFILE_KEY, stringified)

    return data
}

export {
    getProfile,
    update
}
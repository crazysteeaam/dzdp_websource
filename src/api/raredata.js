import {get} from './index'

const baseUrl='raredata'

export const getraredata = async () => {
    return await get(`${baseUrl}`)
}
import {get} from "./index.js";


const baseUrl='userbook'

export const getstartdata = async () => {
    return await get(`${baseUrl}`)
}
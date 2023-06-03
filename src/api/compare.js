import {get} from "./index.js";

const baseUrl='compare'

export const getstartdata = async () => {
    return await get(`${baseUrl}`)
}
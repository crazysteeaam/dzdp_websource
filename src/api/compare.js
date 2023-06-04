import {get} from "./index.js";

const baseUrl = 'compare'

export const getstartdata = async () => {
    return await get(`${baseUrl}`)
}

export const getcomparedata3 = async (merchant1, merchant2, merchant3) => {
    return await get(`${baseUrl}3/${merchant1}/${merchant2}/${merchant3}`)
}

export const getcomparedata2 = async (merchant1, merchant2) => {
    return await get(`${baseUrl}2/${merchant1}/${merchant2}`)
}

export const getcomparedata1 = async (merchant1) => {
    return await get(`${baseUrl}1/${merchant1}`)
}
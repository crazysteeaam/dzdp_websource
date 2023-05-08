import {get} from "./index.js";


const baseUrl='analyze'


/**
 * 获取地址列表
 */

export const getstartdata = async () => {
    return await get(`${baseUrl}`)
}

export const getdata1 = async (merchantname) => {
    return await get(`${baseUrl}_data1/`+merchantname)
}
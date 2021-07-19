"use strict";

const axios = require('axios');
const ZoomDetailService = require('../services/ZoomDetailService')


const customAxios = axios.create({});
customAxios.interceptors.response.use(async (response) => {
    return response;
}, async (error) => {
    if (error.response && error.response.data) {
        console.error("===============ERROR RESPONSE==========", error.response.data)
        let originalRequest = error.config
        if (error.response.data.code == 124 && !originalRequest._retry) {
            originalRequest._retry=true;
            const access_token = await refreshAccessToken(error.config.optional, error.config.userId);
            originalRequest.headers.Authorization = 'Bearer ' +  access_token
            return customAxios.request(originalRequest);
        } else {
            return Promise.reject(error.message);

        }
    }
});


async function refreshAccessToken(refresh_token, userId) {
    try {
        var config = {
            method: 'post',
            url: `https://zoom.us/oauth/token?refresh_token=${refresh_token}&grant_type=refresh_token`,
            headers: {
                'Authorization': 'Basic ' + process.env.ZOOM_API_KEY
            }
        };
        const responseDetails = await axios(config);
        let data = {
            access_token: responseDetails.data.access_token,
            refresh_token: responseDetails.data.refresh_token
        }
        await ZoomDetailService.updateAccessToken(data, userId);
        return responseDetails.data.access_token;
    } catch (err) {
        console.log("=====Error====", err.message)
    }
}

module.exports = customAxios
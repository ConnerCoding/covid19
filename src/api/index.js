import axios from 'axios';

const url = "https://covid19.mathdro.id/api";
export const fetchData = async (country) => {
    let dynamicURL = url;
    if (country) {
        dynamicURL = `${url}/countries/${country}`;
    }
    
    try {
        const {data: {confirmed, deaths, recovered, lastUpdate}} = await axios.get(dynamicURL);
        return {confirmed, deaths, recovered, lastUpdate};
    } catch (error) {
        return error;
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const dailyData = data.map((dataPoint) => {
            return {
                confirmed: dataPoint.confirmed.total,
                deaths: dataPoint.deaths.total,
                date: dataPoint.reportDate
            }
        });
        return dailyData;
    } catch (error) {
        return error;
    }
}

export const countriesAPI = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries`);
        return countries;
    } catch (error) {
        console.log(error);
    }
    
}
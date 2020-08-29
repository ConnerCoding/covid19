import axios from 'axios';

const url = "https://covid19.mathdro.id/api";

// If country is passed in, fetch data for specific
// country, otherwise get global data
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

// Get data for daily data points to plot global line chart
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

// Fetch list of countries for the country picker dropdown
export const countriesAPI = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries`);
        return countries;
    } catch (error) {
        return error;
    }
    
}
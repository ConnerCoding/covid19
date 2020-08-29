import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: {confirmed, recovered, deaths}, country }) => {
    const [dailyData, setDailyData] = useState({});

    // Fetch the global daily data from the API and place into state
    useEffect(() => {
        const getDailyData = async () => {
            setDailyData(await fetchDailyData());
        }
        getDailyData();
    }, []);

    // Render line chart if we are showing global data
    const lineChart = (
        // If there is length, that means we are rendering global daily data - otherwise null
        dailyData.length ?
        (<Line 
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }]
            }}
        />) : null
    )

    // Render bar chart for showing country-specific data
    const barChart = (
                // If confirmed prop has value, that means we received country-specific data
                confirmed ? (
                    <Bar 
                        data={{
                            labels: ['Infected', 'Recovered', 'Deaths'],
                            datasets: [{
                                label: 'People',
                                backgroundColor: [
                                    'rgba(0, 0, 255, 0.5)',
                                    'rgba(0, 255, 0, 0.5)',
                                    'rgba(255, 0, 0, 0.5)',
                                ],
                                data: [confirmed.value, recovered.value, deaths.value]
                            }]
                        }}
                        options={{
                            legend: { display: false },
                            title: { display: true, text: `Current state in ${country}`}
                        }}
                    />
                ) : null
    );

    return(
        <div className={styles.container}>
            {(country || country === 'Global') ? barChart : lineChart}
        </div>
    )
}

export default Chart;
import React, {Component} from 'react';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import styles from './App.module.css';
import {fetchData} from './api';
import headerImage from './images/image.png';

class App extends Component {

    state = {
        data: {},
        country: ''
    }

    // Fetch global covid data from the api
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    // Fetch covid data for specific country
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
    }

    render() {
        const {data, country} = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={headerImage} alt="COVID-19"/>
                <Cards data={data}/>
                {/* Pass countrychange into countrypicker - this is a mutual feedback loop for
                getting country and sending country endpoint to the API */}
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;
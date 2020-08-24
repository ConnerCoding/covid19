import React, { useEffect, useState } from 'react';
import {countriesAPI} from '../../api';
import {FormControl, NativeSelect} from '@material-ui/core';
import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountryChange}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            setCountries(await countriesAPI());
        };
        getCountries();
    }, [setCountries]);

    return(
        <FormControl className={styles.formControl}>
            <NativeSelect onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="Global">Global</option>
                {countries.map((country, i) => {
                    return <option key={i} value={country.name}>{country.name}</option>
                })}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
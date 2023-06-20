import React, { useState, useEffect } from 'react';
import './RandomNumberGenerator.css'; // Import the style file

function RandomNumberGenerator() {
    const [randomValues, setRandomValues] = useState([]);
    const [length, setLength] = useState(16); // Initial value for the length of the generated value
    const [colors, setColors] = useState([]);

    useEffect(() => {
        generateColors();
    }, []);

    const generateColors = () => {
        const colorSet = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFFF00'];
        const shuffledColors = shuffle(colorSet);
        setColors(shuffledColors);
    };

    const shuffle = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateRandomValue = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.\'";:?!@#$%^&*()_-+=[]{}';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        setRandomValues([...randomValues, result]);
    };

    const clearRandomValues = () => {
        setRandomValues([]);
    };

    const handleLengthChange = (event) => {
        const value = parseInt(event.target.value);
        setLength(value);
    };

    return (
        <div className="random-generator-container">
            <h1 className="random-generator-title">Random Value Generator</h1>
            <div className="length-selector">
                <label htmlFor="length">Length: </label>
                <input
                    type="number"
                    id="length"
                    min="1"
                    max="32"
                    value={length}
                    onChange={handleLengthChange}
                    className="length-input"
                />
            </div>
            <button className="random-generator-button" onClick={generateRandomValue}>
                Generate Random Value
            </button>
            <button className="random-generator-button" onClick={clearRandomValues}>
                Clear Values
            </button>
            {randomValues.length > 0 && (
                <div className="random-values-container">
                    <h2>Generated Values:</h2>
                    <ul className="random-values-list">
                        {randomValues.map((value, index) => (
                            <li key={index} style={{ color: colors[index % colors.length] }}>
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RandomNumberGenerator;

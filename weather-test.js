// ShoreSquad Weather System Test
// Test file to verify NEA API integration and weather functionality

class WeatherTester {
    constructor() {
        this.apiEndpoints = {
            forecast24h: 'https://api.data.gov.sg/v1/environment/24-hour-weather-forecast',
            forecast4day: 'https://api.data.gov.sg/v1/environment/4-day-weather-forecast',
            temperature: 'https://api.data.gov.sg/v1/environment/air-temperature',
            rainfall: 'https://api.data.gov.sg/v1/environment/rainfall'
        };
    }

    // Test all NEA API endpoints
    async testAllApis() {
        console.log('🌤️ Starting ShoreSquad Weather API Tests...\n');

        for (const [name, url] of Object.entries(this.apiEndpoints)) {
            await this.testSingleApi(name, url);
        }

        console.log('\n✅ Weather API testing completed!');
    }

    // Test individual API endpoint
    async testSingleApi(name, url) {
        try {
            console.log(`Testing ${name}...`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`✅ ${name}: Success`);
            
            // Log key data points
            if (name === 'forecast24h' && data.items && data.items[0]) {
                const forecast = data.items[0].general;
                console.log(`   📊 Current: ${forecast.forecast}`);
                console.log(`   🌡️ Temp: ${forecast.temperature.low}-${forecast.temperature.high}°C`);
                console.log(`   💨 Wind: ${forecast.wind.speed} km/h ${forecast.wind.direction}`);
            }
            
        } catch (error) {
            console.error(`❌ ${name}: ${error.message}`);
        }
        
        console.log(''); // Add spacing
    }

    // Test cleanup score calculation
    testCleanupScore() {
        console.log('🏖️ Testing Beach Cleanup Score Calculation...\n');

        const testCases = [
            { condition: 'Fair (Day)', temp: 28, wind: '10', rainfall: 0, expected: 'excellent' },
            { condition: 'Partly Cloudy', temp: 30, wind: '15', rainfall: 0.5, expected: 'good' },
            { condition: 'Light Showers', temp: 26, wind: '20', rainfall: 5, expected: 'fair' },
            { condition: 'Thundery Showers', temp: 35, wind: '25', rainfall: 15, expected: 'poor' }
        ];

        testCases.forEach((testCase, index) => {
            const score = this.calculateTestCleanupScore(
                testCase.condition, 
                testCase.temp, 
                testCase.wind, 
                testCase.rainfall
            );
            
            console.log(`Test ${index + 1}:`);
            console.log(`   Conditions: ${testCase.condition}, ${testCase.temp}°C, ${testCase.wind} km/h wind, ${testCase.rainfall}mm rain`);
            console.log(`   Score: ${score.score}/10 (${score.category})`);
            console.log(`   Expected: ${testCase.expected} | ${score.category === testCase.expected ? '✅ PASS' : '❌ FAIL'}\n`);
        });
    }

    // Simplified cleanup score calculation for testing
    calculateTestCleanupScore(condition, avgTemp, windSpeed, rainfall) {
        let score = 10;
        let category = 'excellent';

        // Weather condition penalties
        const conditionLower = condition.toLowerCase();
        if (conditionLower.includes('thundery') || conditionLower.includes('heavy rain')) {
            score -= 8;
        } else if (conditionLower.includes('showers') || conditionLower.includes('rain')) {
            score -= 4;
        } else if (conditionLower.includes('cloudy')) {
            score -= 1;
        }

        // Temperature penalties
        if (avgTemp > 35 || avgTemp < 20) {
            score -= 3;
        } else if (avgTemp > 32 || avgTemp < 22) {
            score -= 1;
        }

        // Wind penalties
        const windValue = typeof windSpeed === 'string' ? 
            parseInt(windSpeed.split('-')[1] || windSpeed) : windSpeed;
        if (windValue > 25) {
            score -= 3;
        } else if (windValue > 20) {
            score -= 1;
        }

        // Rainfall penalties
        if (rainfall > 10) {
            score -= 5;
        } else if (rainfall > 5) {
            score -= 2;
        }

        // Ensure score is between 0-10
        score = Math.max(0, Math.min(10, score));

        // Determine category
        if (score >= 8) category = 'excellent';
        else if (score >= 6) category = 'good';
        else if (score >= 4) category = 'fair';
        else category = 'poor';

        return { score, category };
    }

    // Test weather icon mapping
    testWeatherIcons() {
        console.log('🌦️ Testing Weather Icon Mapping...\n');

        const conditions = [
            'Fair (Day)',
            'Partly Cloudy (Day)',
            'Cloudy',
            'Light Showers',
            'Showers', 
            'Heavy Showers',
            'Thundery Showers',
            'Windy'
        ];

        conditions.forEach(condition => {
            const icon = this.getTestWeatherIcon(condition);
            console.log(`${condition}: ${icon}`);
        });
        console.log('');
    }

    // Simplified weather icon function for testing
    getTestWeatherIcon(condition) {
        const conditionLower = condition.toLowerCase();
        
        if (conditionLower.includes('sunny') || conditionLower.includes('fair')) {
            return '☀️';
        } else if (conditionLower.includes('partly cloudy')) {
            return '⛅';
        } else if (conditionLower.includes('cloudy')) {
            return '☁️';
        } else if (conditionLower.includes('thundery') || conditionLower.includes('storm')) {
            return '⛈️';
        } else if (conditionLower.includes('heavy rain') || conditionLower.includes('heavy showers')) {
            return '🌧️';
        } else if (conditionLower.includes('showers') || conditionLower.includes('rain')) {
            return '🌦️';
        } else if (conditionLower.includes('windy')) {
            return '💨';
        }
        
        return '🌤️';
    }

    // Run all tests
    async runAllTests() {
        console.log('🚀 ShoreSquad Weather System - Comprehensive Testing\n');
        console.log('='.repeat(50));
        
        // Test APIs
        await this.testAllApis();
        
        console.log('='.repeat(50));
        
        // Test scoring system
        this.testCleanupScore();
        
        console.log('='.repeat(50));
        
        // Test icon mapping
        this.testWeatherIcons();
        
        console.log('='.repeat(50));
        console.log('🏁 All tests completed! Check the results above.');
    }
}

// Auto-run tests if this file is loaded directly
if (typeof window !== 'undefined') {
    // Browser environment
    window.WeatherTester = WeatherTester;
    console.log('Weather tester loaded. Run: new WeatherTester().runAllTests()');
} else if (typeof module !== 'undefined') {
    // Node.js environment
    module.exports = WeatherTester;
}

// Example usage:
// const tester = new WeatherTester();
// tester.runAllTests();
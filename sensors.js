document.addEventListener('DOMContentLoaded', () => {
    fetchSensorData(); // Call the function to get our data
});

// This is an async function, which lets us use "await" to wait for the data from ThingSpeak
async function fetchSensorData() {

    
    const CHANNEL_ID = '3149645'; 
    
    const READ_API_KEY = 'QQ6NRVNY6DJAFVCB'; 

    const FIELD_NUMBER = 1; 

    const DELIMITER = ','; 
    
    const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/${FIELD_NUMBER}/last.json?api_key=${READ_API_KEY}`;

    try {
        const response = await fetch(url); //Reqiuests data from the ThingSpeak API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json(); //parse the JSON

        const rawString = data[`field${FIELD_NUMBER}`]; //Extract the raw string from the correct field -> (This will look like "data.field1", "data.field2", etc.)

        if (rawString) {
            const values = rawString.split(DELIMITER); //Untangle the string into an array of values -> e.g., "OK,15.2,450,7.1" becomes ["OK", "15.2", "450", "7.1"]

            //Update the HTML boxes with the new values
            //Add "if (values[0])" to prevent errors if the string is incomplete
            if (values[0]) {
                document.getElementById('temperature').textContent = `Temperature: ${values[0]} °C`;
            }
            if (values[1]) {
                document.getElementById('turbidity').textContent = `Turbidity: ${values[1]}`;
            }
            if (values[2]) {
                document.getElementById('TDS').textContent = `TDS: ${values[2]} PPM`;
            }
            if (values[3]) {
                document.getElementById('pH').textContent = `PH: ${values[3]}`;
            }
        } else {
            document.getElementById('temperature').textContent = 'No data found.';
        }

    } catch (error) {
        // If anything goes wrong, show an error message
        console.error('Error fetching sensor data:', error);
        document.getElementById('temperature').textContent = 'Error loading data.';
        document.getElementById('turbidity').textContent = 'Error';
        document.getElementById('TDS').textContent = 'Error';
        document.getElementById('pH').textContent = 'Error';
    }
}
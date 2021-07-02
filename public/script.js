const formElement = document.querySelector("form");
const statusEl = document.querySelector(".status");
const locationEl = document.querySelector(".location");
const windEl = document.querySelector(".wind");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const timeEl = document.querySelector(".timezone");

function setWeatherData(data, place) {
    locationEl.textContent = place;
    statusEl.textContent = data.weather[0].main;
    timeEl.textContent = windEl.textContent = `${data.wind.speed} meter/sec`;
    tempEl.textContent = `${data.main.temp} Celsius`;
    humidityEl.textContent = `${data.main.humidity} %`;
    timeEl.textContent = data.timezone > 1 ? `UTC +${data.timezone / 3600}` : `UTC ${data.timezone / 3600}`;
}

const eventHandler = (e) => {
    e.preventDefault();
    const searchElement = formElement.querySelector("input");
    const searchElementValue = searchElement.value;

    fetch("/weather", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                city: searchElementValue,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            setWeatherData(data, data.name);
            searchElement.value = "";
        })
        .catch((err) => console.log(err));
};

const eventHandlerOnEnter = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const searchElement = formElement.querySelector("input");
        const searchElementValue = searchElement.value;

        fetch("/weather", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    city: searchElementValue,
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                setWeatherData(data, data.name);
                searchElement.value = "";
            })
            .catch((err) => console.log(err));
    }
};

formElement.addEventListener("submit", eventHandler);
formElement.addEventListener("keypress", eventHandlerOnEnter);
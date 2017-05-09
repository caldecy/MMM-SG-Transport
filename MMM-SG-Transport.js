/* Magic Mirror Module Arrival times for bus stops in Singapore */

/* Magic Mirror
 * Module: MMM-SG-Transport
 *
 * By Tan Xuan You
 */

Module.register("MMM-SG-Transport", {

    // Default module config.
    defaults: {
        // API details, all required
        lta_api_key: null, // this must be set
        lta_api_url: "http://datamall2.mytransport.sg/ltaodataservice/",
        lta_api_bus_arrival_path: "BusArrival",

        // Intervals
        refresh_interval: 10 * 1000, // refresh display every 10 seconds

        // Bus Stop IDs and Names to show
        bus_stops: [{
                id: 43191,
                name: "Opp St Mary's"
            },
            {
                id: 43619,
                name: "Opp Caltex"
            }
        ],
    },

    // Module startup procedure
    start: function() {

        // Create the main structure that holds the live bus stop data
        this.bus_stops = {}
        for (var i in this.config.bus_stops) {
            var config_bus_stop = this.config.bus_stops[i];
            this.bus_stops[config_bus_stop.id] = {
                Name: config_bus_stop.name,
                Services: {}
            };
        }

        // Share the config with the node_helper
        this.sendSocketNotification('CONFIG', this.config);
    },

    // Override dom generator.
    getDom: function() {

        if (!this.bus_stops) {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = "Waiting for update...";
            return wrapper;
        }

        // Display data
        var wrapper = document.createElement("table");
        wrapper.classList.add("small");
        for (var bus_stop_id in this.bus_stops) {
            var row = document.createElement("th");
            var element = document.createElement("td");
            element.innerHTML = this.bus_stops[bus_stop_id].Name;
            row.appendChild(element);
            wrapper.appendChild(row);

            this.bus_stops[bus_stop_id].Services.forEach(function(bus) {
                var row = document.createElement("tr");
                var element = document.createElement("td");
                element.innerHTML = bus.ServiceNo
                row.appendChild(element);
                var element = document.createElement("td");
                var time = new Date(bus.NextBus.EstimatedArrival);
                element.innerHTML = time.toLocaleTimeString();
                row.appendChild(element);
                wrapper.appendChild(row);
            });
        }

        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {

        if (notification === "UPDATE") {
            this.bus_stops[payload.BusStopID].Services = payload.Services;
        }
        this.updateDom();
    }
});
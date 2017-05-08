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
        refresh_interval: 1 * 1000, // refresh display every 1 seconds

        // bus stop ids to show
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
            var row = document.createElement("tr");
            var element = document.createElement("td");
            element.innerHTML = this.bus_stops[bus_stop_id].name;
            row.appendChild(element);
            wrapper.appendChild(row);
        }

        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {

        if (notification === "UPDATE") {
            this.bus_stops = payload;
        }
        this.updateDom();
    }
});
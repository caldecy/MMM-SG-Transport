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
        lta_api_bus_stops_path: "BusStops",

        // Intervals
        display_refresh_interval: 2 * 1000, // refresh display every 2 seconds
        api_download_interval: 4 * 1000, // download api every 4 seconds

        // bus stop ids to show
        bus_stop_ids: [
            43191
        ],
    },

    // Module startup procedure
    start: function() {

        Log.log("Starting module: " + this.name);

        // Share the config with the node_helper
        this.sendSocketNotification('CONFIG', this.config);

        this.bus_stops = [];
    },

    // Override dom generator.
    getDom: function() {
        Log.log('Creating DOM')
        var wrapper = document.createElement("div");
        if (!this.time) {
            wrapper.innerHTML = "Loading...";
        } else {
            wrapper.innerHTML = this.time;
        }
        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
        Log.log('Notification Received')
        if (notification === 'UPDATE_TIME') {
            this.time = payload.date;
        }
        this.updateDom();
    }
});
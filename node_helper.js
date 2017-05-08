// This node helper is in charge of requesting the data through the API.

var NodeHelper = require("node_helper");
var request = require("request")

module.exports = NodeHelper.create({

    start: function() {
        this.started = false;
        this.bus_stops = {};
    },

    updateData: function() {
        // For each bus stop
        for (var bus_stop_id in Object.keys(this.bus_stops)) {
            // Request for new bus timings
            var request_options = {
                url: this.config.lta_api_url + this.config.lta_api_bus_stops_path + '?BusStopId=' + bus_stop_id,
                headers: {
                    'AccountKey': this.config.lta_api_key
                }
            }
        }

        this.sendSocketNotification("UPDATE", this.bus_stops);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "CONFIG" && this.started == false) {
            this.started = true;

            // Capture the config details
            this.config = payload;

            // Maintain a live copy of the bus stop data
            for (var i in this.config.bus_stops) {
                var bus_stop = this.config.bus_stops[i];
                this.bus_stops[bus_stop.id] = {
                    name: bus_stop.name
                }
            }

            // Create an interval for requesting data
            const self = this;
            setInterval(function() {
                self.updateData();
            }, this.config.refresh_interval);
        }
    }
});
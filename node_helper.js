// This node helper is in charge of requesting the data through the API.

var NodeHelper = require("node_helper");
var unirest = require("unirest")

module.exports = NodeHelper.create({

    start: function() {
        this.started = false;
    },

    updateData: function() {

        var self = this;

        // For each bus stop
        this.BusStopList.forEach(function(bus_stop_id) {
            // Request for new bus timings    
            unirest.get(self.config.lta_api_url + self.config.lta_api_bus_arrival_path + "?BusStopID=" + bus_stop_id)
                .headers({ "AccountKey": self.config.lta_api_key })
                .end(function(response) {
                    self.sendSocketNotification("UPDATE", response.body);
                });
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "CONFIG" && this.started == false) {
            this.started = true;

            // Capture the config details
            this.config = payload;
            this.BusStopList = [];
            for (var i in this.config.bus_stops) {
                this.BusStopList.push(this.config.bus_stops[i].id);
            }

            // Create an interval for requesting data
            const self = this;
            setInterval(function() {
                self.updateData();
            }, this.config.refresh_interval);
        }
    }
});
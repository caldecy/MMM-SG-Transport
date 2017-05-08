// This node helper is in charge of requesting the data through the API.

var NodeHelper = require("node_helper");
module.exports = NodeHelper.create({

    start: function() {
        this.started = false;
    },

    updateData: function() {
        var date = new Date();
        this.sendSocketNotification("UPDATE_TIME", {
            date: date.toLocaleString()
        });
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification === "CONFIG" && this.started == false) {
            this.started = true;

            this.config = payload;

            // Create an interval for requesting data
            const self = this;
            setInterval(function() {
                self.updateData();
            }, this.config.api_download_interval);
        }
    }
});
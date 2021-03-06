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
                Services: null
            };
        }

        // Share the config with the node_helper
        this.sendSocketNotification("CONFIG", this.config);
    },

    // Include styles:
    getStyles: function() {
        return [
            this.file("css/style.css")
        ]
    },

    createBusStopLabelRow: function(label) {
        var row = document.createElement("tr");
        row.classList.add("sg-transport-bus-stop-label-row");
        var element = document.createElement("th");
        element.classList.add("sg-transport-bus-stop-label");
        element.setAttribute("colspan", 4);
        element.innerHTML = label;
        row.appendChild(element);
        return row;
    },

    createBusRow: function(bus) {

        // Calculate arrival times
        ArrivalTimeArray = [];
        if (bus.NextBus.EstimatedArrival !== "") {
            ArrivalTimeArray.push(bus.NextBus.EstimatedArrival);
        }
        if (bus.SubsequentBus.EstimatedArrival !== "") {
            ArrivalTimeArray.push(bus.SubsequentBus.EstimatedArrival);
        }
        if (bus.SubsequentBus3.EstimatedArrival !== "") {
            ArrivalTimeArray.push(bus.SubsequentBus3.EstimatedArrival);
        }

        // Don't display if no data
        if (ArrivalTimeArray.length == 0) {
            return document.createElement("div");
        }

        var row = document.createElement("tr");
        var element = document.createElement("td");
        element.innerHTML = bus.ServiceNo + ":&nbsp;"
        row.appendChild(element);

        ArrivalTimeArray.forEach(function(ArrivalTime) {
            var time = new Date(ArrivalTime);
            var now = new Date();
            var arrivalTimeInMinutes = Math.floor((time - now) / (60 * 1000));
            if (arrivalTimeInMinutes < 1) {
                arrivalTimeInMinutes = "Arr"
            } else {
                arrivalTimeInMinutes += "m&nbsp;"
            }

            var element = document.createElement("td");
            element.innerHTML = arrivalTimeInMinutes;
            row.appendChild(element);
        });


        return row;
    },

    createTextRow: function(text) {
        var row = document.createElement("tr");
        var element = document.createElement("td");
        element.innerHTML = text;
        row.appendChild(element);
        return row;
    },

    // Run on display refresh
    getDom: function() {
        // Display data
        var wrapper = document.createElement("div");
        wrapper.classList.add("small");

        var table = document.createElement("table");
        for (var bus_stop_id in this.bus_stops) {

            var self = this;

            table.appendChild(this.createBusStopLabelRow(this.bus_stops[bus_stop_id].Name));

            var services = this.bus_stops[bus_stop_id].Services;

            if (services == null) {
                table.appendChild(this.createTextRow("Waiting for update..."));
            } else {
                services.forEach(function(bus) {
                    table.appendChild(self.createBusRow(bus));
                });
            }
        }
        wrapper.appendChild(table);
        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {

        if (notification === "UPDATE") {
            this.bus_stops[payload.BusStopID].Services = payload.Services;
        }
        this.updateDom();
    }
});
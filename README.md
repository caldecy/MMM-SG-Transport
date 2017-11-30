# MMM-SG-Transport
MagicMirror² Module - Local Transport in Singapore

**Broken as at 31 Oct 2017, does not support LTA DataMall v2 API.**

**LTA DataMall v1 API was deprecated on 1 Aug 2017**

This module displays data about bus arrivals. More than one bus stop can be specified.

This module aims to provide the most compact display possible with multiple bus stops.

Data is sourced from [LTA DataMall](https://www.mytransport.sg/content/mytransport/home/dataMall.html), you need to get your own API key here.

This module works with [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) project by [MichMich](https://github.com/MichMich/)

[MagicMirror<sup>2</sup> Forum](http://forum.magicmirror.builders/)

## Prerequisite
A working installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
 
## Dependencies
  * npm
  * [unirest](https://www.npmjs.com/package/unirest)

## Installation
1. Navigate into your MagicMirror's `modules` folder.
2. Execute `git clone https://github.com/xuanyou/MMM-SG-Transport.git`.
3. Execute `cd MMM-SG-Transport`.
4. Execute `npm install`.
5. Edit the `config.js` to add your LTA API key and the requested bus stops.

## Configuration
Sample configuration entry for your `~/MagicMirror/config/config.js`:

    {
        module: 'MMM-SG-Transport',
        position: 'upper_third',
        config: {
            lta_api_key: "...",
            refresh_interval: 10 * 1000,
            bus_stops: [
                {
                    id: 43191,
                    name: "Opp St Mary's"
                },
                {
                    id: 43619,
                    name: "Opp Caltex"
                }
            ]
        }
    },

## Acknowledgements
[MMM-HK-Transport](https://github.com/winstonma/MMM-HK-Transport) by [winstonma](https://github.com/winstonma)


## License
MIT License

Copyright (c) 2017 Xuan You (https://github.com/xuanyou/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

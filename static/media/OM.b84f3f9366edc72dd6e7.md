## Operations and Maintenence

There are two components to the operations and maintenance cost metric: vehicle-hours and vehicle-miles. We used historical data from 2019 and 2021 to determine the operating costs. The costs for each component are an estimate of expenses using average passenger loads.

### Vehicle-Hours

The daily number of vehicles operating on the segment \* the travel time for each vehicle

### Vehicle-Miles

The daily number of vehicles operating on the segment \* distance in miles of the segment

### Cost function

Cost = (vehicle-hours \* $103.53) + (vehicle-miles \* $8.06)

| Score |  Threshold  |
| :---: | :---------: |
|   A   |    < 350    |
|   B   |  351 - 600  |
|   C   | 601 - 1150  |
|   D   | 1151 - 1900 |
|   E   | 1900 - 2650 |
|   F   |   > 2650    |

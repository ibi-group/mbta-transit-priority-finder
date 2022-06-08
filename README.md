# MBTA Transit Priority Finder

This tool was created to assist MBTA with target stop-to-stop segments for transit priority measures. It allows users to visualize segments by their combined frequency, and set weights on different metrics to create and visualize an overall priority score.

## Dependencies

- React v7
- React-leaflet
- leaflet polyline offset (plugin for visualizing two overlapping geometries - i.e. transit routes in 2 directions)
- chroma (color scales generator)
- react-input-slider

## Data Sources

The input data were created using the gtfs_functions python library, and additional processing through a python script prior to inclusion in the dashboard.

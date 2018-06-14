# Mal6raph-client

## How to build it

just run `npm install` and you will ready to go.

## What does it look like

![Alt text](./docs/img/client_home.png?raw=true "Homepage")

## Legend

* Red bubble = Sample analyzed (or sample in homepage)
* Pink bubbles = Samples which call similar functions to sample analyzed
* Beige links = CALLS relationp ((s:Sample)-[:CALLS]->(f:Function))
* Purple links = SIMILAR_TO relationship ((f1:Function)-[:SIMILAR_TO]-(f2:Function))

## TODO

* [ ] Better UI/UX (kind of raw ATM...)
* [ ] Refactoring
* [ ] Upload r2script
* [ ] Upload FLIRT signatures
* [ ] Integrate YARA somehow
* [ ] Remove some dependencies (VueJS-D3 component, ...)
* [ ] Legend
* [ ] Nodes name when clicked on (homepage)
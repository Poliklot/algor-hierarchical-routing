class Claster {
    constructor (address, nodeList) {
        this.address = address;
        this.nodeList = nodeList;
        this.neighborList = [];
        this.init();
    }

    init () {
        this.nodeList.forEach(node => {
            node.setClasterParent(this);
        });
    }

    getNodeByAddress (address) {
        const node = this.nodeList.find(node => node.address == address);
        return (node) ? node : null;
    }

    addNeighbor (claster) {
        if (!(this.neighborList.find(neighbor => neighbor.address == claster.address))) this.neighborList.push(claster);
    }
}
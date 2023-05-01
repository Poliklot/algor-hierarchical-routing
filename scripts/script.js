// Вспомогательные функции

/**
 * Возвращает рандомное целое число в интервале min-max.
 * @param {Number} min - Минимальное число интервала
 * @param {Number} max - Максимальное число интервала
 * @returns {Number}
 */
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const log = ( msg, style ) => {
    if ( !style || !consoleStyles[ style ] ) {
      style = 'bold';
    }
    console.log( '%c' + msg, consoleStyles[ style ] );
}

var consoleStyles = {
    'h1': 'font: 2.5em/1 Arial; color: crimson;',
    'h2': 'font: 2em/1 Arial; color: orangered;',
    'h3': 'font: 1.5em/1 Arial; color: olivedrab;',
    'bold': 'font: bold 1.3em/1 Arial; color: midnightblue;',
    'warn': 'padding: 0 .5rem; background: crimson; font: 1.6em/1 Arial; color: white;'
};

// END Вспомогательные функции


// const containerSelector = '.graph-container';
// let lastGraph = null;
// let lastTrie = null;
// let lastTrueNodesIndexList = null;
// let nowShowFinded = false;

// const drawTrie = (trie) => {
//     lastTrueNodesIndexList = null;
//     nowShowFinded = false;
//     const data = generateDataForDraw(trie);

//     let graph = Viva.Graph.graph(),
//     nodePositions = data.positions,
//     graphics = Viva.Graph.View.svgGraphics(),
//     layout = Viva.Graph.Layout.constant(graph),
//     nodeSize = 24,
//     renderer = Viva.Graph.View.renderer(graph, {
//         graphics: graphics,
//         layout : layout,
//         container: document.querySelector(containerSelector)
//     });
    
//     let i, nodesCount = nodePositions.length;
    
//     data.nodes.forEach(node => {
//         graph.addNode(node.id, node.data);
//     })
    
//     data.links.forEach(link => {
//         graph.addLink(link.from, link.to);
//     })
    
//     graphics.link(function(link){
//         ui = Viva.Graph.svg('line')
//             .attr('stroke', 'red')
//             .attr('fill', 'red')
//             .attr('id', `${link.fromId}-${link.toId}`);
//         return ui;
//     })
    
//     graphics.node(function(node){
//         const ui = Viva.Graph.svg('g')
//            .attr('id', node.id),
//            svgText = Viva.Graph.svg('text')
//            .attr('y', '-4px')
//            .attr('x', '0px')
//            .attr('fill', 'red')
//            .text(node.data),
//            svgRect = Viva.Graph.svg('rect')
//            .attr('width', 10)
//            .attr('height', 10)
//            .attr('fill', '#00d635');

//        ui.append(svgText)
//        ui.append(svgRect)
//        return ui;
//     })
//     .placeNode(function(nodeUI, pos) {
//         nodeUI.attr('transform', `translate(${pos.x - nodeSize / 4}, ${pos.y - nodeSize / 2})`);
//     });
    
//     layout.placeNode(function(node) {
//         return nodePositions[node.id];
//     });

//     renderer.run();
//     return graph;
// }

// const generateDataForDraw = (trie) => {
//     let indexNode = 0;
//     let dethDeviation = [0, 150, 70, 30, 15];

//     const positions = [];
//     const nodes = [];
//     const links = [];
    
//     nodes.push({id: 0, data: '*'});
//     positions.push({x: 0, y: 0});

//     const checkTree = (tree, deth = 0, deviation = 0, parentIndex = 0) => {
//         const children = [];
        
//         if (tree['0']) {
//             nodes.push({id: indexNode + 1, data: '0'});
//             links.push({from: parentIndex, to: indexNode + 1});
//             positions.push({x: deviation - dethDeviation[deth + 1], y: (deth + 1) * 50});
//             children.push({tree: tree['0'], deviation: deviation - dethDeviation[deth + 1], parentIndex: ++indexNode});
//         }
//         if (tree['1']) {
//             nodes.push({id: indexNode + 1, data: '1'});
//             links.push({from: parentIndex, to: indexNode + 1});
//             positions.push({x: deviation + dethDeviation[deth + 1] , y: (deth + 1) * 50});
//             children.push({tree: tree['1'], deviation: deviation + dethDeviation[deth + 1], parentIndex: ++indexNode});
//         }
//         if (children.length != 0) children.forEach(tree => checkTree(tree.tree, deth + 1, tree.deviation, tree.parentIndex));
//     };
    
//     checkTree(trie.trie);

//     const maxCountSide = getMaxCountSide(trie);
//     const maxCountDepth = getMaxCountDepth(trie);

//     return {
//         positions: positions,
//         nodes: nodes,
//         links: links
//     };
// }

// const getMaxCountSide = (trie) => {
//     let result = -1;
//     trie.nodeList.forEach(node => {
//         const nodeArray = node.split('');
//         const leftCount = nodeArray.filter(x => x == '1').length;
//         const rightCount = nodeArray.length - leftCount;
//         const value = Math.abs(leftCount - rightCount)
//         result = (value > result) ? value : result;
//     })
//     return result;
// }

// const getMaxCountDepth = (trie) => {

// }

// const clearGraph = (graph = lastGraph) => {
//     graph.clear();
//     document.querySelector(`${containerSelector} svg`)?.remove();
// }

// const getRandomNodeList = (deth, countNodes) => {
//     const result = []
    
//     for (let j = 0; j < countNodes; j++) {
//         let nodeStr = '';
        
//         for (let i = 0; i < getRandomInt(2, 5); i++) {
//             nodeStr += Math.floor(Math.random() * 2);
//         }
//         result.push(nodeStr);
//     }

//     return result;
// };

// const showFindingProccesNode = () => {

// }

// const nodeList = ['0', '11', '00', '10', '01', '1011', '1010'];





// // - DOM - //

// const showNotification = (text, mode) => {

// }

// document.querySelector('#buttonCreateRandomTrie')?.addEventListener('click', () => {
//     clearGraph();
//     lastGraph = drawTrie(lastTrie = new Trie(getRandomNodeList(4, 8)));
// })

// document.querySelector('#buttonFindTrie')?.addEventListener('click', () => {
//     findEvent();
// })

// document.querySelector('#inputFindTrie').addEventListener('keydown', (e) => {
//     if (e.code == 'Enter') findEvent();
// })

// const findEvent = () => {
//     const strToFind = document.querySelector('#inputFindTrie').value;
    
//     if ((strToFind.length < 1) || (strToFind.length > 100000)) {
//         console.log('Некорректные данные');
//     } else {
//         if (lastTrie.hasNode(strToFind)) {
//             console.log('Есть такое');
//             let countCheck = 0;
//             let indexNode = 0;
//             const trueNodesIndexList = [0];

//             const checkTree = (tree, isTrueTree = true) => {
//                 let wasSelected = false;
//                 const children = [];
//                 if (tree['0']) {
//                     indexNode++;
//                     if ((strToFind[countCheck] == '0') && isTrueTree) {
//                         trueNodesIndexList.push(indexNode);
//                         children.push({tree: tree['0'], isTrueTree: true});
//                         countCheck++;
//                         wasSelected = true;
//                     } else {
//                         children.push({tree: tree['0'], isTrueTree: false});
//                     }
//                 }
//                 if (tree['1']) {
//                     indexNode++;
//                     if ((strToFind[countCheck] == '1') && isTrueTree && !wasSelected) {
//                         trueNodesIndexList.push(indexNode);
//                         children.push({tree: tree['1'], isTrueTree: true});
//                         countCheck++;
//                     } else {
//                         children.push({tree: tree['1'], isTrueTree: false});
//                     }
//                 }
//                 if (children.length != 0) children.forEach(tree => checkTree(tree.tree, tree.isTrueTree));
//             };
            
//             checkTree(lastTrie.trie);
//             if (nowShowFinded) hideFinded();
//             showFinded(lastTrueNodesIndexList = trueNodesIndexList);
            
//         } else {
//             console.log('Нет такого');
//         }
//     }
// }

// const showFinded = (trueNodesIndexList) => {
//     nowShowFinded = true;
//     const linesList = Array.from(document.querySelectorAll('svg g line'));
//     const nodexList = Array.from(document.querySelectorAll('svg g'));
//     const findedLinesList = [];
//     const findedNodesList = [];
//     let prevIndex = null;
//     trueNodesIndexList.forEach(index => {
//         findedNodesList.push(nodexList.find($node => $node.id === `${index}`));
//         if (prevIndex !== null) {
//             findedLinesList.push(linesList.find($line => $line.id == `${prevIndex}-${index}`));
//         }
//         prevIndex = index;
//     })
//     findedNodesList.forEach($node => {
//         $node.querySelector('rect').setAttribute('fill', 'blue')
//     })
//     findedLinesList.forEach($link => {
//         $link.setAttribute('stroke', 'blue')
//     })

//     setTimeout(() => {
//         if (nowShowFinded) hideFinded();
//     }, 3000)
// }

// const hideFinded = () => {
//     nowShowFinded = false;
//     const linesList = Array.from(document.querySelectorAll('svg g line'));
//     const nodexList = Array.from(document.querySelectorAll('svg g'));
//     const findedLinesList = [];
//     const findedNodesList = [];
//     let prevIndex = null;
//     lastTrueNodesIndexList.forEach(index => {
//         findedNodesList.push(nodexList.find($node => $node.id === `${index}`));
//         if (prevIndex !== null) {
//             findedLinesList.push(linesList.find($line => $line.id == `${prevIndex}-${index}`));
//         }
//         prevIndex = index;
//     })
//     findedNodesList.forEach($node => {
//         $node.querySelector('rect').setAttribute('fill', '#00d635')
//     })
//     findedLinesList.forEach($link => {
//         $link.setAttribute('stroke', 'red')
//     })
// }


const containerSelector = '.graph-container';
let lastGraph = null;
let lastNetwork = null;
let nowShowFinded = false;


const showWay = (way, fromNodeId, toNodeId) => {

}

const generateDataForDraw = (network) => {
    let indexNode = -1;
    let clasterNum = 0;
    
    const clastersNodesList = [];
    const nodes = [];
    const links = [];

    network.clastersList.forEach(claster => {
        const clasterNodeId = ++indexNode;
        clastersNodesList.push({
            claster: claster,
            clasterNodeId: clasterNodeId
        });
        nodes.push({
            'name': claster.address,
            'group': clasterNum
        });
        claster.nodeList.forEach(node => {
            ++indexNode
            nodes.push({
                'name': node.address,
                'group': clasterNum
            });
            links.push({
                "source": clasterNodeId,
                "target": indexNode,
                "value": 1
            });
        })

        clasterNum++;
    })

    let lastClaster = clastersNodesList[clastersNodesList.length - 1];
    clastersNodesList.forEach((clasterObj, index) => {
        links.push({
            "source": lastClaster.clasterNodeId,
            "target": clasterObj.clasterNodeId,
            "value": 6
        })
        clasterObj.claster.addNeighbor(lastClaster.claster);
        lastClaster.claster.addNeighbor(clasterObj.claster);
        lastClaster = clasterObj;
    })

    return {
        nodes: nodes,
        links: links
    };
}

const drawNetwork = (network) => {
    const data = generateDataForDraw(network);

    var d3Sample = function(){
        var g = Viva.Graph.graph();

        for (var i = 0; i < data.nodes.length; ++i){
            g.addNode(i, data.nodes[i]);
        }

        for (i = 0; i < data.links.length; ++i){
            var link = data.links[i];
            g.addLink(link.source, link.target, link.value);
        }

        return g;
    };

     var colors = [
            "#1f77b4", "#aec7e8",
            "#ff7f0e", "#ffbb78",
            "#2ca02c", "#98df8a",
            "#d62728", "#ff9896",
            "#9467bd", "#c5b0d5",
            "#8c564b", "#c49c94",
            "#e377c2", "#f7b6d2",
            "#7f7f7f", "#c7c7c7",
            "#bcbd22", "#dbdb8d",
            "#17becf", "#9edae5"
            ];

    var graph = d3Sample();
    function createPhysicsLayout(graph) {
        return Viva.Graph.Layout.forceDirected(graph, {
            springLength : 160,
            springCoeff : 0.00015,
            dragCoeff : 0.1,
            gravity : -11
        });
    }

    var svgGraphics = Viva.Graph.View.svgGraphics();

    svgGraphics.node(function(node){
        const groupId = node.data.group;


        const ui = Viva.Graph.svg('g')
            .attr('id', node.id)
            .attr('data-node-id', node.data.name),
           svgText = Viva.Graph.svg('text')
           .attr('y', '-10px')
           .attr('x', '-4px')
           .attr('fill', colors[groupId ? groupId - 1 : 5])
           .text(node.data.name),
           svgCircle = Viva.Graph.svg('circle')
            .attr('r', 7)
            .attr('stroke', '#fff')
            .attr('stroke-width', '1.5px')
            .attr("fill", colors[groupId ? groupId - 1 : 5]);

        if (node.links.length > 1) {
            ui.attr('data-claster-id', node.data.group);
        }

       ui.append(svgText)
       ui.append(svgCircle)
       return ui;
    })
    .placeNode(function(nodeUI, pos){
        nodeUI.attr('transform', `translate(${pos.x}, ${pos.y})`)
        nodeUI.attr("cx", pos.x).attr("cy", pos.y);
    });

    svgGraphics.link(function(link){
        return Viva.Graph.svg('line')
        .attr('stroke', '#999')
        .attr('stroke-width', Math.sqrt(link.data))
        .attr('id', `nodes-${link.fromId}-${link.toId}`);
    });

    let layout;
    const renderer = Viva.Graph.View.renderer(graph, {
        container : document.querySelector(containerSelector),
        layout : layout = createPhysicsLayout(graph),
        graphics : svgGraphics,
        prerender: 1600,
        renderLinks : true
    });

    lastGraph = graph;

    renderer.run(1500);
    
    // Zoom to fit hack
    const graphRect = layout.getGraphRect();
    const graphSize = Math.min(graphRect.x2 - graphRect.x1, graphRect.y2 - graphRect.y1) + 500;
    const screenSize = Math.min(document.body.clientWidth, document.body.clientHeight);

    const desiredScale = screenSize / graphSize;
    zoomOut(desiredScale, 1);

    function zoomOut(desiredScale, currentScale) {
        if (desiredScale < currentScale) {
            currentScale = renderer.zoomOut();
            setTimeout(function () {
                zoomOut(desiredScale, currentScale);
            }, 16);
        }
    }    
}

const clearGraph = () => {
    lastGraph.clear();
    document.querySelector(`${containerSelector} svg`)?.remove();
}

let lastAddressClaster = 0;
let lastAddressNode = 0;

const createRandomClaster = () => {
    const clasterAddress = lastAddressClaster++;
    const nodeList = [];
    const countClasters = getRandomInt(3,9);
    for (let i = 0; i < countClasters; i++) {
        nodeList.push(new Node(lastAddressNode++))
    }
    return new Claster(clasterAddress, nodeList);
}

const createRandomClastersList = () => {
    lastAddressClaster = 0;
    lastAddressNode = 0;
    const clastersList = [];
    const countClasters = getRandomInt(3,9);
    for (let i = 0; i < countClasters; i++) {
        clastersList.push(createRandomClaster())
    }
    return clastersList;
}

const drawRandomNetwork = () => {
    const clastersList = createRandomClastersList();
    drawNetwork(lastNetwork = new Network(clastersList));
}


drawRandomNetwork();

// - DOM - //

document.querySelector('#buttonCreateRandomNetwork').addEventListener('click', () => {
    clearGraph();
    drawRandomNetwork();
})

document.querySelector('#buttonSendMessage').addEventListener('click', () => {
    const nodeAddressFrom = document.querySelector('#inputNodeFrom').value;
    const nodeAddressTo = document.querySelector('#inputNodeTo').value;
    const data = document.querySelector('#inputPackageText').value;

    if (nodeAddressFrom && nodeAddressTo) {
        let nodeFrom = null;
        
        for (const i of lastNetwork.clastersList) {
            for (const j of i.nodeList) {
                if (j.address == nodeAddressFrom) nodeFrom = j;
            }
        }

        lastNetwork.sendMessage(nodeFrom, nodeAddressTo, data);
    }
})

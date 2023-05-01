class Network {
    constructor (clastersList) {
        this.clastersList = clastersList;
    }

    sendMessage (fromNode, toNodeAddress, data = null) {
        console.group('Информация об отправке пакета');
        console.group('Краткая информация о пакете');
        console.log(`Адрес узла отправителя: ${fromNode.address}`);
        console.log(`Адрес узла получателя: ${toNodeAddress}`);
        console.log(`↓↓↓ Данные пакета ↓↓↓`);
        console.log({data});
        console.groupEnd ();
        console.group('Статус доставки');
        if (fromNode.clasterParent.getNodeByAddress(toNodeAddress) != null) {
            log('Успешно', 'h3');
            log('Пакет был отправлен по локальной сети (внутри своего кластера)');
            const newTrueWay = [];
            const fromNodeCircle = document.querySelector(`svg g[data-node-id="${fromNode.address}"]`);
            let lastCircle = fromNodeCircle;
            newTrueWay.push(fromNodeCircle);

            const thisClsterCircle = document.querySelector(`svg g[data-claster-id="${fromNode.clasterParent.address}"]`);
            newTrueWay.push(document.querySelector(`svg line#nodes-${thisClsterCircle.id}-${lastCircle.id}`))
            newTrueWay.push(thisClsterCircle);
            lastCircle = thisClsterCircle;
            
            const toNodeCircle = document.querySelector(`svg g[data-node-id="${toNodeAddress}"]`);
            newTrueWay.push(document.querySelector(`svg line#nodes-${lastCircle.id}-${toNodeCircle.id}`))
            newTrueWay.push(toNodeCircle);
            showTrueWay(newTrueWay);
        } else {
            let trueWay = [];
            let findedWay = false;
            const checkedClastersAddresses = [fromNode.clasterParent.address];
            const checkClasters = (claster, way = []) => {
                if (!(checkedClastersAddresses.find(item => item == claster.address))) {
                    checkedClastersAddresses.push(claster.address);
                    if (!findedWay) {
                        way.push(claster.address);
                        if (claster.getNodeByAddress(toNodeAddress) != null) {
                            findedWay = true;
                            trueWay = way;
                        }
                    }
                }

                if (!findedWay) {
                    claster.neighborList.forEach(neighbor => {
                        if (checkedClastersAddresses.find(item => item == neighbor.address) !== neighbor.address) {
                            checkClasters(neighbor, way);
                        }
                    })
                }
            }
            checkClasters(fromNode.clasterParent);
            
            if (!findedWay) {
                log('Безуспешно', 'h2');
            } else {
                if (!trueWay.includes(fromNode.clasterParent.address)) trueWay.unshift(fromNode.clasterParent.address);
                log('Успешно', 'h3');
                console.log('Путь доставки: ' + trueWay.join(' -> '));
                
                const newTrueWay = [];
                const fromNodeCircle = document.querySelector(`svg g[data-node-id="${fromNode.address}"]`);
                let lastCircle = fromNodeCircle;
                newTrueWay.push(fromNodeCircle);
                trueWay.forEach((claster, i) => {
                    const thisClsterCircle = document.querySelector(`svg g[data-claster-id="${claster}"]`);
                    newTrueWay.push(document.querySelector(`svg line#nodes-${thisClsterCircle.id}-${lastCircle.id}`))
                    newTrueWay.push(thisClsterCircle);
                    lastCircle = thisClsterCircle;
                })
                const toNodeCircle = document.querySelector(`svg g[data-node-id="${toNodeAddress}"]`);
                newTrueWay.push(document.querySelector(`svg line#nodes-${lastCircle.id}-${toNodeCircle.id}`))
                newTrueWay.push(toNodeCircle);
                showTrueWay(newTrueWay);
            }
        }
        console.groupEnd ();
        console.groupEnd ();
    }
}

const showTrueWay = (trueWay) => {
    let i = 0;
    const interval = setInterval(() => {
        if (++i >= trueWay.length - 1) clearInterval(interval);
        if (trueWay[i].tagName == 'line') {
            const $line = trueWay[i];
            const prevStrokeColor = $line.getAttribute('stroke');
            setTimeout(() => {
                $line.setAttribute('stroke', prevStrokeColor);
            }, (((trueWay.length - i) * 700) + 2000))
            $line.setAttribute('stroke', 'red');
        } else {
            const $circle = trueWay[i].querySelector('circle');
            const prevStrokeColor = $circle.getAttribute('stroke');
            setTimeout(() => {
                $circle.setAttribute('stroke', prevStrokeColor);
            }, (((trueWay.length - i) * 700) + 2000))
            $circle.setAttribute('stroke', 'red');
        }
    }, 700)
}
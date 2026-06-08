// QUI metteremo i tuoi blockId Adsgram
// Per ora metto un placeholder

let ad = null;

window.addEventListener("load", () => {
    ad = new Adsgram({
        blockId: "TUO_BLOCK_ID_PRINCIPALE", // <-- qui metterai il tuo
        containerId: "adsgram"
    });
});

// mostra una singola ad e ritorna una Promisewindow.addEventListener("load", () => {
    ad = new Adsgram({
        blockId: "TUO_BLOCK_ID_PRINCIPALE", // <-- qui metterai il tuo
        containerId: "adsgram"
    });
});

// mostra una singola ad e ritorna una Promise
function showAdOnce() {
    if (!ad) return Promise.resolve();
    return ad.show();
}

// per ricaricare energia
function showAdToRecharge() {
    return showAdOnce();
}

// esempio per offerte (più ads di fila)
function showAdsForOffer(adsCount) {
    return new Promise((resolve) => {
        let watched = 0;

        function next() {
            showAdOnce().then(() => {
                watched++;
                if (watched < adsCount) next();
                else resolve();
            });
        }

        next();
    });
}

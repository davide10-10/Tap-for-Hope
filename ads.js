let rewardAd = null;
let interstitialAd = null;

window.addEventListener("load", () => {
    // Rewarded ad (per ricaricare energia o offerte)
    rewardAd = new Adsgram({
        blockId: "34522",
        containerId: "adsgram"
    });

    // Interstitial ad (per mostrare ads normali)
    interstitialAd = new Adsgram({
        blockId: "34523",
        containerId: "adsgram"
    });
});

// Mostra una singola interstitial
function showAdOnce() {
    if (!interstitialAd) return Promise.resolve();
    return interstitialAd.show();
}

// Mostra rewarded per ricaricare energia
function showAdToRecharge() {
    if (!rewardAd) return Promise.resolve();
    return rewardAd.show();
}

// Mostra X rewarded ads per ottenere una ricompensa
function showAdsForOffer(adsCount) {
    return new Promise((resolve) => {
        let watched = 0;

        function next() {
            rewardAd.show().then(() => {
                watched++;
                if (watched < adsCount) next();
                else resolve();
            });
        }

        next();
    });
}

class Dva {
    /**
     * @param {HTMLElement} player1 `player-1` のidを必ず持つ, かつ 固有
     * @param {HTMLElement} player2 `player-2` のidを必ず持つ, かつ 固有
     * @param {HTMLElement} vsWrapper `vs-wrapper` のidを必ず持つ, かつ 固有
     */
    constructor(player1, player2, vsWrapper) {
        this.player1 = player1;
        this.player2 = player2;
        this.vsWrapper = vsWrapper;
        this.player1.addEventListener("click", (e) => this._clickHandler(e.target));
        this.player2.addEventListener("click", (e) => this._clickHandler(e.target));
        this.status = Object.freeze({
            dokiDokiTime: "doki-doki-time",
            fighting: "fighting",
            resulting: "resulting",
            noFighting: "no-fighting",
        });
    }

    /**
     * クリックされたときに呼び出し
     * @param {EventTarget} target
     * @returns {void}
     */
    _clickHandler(target) {
        // console.log("handleClick called: details following,");
        // console.log(this);
        // console.log(this.getCurrentStatus());

        switch (this.getCurrentStatus()) {
            case this.status.resulting:
            case this.status.noFighting:
                break;
            case this.status.fighting:
                // 勝者
                this._updateStatus(this.status.fighting, this.status.resulting);
                this._applySettledEffect(document.getElementById(target.id), true);
                // 依存ごみ, 一旦これ
                document.body.style.overflow = "auto";
                break;
            case this.status.dokiDokiTime:
                // フライング
                this._updateStatus(this.status.dokiDokiTime, this.status.resulting);
                this._applySettledEffect(document.getElementById(target.id), false);
                // 依存ごみ, 一旦これ
                document.body.style.overflow = "auto";
                break;
            default:
                console.error(this.getCurrentStatus());
                throw new Error("Unexpected error has occurred");
        }
    }

    /**
     * 親要素のステータスをゲーム中に変更(ゲームを開始), 遅延無し
     */
    beginGame() {
        if (this.getCurrentStatus() !== this.status.noFighting) {
            throw new Error("Can't begin the game.");
        }
        this._updateStatus(this.status.noFighting, this.status.dokiDokiTime);
    }

    beginFighting() {
        if (this.getCurrentStatus() !== this.status.dokiDokiTime) {
            // 誰かがフライングしたらこれになる
            console.log("can't shift dokiDokiTime; false start");
            return false;
        }
        this._updateStatus(this.status.dokiDokiTime, this.status.fighting);
        return true;
    }

    /**
     * ゲーム開始できるか, 親要素のステータスを基に
     * @returns {boolean} できるかできないか
     */
    availableBeginGame() {
        return this.getCurrentStatus() !== this.status.noFighting ? false : true;
    }

    /**
     * 親のdivを基に現在のステータスを取得
     * @returns {String} eq: this.status
     */
    getCurrentStatus() {
        if (this.vsWrapper.classList.contains(this.status.noFighting)) {
            return this.status.noFighting;
        } else if (this.vsWrapper.classList.contains(this.status.fighting)) {
            return this.status.fighting;
        } else if (this.vsWrapper.classList.contains(this.status.resulting)) {
            return this.status.resulting;
        } else if (this.vsWrapper.classList.contains(this.status.dokiDokiTime)) {
            return this.status.dokiDokiTime;
        } else {
            throw new Error("Unexpected status");
        }
    }

    /**
     * 親のdivに対してステータスを更新, srcがない場合 throw
     * @param {string} src 削除する現在のステータス
     * @param {string} dst 追加するステータス
     * @returns {void}
     */
    _updateStatus(src, dst) {
        if (!this.vsWrapper.classList.contains(src)) {
            throw new Error(
                `${src} is not contains classList; did not execute updateStatus`,
            );
        }
        this.vsWrapper.classList.remove(src);
        this.vsWrapper.classList.add(dst);
    }

    /**
     * 親のdivに対してステータスを更新, 現在のステータスが何であっても実行する
     * @param {string} dst 追加するステータス
     */
    _updateStatusForce(dst) {
        const classList = Object.values(this.status);
        this.vsWrapper.classList.remove(classList);
        this.vsWrapper.classList.add(dst);
    }

    /**
     * 勝負が着いた時にクラス適用(見た目変更)
     * @param {HTMLElement} プレイヤー
     * @param {boolean} 第一引数が勝者か否か
     * @returns {void}
     */
    _applySettledEffect(player, isWinner) {
        function calcAnotherPlayer(player) {
            return player === this.player1 ? this.player2 : this.player1;
        }
        calcAnotherPlayer = calcAnotherPlayer.bind(this);

        let winner, loser;
        if (isWinner) {
            winner = player;
            loser = calcAnotherPlayer(winner);
        } else {
            loser = player;
            winner = calcAnotherPlayer(loser);
        }
        winner.classList.add("winner");
        loser.classList.add("loser");
    }

    /**
     * 全てを初期状態に戻す, なにもかも, 全て, all
     */
    reset() {
        const playerClassList = ["winner", "loser"];
        const vsWrapperClassList = Object.values(this.status);
        this.player1.classList.remove(...playerClassList);
        this.player2.classList.remove(...playerClassList);
        this.vsWrapper.classList.remove(...vsWrapperClassList);
        this.vsWrapper.classList.add(this.status.noFighting);
    }
}

async function startButtonClickHandler() {
    switch (dva.getCurrentStatus()) {
        case dva.status.noFighting:
            startButtonContent.textContent = "リセット";
            dvaDisplayContent.textContent = "Waiting...";
            dvaDisplayContent.scrollIntoView({ behavior: "smooth", block: "center" });
            // 依存ごみ, 一旦これ
            document.body.style.overflow = "hidden";
            dva.beginGame();
            await delay(2000, 10000); // TODO
            const res = dva.beginFighting();
            if (!res) {
                break;
            }
            dvaDisplayContent.textContent = "Go!!!!!!!";
            break;
        case dva.status.resulting:
        case dva.status.fighting:
        case dva.status.dokiDokiTime:
            document.body.style.overflow = "auto";
            startButtonContent.textContent = "開始";
            dva.reset();
            dvaDisplayContent.textContent = "...";
            break;
        default:
            throw new Error("Unexpected error has occurred");
    }
}

async function delay(minMs, maxMs) {
    if (minMs > maxMs) {
        throw new Error(
            `delay fn required: minMs:${minMs} < maxMs:${maxMs}, but not satisfied`,
        );
    }
    console.log("delay start");
    const delayMs = Math.random() * (maxMs - minMs) + minMs;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    console.log("delay finished");
}

//

//

const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const vsWrapper = document.getElementById("vs-wrapper");
const startButton = document.getElementById("start-button");
const startButtonContent = document.getElementById("start-button-content");
const dvaDisplayContent = document.getElementById("dva-display-content");

if (player1 == null || player2 == null || vsWrapper == null || startButton == null) {
    throw new Error("Oh no........................................");
}

const dva = new Dva(player1, player2, vsWrapper);
startButton.addEventListener("click", () => {
    startButtonClickHandler();
});

upArrow.removeEventListener("click", moveTopHandler);

import {UrlManager} from "../utils/url-manager.ts";
import {CustomHttp} from "../services/custom-http.ts";
import config from "../../config/config";
import {Auth} from "../services/auth.ts";

export class Result {
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        this.init();

        let that = this;

        console.log(this.routeParams);

        document.getElementById('show-answers').onclick = function () {
            location.href = '#/answers?id=' + that.routeParams.id;
        }
    }

    async init() {
        const userInfo = Auth.getUserInfo();
        if (!userInfo) {
            location.href = '#/';
        }

        if (this.routeParams.id) {
            try {
                const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result?userId=' + userInfo.userId)
                if (result) {
                    if (result.error) {
                        throw new Error(result.error);
                    }
                    document.getElementById('result-score').innerText = result.score + '/' + result.total;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }

        location.href = '#/';


    }
}

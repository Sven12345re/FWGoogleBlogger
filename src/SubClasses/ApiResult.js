import axios from "axios";
export default {
    GetResult: function (URL) {
        return axios(URL, {
            method: "GET",
            Headers: {
                "Content-Type": "application/json"
            }
        }).then(Response => Response);
    }
};
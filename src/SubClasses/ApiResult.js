import axios from "axios";
export default {
    ApplyREST: function (Method, URL, Data) {
        return axios(URL, {
            method: Method,
            headers: {
                "Content-Type": "application/json"
            },
            data: Data,
        }).then(Response => Response);
    }
};
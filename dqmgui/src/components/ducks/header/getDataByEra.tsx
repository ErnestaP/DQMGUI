
import axios from "axios";


export const getSamples = async () => {
    await axios.get(`/online-dev/data/json/samples`).then(
        response => { console.log(response) }
    ).catch(error => { console.log(error) })
};
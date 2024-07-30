import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5000,
    duration: '1s'
};

export default function() {
    //http.get('http://afc18233acd6040e38b5395599548c95-2064986359.sa-east-1.elb.amazonaws.com/api/customers/30384268811');
    http.get('http://afc18233acd6040e38b5395599548c95-2064986359.sa-east-1.elb.amazonaws.com/api-docs/');
    sleep(1);
}

const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c07cb3e79dmsh3729f72371f1938p10704cjsn8146f248f735',
		'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com'
	}
};

const fetchIpInfo = async (ip) => {
    return fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/jason/${ip}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err));
};

const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $submit = document.querySelector('#submit');
const $results = document.querySelector('#results');


$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const {value} = $input
    if(!value) return

    $submit.setAttribute("disabled", "")           // Evitamos que haga mas peticiones
    $submit.setAttribute("aria-busy", "true")      // Introducimos un LOADING

    const ipInfo = await fetchIpInfo(value)

    if(ipInfo){
        $results.innerHTML = JSON.stringify(ipInfo, null, 2);
    }

    $submit.removeAttribute("disabled")            // Una vez cargada la data, quitamos para que pueda hacer mas peticiones
    $submit.removeAttribute("aria-busy")           // Quitamos el LOADING 

})
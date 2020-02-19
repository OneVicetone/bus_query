import QS from 'qs'

class Fetch {
    JSON_HEADER = { "Content-Type": "application/json" }
    FORM_HEADER = { "Content-Type": "application/x-www-form-urlencoded" }

    catchByStatusCode(res) {
        if (res.status >= 200 && res.status < 400) {
            return res
        }
        const err = new Error(res.statusText)
        throw err
    }

    catchByResCode(res) {
        if (res.code >= 200 && res.code < 400) {
            return res
        }
        // message({
        //     type:"error",
        //     text:res.msg,
        //     timeout:2000
        // })
        const err = new Error(res.msg)
        throw err
    }

    get(url, body) {
        body = QS.stringify(body)
        return fetch(`${url}?${body}`, {
            method: "GET",
            headers: new Headers(this.JSON_HEADER),
        })
            // .then(this.catchByStatusCode)
            .then(res => res.json())
            .then(this.catchByResCode)
            .catch(err => {
                console.info(err)
            })
    }

    post(url, body) {
        // body = JSON.stringify(body)
        return fetch(url, {
            method: "POST",
            headers: new Headers((body instanceof FormData) ? this.FORM_HEADER : this.JSON_HEADER),
            body
        })
            // .then(this.catchByStatusCode)
            .then(res => res.json())
            .then(this.catchByResCode)
            .catch(err => {
                console.info(err)
            })
    }


    delete(url, id) {
        return fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: new Headers(this.JSON_HEADER),
        })
            // .then(this.catchByStatusCode)
            .then(res => res.json())
            .then(this.catchByResCode)
            .catch(err => {
                console.info(err)
            })
    }
}

export default new Fetch()
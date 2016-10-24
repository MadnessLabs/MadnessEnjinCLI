/// <reference path="../../typings/index.d.ts"/>

module <%= app %> {
    class <%= name %>Service {
        endpoint: string;

        constructor(protected enjin, protected Rest) {
            this.endpoint = this.enjin.db.api.host + '<%= nameLower %>/';
        }

        respond(response, callback) {
            if (response.success) {
                if (typeof callback === 'function') {
                    callback(response.data);
                } else {
                    console.log('2nd Parameter is a Callback and must be a function!');
                }
            } else {
                console.log(response.data);
            }
        }

        add(data, callback) {
            var restUrl = this.endpoint.slice(0, -1);

            this.Rest.post(restUrl, data).then((response) => {
                this.respond(response, callback);
            });
        }

        find(id, callback, silent = false) {
            var restUrl = this.endpoint + id;

            this.Rest.get(restUrl, false, silent).then((response) => {
                this.respond(response, callback);
            });
        }

        delete(id, callback) {
            var conf = confirm('Are you sure you want to delete this @@{nameLower}?');
            if (conf) {
                var restUrl = this.endpoint + id;

                this.Rest.delete(restUrl).then((response) => {
                    this.respond(response, callback);
                });
            }
        }

        update(id, data, callback) {
            var restUrl = this.endpoint + id;

            this.Rest.post(restUrl, data).then((response) => {
                this.respond(response, callback);
            });
        }
    }

    angular.module('<%= app %>').service('<%= name %>', <%= name %>Service);
}


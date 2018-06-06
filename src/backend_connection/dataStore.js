import PouchDB from 'pouchdb-react-native';
import I18n from 'react-native-i18n';
import { NetInfo, Platform } from 'react-native';
import randomToken from 'random-token';

import { api, endpoint } from 'src/config/api';
import { constants, newsCategoriesPreselection, widgetPreselection } from 'src/config/settings';

const db = new PouchDB('campusDB');  // Create new if not already existing

const genericHeader = {
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json',
};

const restTypes = {
    GET  : 'GET',
    POST : 'POST'
};

export default class DataStore {
    constructor() {
        this.isConnected = false;
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        /*** Create dummy data (will be deleted)***/
        storeLocally('number_news', 11);
    }

    handleConnectionChange = (isConnected) => {
        this.isConnected = isConnected;
    };

    /**
     * Authenticates the user and stores the credentials locally, if remember me is enabled
     * @param rememberMe: boolean
     * @param username: Credentials
     * @param password: ""
     * @return Promise
     * @resolve true if successful login
     */
    login(username, password, rememberMe) {
        const instance = this;
        storeLocally('credentials', {
            username: username,
            password: password,
            rememberMe: rememberMe
        });

        // Prepare headers
        const headers = Object.assign({}, genericHeader, {
            credentials: 'include'
        });

        return new Promise( function(resolve) {
            if (Platform.OS === 'ios' && !instance.isConnected) {  // could also be undefined
                resolve(true);  // display cached data within the app
                return;  // abort
            }
            fetch(api.authorize, {
                method  : 'POST',
                headers : headers,
                body    : JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        const cookies = response.headers.map["set-cookie"];
                        if (cookies) {
                            const cookie_val = parseCookie(cookies[0]);

                            // resolve promise after storing cookie is finished -> requests after successful login will use the cookie
                            db.get('session-cookie')
                                .then(function(doc) {
                                    db.put({
                                        _id : 'session-cookie',
                                        _rev: doc._rev,
                                        data: cookie_val
                                    }).then(() => resolve(true));
                                }).catch(function(err) {
                                if (err.status === 404) {  // not found -> create new doc
                                    db.put({
                                        _id : 'session-cookie',
                                        data: cookie_val
                                    }).then(() => {
                                        if(Platform.OS === 'android') {
                                            setTimeout(()=>{resolve(true)}, 1500);
                                        } else {
                                            resolve(true);
                                        }
                                    });
                                } else {
                                    if (__DEV__) {
                                        console.log(err);
                                    }
                                }
                            });
                        } else {
                            resolve(true);  // active cookie already stored
                        }

                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    resolve(false);
                });
        });
    }
    
    // creates a first document at the initial app start
    createFirstDoc() {
        db.get('session-cookie')
            .then(function(doc) {})  // already existing.
            .catch(function(err) {
                if (err.status === 404) {  // not found -> create new doc
                   db.put({
                       _id : 'session-cookie',
                       data: ''
                   })
                }
            });
    }

    /**
     * @param local: boolean to identify if new fetch ist required
     * @return Promise
     * @resolve Array of objects {id: number, name: string}
     */
    getAvailableNewsCategories(local) {
        const instance = this;
        return new Promise(function (resolveToRedux) {
            if (local) {
                db.get('news_ctgry')
                    .then(function(doc) {
                        let data = Object.assign({}, doc.data);
                        mergeCategoriesWithSelection(data, resolveToRedux);
                    }).catch(function(err) {});
            } else {
                new Promise(function (resolve) {
                    instance.fireRequest(resolve, restTypes.GET, api.news_ctgry, 'news_ctgry');
                }).then(function(result) {
                    mergeCategoriesWithSelection(result, resolveToRedux);
                });
            }
        });
    }

    /**
     * @return Promise
     * @resolve Number of available news
     */
    getAvailableNumberOfNews() {
        const instance = this;
        return new Promise( function(resolve) {
            instance.fireRequest(resolve, restTypes.GET, api.number_news, 'number_news');
        });
    }

    /**
     * Gets the balance for Seezeit and PCounter
     * @return Promise
     * @resolve Object containing the two values {print: number, zack: number}
     */
    getBalance() {
        const instance = this;
        return new Promise( function(resolve) {
            instance.getCredentials().then((credentials) =>
                {
                    instance.fireRequest(resolve, restTypes.POST, api.balance, 'balance', credentials)}
            );
        })
    }

    /**
     * @return Promise
     * @resolve Array of days (current week)
     */
    getBibOpeningHours() {
        const instance = this;
        return new Promise( function(resolve) {
            instance.fireRequest(resolve, restTypes.GET, api.bib, 'bib');
        });
    }

    /**
     * @return boolean value
     */
    getConnectionStatus() {
        return this.isConnected;
    }

    /**
     * @return Promise
     * @resolve Object containing name, password and rememberMe ( rememberMe = false, if nothing has been stored)
     */
    getCredentials() {
        return new Promise( function(resolve) {
            db.get('credentials')
                .then(function(doc) {
                    if (doc.data.rememberMe) {
                        resolve( doc.data );
                    } else {
                        resolve(
                            {
                                username    : '',
                                password    : '',
                                rememberMe  : false
                            }
                        );
                    }
                })
                .catch(function() {
                    resolve(
                        {
                            username    : '',
                            password    : '',
                            rememberMe  : false
                        }
                    );
                });
        });
    }

    getEndlichtData() {
        const instance = this;
        return new Promise( function(resolve) {
            instance.fireRequest(resolve, restTypes.GET, api.endlicht, 'endlicht');
        })
    }

    getEvents() {
        const instance = this;
        return new Promise(function(resolve) {
            instance.fireRequest(resolve, restTypes.GET, api.events, 'events');
        });
    }

    getGrades() {
        const instance = this;

        return new Promise(function (resolve) {
            db.get('gradesToken')
                .then((doc) => {
                    instance.fireRequest(resolve, restTypes.POST, api.grades, 'grades', {token: doc.data});
                })
                .catch((err) => {
                    if (err.status === 404) {  //no token existing
                        // generate token + manual fetch request
                        const token = randomToken(12);
                        storeLocally('gradesToken', token);

                        if (!this.isConnected) {
                            resolve(undefined);
                            return;
                        }

                        db.get('session-cookie').then((cookie) => {
                            instance.getCredentials().then((credentials) => {
                                const headers = Object.assign({}, genericHeader, {
                                    'Set-Cookie': cookie.data.name + '=' + cookie.data.value
                                });
                                const body = Object.assign({'token': token}, credentials);
                                const request = {
                                    method  : 'POST',
                                    headers : headers,
                                    body    : JSON.stringify(body)
                                };

                                fetch(api.gradesCreate, request)
                                    .then((response) => {
                                        if (response.ok) {
                                            instance.fireRequest(resolve, restTypes.POST, api.grades, 'grades', body);
                                        }
                                    })
                                    .catch();
                            });
                        });
                    }
            });
        });
    }

    getLanguage() {
        return new Promise( function(resolve) {
            db.get('language')
                .then(function(doc) {
                    resolve(doc.data);
                })
                .catch(function() {
                    resolve('');
                });
        });
    }

    /**
     * @return Promise
     * @resolve Array of lectures (later on, array of days)
     */
    getLectures() {
        const instance = this;
        return new Promise( function(resolve) {
            instance.getCredentials().then((credentials) => {
                instance.fireRequest(resolve, restTypes.POST, api.lectures, 'lectures', credentials)
            });
        });
    }

    /**
     * Gets the menu (retrieved from Seezeit-API in the backend)
     * @return Promise
     * @resolve Menu for the current week
     */
    getMenu(language) {
        const instance = this;

        if (!language) {
            language = I18n.locale.startsWith('de') ? 'de' : 'en';
        }

        // Create route just before firing request because language could change during run-time
        let menuRoute = endpoint + 'canteen/' + language + '/menu';

        return new Promise( function(resolve) {
            instance.fireRequest(resolve, restTypes.GET, menuRoute, 'menu');
        });
    }

    /**
     * @param page: number of the current page (e.g. 3 will return news 30 - 39)
     * @return Promise
     * @resolve Array of news objects
     */
    getNews(page) {
        const instance = this;
        return new Promise( function(resolve) {
            const url = api.news + page + '/' + constants.newsPerPage;
            // TODO: Get user from redux store
            instance.fireRequest(resolve, restTypes.GET, url, 'news');
        });
    }

    /**
     * @return Promise
     * @resolve Array containing members of widgetEnum (src/config/settings)
     */
    getSelectedWidgets() {
        return new Promise(function(resolve) {
            db.get('widgetSelection')
                .then(function(doc) {
                    resolve(doc.data);
                })
                .catch(function(err) {
                    if (err.status === 404) {  // not found -> initial app start after installation
                        db.put({  // save preselection
                            _id : 'widgetSelection',
                            data: widgetPreselection
                        });
                        resolve(widgetPreselection);
                    } else {
                        if (__DEV__) {
                            console.log('getSelectedWidgets: ', err);
                        }
                        resolve([]);
                    }
                })
        });
    }

    setLanguage(language) {
        storeLocally('language', language);
    }

    setSelectedNewsCtgry(ctgry, value) {
        return new Promise(function(resolve) {
            db.get('news_ctgry_selection')
                .then(function(doc) {
                    let index_to_remove;
                    let found = false;
                    for (let index = 0; index < doc.data.length; index++) {
                        if (ctgry === doc.data[index]) {
                            if (!value) {
                                index_to_remove = index;
                            } else {
                                // ctgry already selected
                                found = true;
                            }
                            break;  // key found
                        }
                    }
                    if (!value  && index_to_remove >= 0) {
                        doc.data.splice(index_to_remove, 1);  // remove element
                    } else if (value && !found) {
                        doc.data.push(ctgry);
                    }

                    db.put(doc)
                        .then(() => resolve())
                        .catch((err) => resolve());

                })
                .catch(function(err) {
                    if (err.status === 404) {  // doc didn't exist; create new
                        db.put({
                            _id  : 'news_ctgry_selection',
                            data: [ctgry]
                        })
                            .then(() => resolve())
                            .catch((err) => resolve());
                    }
                });
        });
    }

    /**
     * @param selection: Array of integers representing the widgets; Order is important!
     */
    setSelectedWidgets(selection) {
        storeLocally('widgetSelection', selection);
    }


    fireRequest(resolve, restType, url, id, body) {
        // will be used later within fireRequest
        const getLocal = function() {
            // Remote request didn't work; Resolving promise with local data
            db.get(id).then(function(doc) {
                resolve(doc.data);
            }).catch(function (err) {
                resolve(undefined);
                console.log(err);
            });
        };


        // fire only if connected
        if (!this.isConnected) {
            getLocal();
            return;  // abort network request
        }

        let headers;

        // Prepare headers
        db.get('session-cookie').then((cookie) => {
            headers = Object.assign({}, genericHeader, {
                'Set-Cookie'    : cookie.data.name + '=' + cookie.data.value
            });
            let request = {
                method  : restType,
                headers : headers
            };

            if (body) {
                request.body = JSON.stringify(body);
            }

            // Actually firing the request
            fetch(url, request)
                .then((response) => {
                    if (response.ok) {  // will be a boolean value
                        if (response.status === 204) {
                            resolve(undefined);  // no content
                        } else {
                            response.json()
                                .then((responseJson) => {
                                    // Yeeeey. Request did work.
                                    storeLocally(id, responseJson);  // Cache data locally for the next time the device is offline
                                    resolve(responseJson);
                                }).catch((err) => {
                                // JSON error
                                getLocal();
                                console.error(url, err);
                            });
                        }
                    } else {
                        console.log(url, response.status);
                        getLocal();
                    }
                })
                .catch((error) => {
                    // Fetching didn't work. Getting local data
                    getLocal(error);
                });
        })
            .catch((err) => {
                // No cookie available
                // TODO: fetch new cookie
                console.log('No cookie found', err);
                getLocal();
            });
    };

}


/****** Helper functions ******/

const storeLocally = function(id, data) {
    db.get(id)
        .then(function(doc) {
            // -> get old data and overwrite
            db.put({
                _id : id,
                _rev: doc._rev,
                data: data
            });
        }).catch(function(err) {
        if (err.status === 404) {  // document didn't exist; creating new doc
            db.put({
                _id : id,
                data: data
            });
        } else {
            if (__DEV__) {
                console.log(err);
            }
        }
    });
};

const removeDocument = function(id) {
    db.get(id).then(function(doc) {
        return db.remove(doc);
    }).catch(function (err) {
        console.log(err);
    });
};

/**
 * e.g.: sails.sid=s%3APA1vmvULetnTuaC70HkA8EZ6UGWWkeHk.RifW4D; Path=/; HttpOnly
 * -> s%3APA1vmvULetnTuaC70HkA8EZ6UGWWkeHk.RifW4D
 */
const parseCookie = function(str) {
    const split = str.split(';');
    let tmp = split[0];
    return {
        name    : tmp.split('=')[0],
        value   : tmp.substring(10)  // return only the cookie value
    };
};

const mergeCategoriesWithSelection = function(data, resolveToRedux) {
    const merge = function(docData) {
        docData.forEach(function(ctgry) {
            for (let index = 0; index < data['categories'].length; index++) {
                if (data['categories'][index].name === ctgry) {
                    data['categories'][index].selected = true;
                }
            }
        });
        resolveToRedux(data);
    };

    // prepare merged object
    for (let index = 0; index < data['categories'].length; index++) {
        data['categories'][index].selected = false
    }
    db.get('news_ctgry_selection')
        .then((doc) => {
            merge(doc.data);
        })
        .catch(function(err) {
            if (err.status === 404) {  // Document didn't exist -> first app start
                merge(newsCategoriesPreselection);
                db.put({  // save preselection
                    _id : 'news_ctgry_selection',
                    data: newsCategoriesPreselection
                });
            }
            resolveToRedux(data);
        });
};

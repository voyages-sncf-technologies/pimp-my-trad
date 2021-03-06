/*
 *
 *  * Copyright (C) 2018 VSCT
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  * http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */
export class Keyset {
    static from(object) {
        return Object.assign(new Keyset(), {
            ...object,
            keys: keydictFrom(object.keys)
        });
    }

    setKey(id, key) {
        return Keyset.from({
            name: this.name,
            supportedLanguages: this.supportedLanguages,
            keys: {...this.keys, [id]: key},
            id: this.id
        });
    }

    deleteKey(id) {
        let newKeys = {...this.keys};
        delete newKeys[id];
        return Keyset.from({
            name: this.name,
            supportedLanguages: this.supportedLanguages,
            keys: newKeys,
            id: this.id
        });
    }

    pairs() {
        return Object.keys(this.keys).map(id => [id, this.keys[id]]);
    }

    keyIds() {
        return Object.keys(this.keys);
    }
}

export class Key {
    static from(object) {
        return Object.assign(new Key(), object);
    }

    translation(key) {
        return (this.translations[key] || [])[0] || '';
    }

    conflicting(key) {
        return (this.translations[key] || [])[1] || null;
    }
}

export var KeyState = {
    'todo': 'TODO',
    'inprogress': 'IN PROGRESS',
    'done': 'DONE',
    'conflict': 'CONFLICT'
};

export function getColorForState(key) {
    switch (key) {
        case 'done':
            return 'success';
        case 'inprogress':
            return 'info';
        case 'todo':
            return 'warning';
        case 'conflict':
            return 'danger';
        default:
            return 'secondary';
    }
}

export function trimTags(text) {
    return Object.keys(KeyState).reduce((text, key) => text
        .replace(`[${key}]`, '')
        .replace(`[${key.toUpperCase()}]`, ''), text).trim();
}

function keydictFrom(object) {
    return Object.keys(object).reduce((final, id) => {
        final[id] = Key.from(object[id]);
        return final;
    }, {});
}

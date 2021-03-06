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
import * as React from 'react';
import {connect} from 'react-redux';
import {Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';
import {searchKey} from '../../app/actions/ProjectAction';

const mapState = state => ({
    query: state.main.search
});
const mapDispatch = dispatch => ({
    search: query => dispatch(searchKey(query))
});

class _SearchBar extends React.Component {
    search(event) {
        this.props.search(event.currentTarget.value);
    }

    render() {
        return (<InputGroup>
            <Input type="text" onChange={e => this.search(e)} value={this.props.query} placeholder="Rechercher..."/>
            {this.props.query.length > 0 ?
                (<InputGroupAddon addonType="append">
                    <Button color="danger" size="sm" onClick={() => this.props.search('')}>&times;</Button>
                </InputGroupAddon>) : ''}
        </InputGroup>);
    }
}

export const SearchBar = connect(mapState, mapDispatch)(_SearchBar);

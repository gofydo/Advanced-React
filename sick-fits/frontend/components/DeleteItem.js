import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {ALL_ITEMS_QUERY} from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`;


class DeleteItem extends Component {
    update = (cache, payload) => {
        //manually update frontend store to match the server.
        // 1. read items in cache for items we want.
        const data = cache.readQuery({query: ALL_ITEMS_QUERY});
        // 2. filter deleted item out.
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // 3. update the cache
        cache.writeQuery({query: ALL_ITEMS_QUERY, data});
    }
    render() {
        return (
            <Mutation mutation={DELETE_ITEM_MUTATION} variables={{id: this.props.id}} update={this.update}>
                {(deleteItem, {error}) => (
                    <button onClick={()=>{
                        if(confirm('Ary you sure you want to delete this?')){
                            deleteItem();
                        }
                    }}>{this.props.children}</button>
                )}
            </Mutation>
        )
    }
}

export default DeleteItem;

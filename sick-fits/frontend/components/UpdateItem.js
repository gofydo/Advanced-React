import React, { Component } from 'react'
import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: {id: $id}) {
            id 
            title
            image
            description
            price
        }
    }
`;


const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String $description: String $price: Int) {
        updateItem(id:$id title:$title description:$description price:$price) {
            id
        }
    }
`;

class UpdateItem extends Component {
    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    updateItem = async (e, updateItemMutation) => {
        e.preventDefault();
        const res = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state,
            }
        });
    };

    render() {
        const {id} = this.props;
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id}}>
                {({data, loading}) => {
                    if (loading) return <p>Loading...</p>;
                    if (!data.item) return <p>No Item found for ID:{id}!</p>
                    return (
                        <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                            {(updateItem, {loading, error}) => (
                            <Form 
                                onSubmit={ e => this.updateItem(e, updateItem)}
                            >
                                <Error error={error}/>
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <label>Image</label><img width="200" src={data.item.image} alt="Upload Preview"/>
                                    <label htmlFor="title">
                                        Title
                                        <input 
                                            type="text" 
                                            id="title"
                                            input="title" 
                                            name="title" 
                                            placeholder="Title" 
                                            required 
                                            defaultValue={data.item.title}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <label htmlFor="price">
                                        Price
                                        <input 
                                            type="number" 
                                            id="price"
                                            input="price" 
                                            name="price" 
                                            placeholder="price"
                                            required 
                                            defaultValue={data.item.price}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <label htmlFor="description">
                                        Description
                                        <textarea 
                                            id="description"
                                            input="description" 
                                            name="description" 
                                            placeholder="Enter a description" 
                                            required 
                                            defaultValue={data.item.description}
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <button type="submit" >Sav{loading? 'ing' : 'e'} Changes</button>
                                </fieldset>
                            </Form>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        )
    }
}

export default UpdateItem;
export {UPDATE_ITEM_MUTATION};

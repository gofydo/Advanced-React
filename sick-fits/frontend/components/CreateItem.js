import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            description: $description
            image: $image
            largeImage: $largeImage
            price: $price
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
    state = {
        title:"",
        price:'',
        image: '',
        largeImage: '',
        description:""
    }
    handleChange = (e) => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    }
    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, {loading, error, called, data}) => (
                    <Form 
                        onSubmit={ async e => {
                            e.preventDefault(); 
                            const res = await createItem();
                            Router.push({
                                pathname: '/item',
                                query: {id: res.data.createItem.id}
                            })
                        }}
                    >
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input 
                                    type="text" 
                                    id="title"
                                    input="title" 
                                    name="title" 
                                    placeholder="Title" 
                                    required 
                                    value={this.state.title}
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
                                    value={this.state.price}
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
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <button type="submit" >Submit</button>
                        </fieldset>
                    </Form>
                    )}
                </Mutation>
        )
    }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};

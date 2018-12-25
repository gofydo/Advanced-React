import React, { Component } from 'react'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Error from './ErrorMessage';
import Styled from 'styled-components';
import Head from 'next/head';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id:ID!) {
         item(where:{ id: $id}) {
            id
            title
            description
            largeImage
            image
        }
    }
`;

const SingleItemStyles = Styled.div`
    max-width: 1200px;
    margin: 2em auto;
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;

    }
`;

class SingleItem extends Component {
    render() {
        console.log(this.props.id);
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
                {({data, error, loading}) => {
                    if (error) return <Error error={error}/>;
                    if (loading) return <p>Loading...</p>;
                    if (!data.item) return <p>No Item found for ID: {this.props.id}</p>;
                    const {image, title, description} = data.item;
                    console.log(data.item);
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>Sick Fits | {title}</title>
                            </Head>
                            <img src={image} alt={title}/>
                            <div className='details'>
                                <h2>Viewing {title}</h2>
                                <p>{description}</p>
                            </div>
                        </SingleItemStyles>
                    );
                }}
            </Query>
        );
    }
}

export default SingleItem;

import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Link from 'next/link';
import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import Error from './ErrorMessage';
import {perPage} from '../config';

const PAGINATED_ITEMS = gql`
    query PAGINATED_ITEMS {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = (props) => {
    return (
            <Query query={PAGINATED_ITEMS}>
                {({data, loading, error}) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <Error error={error}/>;
                    const count = data.itemsConnection.aggregate.count;
                    const pages = Math.ceil(count / perPage);
                    const {page} = props;
                    return (
                        <PaginationStyles>
                            <Head>
                                <title>Sick Fits | page {page} of {pages}</title>
                            </Head>
                            <Link href={{
                                pathname:'/items',
                                query:{page: page-1}
                            }}>
                                <a className='prev' aria-disabled={page <= 1}>Prev</a>
                            </Link>
                            <p>Page {page} of {pages}</p>
                            <Link href={{
                                pathname:'/items',
                                query:{page: page+1}
                            }}>
                                <a className='next' aria-disabled={page >= pages}>Next</a>
                            </Link>
                        </PaginationStyles>
                    );
                }}
            </Query>
    );
};

export default Pagination;
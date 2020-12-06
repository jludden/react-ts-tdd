import React, {useEffect} from 'react';
import '../App.css';

import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

import ApolloClient from 'apollo-boost';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import update from 'immutability-helper';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, RouteComponentProps } from 'react-router-dom';
import { Container, Message, Progress, Table } from 'rbx';
import DocumentBody from '../components/CommentableDocument/DocumentBody';
import DocumentHeader from '../components/CommentableDocument/DocumentHeader';
import RoastComment from '../components/CommentableCodePage/types/findRepositoryByTitle';
// import schema from '../api/github.schema.json';
import IntrospectionResultData, { Blob, Repository, RepositoryConnection } from '../generated/graphql';
import { RepositoryOwner, StargazerConnection, Language } from '../generated/graphql'; // todo shouldnt really need
import RepoSearchContainer from '../components/RepoSearch/RepoSearchContainer';
import RepoContents from '../components/RepoContents';
import { db, auth } from '../services/firebase';

import './Search.css';

export interface IHomeProps {
    bar: string;
    foo: number;
    children: React.ReactElement;
}

// todo
// RepoSearchContainer -> set URL w/ useQueryParam
// instead of returning repo, can return repo.resourcePath
// redirect URL: repo/resourcePath

export const RecentlyUpdated = () => {

    // useEffect(() => {
    //     try {
    //         db.ref('file-comments/' + commentsId).on('value', (snapshot) => {
    //             const chats: RoastComment[] = [];
    //             snapshot.forEach((snap) => {
    //                 const val = snap.val();
    //                 chats.push({
    //                     _id: snap.key,
    //                     updatedAt: new Date(val.timestamp),
    //                     ...val,
    //                 });
    //             });
    //             setComments(chats);
    //         });
    //     } catch (error) {
    //         setLoadCommentsError(error.message);
    //     }
    // }, []);

    return (
        <div>
            Add Recently Updated Repositories...
        </div>

    )
}

export const Search = (props: IHomeProps) => {
    const [shouldRedirect, setShouldRedirect] = React.useState('');

    // const styles: React.CSSProperties = {
    //   grid-column: "absolute",
    //   left: `${node.offsetWidth}px`  // node.getBoundingClientRect();
    // }

    return (
        <>
            {shouldRedirect.length > 0 && <Redirect to={`/repo${shouldRedirect}`} push />}
                       

            <RepoSearchContainer
                loadRepoHandler={(repo: Repository) => setShouldRedirect(repo.resourcePath)}
                loadRecommendedRepo={() => setShouldRedirect('/jludden/ReefLifeSurvey---Species-Explorer')}
            />
            
            {/* <div className="grid">
                <div>
                    Search Personal Repositories - Login prompt Your starred Repos - Login prompt Hide everything
                    below or translucent below when searching?
                </div>

                <div>Grid - Recommended Recent Top Roasted Top Roasters</div>

                <div>Recent - fresh Popularity Scale: toasted roasted burnt Add fuel to the fire</div>
                <div><RecentlyUpdated /></div>

            </div>
            <h1>Sample `img` of Code + comments w/ roasties</h1> */}

            {/* <Columns>
                <Columns.Column>First Column</Columns.Column>
                <Columns.Column>Second Column</Columns.Column>
                <Columns.Column> */}
            {/* <div> */}
            {/* <Table hoverable>
                <Table.Head>
                    <Table.Row>
                    <Table.Heading>One</Table.Heading>
                    <Table.Heading>Two</Table.Heading>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {[
                    ['Three', 'Four'],
                    ['Five', 'Six'],
                    ['Seven', 'Eight'],
                    ['Nine', 'Ten'],
                    ['Eleven', 'Twelve'],
                    ].map(([v1, v2], i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{v1}</Table.Cell>
                        <Table.Cell>{v2}</Table.Cell>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table> */}
            {/* </Columns.Column>
            </Columns> */}
            {/* </div> */}

            {/* {React.cloneElement(props.children, { isLoggedIn })} */}
            {props.children && React.cloneElement(props.children)}
            {/* </div> */}
        </>
    );
}
export default Search;
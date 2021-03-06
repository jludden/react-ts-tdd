import React, { useState, useEffect } from 'react';
import '../App.css';
import { db } from '../services/firebase';
import { FirebaseQueryInner } from '../components/FirebaseChat/FirebaseCommentsProvider';
import { SingleCommentUI } from '../components/CommentableDocument/SingleCommentView';
import { CardHeader } from '../components/CommentableDocument/CommentContainer';
import {
    Hero,
    Title,
    Container,
    Message,
    Box,
    Textarea,
    Button,
    Card,
    Content,
    Icon,
    Delete,
    Dropdown,
    Section,
} from 'rbx';
import { Search } from './Search';

export const Home = () => {
    return (
        <div className="feat-comments">
            <div className="home-content">
                    <Search />
            </div>
            <div className="home-content">
                <Section>
                    <Title size={1}>Recent Comments</Title>
                    <FirebaseQueryInner>
                        {({ comments }) => (
                            <ul>
                                {comments.map((comment) => (
                                    <li key={comment._id}>
                                        <RecentCommentCard key={comment._id} comment={comment} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </FirebaseQueryInner>
                </Section>
            </div>
        </div>
    );
};

const constrainedFlexStyle = {
    flexGrow: '0',
    flexShrink: '0',
    flexBasis: 'auto',
};

const flexStyle = {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: 'auto',
};

export const RecentCommentCard = ({ comment }) => {
    return (
        <Card>
            <Card.Content>
                <div style={{ display: 'flex', flexDirection: 'row', flexFlow: 'row wrap' }}>
                    <CardHeader comment={comment} styles={constrainedFlexStyle} />
                    <div className="recent-card-text-container" style={{ ...flexStyle }}>
                        <span>{comment.text}</span>
                    </div>
                    <RepositoryLink details={comment.queryVariables} lineNumber={comment.lineNumber} />
                </div>
            </Card.Content>
        </Card>
    );
};

export const RepositoryLink = ({ details, lineNumber }) => {
    const linkStyle = {
        ...constrainedFlexStyle,
        padding: '1rem',
        // fontSize: '0.75rem',
    };
    const link = `/repo/${details.owner}/${details.name}?file=${details.path}`;

    const encodedLink = `/repo/${details.owner}/${details.name}?file=${encodeURIComponent(
        details.path,
    )}#comment-container~${lineNumber}`;

    return (
        <div className="recent-card" style={linkStyle}>
            <div className="recent-card-repo-item recent-card-repo-name">
                <label>Repository: </label>
                <a href={encodedLink}>
                    <span>{details.name}</span>
                </a>
            </div>
            <div className="recent-card-repo-path">
                <label>Path: </label>
                <a href={encodedLink}>
                    <span>{details.path}</span>
                </a>
            </div>
            <div className="recent-card-repo-item recent-card-repo-owner">
                <label>Owner: </label>
                <span>{details.owner}</span>
            </div>
        </div>
    );
};

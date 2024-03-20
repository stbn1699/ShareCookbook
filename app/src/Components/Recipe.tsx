import BottomBar from "./BottomBar";
import React, {useEffect, useState} from "react";
import '../Styles/MainPage.css';
import '../Styles/Main.css';
import '../Styles/Recipe.css';
import Header from "./Header";
import {useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {BsBookmark, BsChatLeftText, BsHeart, BsHeartFill, BsMessenger} from "react-icons/bs";

function Recipe() {

    const { uuid } = useParams();
    const [publication, setPublication] = useState<any | null>(null);
    const userUUID = localStorage.getItem('userUUID') || sessionStorage.getItem('userUUID');
    const [userHasLiked, setUserHasLiked] = useState(false);

    const toggleLike = async () => {
        if (userUUID && publication) {
            const response = await fetch('http://localhost:3001/user/toggleLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userUUID, publicationUUID: publication.uuid }),
            });

            if (!response.ok) {
                console.error('Error:', await response.text());
            } else {
                setUserHasLiked(!userHasLiked);
                if(userHasLiked) {
                    publication.likes_count -= 1;
                } else {
                    publication.likes_count += 1;
                }
            }
        }
    };

    const checkUserLike = async () => {
        if (userUUID && publication) {
            const response = await fetch('http://localhost:3001/user/haveUserLiked', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userUUID, publicationUUID: publication.uuid }),
            });

            if (!response.ok) {
                console.error('Error:', await response.text());
            } else {
                const responseBody = await response.json();
                setUserHasLiked(responseBody.liked);
                console.log(userHasLiked)
            }
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3001/publications/getPublicationById/${uuid}`)
            .then(response => response.json())
            .then(data => {
                setPublication(data);
                checkUserLike().then(() => console.log('done'));
            })
            .catch(error => console.error('Error:', error));
    }, []);
;
    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="recipe"/>
            </div>
            <div className="application-page-content">
                <div className="recipe-header">
                    <div className="recipe-title josefin-slab">
                        {publication && publication.title}
                    </div>
                    <div className="recipe-infos josefin-slab">
                        <div>{publication && publication.info_1} min</div>
                        <div>{publication && publication.info_2} personnes</div>
                        <div>{publication && publication.likes_count} likes</div>
                    </div>
                </div>

                <div className="recipe-content josefin-slab">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {publication && publication.content.replace(/\\n/g, '\n')}
                    </ReactMarkdown>
                </div>

                <div className="recipe-footer">
                    <div className="recipe-actions josefin-slab">
                        <div className="recipe-author">@{publication && publication.author}</div>
                        {userHasLiked ?
                            <BsHeartFill onClick={toggleLike} style={{fontSize: '1.5rem', color: '#f2e8cf'}}/> :
                            <BsHeart onClick={toggleLike} style={{fontSize: '1.5rem', color: '#f2e8cf'}}/>
                        }
                        <BsChatLeftText style={{fontSize: '1.5rem', color: '#f2e8cf'}}/>
                        <BsBookmark style={{fontSize: '1.5rem', color: '#f2e8cf'}}/>
                    </div>
                </div>
            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="0"/>
            </div>
        </div>
    );
}

export default Recipe;
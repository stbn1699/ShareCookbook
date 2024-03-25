import BottomBar from "./BottomBar";
import React, {useEffect, useState} from "react";
import '../Styles/MainPage.css';
import '../Styles/Main.css';
import '../Styles/Recipe.css';
import Header from "./Header";
import {Link, useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {BsBookmark, BsChatLeftText, BsHeart, BsHeartFill} from "react-icons/bs";

function Recipe() {

    const { uuid } = useParams();
    const [publication, setPublication] = useState<any | null>(null);
    const userUUID = localStorage.getItem('userUUID') || sessionStorage.getItem('userUUID');
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const toggleLike = async () => {
        console.log('toggleLike')
        const response = await fetch(`${sessionStorage.getItem('apiUrl')}/user/toggleLike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userUUID, publicationUUID: uuid }),
        });
        console.log('toggleLike after fetch')

        if (!response.ok) {
            console.log('toggleLike if !response.ok')
            console.error('Error:', await response.text());
        } else {
            console.log('toggleLike else')
            setUserHasLiked(!userHasLiked);
            if(userHasLiked) {
                console.log('toggleLike if userHasLiked')
                setLikesCount(likesCount- 1)
            } else {
                console.log('toggleLike else !userHasLiked')
                setLikesCount(likesCount + 1)
            }
        }
    };

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/publications/getPublicationById/${uuid}`)
            .then(response => response.json())
            .then(data => {
                if (data.likes && data.likes[0] !== null) {
                    setLikesCount(data.likes.length);
                    setUserHasLiked(data.likes.includes(userUUID));
                } else {
                    setLikesCount(0);
                    setUserHasLiked(false);
                }
                setPublication(data);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="Recipe"/>
            </div>
            <div className="application-page-content application-page-content-recipe">
                <div className="recipe-header">
                    <div className="recipe-title josefin-slab">
                        {publication && publication.title}
                    </div>
                    <div className="recipe-infos josefin-slab">
                        <div className="recipe-infos-div">{publication && publication.time_to_cook} min</div>
                        <div className="recipe-infos-div">{publication && publication.n_personnes} personnes</div>
                        <div className="recipe-infos-div">{publication && likesCount} likes</div>
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
                        <Link to={`/Commentaires/${uuid}`}>
                            <BsChatLeftText style={{fontSize: '1.5rem', color: '#f2e8cf'}}/>
                        </Link>
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
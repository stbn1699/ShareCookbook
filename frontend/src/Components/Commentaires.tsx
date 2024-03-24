import Header from "./Header";
import BottomBar from "./BottomBar";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import '../Styles/Commentaires.css';
import {BsBookmark, BsChatLeftText, BsHeart, BsHeartFill, BsPaperclip, BsSend} from "react-icons/bs";

function Commentaires() {

    const userUUID = localStorage.getItem('userUUID') || sessionStorage.getItem('userUUID');
    const [commentaires, setCommentaires] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [publication, setPublication] = useState<any | null>(null);
    const { uuid } = useParams();
    const [newComment, setNewComment] = useState('');

    const newCommentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const addNewComment = () => {
        const commentData = {
            userUUID: userUUID,
            publicationUUID: uuid,
            content: newComment
        };

        fetch(`${sessionStorage.getItem('apiUrl')}/publication/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setNewComment('');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/publications/getPublicationById/${uuid}`)
            .then(response => response.json())
            .then(data => {
                if (data.likes && data.likes[0] !== null) {
                    setLikesCount(data.likes.length);
                } else {
                    setLikesCount(0);
                }
                setPublication(data);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/publication/${uuid}/comments`)
            .then(response => response.json())
            .then(data => {
                setCommentaires(data);
                console.log(data)
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="application-page">
            <div className="application-header">
                <Header headerStyle="Commentaires"/>
            </div>
            <div className="application-page-content application-page-content-recipe">
                <div className="recipe-header">
                    <div className="recipe-title josefin-slab">
                        {publication && publication.title}
                    </div>
                    <div className="recipe-infos josefin-slab">
                        <div className="recipe-infos-div">{publication && publication.info_1} min</div>
                        <div className="recipe-infos-div">{publication && publication.info_2} personnes</div>
                        <div className="recipe-infos-div">{publication && likesCount} likes</div>
                    </div>
                </div>

                <div className="Commentaires-box">
                    {commentaires.length === 0 ? (
                        <div className="Commentaires-empty josefin-slab">Pas encore de<br/>commentaires</div>
                    ) : (
                        commentaires.map((commentaire: any) => {
                            return (
                                <div className="Commentaires-commentaire-box">
                                    <div className="Commentaires-commentaire-top">
                                        <div className="josefin-slab">@{commentaire.username}</div>
                                    </div>
                                    <div className="Commentaires-commentaire-bottom">
                                        <div className="Commentaires-Commentaire-content">{commentaire.contenu}</div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
                <div className="Commentaires-footer">
                    <input
                        type="text"
                        value={newComment}
                        onChange={newCommentInputChange}
                        placeholder="Ajoutez un commentaire"
                        className="Commentaires-footer-input"
                    />
                    <button onClick={addNewComment} className="Commentaires-add-button">
                        <BsSend style={{fontSize: '4vh', color: '#f2e8cf'}}/>
                    </button>
                </div>

            </div>
            <div className="application-bottomBar">
                <BottomBar activePage="0"/>
            </div>
        </div>
    )
}

export default Commentaires